// Build ICSE 9 Chemistry ch01 Symbols, Valency, Radicals and Formulae:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch01/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(1, 'Symbols, Valency, Radicals and Formulae', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
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
      A: ['sym-mcq2', 'val-mcq1', 'rad-mcq1', 'form-mcq1', 'ar-free', 'rad-short2', 'form-short3b'],
      B: [['shells-long', 'atmos-long']],
    },
    long: {
      A: ['sym-quant', 'val-mcq3', 'val-mcq4', 'rad-mcq2', 'rad-mcq4', 'form-mcq2', 'val-mcq5', 'ar-val', 'sym-short2', 'atm-short2', 'form-short2c', 'rad-short3', 'sym-short3'],
      B: [['criss-long', 'valency-long', 'name-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Symbols (Latin-derived), valency from hydrides and from valence electrons, simple and compound radicals with valencies, criss-cross formulae and names, and free radicals in polluted air, checked against the ICSE 2028 Chemistry syllabus Class IX (The Language of Chemistry) — see README "For a reviewer"',
    counting_rules: 'Valencies, formulae by the criss-cross rule, atom counts and electron counts are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms and names; a 5-pair radical match; 10-mark structured questions in parts, two with lettered diagrams; chapter tests on icse-9-default-chapter-test-short / -long',
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
