// Build ICSE 10 Biology ch02 Genetics:
//   npx tsx content/authored/biology/icse-10-biology-ch02/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(2, 'Genetics');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10022,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['allele-mcq', 'dominance-mcq', 'mono-ratio-mcq', 'male-mcq', 'purity-ar', 'hetero-term', 'odd-terms', 'haemo-reason', 'test-short'],
      B: [['mono-case', 'haemo-case']],
    },
    long: {
      A: ['pheno-mcq', 'pea-mcq', 'testcross-mcq', 'di-ratio-mcq', 'sex-mcq', 'carrier-mcq', 'haemo-ar', 'genotype-term', 'laws-odd', 'sexchrom-term', 'genetics-fill5', 'xcross-match5'],
      B: [['di-case', 'test-case', 'cb-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Genetic terms, Mendel and the garden pea, the laws of dominance, segregation and independent assortment, monohybrid crosses with both ratios and the test cross, the dihybrid cross (phenotypic ratio only; genotypic ratio is a removed topic), sex determination in humans, and X-linked inheritance of haemophilia and colour blindness (other sex-linked disorders removed) checked against the ICSE 2027 Biology syllabus (Class X, Basic Biology) — see README "Verifier pass"',
    counting_rules: 'Every ratio, expected number and probability is computed by the Punnett engine in src/calc.mjs (copied from isc-12-biology-ch05, same author) and asserted, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; 5-blank fill-in passages; a 5-pair lettered-diagram match; 10-mark case questions; chapter tests on icse-10-biology-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
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
