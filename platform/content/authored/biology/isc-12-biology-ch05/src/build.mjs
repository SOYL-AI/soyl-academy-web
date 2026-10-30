// Build ISC 12 Biology ch05 Principles of Inheritance: npx tsx content/authored/biology/isc-12-biology-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(5, 'Principles of Inheritance');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1052,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['testcross-mcq', 'groupO-mcq', 'snap-mcq', 'recessive-mcq', 'segregation-ar'],
      B: ['genotype-short', ['law-short', 'poly-short']],
      C: ['mono-short', ['incomplete-short', 'pedigree-short']],
      D: ['di-long'],
    },
    long: {
      A: ['traits-mcq', 'dominance-mcq', 'f1-mcq', 'dihybrid-mcq', 'abo-mcq', 'codom-mcq', 'pleio-mcq', 'ad-fig-mcq', 'morgan-mcq', 'map-mcq', 'linkage-ar', 'abo-ar'],
      B: ['testcross-short', 'symbols-short', ['abo-short', 'drosophila-short']],
      C: ['mendel-short', 'di-short', 'pleio-short', ['linkage-short', 'map-short']],
      D: ['pedigree-long', ['deviation-long', 'linkage-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Genetic terms, Mendel’s seven characters and reasons for success, monohybrid and dihybrid crosses, laws of dominance, segregation and independent assortment, back and test crosses, incomplete dominance in snapdragon, codominance and multiple alleles in ABO blood groups, polygenic inheritance of skin colour, pleiotropy (phenylketonuria, starch synthesis in pea), pedigree symbols and patterns, the chromosomal theory (Sutton and Boveri), linkage, crossing over and gene mapping (Morgan, Sturtevant) checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Every gamete set, Punnett square, ratio, expected count, blood-group probability, polygenic class and recombination frequency is computed by the independent Punnett engine in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-12-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
