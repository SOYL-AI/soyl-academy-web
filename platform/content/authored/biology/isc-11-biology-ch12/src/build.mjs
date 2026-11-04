// Build ISC 11 Biology ch12 Cell Cycle and Cell Division: npx tsx content/authored/biology/isc-11-biology-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(12, 'Cell Cycle and Cell Division', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1121,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['flow-s-mcq', 'g0-mcq', 'onion-mcq', 'anaI-mcq', 's-ar'],
      B: ['signif-short2', ['synapsis-short2', 'phases-short2']],
      C: ['meta-ana-short3', ['variation-short3', 'diff-short3']],
      D: ['mitosis-long'],
    },
    long: {
      A: ['mit-ana-mcq', 'mit-nuc-mcq', 'mit-chromatids-mcq', 'mit-e-mcq', 'kineto-mcq', 'plantcyto-mcq', 'var-mcq', 'meta-count-mcq', 'telo-mcq', 'gam-mcq', 'mit-ar', 'mei1-ar'],
      B: ['cvalue-short2', 'crossing-short2', ['mei2-short2', 'g0-short2']],
      C: ['s-short3', 'signif-short3', 'chrcount-short3', ['spermato-short3', 'fert-short3']],
      D: ['diff-long', ['prophase-long', 'cycle-long']],
    },
  },
  checksExtra: {
    biology_facts: 'The phases of the cell cycle, G0 and the C-value; the stages of mitosis and cytokinesis and their significance; the stages of meiosis including the five substages of prophase I, synapsis, crossing over and chiasmata, and the sources of variation; and the differences between mitosis and meiosis, checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Phase durations, histogram counts, DNA, chromosome and chromatid numbers, mitotic indices, culture growth, gamete combinations and sperm counts are computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    verifier_pass: 'Every question, case part and alternative re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
