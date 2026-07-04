// Parsers for the Citadel of Bens canon files (see CITADEL_OF_BENS_PLAN.md).
//
// The transcripts are written by agents following the citadel-of-bens skill's
// session template, but two sessions in there's already healthy drift (bold
// speaker names with chamber parentheticals inside or outside the bold, vote
// tallies as bullets or as tables), so everything here is deliberately
// forgiving: unrecognized blocks fall through as plain paragraphs instead of
// breaking the page.

const SLUG_MAP = {
  'doom-pile ben': 'doom-pile',
  'spreadsheet ben': 'spreadsheet',
  'cowboy ben': 'cowboy',
  'debt-free ben': 'debt-free',
  'ben c-137': 'c-137',
  'chad ben': 'chad',
  'api ben': 'api',
  '3 am ben': '3am',
  '3am ben': '3am',
  'demo ben': 'demo',
  // Session 003 inductees — "The Ben in the Archive" needs the alias (the
  // auto rule would yield "the-in-the-archive"); Narrative Ben auto-slugs fine.
  'the ben in the archive': 'archive',
};

export function slugFor(name) {
  const key = name.toLowerCase().trim();
  if (SLUG_MAP[key]) return SLUG_MAP[key];
  // "Turtle Ben" -> "turtle", "Ben C-137" -> "c-137"
  return key
    .replace(/\bben\b/g, ' ')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function initials(name) {
  return name
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w))
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join('');
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Minimal inline markdown: code, bold, italic. Enough for the transcripts.
export function inline(s) {
  let h = esc(s);
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  h = h.replace(/\*([^*\n][^*]*)\*/g, '<em>$1</em>');
  return h;
}

// Paragraph blocks: consecutive non-empty lines joined with spaces; blank
// lines and --- separate. Keeps hard-wrapped prose as one block.
function blocks(lines) {
  const out = [];
  let cur = [];
  for (const raw of lines) {
    const l = raw.trim();
    if (!l || l === '---') {
      if (cur.length) out.push(cur.join(' '));
      cur = [];
    } else {
      cur.push(l);
    }
  }
  if (cur.length) out.push(cur.join(' '));
  return out;
}

function splitSections(raw) {
  const buf = { __head__: [] };
  let cur = '__head__';
  for (const l of raw.split(/\r?\n/)) {
    const h = l.match(/^##\s+(.+)$/);
    if (h) {
      cur = h[1].trim().toLowerCase();
      buf[cur] = [];
    } else {
      buf[cur].push(l);
    }
  }
  return buf;
}

function cleanSpeaker(bold) {
  // "⭐ Turtle Ben:" / "API Ben (Kyle's):" -> name + chamber
  let name = bold.replace(/⭐/g, '').replace(/:$/, '').trim();
  let chamber = null;
  const cm = name.match(/^(.*?)\s*\((.+?)\)$/);
  if (cm) {
    name = cm[1].trim();
    chamber = cm[2].trim();
  }
  return { name, chamber };
}

function testimonyItems(lines) {
  const items = [];
  for (const b of blocks(lines)) {
    if (b.startsWith('### ')) {
      items.push({ type: 'chamber', html: inline(b.slice(4)) });
    } else if (b.startsWith('*(') && b.endsWith(')*')) {
      items.push({ type: 'direction', html: inline(b) });
    } else {
      const sm = b.match(/^\*\*(.+?)\*\*\s*(.*)$/s);
      if (sm) {
        const { name, chamber } = cleanSpeaker(sm[1]);
        let rest = sm[2].trim();
        if (rest.startsWith(':')) {
          rest = rest.slice(1).trim();
        } else {
          // "*(standing up quietly)*: "..."" — keep the direction, drop the colon
          const im = rest.match(/^(\*\(.+?\)\*)\s*:\s*(.*)$/s);
          if (im) rest = `${im[1]} ${im[2]}`;
        }
        items.push({ type: 'line', name, chamber, slug: slugFor(name), html: inline(rest) });
      } else {
        items.push({ type: 'para', html: inline(b) });
      }
    }
  }
  return items;
}

function tableHtml(rows) {
  const cells = rows
    .filter((r) => !/^\|[\s\-:|]+\|$/.test(r))
    .map((r) => r.split('|').slice(1, -1).map((c) => c.trim()));
  if (!cells.length) return '';
  const [head, ...body] = cells;
  const tr = (r, tag) => `<tr>${r.map((c) => `<${tag}>${inline(c)}</${tag}>`).join('')}</tr>`;
  return `<table class="vote-table"><thead>${tr(head, 'th')}</thead><tbody>${body
    .map((r) => tr(r, 'td'))
    .join('')}</tbody></table>`;
}

function voteHtml(lines) {
  const html = [];
  let table = null;
  let list = null;
  const flush = () => {
    if (table) html.push(tableHtml(table));
    if (list) html.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</ul>`);
    table = null;
    list = null;
  };
  for (const raw of lines) {
    const l = raw.trim();
    if (!l || l === '---') {
      flush();
      continue;
    }
    if (l.startsWith('|')) {
      (table ??= []).push(l);
      continue;
    }
    if (l.startsWith('- ')) {
      (list ??= []).push(l.slice(2));
      continue;
    }
    flush();
    if (/^(\*\*)?Result\b/i.test(l)) html.push(`<p class="vote-result">${inline(l)}</p>`);
    else if (/^Motion:/i.test(l)) html.push(`<p class="vote-motion">${inline(l)}</p>`);
    else html.push(`<p>${inline(l)}</p>`);
  }
  flush();
  return html.join('\n');
}

function simpleHtml(lines) {
  const html = [];
  let list = null;
  const flush = () => {
    if (list) html.push(`<ul>${list.map((li) => `<li>${inline(li)}</li>`).join('')}</ul>`);
    list = null;
  };
  for (const b of blocks(lines)) {
    if (b.startsWith('- ')) {
      (list ??= []).push(b.slice(2));
    } else {
      flush();
      html.push(`<p>${inline(b)}</p>`);
    }
  }
  flush();
  return html.join('\n');
}

function seatedList(value) {
  if (!value) return [];
  return value
    .replace(/\*\(.*?\)\*/g, '')
    .split(',')
    .map((s) => s.replace(/⭐/g, '').replace(/\(.*?\)/g, '').trim())
    .filter(Boolean)
    .map((name) => ({ name, slug: slugFor(name) }));
}

export function parseSession(raw, file) {
  const buf = splitSections(raw);
  const head = buf.__head__.join('\n');

  const titleLine = head.split('\n').find((l) => l.startsWith('# ')) || '';
  const tm = titleLine.match(/Session\s+0*(\d+)\s*:\s*(.+)$/i);
  const number = tm ? tm[1] : '';
  const topic = (tm ? tm[2] : titleLine.replace(/^#\s*/, '')).trim();

  const meta = {};
  for (const mm of head.matchAll(/^\*\*(.+?):\*\*\s*(.+)$/gm)) {
    meta[mm[1].trim().toLowerCase()] = mm[2].trim();
  }

  const payload = (buf['truth payload'] || [])
    .map((l) => l.trim())
    .filter((l) => l.startsWith('>'))
    .map((l) => l.replace(/^>\s?/, ''))
    .join(' ');

  // Deduped speaking cast, in order of first appearance (for the seat rail).
  const items = testimonyItems(buf['testimony'] || []);
  const cast = [];
  for (const it of items) {
    if (it.type === 'line' && !cast.some((c) => c.slug === it.slug)) {
      cast.push({ name: it.name, slug: it.slug });
    }
  }

  return {
    file,
    number,
    topic,
    date: meta['date'] || '',
    motion: (meta['motion'] || '').replace(/^"|"$/g, ''),
    chambers: meta['chambers'] || '',
    convenedBy: meta['convened by'] || '',
    seated: seatedList(meta['seated']),
    cast,
    items,
    voteHtml: voteHtml(buf['the vote'] || []),
    payloadHtml: payload ? inline(payload) : '',
    rulingHtml: simpleHtml(buf['ruling & plan'] || buf['ruling &amp; plan'] || []),
    inductionsHtml: simpleHtml(buf['inductions'] || []),
  };
}

export function parseRoster(raw) {
  const buf = splitSections(raw);
  const entries = [];
  for (const b of blocks(buf.__head__)) {
    const m = b.match(/^\*\*(.+?)\*\*\s*—\s*(.*)$/s);
    if (!m) continue;
    const name = m[1].trim();
    const body = m[2];
    const dm = body.match(/\*Debut:\s*([^*]+)\*/);
    entries.push({
      name,
      slug: slugFor(name),
      html: inline(body),
      debut: dm ? dm[1].trim().replace(/\.$/, '') : '',
    });
  }

  // "## Character development ledger" — bullets, each starting "- **Name** — ..."
  const ledgerLines = buf['character development ledger'] || [];
  const ledger = [];
  let cur = null;
  for (const raw2 of ledgerLines) {
    const l = raw2.trim();
    if (!l) continue;
    if (l.startsWith('- ')) {
      if (cur) ledger.push(inline(cur));
      cur = l.slice(2);
    } else if (cur) {
      cur += ` ${l}`;
    }
  }
  if (cur) ledger.push(inline(cur));

  return { entries, ledger };
}
