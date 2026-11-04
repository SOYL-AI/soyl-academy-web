// Build ICSE 9 Biology ch09 Nutrition: Food and Balanced Diet:
//   npx tsx content/authored/biology/icse-9-biology-ch09/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(9, 'Nutrition: Food and Balanced Diet', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90099,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['goitre-mcq', 'night-mcq', 'kwash-mcq', 'sodium-mcq', 'ar-vitd', 'iron-short', 'vit-three'],
      B: [['meal-long', 'diet-long']],
    },
    long: {
      A: ['protein-mcq', 'carbsrc-mcq', 'beri-mcq', 'vitk-mcq', 'solub-mcq', 'vitsrc-mcq', 'bal-mcq', 'ar-fat', 'vitA-short', 'vitD-short', 'rough-short', 'plate-draw', 'diet-three'],
      B: [['mineral-long', 'child-long', 'water-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Functions and sources of carbohydrates, fats, proteins and water; calcium, iodine, iron and sodium; vitamins A, B1, C, D and K with sources, functions and deficiency diseases; balanced diet and cellulose as roughage; kwashiorkor and marasmus, checked against the ICSE 2028 Biology syllabus Class IX (Human Anatomy and Physiology: nutrition) — see README "For a reviewer"',
    counting_rules: 'Energy of meals, body water, calcium in milk, vitamin clinic counts, fibre and the ward of undernourished children are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd-one-out with category and give-reason items; a 5-blank fill-in; a lettered-diagram match; 10-mark structured questions in parts, one part a labelled diagram, graph or flow diagram; chapter tests on icse-9-default-chapter-test-short / -long',
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
