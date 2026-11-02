// Build ch08 Cell: The Unit of Life: npx tsx content/authored/biology/cbse-11-biology-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(8, 'Cell: The Unit of Life');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1108,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['plasmid-mcq', 'osmosis-mcq', 'golgi-mcq', 'mito-ar'],
      B: ['celltheory-short', 'erkind-short', 'transport-short'],
      C: ['prokaryote-long', 'endomem-long'],
      D: ['pulse-case'],
    },
    long: {
      A: ['virchow-mcq', 'fimbriae-mcq', 'inclusion-mcq', 'active-mcq', 'plasmodesmata-mcq', 'rer-mcq', 'contractile-mcq', 'nucleolus-mcq', 'myco-ar', 'lyso-ar'],
      B: ['envelope-short', 'wallfn-short', ['plastidclass-short', 'centrosome-short'], 'fluidmosaic-short', ['plantanimal-short', 'chromtypes-short']],
      C: ['mitochloro-long', ['membrane-long', 'nucleus-long']],
      D: ['antibiotic-case', 'leaf-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Cell theory and its contributors, cell sizes and shapes, prokaryotic cell (envelope, Gram reaction, mesosome, chromatophores, flagella, pili, fimbriae, plasmids, 70S ribosomes, polysomes, inclusion bodies), fluid mosaic membrane and transport, cell wall layers, endomembrane system, mitochondria, plastids, ribosomes, cytoskeleton, cilia and flagella, centrioles, nucleus and chromosome types checked against the 2026-27 rationalised syllabus scope — see README "Verifier pass"',
    counting_rules: 'Size ratios, magnifications, membrane masses, microtubule counts, DNA per chromosome, arm ratios and case counts are computed by src/calc.mjs (with assertions), not typed in',
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
