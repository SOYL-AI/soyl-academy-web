// Build ICSE 9 Chemistry ch07 Atomic Structure:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch07/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(7, 'Atomic Structure', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 97007,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['p-mcq3', 'b-mcq3', 'c-mcq5', 'c-mcq7', 'ar-bohr', 'c-short2a', 'p-short3'],
      B: [['gold-foil-long', 'isotope-long']],
    },
    long: {
      A: ['p-mcq1', 'p-mcq2', 'p-mcq4', 'r-mcq4', 'i-mcq3', 'c-mcq2', 'c-mcq3', 'ar-mass', 'p-short2a', 'p-short2b', 'i-short2a', 'r-short3', 'i-short3a'],
      B: [['particle-table-long', 'config-long', 'bohr-long']],
    },
  },
  checksExtra: {
    chemistry_facts: "Particles of the atom, atomic and mass number, Rutherford's gold foil experiment with conclusions and limitation, simplified Bohr model (no mathematical expressions), the 2n squared rule and configurations of the first 20 elements, duplet and octet and chemical activity, isotopes of hydrogen, carbon and chlorine, checked against the ICSE 2028 Chemistry syllabus Class IX (Atomic Structure) — see README \"For a reviewer\"",
    counting_rules: 'Every count of protons, neutrons and electrons, every electronic configuration and every isotope average is computed and asserted in src/calc.mjs',
    icse_style: 'Assertion-reason items use the ICSE option order; short answers and numericals with working; a 5-pair match; 10-mark structured questions in parts, two with lettered diagrams; chapter tests on icse-9-default-chapter-test-short / -long',
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
