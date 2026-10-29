// Build ch06 Haloalkanes and Haloarenes: npx tsx content/authored/chemistry/cbse-12-chemistry-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(6, 'Haloalkanes and Haloarenes');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1206,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'markov-mcq', 'sn2-order-mcq', 'sn-ar'],
      B: ['name-short', 'elim-short', 'sn1sn2-short3'],
      C: ['sn-long', 'reactions-long'],
      D: ['kinetics-case'],
    },
    long: {
      A: ['cx-bond-mcq', 'finkel-mcq', 'sandmeyer-mcq', 'density-mcq', 'kcn-mcq', 'racemic-mcq', 'saytzeff-mcq', 'chcl3-mcq', 'peroxide-ar', 'solubility-ar'],
      B: ['chiral-short', 'poly-short', ['pdcb-short', 'grignard-short'], 'prep-short3', ['haloarene-short3', 'conversion-short3']],
      C: ['prep-long', ['haloarene-long', 'poly-long']],
      D: ['anaesthetic-case', 'ozone-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Classification and names, C–X bond data, preparations, physical properties, SN1/SN2, elimination, metal reactions, haloarene reactivity and polyhalogen compounds checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
