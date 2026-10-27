// Reproduction guard for the CBSE 10 First Flight poem chapters ch18–ch22 (english-literature).
// The shared ch02 lib.mjs has no forbidden-phrase list, so each chapter's build.mjs calls checkForbidden()
// after build(): it scans every string of release.json and tests.json, and every line of README.md, for a
// short list of distinctive phrases of the poem (each 4 words or fewer, never a whole line) and fails the
// build on any hit. Matching ignores case and punctuation, and works on whole words.
import fs from 'node:fs';
import path from 'node:path';

const norm = (s) => ` ${s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z']+/g, ' ').replace(/\s+/g, ' ').trim()} `;

function strings(v, p, out) {
  if (typeof v === 'string') out.push([p, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => strings(x, `${p}[${i}]`, out));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) strings(x, `${p}.${k}`, out);
  return out;
}

/** Fails the build (exitCode 1) if any forbidden phrase appears in the chapter's files. */
export function checkForbidden(dir, list) {
  for (const f of list) if (f.trim().split(/\s+/).length > 4) throw new Error(`guard entry longer than 4 words: ${f}`);
  const phrases = list.map(norm);
  const all = [
    ...strings(JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8')), 'release', []),
    ...strings(JSON.parse(fs.readFileSync(path.join(dir, 'tests.json'), 'utf8')), 'tests', []),
  ];
  const readme = path.join(dir, 'README.md');
  if (fs.existsSync(readme)) fs.readFileSync(readme, 'utf8').split(/\n/).forEach((l, i) => all.push([`README:${i + 1}`, l]));
  const hits = [];
  for (const [p, s] of all) {
    const t = norm(s);
    phrases.forEach((f, i) => { if (t.includes(f)) hits.push(`guard entry ${i + 1} at ${p}`); });
  }
  if (hits.length) {
    console.log(`REPRODUCTION GUARD (${hits.length}):\n  ` + hits.join('\n  '));
    process.exitCode = 1;
  } else console.log(`REPRODUCTION GUARD: 0 hits (${list.length} entries)`);
  return hits.length;
}
