// Build ICSE 9 Chemistry ch08 Chemical Bonding:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch08/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(8, 'Chemical Bonding', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 98008,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['e-mcq3', 'v-mcq3', 's-mcq1', 's-mcq5', 'ar-hcl', 'v-short2b', 's-short3a'],
      B: [['cao-long', 'radical-long']],
    },
    long: {
      A: ['e-mcq1', 'e-mcq2', 'o-mcq2', 'v-mcq1', 'v-mcq5', 's-mcq2', 'v-mcq6', 'ar-h2o', 'o-short2b', 's-short2b', 'r-short2b', 'e-short3', 'r-short3'],
      B: [['nacl-long', 'ammonia-long', 'multi-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Electrovalent bond and ion formation, orbit structures of NaCl, MgCl2 and CaO, covalent bond with duplet and octet and single, double and triple bonds, orbit structures of H2, Cl2, O2, N2, HCl, H2O, NH3, CCl4 and CH4, and radicals from the breaking of a covalent bond, checked against the ICSE 2028 Chemistry syllabus Class IX (Chemical Bonding) — see README "For a reviewer"',
    counting_rules: 'Every ion charge, electron count, formula, shared pair and lone pair is computed and asserted in src/calc.mjs, and the orbit structures are drawn from the same electron counts',
    icse_style: 'Assertion-reason items use the ICSE option order; short answers with equations and counts; a 5-pair match; 10-mark structured questions in parts, two with lettered diagrams; chapter tests on icse-9-default-chapter-test-short / -long',
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
