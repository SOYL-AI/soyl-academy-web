// Reproduction guard for the Footprints without Feet chapters (ch27–ch30), used after lib.mjs build().
// The shared ch02 lib.mjs has no forbidden-phrase list, so this module adds one without changing it.
// Each chapter passes SHORT distinctive phrases (at most four words each) that must not appear in any
// student- or reviewer-facing string. No passage of the text is held here or anywhere else (Lead, D-025).
// The check is case-insensitive and runs over release.json, tests.json and README.md.
import fs from 'node:fs';
import path from 'node:path';

export function checkForbidden(dir, phrases) {
  const bad = phrases.filter((p) => p.trim().split(/\s+/).length > 4);
  if (bad.length) throw new Error(`guard phrases must be four words or fewer: ${bad.join(' | ')}`);
  const files = ['release.json', 'tests.json', 'README.md'].map((f) => path.join(dir, f)).filter((f) => fs.existsSync(f));
  const hits = [];
  for (const f of files) {
    // Flatten markdown emphasis and JSON escapes so a phrase split by * or \n is still caught.
    const text = fs.readFileSync(f, 'utf8').replace(/\\n/g, ' ').replace(/[*_]/g, '').replace(/\s+/g, ' ').toLowerCase();
    for (const p of phrases) {
      const needle = p.toLowerCase();
      let i = text.indexOf(needle);
      while (i !== -1) {
        hits.push(`${path.basename(f)}: guard phrase #${phrases.indexOf(p) + 1} at offset ${i}`);
        i = text.indexOf(needle, i + 1);
      }
    }
  }
  if (hits.length) {
    console.log(`GUARD (${hits.length}):\n  ` + hits.join('\n  '));
    process.exitCode = 1;
  } else console.log(`GUARD: 0 of ${phrases.length} guard phrases found`);
  return hits;
}
