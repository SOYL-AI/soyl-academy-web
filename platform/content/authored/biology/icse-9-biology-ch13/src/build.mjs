// Build ICSE 9 Biology ch13 Diseases and their Transmission:
//   npx tsx content/authored/biology/icse-9-biology-ch13/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(13, 'Diseases and their Transmission', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90130,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cat-mcq', 'cock-mcq', 'ors-mcq', 'lungs-mcq', 'ar-boil', 'epipan-short2', 'worm-table3'],
      B: [['pox-long', 'malfig-long']],
    },
    long: {
      A: ['sporad-mcq', 'tyre-mcq', 'tbcourse-mcq', 'needle-mcq', 'antibio-mcq', 'ascar-mcq', 'dysentery-mcq', 'ar-net', 'aids-short2', 'pox-short2', 'helm-short2', 'hep-short3', 'malsym-short3'],
      B: [['epi-long', 'flyfig-long', 'cholera-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Communicable and non-communicable diseases; endemic, epidemic, pandemic and sporadic occurrence; transmission by air, water and vectors (housefly, mosquito, cockroach); symptoms and control of cholera, typhoid, tuberculosis, AIDS, chicken pox, hepatitis, malaria, amoebic dysentery, sleeping sickness, ascariasis, taeniasis and filariasis, checked against the ICSE 2028 Biology syllabus Class IX (Health and Hygiene); scientific names of causative agents (removed topic) are not used — see README "For a reviewer"',
    counting_rules: 'Ratios, rates per 1000, percentages, totals and differences are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd-one-out with category and give-reason items; a 5-blank fill-in; a 5-pair lettered-diagram match; 10-mark structured questions in parts, one part a labelled diagram; chapter tests on icse-9-default-chapter-test-short / -long',
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
