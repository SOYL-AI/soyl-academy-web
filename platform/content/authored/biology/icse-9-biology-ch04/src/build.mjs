// Build ICSE 9 Biology ch04 Pollination and Fertilisation:
//   npx tsx content/authored/biology/icse-9-biology-ch04/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(4, 'Pollination and Fertilisation', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90044,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['rose-mcq', 'feathery-mcq', 'dicho-mcq', 'gen-mcq', 'ar-dicho', 'wind-short', 'journey-short'],
      B: [['sugar-long', 'vallis-long']],
    },
    long: {
      A: ['selfadv-mcq', 'windflower-mcq', 'selfster-mcq', 'double-mcq', 'endo-mcq', 'seed-mcq', 'papaya-mcq', 'ar-fert', 'selfcross-short', 'unisex-short', 'fruitseed-short', 'advantages-short', 'triple-short'],
      B: [['bagging-long', 'figure-long', 'seed-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Self- and cross-pollination, agents and flower adaptations (insect, wind, water), devices favouring cross-pollination, pollen tube, embryo sac, double fertilisation and triple fusion, fruit and seed, checked against the ICSE 2028 Biology syllabus Class IX (Flowering Plants) — see README "For a reviewer"',
    counting_rules: 'Fruit-set percentages, germination percentages, pollen ratios, tube growth times, ripening gaps and chromosome numbers are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd-one-out with category and give-reason items; a 5-pair lettered-diagram match; 10-mark structured questions in parts, one part a labelled diagram; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-04: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
