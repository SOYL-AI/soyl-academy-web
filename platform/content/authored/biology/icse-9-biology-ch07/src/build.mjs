// Build ICSE 9 Biology ch07 Diversity in the Animal Kingdom:
//   npx tsx content/authored/biology/icse-9-biology-ch07/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(7, 'Diversity in the Animal Kingdom', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90077,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['dorsal-mcq', 'sponge-mcq', 'flat-mcq', 'spider-mcq', 'ar-bat', 'hydra-short', 'insect-draw'],
      B: [['star-long', 'shelf-long']],
    },
    long: {
      A: ['ventral-mcq', 'vert-mcq', 'echino-mcq', 'mollusc-mcq', 'warm-mcq', 'figC-mcq', 'figB-mcq', 'ar-sponge', 'noto-short', 'frog-short', 'gill-short', 'bird-short', 'coel-short'],
      B: [['worm-long', 'jar-long', 'heart-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Basis of grouping animals (chordates and non-chordates), the eight non-chordate phyla (Porifera, Coelenterata, Platyhelminthes, Nemathelminthes, Annelida, Arthropoda, Mollusca, Echinodermata) and the five classes of chordates (Pisces, Amphibia, Reptilia, Aves, Mammalia): features and examples, checked against the ICSE 2028 Biology syllabus Class IX (Diversity in Animal Kingdom) — see README "For a reviewer"',
    counting_rules: 'Legs in a jar, tray and window sill, the survey tally and percentages, the shelf of specimens and the heart chambers are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd-one-out with category and give-reason items; a 5-blank fill-in; a 5-pair lettered-diagram match; 10-mark structured questions in parts, one part a labelled diagram; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-04: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
