// Build ICSE 10 Biology ch06 Chemical Coordination in Plants:
//   npx tsx content/authored/biology/icse-10-biology-ch06/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(6, 'Chemical Coordination in Plants');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10066,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['tropism-mcq', 'tendril-mcq', 'pollen-mcq', 'pipe-mcq', 'ethylene-ar', 'apical-term', 'odd-tropism', 'reason-weed', 'promote-short'],
      B: [['pea-case', 'window-case']],
    },
    long: {
      A: ['clinostat-mcq', 'leaffall-mcq', 'weedicide-mcq', 'germinate-mcq', 'coconut-mcq', 'seedless-mcq', 'phototropism-ar', 'pgr-term', 'odd-promoter', 'odd-stimulus', 'passage2-fill5', 'hormone-match5'],
      B: [['cutting-case', 'coleoptile-case', 'sieve-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Plant growth regulators (auxins, gibberellins, cytokinins, abscisic acid, ethylene: effects, promoters and inhibitors, apical dominance, uses) and tropic movements (phototropism, geotropism, hydrotropism, thigmotropism, chemotropism; positive and negative; unequal auxin distribution; coleoptile, clinostat and sieve experiments) checked against the ICSE 2027 Biology syllabus (Class X, Plant Physiology) — see README "Verifier pass"',
    counting_rules: 'Heights, rooting and greening percentages and ripening days in the experiments are computed by src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; a 5-blank fill-in passage from a word list; a 5-pair labelled-diagram match; 10-mark case questions opening with an experiment, a situation or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked; items in one test checked for stems that give away another item\'s answer — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
