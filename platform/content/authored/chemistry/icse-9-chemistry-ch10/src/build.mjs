// Build ICSE 9 Chemistry ch10 Hydrogen: Position, Sources and Preparation:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch10/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(10, 'Hydrogen: Position, Sources and Preparation', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91010,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['pos-mcq3', 'a-mcq3', 'a-mcq4', 'b-mcq3', 'ar-bosch', 'b-short2a', 'pos-short3'],
      B: [['metal-water-long', 'lab-long']],
    },
    long: {
      A: ['pos-mcq1', 'pos-mcq2', 'w-mcq1', 'w-mcq6', 'w-mcq2', 'l-mcq1', 'l-mcq2', 'ar-steam', 'l-short2a', 'pos-short2b', 'l-short2b', 'l-short3', 'a-short3'],
      B: [['alkali-long', 'bosch-long', 'steam-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Position of hydrogen, hydrogen from water, steam, dilute acids and alkalis, the laboratory preparation with its collection, impurities and precautions, and the Bosch process, checked against the ICSE 2028 Chemistry syllabus Class IX (Study of the First Element - Hydrogen) — see README "For a reviewer". Electrolysis as a laboratory method (removed topic) is not taught or asked',
    counting_rules: 'Every equation is atom-balanced in src/calc.mjs (salts such as Na2ZnO2 are also charge-checked) and every count of atoms and molecules taken from an equation is computed there, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark balanced equations, names and terms; 2-mark counts from equations; a 5-pair match; 10-mark structured questions in parts, two with lettered diagrams; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-05: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
