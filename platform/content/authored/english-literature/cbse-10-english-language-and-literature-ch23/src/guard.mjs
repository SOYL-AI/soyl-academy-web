// Reproduction guard for the Footprints without Feet chapters ch23–ch26 (D-036). The English ch02 lib.mjs
// has no setForbidden, and that shared builder stays unchanged, so this runs after build(). It holds a list of
// SHORT distinctive phrases only (at most 4 words each). No story text is reconstructed anywhere.
// A guard phrase found in release.json, tests.json or README.md fails the build (process.exitCode = 1).
import fs from 'node:fs';
import path from 'node:path';

const norm = (s) => s.normalize('NFC').toLowerCase().replace(/[’‘`]/g, "'").replace(/\s+/g, ' ');

export function guard(dir, phrases) {
  const errs = [];
  for (const p of phrases) if (p.trim().split(/\s+/).length > 4) errs.push(`guard phrase longer than 4 words (D-036): ${p}`);
  const files = ['release.json', 'tests.json', 'README.md'].map((f) => path.join(dir, f)).filter((f) => fs.existsSync(f));
  for (const f of files) {
    const text = norm(fs.readFileSync(f, 'utf8').replace(/\\n/g, ' '));
    for (const p of phrases) if (text.includes(norm(p))) errs.push(`REPRODUCTION guard phrase "${p}" in ${path.basename(f)}`);
  }
  if (errs.length) {
    console.log(`GUARD ERRORS (${errs.length}):\n  ` + errs.join('\n  '));
    process.exitCode = 1;
  } else console.log(`GUARD: ${phrases.length} phrase(s), none found`);
}
