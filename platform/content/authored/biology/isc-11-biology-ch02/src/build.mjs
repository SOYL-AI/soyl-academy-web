// Build ISC 11 Biology ch02 Biological Classification: npx tsx content/authored/biology/isc-11-biology-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(2, 'Biological Classification: Domains, Kingdoms and Monera', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1102,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['woese-mcq', 'shape-mcq', 'resp-mcq', 'transformation-mcq', 'myco-ar'],
      B: ['gram-short2', ['curd-short2', 'sewage-short2']],
      C: ['econ-short3', ['bact-short3', 'extreme-short3']],
      D: ['kingdoms-long'],
    },
    long: {
      A: ['whittaker-mcq', 'mono-mcq', 'euk-mcq', 'key-protist-mcq', 'nutr-mcq', 'fig-nucleoid-mcq', 'fig-wall-mcq', 'fig-flag-mcq', 'nutri-mcq', 'fission-mcq', 'gram-ar', 'anaerobe-ar'],
      B: ['domain-short2', 'struct-short2', ['myco-short2', 'define-short2']],
      C: ['domain3-short3', 'king-short3', 'classify-short3', ['unknown-short3', 'myco3-short3']],
      D: ['archaea-long', ['bacteria-long', 'econ-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Three domains (Woese) and five kingdoms (Whittaker); bacterial structure, shapes, nutrition, respiration and Gram staining; definitions of fission, conjugation, transduction and transformation; archaebacteria and Mycoplasma; economic importance of bacteria, checked against the ISC 2028 Biology syllabus (Class XI) — see README Verifier pass',
    counting_rules: 'Every kingdom count, magnification, growth figure, Gram percentage and biogas yield is computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    verifier_pass: '2026-11-02: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
