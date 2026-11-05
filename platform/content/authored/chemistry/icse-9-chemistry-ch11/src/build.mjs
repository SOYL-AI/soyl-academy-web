// Build ICSE 9 Chemistry ch11 Oxidation and Reduction:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch11/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(11, 'Oxidation and Reduction', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91011,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['og-mcq1', 'el-mcq3', 'ag-mcq4', 'ag-mcq5', 'ar-nacl', 'og-short2c', 'ag-short3'],
      B: [['pbo-long', 'combine-long']],
    },
    long: {
      A: ['og-mcq3', 'og-mcq4', 'og-mcq5', 'el-mcq1', 'el-mcq6', 'ag-mcq2', 'ag-mcq6', 'ar-together', 'og-short2a', 'og-short2b', 'ag-short2a', 'og-short3b', 'el-short3b'],
      B: [['ionic-long', 'disp-long', 'h2s-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Oxidation and reduction as transfer of oxygen and hydrogen, the electronic concept with half-changes, oxidising and reducing agents and redox identification, checked against the ICSE 2028 Chemistry syllabus Class IX (Study of the First Element - Hydrogen, Oxidation and Reduction) — see README "For a reviewer"',
    counting_rules: 'Every equation is atom-balanced and every half-change is atom- and charge-balanced in src/calc.mjs; every combination of half-changes and every count of electrons is computed there, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark half-changes, agents and observations; a 5-pair match; 10-mark structured questions in parts, two with lettered diagrams; chapter tests on icse-9-default-chapter-test-short / -long',
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
