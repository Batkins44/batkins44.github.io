r"""Generate the Citadel of Bens roster via the Gemini API (Nano Banana Pro).

Takes the approved base portrait (_base.png), applies each Ben's trait clause
under the pinned house style, and writes public/citadel/bens/<slug>.png at 2K.
The API path sidesteps the AI Studio preview quirk where the final image gets
stranded inside the model's thoughts.

Setup (once):
    py -m pip install google-genai
    # Key resolution order: GEMINI_API_KEY env var, then ~/.gemini_api_key.
    # The keyfile is the household default — agents (Kyle) can run this script
    # without the key ever appearing in a chat message or command line:
    #   Set-Content -NoNewline $env:USERPROFILE\.gemini_api_key "<your key>"

Usage (from the repo root):
    py scripts/generate_bens.py                  # the whole roster, skips ones that exist
    py scripts/generate_bens.py doom-pile chad   # just these slugs
    py scripts/generate_bens.py --force cowboy   # re-roll one that exists
    py scripts/generate_bens.py --list           # show the roster and stop

Full art-pipeline context: CITADEL_OF_BENS_PLAN.md at the repo root.
"""
import argparse
import os
import sys
import time
from pathlib import Path

from google import genai
from google.genai import types

# The model id AI Studio shows for Nano Banana Pro. If the API 404s on it,
# open Get code in AI Studio and copy the exact id (previews sometimes carry
# a suffix, e.g. "-preview").
MODEL = "gemini-3-pro-image"

REPO = Path(__file__).resolve().parent.parent
BENS_DIR = REPO / "public" / "citadel" / "bens"
ARCHIVE = REPO / "art-archive" / "bens-2k"   # gitignored; masters double as Veo seed frames
# The base portrait reference: prefer the 2K master in the archive (the copy in
# public/ is web-sized to 512px and makes a blurrier reference). png/jpg/webp
# all work; the first one found wins.
_EXTS = (".png", ".jpg", ".jpeg", ".webp")
BASE_CANDIDATES = [ARCHIVE / f"_base{e}" for e in _EXTS] + [BENS_DIR / f"_base{e}" for e in _EXTS]
MIME = {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp"}

# Mirrors the System instructions block in CITADEL_OF_BENS_PLAN.md — keep the
# two in sync so playground experiments and script runs share one house style.
SYSTEM = (
    "You are a character designer creating a consistent original cartoon cast. "
    "House style, applied to every image: wobbly 2D adult sci-fi cartoon, thick "
    "uneven outlines, flat colors, no gradients except subtle cyan glow accents, "
    "slightly unhinged energy. Framing is always a head-and-shoulders portrait "
    "bust on a plain solid light-gray background, no text, no watermark, no logo "
    "except the character's own costume details. The recurring character is "
    "\"Ben\": keep his exact likeness (hair, hairline, red-brown beard, face "
    "shape, build, black rectangular glasses) identical across every request. "
    "He wears a futuristic council uniform - dark gray armor-panelled with cyan "
    "accent lights and an interlocking double-circle chest emblem. Only the "
    "traits explicitly requested in the prompt may change between images."
)

PROMPT = (
    "Keep this exact cartoon character and this exact art style. Now he is "
    "{name}: {trait}. Head and shoulders only, same framing, plain solid "
    "light-gray background, no text."
)

# The founding nine — trait clauses from CITADEL_OF_BENS_PLAN.md.
ROSTER = {
    "doom-pile":   ("Doom-Pile Ben", "clutching a crumpled envelope in front of a teetering paper pile, defiant and tired, one tiny sweat drop"),
    "spreadsheet": ("Spreadsheet Ben", "reading glasses pushed up on his forehead, lit by spreadsheet-green monitor glow, smug and principled"),
    "cowboy":      ("Cowboy Ben", "cowboy hat, serene carefree grin, sunglasses pushed up, visibly the happiest man alive"),
    "debt-free":   ("Debt-Free Ben", "calm and quietly glowing, faint golden aura, soft knowing smile, at peace"),
    "c-137":       ("Ben C-137", "thousand-yard stare, disheveled, faint smoke rising behind him, survivor energy"),
    "chad":        ("Chad Ben", "popped collar, yacht-club tan, mid-dismissive-wave, arrogant Next! energy"),
    "api":         ("API Ben", "relaxed, phone in hand mid-text, three small chat bubbles floating near his head"),
    "3am":         ("3 AM Ben", "dark circles under his eyes, blue phone-light on his face in a dark room, anxious but hopeful"),
    "demo":        ("Demo Ben", "presenting proudly at nothing, jazz hands, a single bead of imposter-syndrome sweat"),
    # Session 002 inductees
    "turtle":      ("Turtle Ben", "genuinely thrilled, holding up a phone showing a Day 1 streak, faint ghostly icons of abandoned productivity apps floating behind him"),
    "burnout":     ("Burnout Ben", "utterly exhausted, flat stare, wearing a plain t-shirt that reads I tried., holding a coffee that went cold hours ago"),
    # Session 003 inductees
    "narrative":   ("Narrative Ben", "holding an ornate quill, gazing slightly past the viewer as if reading his own caption, one eyebrow raised in editorial judgment"),
    "archive":     ("The Ben in the Archive", "slightly dusty and faded, a single cobweb on one shoulder, the infinitely patient expression of someone who has been waiting eighteen months to be read, a manila folder tab poking up behind his head"),
}

ATTEMPTS = 3          # retries per Ben when a response comes back imageless
PAUSE = 5             # seconds between calls; preview models have tight RPM


def save_portrait(slug: str, img: bytes) -> Path:
    """2K master to the archive, web-sized (512px) copy to public/ — the site
    displays portraits at ~64-112px, so serving 2K would just melt phones."""
    ARCHIVE.mkdir(parents=True, exist_ok=True)
    (ARCHIVE / f"{slug}.png").write_bytes(img)
    out = BENS_DIR / f"{slug}.png"
    try:
        from io import BytesIO
        from PIL import Image
        im = Image.open(BytesIO(img))
        im.thumbnail((512, 512), Image.LANCZOS)
        im.save(out, optimize=True)
    except ImportError:
        out.write_bytes(img)
        print("       (pillow missing — wrote full 2K to public/; pip install pillow to auto-websize)")
    return out


def image_config():
    """2K square output; falls back gracefully if this SDK build predates image_size."""
    try:
        return types.ImageConfig(aspect_ratio="1:1", image_size="2K")
    except TypeError:
        return types.ImageConfig(aspect_ratio="1:1")


def extract_image(resp) -> bytes | None:
    """The final (non-thought) image from a response. Thinking image models
    emit draft images inside their reasoning; those parts are flagged thought=True
    and we skip them — taking the last real image part."""
    out = None
    for cand in resp.candidates or []:
        for part in (cand.content.parts or []) if cand.content else []:
            if getattr(part, "thought", False):
                continue
            data = getattr(part, "inline_data", None)
            if data and data.data:
                out = data.data
    return out


def generate(client, base: bytes, base_mime: str, name: str, trait: str) -> bytes | None:
    contents = [
        types.Part.from_bytes(data=base, mime_type=base_mime),
        PROMPT.format(name=name, trait=trait),
    ]
    cfg = types.GenerateContentConfig(
        system_instruction=SYSTEM,
        response_modalities=["TEXT", "IMAGE"],
        image_config=image_config(),
        temperature=1.0,
    )
    for attempt in range(1, ATTEMPTS + 1):
        try:
            resp = client.models.generate_content(model=MODEL, contents=contents, config=cfg)
            img = extract_image(resp)
            if img:
                return img
            print(f"    attempt {attempt}: response had no final image, retrying...")
        except Exception as e:
            print(f"    attempt {attempt}: {e}")
        time.sleep(PAUSE)
    return None


def main():
    ap = argparse.ArgumentParser(description="Generate the Citadel of Bens roster.")
    ap.add_argument("slugs", nargs="*", help="specific Bens to generate (default: all)")
    ap.add_argument("--force", action="store_true", help="overwrite existing portraits")
    ap.add_argument("--list", action="store_true", help="print the roster and exit")
    args = ap.parse_args()

    if args.list:
        for slug, (name, trait) in ROSTER.items():
            print(f"{slug:12} {name}: {trait}")
        return

    unknown = [s for s in args.slugs if s not in ROSTER]
    if unknown:
        sys.exit(f"unknown slug(s): {', '.join(unknown)} — try --list")
    todo = args.slugs or list(ROSTER)

    base_path = next((p for p in BASE_CANDIDATES if p.exists()), None)
    if base_path is None:
        sys.exit(f"base portrait missing: {BASE_CANDIDATES[0]} (or .jpg/.webp)\n"
                 "Save the approved base cartoon Ben there first (see the plan doc).")
    base = base_path.read_bytes()
    base_mime = MIME[base_path.suffix.lower()]
    print(f"base: {base_path.name}")

    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        keyfile = Path.home() / ".gemini_api_key"
        if keyfile.exists():
            # utf-8-sig eats a Notepad BOM if present; strip whitespace and any
            # quotes that came along for the ride — only the key survives.
            raw = keyfile.read_text(encoding="utf-8-sig").strip()
            key = raw.splitlines()[0].strip().strip('"').strip("'")
    if not key:
        sys.exit("no GEMINI_API_KEY in the environment and no ~/.gemini_api_key file "
                 "— see the setup notes at the top of this script")
    client = genai.Client(api_key=key)
    BENS_DIR.mkdir(parents=True, exist_ok=True)

    done, failed = [], []
    for slug in todo:
        name, trait = ROSTER[slug]
        out = BENS_DIR / f"{slug}.png"
        if out.exists() and not args.force:
            print(f"[skip] {out.name} exists (use --force to re-roll)")
            continue
        print(f"[gen ] {name} -> {out.name}")
        img = generate(client, base, base_mime, name, trait)
        if img:
            saved = save_portrait(slug, img)
            done.append(saved.name)
            print(f"       saved {saved.stat().st_size // 1024} KB (2K master archived)")
        else:
            failed.append(slug)
            print("       FAILED after retries")
        time.sleep(PAUSE)

    print(f"\n{len(done)} written: {', '.join(done) if done else '-'}")
    if failed:
        print(f"{len(failed)} failed (re-run just these): "
              f"py scripts/generate_bens.py --force {' '.join(failed)}")


if __name__ == "__main__":
    main()
