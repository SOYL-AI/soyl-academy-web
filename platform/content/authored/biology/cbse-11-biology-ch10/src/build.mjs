// Build ch10 Cell Cycle and Cell Division: npx tsx content/authored/biology/cbse-11-biology-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(10, 'Cell Cycle and Cell Division', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 101,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['g0-mcq', 'metaphase-mcq', 'diakinesis-mcq', 'nucmeta-ar'],
      B: ['phases-short', 'sigmitosis-short', 'prophase1-short'],
      C: ['cytok-long', 'compare-long'],
      D: ['rootip-case'],
    },
    long: {
      A: ['sphase-mcq', 'dnag2-mcq', 'cellplate-mcq', 'chromatids-mcq', 'crossover-mcq', 'maizeMeta2-mcq', 'anaphase1count-mcq', 'interkinesis-mcq', 'mitosis-ar', 'crossing-ar'],
      B: ['g0-short', 'metaanaph-short', ['syncytium-short', 'reduct-short'], 'nucratio-short', ['prophasemit-short', 'mi-short']],
      C: ['mitosis-long', ['meiosis-long', 'prophase-long']],
      D: ['yeast-case', 'pea-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Cell cycle (G1, S, G2, M; 24 h human cell, 1 h M phase, 90 min yeast; G0; DNA 2C to 4C, chromosome number 2n; centriole duplication in S), mitosis (prophase events and disappearance of nucleolus, envelope, Golgi and ER; kinetochores; metaphase plate; anaphase centromere splitting; telophase; cytokinesis by furrow and by cell plate; syncytium in coconut endosperm; significance), meiosis (one replication, two divisions; leptotene, zygotene with synapsis and synaptonemal complex, pachytene with crossing over and recombinase, diplotene with chiasmata, diakinesis with terminalisation; metaphase I bivalents; anaphase I homologues separate; dyad; interkinesis; meiosis II stages; tetrad; significance) checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Interphase share, cell numbers after n cycles, mitotic index, phase times from counts, chromosome and chromatid numbers at every stage of mitosis and meiosis, bivalents, DNA per nucleus (C values in picograms) and gamete numbers are computed and asserted in src/calc.mjs, not typed in',
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
