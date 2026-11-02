// Build ch04 Animal Kingdom: npx tsx content/authored/biology/cbse-11-biology-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(4, 'Animal Kingdom', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 41,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['germ-mcq', 'amphi-mcq', 'chondri-mcq', 'croc-ar'],
      B: ['sym-short', 'sponge-short', 'platyasch-short'],
      C: ['nonch-c-long', 'fishes-long'],
      D: ['rock-case'],
    },
    long: {
      A: ['level-mcq', 'ctene-mcq', 'vect-mcq', 'echino-mcq', 'hemi-mcq', 'cephalo-mcq', 'osteich-mcq', 'whale-mcq', 'echino-ar', 'aves-ar'],
      B: ['protochord-short', 'metam-short', ['diplo-short', 'cnido-short'], 'arth-short', ['aves-short', 'amphrept-short']],
      C: ['basis-long', ['chordate-long', 'tetra-long']],
      D: ['worm-case', 'zoo-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Levels of organisation, symmetry, germ layers, coelom types, metamerism, notochord, gut and circulation types; the ten non-chordate phyla (Porifera, Coelenterata, Ctenophora, Platyhelminthes, Aschelminthes, Annelida, Arthropoda, Mollusca, Echinodermata, Hemichordata) with salient features and examples; Chordata (features, three subphyla, Cyclostomata, Chondrichthyes, Osteichthyes, Amphibia, Reptilia, Aves, Mammalia with heart chambers, skin, temperature, fertilisation and examples) checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Phylum counts by symmetry, germ layers, coelom, segmentation and level; class counts by heart, temperature and fertilisation; reef, rock-pool, worm and zoo tallies; gill slits from pairs; heart chambers; comb plates; segments; museum species are computed and asserted in src/calc.mjs, not typed in',
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
