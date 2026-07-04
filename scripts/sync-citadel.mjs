// Sync the Citadel of Bens canon (roster + session transcripts) into the site.
//
// The canon's source of truth lives with the citadel-of-bens skill, where the
// household agents append sessions; this copies it into src/data/citadel/ so
// the site builds from committed files (CI never needs access to ~/.claude).
// Run before building whenever a new session has been convened:
//
//   npm run sync-citadel
//
// No canon folder (CI, another machine) -> exits quietly, committed copies win.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const canon = process.env.CITADEL_CANON
  || path.join(os.homedir(), '.claude', 'skills', 'citadel-of-bens', 'canon');
const dest = path.resolve('src/data/citadel');

if (!fs.existsSync(canon)) {
  console.log(`[sync-citadel] no canon at ${canon} — keeping committed copies`);
  process.exit(0);
}

fs.mkdirSync(path.join(dest, 'sessions'), { recursive: true });

const copy = (from, to) => {
  fs.copyFileSync(from, to);
  console.log(`[sync-citadel] ${path.relative(process.cwd(), to)}`);
};

copy(path.join(canon, 'ROSTER.md'), path.join(dest, 'ROSTER.md'));
const sessions = path.join(canon, 'sessions');
for (const f of fs.readdirSync(sessions).filter((f) => f.endsWith('.md'))) {
  copy(path.join(sessions, f), path.join(dest, 'sessions', f));
}
