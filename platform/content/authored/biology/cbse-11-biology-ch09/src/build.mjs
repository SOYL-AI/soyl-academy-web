// Build ch09 Biomolecules: npx tsx content/authored/biology/cbse-11-biology-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(9, 'Biomolecules');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1109,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['tca-mcq', 'iodine-mcq', 'vmax-mcq', 'denature-ar'],
      B: ['acidpool-short', 'saturation-short', 'polysacch-short'],
      C: ['composition-long', 'enzyme-long'],
      D: ['ph-case'],
    },
    long: {
      A: ['elements-mcq', 'quaternary-mcq', 'peptidebond-mcq', 'gcheat-mcq', 'thermophile-mcq', 'fridge-mcq', 'hydrolase-mcq', 'zinc-mcq', 'cellulose-ar', 'allprotein-ar'],
      B: ['metabolites-short', 'inhibitor-short', ['proteinfn-short', 'fever-short'], 'aminoclass-short', ['proteinlevels-short', 'enzymesteps-short']],
      C: ['experiment-long', ['macromolecules-long', 'enzymeclass-long']],
      D: ['haemo-case', 'inhibit-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Analysis with trichloroacetic acid, elements of crust and body, amino acids, fatty acids, glycerides, phospholipids, bases, nucleosides and nucleotides, primary and secondary metabolites, cell composition, proteins (peptide bond, four levels, functions, collagen and RuBisCO), polysaccharides (cellulose, starch, glycogen, inulin, chitin, iodine test), nucleic acids (phosphodiester bond, B-DNA), enzymes (nature, rates, carbonic anhydrase, activation energy, induced fit, temperature, pH, substrate concentration, competitive inhibition, six classes, cofactors) checked against the 2026-27 rationalised syllabus scope (metabolism and the living state not included) — see README "Verifier pass"',
    counting_rules: 'Bonds and water in chains, peptide masses, dry masses, carbonic anhydrase factor, rate doubling, average rates, hydrogen bonds, DNA turns and length, inhibition percentages are computed by src/calc.mjs (with assertions), not typed in',
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
