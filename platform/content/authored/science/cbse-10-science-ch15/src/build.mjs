// Build ch15 Evolution: npx tsx content/authored/science/cbse-10-science-ch15/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-10-science-ch06/src/lib.mjs';

setChapter(15, 'Evolution');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 15,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['acq-def-mcq', 'isolation-mcq', 'homologous-pick-mcq', 'chimp-ar'],
      B: ['acquired-short', 'organs-short', 'speciation-short'],
      C: ['human-long', 'evidence-long'],
      D: ['grasshopper-case'],
    },
    long: {
      A: ['inherited-mcq', 'mice-mcq', 'selection-mcq', 'drift-example-mcq', 'gene-flow-mcq', 'analogous-mcq', 'fossil-age-mcq', 'cabbage-mcq', 'acq-ar', 'homolog-ar'],
      B: ['factors-short', 'dating-short', ['drift-selection-short', 'molecular-short'], 'relationship-short', ['eye-short', 'cabbage-short']],
      C: ['speciation-long', ['acquired-long', 'fossils-long']],
      D: ['fossil-case', 'cabbage-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Acquired vs inherited traits (germ-cell DNA), natural selection, genetic drift, speciation and reproductive isolation, homologous vs analogous organs, fossil dating (half-life arithmetic re-solved), Archaeopteryx and feathers, eye evolution in stages, artificial selection from wild cabbage, molecular phylogeny, human origins (common ancestor with chimpanzees, Homo sapiens from Africa, one species) — checked against the 2026-27 syllabus scope and current science (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-27: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
    assessment: 'Formative-only chapter (syllabus board_assessed: false): content is for internal assessment, activities and projects; the chapter tests follow the default chapter-test blueprints for practice.',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
