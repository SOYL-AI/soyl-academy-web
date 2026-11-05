// Build ICSE 9 Chemistry ch09 The Periodic Table:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch09/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(9, 'The Periodic Table', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 99009,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['d-mcq1', 'g-mcq2', 'g-mcq4', 'd-mcq4', 'ar-octave', 'd-short2b', 'g-short3'],
      B: [['mendeleev-long', 'groups-long']],
    },
    long: {
      A: ['m-mcq5', 'a-mcq1', 'g-mcq1', 'g-mcq3', 'f-mcq5', 'f-mcq3', 'f-mcq7', 'ar-gaps', 'm-short2', 'a-short2', 'f-short2a', 'm-short3', 'f-short3b'],
      B: [['triad-long', 'position-long', 'table-long']],
    },
  },
  checksExtra: {
    chemistry_facts: "Dobereiner's triads with computed mean masses, Newlands' law of octaves, Mendeleev's periodic law with merits and limitations, atomic number and the modern periodic law, the modern table (groups, periods, transition and inner transition elements, position from electronic configuration) and groups 1, 2, 17 and 18, checked against the ICSE 2028 Chemistry syllabus Class IX (The Periodic Table) — see README \"For a reviewer\"",
    counting_rules: 'Every mean mass, octave count, position, period length and trend difference is computed and asserted in src/calc.mjs',
    icse_style: 'Assertion-reason items use the ICSE option order; calculations with working; a 5-pair match; 10-mark structured questions in parts, one with a lettered table outline; chapter tests on icse-9-default-chapter-test-short / -long',
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
