// Build ICSE 10 Biology ch05 Photosynthesis:
//   npx tsx content/authored/biology/icse-10-biology-ch05/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(5, 'Photosynthesis');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10051,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['raw-mcq', 'grana-mcq', 'destarch-mcq', 'remove-co2-mcq', 'oxygen-ar', 'photo-term', 'odd-starch', 'reason-boil', 'grana-stroma-short'],
      B: [['starch-case', 'vari-case']],
    },
    long: {
      A: ['o2-source-mcq', 'fix-mcq', 'palisade-mcq', 'alcohol-mcq', 'koh-mcq', 'decomposer-mcq', 'dark-ar', 'destarch-term', 'odd-light', 'reason-veins', 'test-fill5', 'chloro-match5'],
      B: [['screen-case', 'moll-case', 'hydrilla-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Definition, balanced equation and significance of photosynthesis; chloroplast structure and stomata; the light phase (activation of chlorophyll, photolysis, oxygen, ATP, NADPH); the dark phase in outline (detailed dark-reaction equations are a removed topic and are not taught or asked); leaf adaptations; destarching, the starch test and the light, carbon dioxide (potassium hydroxide), chlorophyll and hydrilla oxygen experiments; the carbon cycle, checked against the ICSE 2027 Biology syllabus (Class X) — see README "Verifier pass"',
    counting_rules: 'Atom counts of the balanced equation and hydrilla bubble rates, ratios and percentage rise are computed by src/calc.mjs (bubble counts imagined), not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; 5-blank fill-in passages from a word list; a 5-pair lettered-diagram match; 10-mark experiment-based case questions (starch test, light screen, Moll\'s half-leaf with potassium hydroxide, variegated leaf, hydrilla, carbon cycle); chapter tests on icse-10-biology-chapter-test-short / -long',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
