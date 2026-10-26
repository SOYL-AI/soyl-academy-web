// Build ch09 Light – Reflection and Refraction: npx tsx content/authored/science/cbse-10-science-ch09/src/build.mjs [--dump]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-10-science-ch06/src/lib.mjs';

setChapter(9, 'Light – Reflection and Refraction');
const { deck1, deck2, deck3, deck4 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 9,
  decks: [deck1, deck2, deck3, deck4],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['torch-mcq', 'pencil-mcq', 'power-sign-mcq', 'negative-m-ar'],
      B: ['terms-short', 'power-short', 'mirror-calc-short'],
      C: ['concave-long', 'lens-long'],
      D: ['hillroad-case'],
    },
    long: {
      A: ['enlarged-real-mcq', 'screen-mcq', 'm-meaning-mcq', 'object-for-m-mcq', 'slab-mcq', 'slowest-mcq', 'magnifier-mcq', 'identify-lens-mcq', 'convex-ar', 'n-less-ar'],
      B: ['sign-short', 'coin-short', ['laws-refraction-short', 'concave-lens-ray-short'], 'speed-short', ['lens-calc-short', 'contact-short']],
      C: ['refraction-long', ['convex-long', 'shaving-long']],
      D: ['mirror-lab-case', 'loupe-case'],
    },
  },
  checksExtra: {
    optics_resolve: 'Every mirror/lens numerical, numeric MCQ, case value and ray diagram recomputed from the givens with the New Cartesian sign convention by an independent script (mirrorImage/lensImage); ray diagrams are generated from the same formulas so all rays meet at the computed image',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-26: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
