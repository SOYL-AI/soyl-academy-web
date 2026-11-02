// Build ch03 Plant Kingdom: npx tsx content/authored/biology/cbse-11-biology-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(3, 'Plant Kingdom', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 31,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['zoo-mcq', 'holdfast-mcq', 'needle-mcq', 'fern-ar'],
      B: ['homo-short', 'sac-short', 'cycles3-short'],
      C: ['bryo-long', 'gym-long'],
      D: ['algae-case'],
    },
    long: {
      A: ['agar-mcq', 'stage-mcq', 'cycasroot-mcq', 'pollen-mcq', 'cones-mcq', 'anther-mcq', 'antipodal-mcq', 'fucus-mcq', 'gym-ar', 'red-ar'],
      B: ['classif-short', 'bryo-amph-short', ['seedhab-short', 'gemmae-short'], 'mosslife-short', ['dfert-short', 'pteri3-short']],
      C: ['algae-long', ['angio-long', 'pteri-long']],
      D: ['moss-case', 'dfert-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Classification systems (artificial, natural, phylogenetic); algae (green, brown, red: pigments, stored food, walls, flagella, habitats, examples, uses: agar, algin, carrageen, Chlorella, Spirulina, half of carbon dioxide fixation); bryophytes (liverworts and mosses, gemmae, protonema, foot-seta-capsule, Sphagnum and peat); pteridophytes (first vascular plants, sporophyte dominant, prothallus, homospory and heterospory, four classes, seed-habit precursor); haplontic, diplontic and haplo-diplontic cycles; gymnosperms (naked seeds, Cycas coralloid roots, Pinus mycorrhiza, needles, cones, microspores and megaspores, pollen grain, archegonia); angiosperms (dicots and monocots, stamen and pistil, 7-celled 8-nucleate embryo sac, double fertilisation, triploid PEN) checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Algal class from pigment and stored food, plant-group counts, spores from spore mother cells, pollen mother cells from pollen grains, male gametes from ovules, chromosome numbers of zygote, prothallus, leaf cell, PEN and endosperm, embryo-sac cell and nucleus counts are computed and asserted in src/calc.mjs, not typed in',
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
