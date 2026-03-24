---
description: Update the /now page — add, remove, or replace games, shows, and artists
---

You are helping the user update their "now" page at `src/pages/now.astro`.

## How the now page works

The file `src/pages/now.astro` has three data arrays in its frontmatter:
- `games` — what they're playing (fields: `name`, `img`, `note`)
- `shows` — what they're watching (fields: `name`, `img`)
- `artists` — what they're listening to (fields: `name`, `img`)

There is also a `lastUpdated` string at the top (e.g., `'March 2026'`).

Images live in `public/images/now/` and are referenced as `/images/now/<filename>`.

## Your workflow

1. **Read** `src/pages/now.astro` to see the current state.
2. **Ask the user** what they want to change. Present the current entries in a clear list so they can reference them easily. For example:
   ```
   🎮 Playing: Arc Raiders, Silksong, Rocket League, Khazan, Brotato, Hades II
   📺 Watching: One Battle After Another, Pluribus, Fallout, What We Do in the Shadows
   🎧 Listening: Washed Out, Panda Bear, MF DOOM, Gorillaz
   ```
   Then ask: "What would you like to update?"
3. **Apply changes** to the frontmatter arrays in `now.astro` based on their instructions:
   - **Adding**: Add the new entry to the appropriate array. For the image, **search the web and download an appropriate image automatically** — use promotional art, cover art, posters, or press photos from official/public sources. Save it to `public/images/now/` with a kebab-case filename (e.g., `elden-ring.jpg`). Use `curl -L -o` to download. Resize or convert if needed. Only ask the user for an image if you truly cannot find one.
     - **Games**: Search for the Steam header/capsule image or official key art.
     - **Shows**: Search for the official poster art (portrait orientation preferred for the 2:3 aspect ratio).
     - **Artists**: Search for a square artist photo or album cover.
   - **Removing**: Remove the entry from the array. Also delete the image file from `public/images/now/` unless the user says to keep it.
   - **Replacing/reordering**: Modify the array as requested.
   - **Editing notes**: Update the `note` field on game entries.
4. **Update `lastUpdated`** to the current month and year.
5. **Show a summary** of all changes made.

## Rules
- Only modify the frontmatter data arrays and `lastUpdated` — never touch the template markup below the `---` closing fence.
- Keep the formatting style consistent with existing entries (aligned columns, single quotes, etc.).
- When downloading images from URLs, save them with descriptive kebab-case filenames.
- If the user provides arguments after the command, treat them as their update instructions and skip step 2.

$ARGUMENTS
