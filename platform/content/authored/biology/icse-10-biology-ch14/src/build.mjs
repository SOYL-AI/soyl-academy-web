// Build ICSE 10 Biology ch14 Population:
//   npx tsx content/authored/biology/icse-10-biology-ch14/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(14, 'Population');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10141,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['deathfall-mcq', 'br-def-mcq', 'percapita-mcq', 'vasectomy-mcq', 'medicine-ar', 'explosion-term', 'odd-problems', 'reason-terminal', 'vas-tub-short'],
      B: [['town-case', 'surgery-case']],
    },
    long: {
      A: ['notcause-mcq', 'density-mcq', 'gr-mcq', 'forest-mcq', 'tubectomy-mcq', 'after-vas-mcq', 'growth-ar', 'deathrate-term', 'odd-causes', 'reason-jobs', 'demo-fill5', 'surgery-match5'],
      B: [['stages-case', 'india-case', 'percapita-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Population explosion and its causes; demography, density, birth rate, death rate and growth rate; problems of population explosion (unemployment, over-use of resources, per capita income, price rise, pollution, unequal wealth); need for control; vasectomy and tubectomy, checked against the ICSE 2027 Biology syllabus (Class X). Real figures are limited to dated Census of India counts (1951–2011) and approximate UN world milestones (1804–2022) — see README "For a reviewer"',
    counting_rules: 'Birth, death and growth rates, densities, per capita incomes, census rises and percentages and the years between world milestones are computed by src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; 5-blank fill-in passages from a word list; a 5-pair lettered-diagram match; 10-mark case questions opening with a situation, a data table or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
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
