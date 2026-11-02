// Build ch05 Morphology of Flowering Plants: npx tsx content/authored/biology/cbse-11-biology-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(5, 'Morphology of Flowering Plants', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 51,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['zones-mcq', 'symmetry-mcq', 'solflower-mcq', 'raceme-ar'],
      B: ['rootmod-short', 'aestiv-short', 'sol-short3'],
      C: ['stem-long', 'seed-long'],
      D: ['flower-case'],
    },
    long: {
      A: ['pericarp-mcq', 'compound-mcq', 'phyllo-mcq', 'stamen-mcq', 'flowerlet-mcq', 'radicle-mcq', 'soleco-mcq', 'formula2-mcq', 'eyes-ar', 'zygo-ar'],
      B: ['leaf-short', 'stemmod-short', ['inflor-short', 'placent-short'], 'venation-short', ['ovary-short', 'leafmod-short']],
      C: ['root-long', ['catalog-long', 'sol-long']],
      D: ['root-case', 'solanum-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Root systems (tap, fibrous, adventitious), regions of the root, root modifications (carrot, sweet potato, banyan prop roots, maize and sugarcane stilt roots, pneumatophores); stem (nodes, internodes, buds, underground stems, tendrils, thorns, Opuntia); leaf (base, petiole, lamina, stipules, sheath, pulvinus, venation, simple and compound, phyllotaxy, modifications); inflorescence (racemose, cymose), flower (symmetry, ovary position, aestivation, androecium and gynoecium types, placentation), fruit (pericarp, drupe, parthenocarpy), dicot and monocot seeds, and the family Solanaceae (vegetative and floral characters, floral formula and diagram, uses) checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Leaves per shoot, buds left in a raceme, root elongation totals by region, ovules and seeds, mango mesocarp mass, maize endosperm mass, stamens in 40 flowers, floral-formula text and TeX (computed from a whorl specification) and the A to E placentation letters are computed and asserted in src/calc.mjs, not typed in',
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
