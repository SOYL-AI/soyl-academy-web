// Build ICSE 10 Biology ch01 Cell Cycle, Cell Division and Structure of Chromosomes:
//   npx tsx content/authored/biology/icse-10-biology-ch01/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Cell Cycle, Cell Division and Structure of Chromosomes');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10011,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['g1-mcq', 'anaphase-mcq', 'dog-mcq', 'gene-mcq', 'mitosis-ar', 'interphase-term', 'odd-meiosis', 'reason-centrioles', 'variation-short'],
      B: [['roottip-case', 'siblings-case']],
    },
    long: {
      A: ['longest-mcq', 'prophase-mcq', 'stage-fig-mcq', 'homologous-mcq', 'repair-mcq', 'chromatid-num-mcq', 'cytokinesis-ar', 'cytokinesis-term', 'odd-chromosome', 'meiosis-term', 'passage-fill5', 'chrom-match5'],
      B: [['wound-case', 'chromfig-case', 'colchicine-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Cell cycle phases and DNA content, stages of mitosis, cytokinesis in plant and animal cells, meiosis as reduction division (stages not taught: removed topic), homologous chromosomes and crossing over, significance and differences of mitosis and meiosis, chromosome structure (chromatin, chromatids, centromere, DNA, genes) checked against the ICSE 2027 Biology syllabus (Class X, Basic Biology) — see README "Verifier pass"',
    counting_rules: 'Cell numbers after successive mitoses, chromosome numbers after mitosis and meiosis, chromatid counts and the root-tip percentage are computed by src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; a 5-blank fill-in passage from a word list; a 5-pair labelled-diagram match; 10-mark case questions opening with an experiment, a situation or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
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
