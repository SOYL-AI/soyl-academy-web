// Build ISC 12 Chemistry ch09 Potassium Permanganate and Potassium Dichromate: npx tsx content/authored/chemistry/isc-12-chemistry-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(9, 'Potassium Permanganate and Potassium Dichromate');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2209,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['shape-mcq', 'hcl-mcq', 'kcl-mcq', 'so2-mcq', 'magnet-ar'],
      B: ['hcl-short', ['neutral-short', 'ph-short']],
      C: ['media-short3', ['disprop-short3', 'cr-eq-short3']],
      D: ['cr-long'],
    },
    long: {
      A: ['ct-mcq', 'heat-mcq', 'electrolytic-mcq', 'oxalic-warm-mcq', 'alk-ki-mcq', 'h2s-mcq', 'chromite-mcq', 'bridge-mcq', 'fe-ratio-mcq', 'diphenyl-mcq', 'acid-ar', 'redox-ar'],
      B: ['prep-short', 'autocat-short', ['prep2-short', 'so2-short']],
      C: ['purity-short3', 'acid-eq-short3', 'chromite-short3', ['compare-short3', 'fe-wire-short3']],
      D: ['kmno4-long', ['titr-long', 'k2cr2o7-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Preparations of KMnO₄ and K₂Cr₂O₇, structures of their anions, every ionic equation (balanced for atoms and charge) and every titration numerical checked against the ISC 2027 syllabus (Unit 4)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
