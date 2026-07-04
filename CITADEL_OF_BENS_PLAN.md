# Citadel of Bens — batkins.dev section plan

> **Status update (2026-07-04):** built and published as **The Council of Bens**
> at `/council` (Ben renamed the property; the internal `citadel` file/dir names
> below are unchanged legacy). The canon's source of truth is now the private
> git repo `Batkins44/council-of-bens` — the skill folder path this doc
> references is that repo's working copy, so the sync flow below still works
> as written. The council-admin app this section might have grown into was
> killed by citadel review — see `COUNCIL_ADMIN_PLAN.md` in
> `C:\Users\benja\Lab\Council of Bens\`.

**Date:** 2026-07-03
**Status:** approved concept ("Hell the fuck yes"), not yet built
**Prereqs that already exist:** the `citadel-of-bens` skill and its canon
(`~/.claude/skills/citadel-of-bens/canon/`) — 9 founding Bens in `ROSTER.md`,
Session 001 (ledger-admin) in `sessions/`, and a machine-parseable transcript
format designed specifically so this site can ingest it.

## The concept

A section of batkins.dev where the multiverse council of alternate Ben Atkinses
lives in public: a roster gallery of the Bens (Rick-and-Morty-style original
character portraits) and a "table read" player that replays citadel sessions as
animated dialogue — each Ben's head pops up when he speaks. Every future
citadel session run by the household agents automatically becomes new site
content, because the canon *is* the CMS.

## Content source: the canon

Source of truth stays in the skill folder (sessions get written there by
Claude/Kyle/Jim during citadel runs):

```
~/.claude/skills/citadel-of-bens/canon/
├── ROSTER.md              # every Ben: bio, shtick, running gags, debut
└── sessions/
    └── 001-ledger-admin.md
```

Session files follow a strict, parseable shape (don't drift from it — the
parser depends on it):

- `# Citadel of Bens — Session NNN: <Topic>` + a `**Key:** value` header block
- `## Testimony` — dialogue as `**<Ben name>:** "<line>"`, stage directions as
  standalone `*(italic)*` lines
- `## The Vote` — motion, `Result: N yes / N no / N abstain`, attributed votes
- `## Truth Payload` — a single blockquote
- `## Ruling & Plan`, `## Inductions` (⭐ marks new Bens)

## Site architecture (this repo: Astro 5)

1. **Sync script** — `scripts/sync-citadel.mjs`, run as `npm run sync-citadel`
   (and as a `prebuild` step): copies `ROSTER.md` + `sessions/*.md` from the
   canon folder into `src/content/citadel/`. The canon folder is the writer's
   desk; the repo copy is what deploys. (Committing the synced copies keeps CI
   builds working without access to `~/.claude`.)
2. **Parser** — small build-time module that turns a session file into JSON:
   `{ meta, lines: [{ speaker, text, direction? }], vote, truthPayload,
   inductions }`. Speaker names map to portrait slugs (`Doom-Pile Ben` →
   `doom-pile`).
3. **Pages:**
   - `src/pages/citadel/index.astro` — the roster gallery (portrait, name, bio,
     running gag, debut) + session list.
   - `src/pages/citadel/[session].astro` — the table-read player for one
     session.
4. **Progressive enhancement:** the session page renders the full transcript as
   plain HTML first (readable with zero JS, good for SEO/RSS), and the player
   script upgrades it into the animated table read.

## The table-read player

- Line-by-line reveal: click / space / autoplay-with-delay advances the script.
- When a Ben speaks, his portrait **pops in** at the side of the line — springy
  CSS keyframe (scale 0 → 1.08 → 1, ~250ms). The previous speaker's head dims.
- Stage directions render as italic interstitials — no portrait, slight pause.
- `## The Vote` renders as a tally card (yes/no/abstain chips per Ben).
- `## Truth Payload` is the payoff: bigger type, no decoration, no jokes.
- `prefers-reduced-motion`: pop-ins become simple fades; autoplay defaults off.
- Empty-seat fallback: a silhouette portrait (`_unknown.png`) for any speaker
  without art yet, so new inductees never break a session page.

## Art pipeline (Gemini + reference headshots)

Ben's established AI avatar turned out to be **video-only** (Gemini limitation),
so still portraits use reference headshots instead — and the avatar isn't
wasted: video-only makes it exactly the right tool for the **v2 idle loops**
(see roadmap). Per-Ben pipeline, two steps for consistency:

1. **Base cartoon Ben (once).** Attach 1–2 headshots (one front-facing, one
   ~3/4 angle; well lit, plain background, no hat/sunglasses — same photos
   every time) and generate a neutral cartoon Ben with the style clause only,
   no traits. Iterate until it looks right. This image becomes the master
   reference.
2. **Variants (nine times).** Attach the **base cartoon Ben image** (not the
   photos) and apply one trait clause. Deriving every variant from the same
   cartoon locks identity AND art style across the whole roster — much more
   consistent than re-deriving each Ben from photographs.
3. Output spec: head-and-shoulders bust, facing slightly toward center, flat
   colors, thick outlines, **plain solid background** (easy programmatic
   removal → transparent PNG), ~800×800.
4. Files: `public/citadel/bens/<slug>.png` (`doom-pile.png`, `cowboy.png`, ...).

**Step-1 prompt (with headshots attached):**

> Turn the man in the attached photos into an original cartoon character:
> portrait bust in a wobbly 2D adult sci-fi cartoon style — thick uneven
> outlines, flat colors, slightly unhinged energy, like a council member in a
> multiverse citadel. Keep his recognizable likeness (hair, face shape, build).
> Neutral friendly expression. Head and shoulders only, facing slightly left,
> plain solid light-gray background, no text.

**Step-2 prompt template (with the base cartoon attached):**

> Keep this exact cartoon character and this exact art style. Now he is
> **[BEN VARIANT]: [trait clause]**. Head and shoulders only, same framing,
> plain solid light-gray background, no text.

**Status note (2026-07-03):** step 1 succeeded on the first run — base cartoon
Ben approved (sci-fi council uniform, cyan accents, a two-interlocking-circles
chest emblem that is hereby a candidate for the official Citadel seal). Ben is
re-running the base seriously in Google AI Studio; then proceed to step 2. Save
the master as `public/citadel/bens/_base.png`.

**AI Studio setup (Nano Banana Pro / gemini-3-pro-image):** 10 clean modern
reference photos (no hats/sunglasses/filters) · Grounding with Google Search
**OFF** (factual tool; pulls toward photoreal) · aspect ratio **1:1** (not
Auto) · resolution 2K · temperature 1, generate 3–4 candidates and pick · when
the winner lands, use **Get code** and save the exact prompt + settings next to
the image for reproducing the other nine.

**System instructions (pin the style; prompt box carries only content):**

> You are a character designer creating a consistent original cartoon cast.
> House style, applied to every image: wobbly 2D adult sci-fi cartoon, thick
> uneven outlines, flat colors, no gradients except subtle cyan glow accents,
> slightly unhinged energy. Framing is always a head-and-shoulders portrait
> bust on a plain solid light-gray background, no text, no watermark, no logo
> except the character's own costume details. The recurring character is
> "Ben": keep his exact likeness (hair, hairline, red-brown beard, face shape,
> build) identical across every request. He wears a futuristic council
> uniform — dark gray armor-panelled with cyan accent lights and an
> interlocking double-circle chest emblem. Only the traits explicitly
> requested in the prompt may change between images.

With the system instructions in place, the step-1 prompt shrinks to: "Turn the
man in the attached photos into the cartoon character Ben, per the house
style. Neutral friendly expression, facing slightly left." — and each step-2
variant is just the base image + one trait clause.

**Step 2 is automated:** `scripts/generate_bens.py` hits the API directly
(which also sidesteps the AI Studio preview quirk where the final image gets
stranded in the model's thoughts — the API response contains it plainly, and
the script skips `thought=True` draft parts). It reads
`public/citadel/bens/_base.png`, applies each trait clause under the same
system instructions, and writes all nine portraits at 2K. Needs
`py -m pip install google-genai` and `GEMINI_API_KEY` in the environment;
supports per-slug re-rolls with `--force <slug>`. The script's SYSTEM constant
mirrors the system-instructions block above — change one, change both.

**On using old photos (age ~19):** funny, but don't make young Ben the master
reference — every variant would inherit the wrong era. The right move: current
Ben stays the base, and **19-Year-Old Ben** becomes his own variant awaiting
induction at a future session (his portrait can derive from the old photos +
the base style). The multiverse doesn't average timelines; it seats them
separately.

**Trait clauses for the founding nine:**

| Slug | Ben | Trait clause |
| --- | --- | --- |
| `doom-pile` | Doom-Pile Ben | clutching a crumpled envelope in front of a teetering paper pile, defiant and tired, one tiny sweat drop |
| `spreadsheet` | Spreadsheet Ben | reading glasses pushed up, lit by spreadsheet-green monitor glow, smug and principled |
| `cowboy` | Cowboy Ben | cowboy hat, serene carefree grin, sunglasses pushed up, visibly the happiest man alive |
| `debt-free` | Debt-Free Ben | calm and quietly glowing, faint golden aura, soft knowing smile, at peace |
| `c-137` | Ben C-137 | thousand-yard stare, disheveled, faint smoke rising behind him, survivor energy |
| `chad` | Chad Ben | popped collar, yacht-club tan, mid-dismissive-wave, "Next!" energy |
| `api` | API Ben | relaxed, phone in hand mid-text, three small chat bubbles floating near his head |
| `3am` | 3 AM Ben | dark circles, blue phone-light on his face in a dark room, anxious but hopeful |
| `demo` | Demo Ben | presenting proudly at nothing, jazz hands, a single bead of imposter-syndrome sweat |

**Style/legal line:** original characters in a style *homage* — never actual
Rick and Morty characters, assets, or logos on the site.

## Roadmap

- **v1: BUILT 2026-07-03** — roster gallery + table-read player, live for both
  sessions. What exists: `scripts/sync-citadel.mjs` (+ `npm run sync-citadel`),
  `src/lib/citadel.mjs` (forgiving parser for both session formats),
  `src/pages/citadel/index.astro` (sessions, roster, development ledger),
  `src/pages/citadel/[session].astro` (transcript + beat-by-beat table read,
  speaking-Ben highlight/pop, vote table, truth payload, reduced-motion
  fallback, works with JS off). Portraits web-sized to 512px (~250 KB each);
  2K masters + the calm alt set archived in `art-archive/` (gitignored —
  masters are the future Veo seed frames). New-session flow: convene citadel →
  `npm run sync-citadel` → build.
  Punch list before announcing: portraits for Turtle Ben + Burnout Ben
  (`--force` won't help — they need trait clauses added to
  `scripts/generate_bens.py`'s ROSTER dict), decide idle-vs-speaking dual-state
  sets (player already supports `public/citadel/bens/live/<slug>.png`), header
  nav link, commit + deploy.
- **v1.1:** auto-ingest every new session; nav link; OG images per session.
- **v2 (garnish):** idle loops per Ben (blink/sway) behind the pop-ups, made
  **image-to-video**: feed each approved portrait to Veo as the seed frame and
  ask for a subtle 2–4s loop. Locking the stills first is what makes the video
  good — Ben tested avatar-direct video (mediocre) vs. image gen (excellent),
  so the portraits are the source of truth and video derives from them. Sound
  design; maybe TTS voices per Ben.

## Division of labor (proposed)

- **Ben:** generates portraits with his avatar + the prompt table above.
- **Claude Code:** sync script, parser, pages, player, styles — in this repo,
  normal PR flow.
- **Kyle/Jim:** keep convening citadel sessions; their transcripts are the
  content pipeline working as designed.
