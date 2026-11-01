// Build ICSE 10 Biology ch11 Sense Organs: Eye and Ear:
//   npx tsx content/authored/biology/icse-10-biology-ch11/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(11, 'Sense Organs: Eye and Ear');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10121,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['myopia-lens-mcq', 'presby-mcq', 'wax-mcq', 'one-eye-mcq', 'cochlea-ar', 'cataract-term', 'odd-eye', 'reason-dark', 'rods-cones-short'],
      B: [['eye-case', 'flight-case']],
    },
    long: {
      A: ['yellow-mcq', 'vitreous-mcq', 'eustachian-mcq', 'astig-mcq', 'ear-fig-mcq', 'dizzy-mcq', 'blind-ar', 'sclera-term', 'conjunctiva-term', 'reason-choroid', 'ear-fill5', 'eye-match5'],
      B: [['myopia-case', 'cinema-case', 'stereo-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Structure of the eye (conjunctiva, sclera and cornea, choroid, ciliary body, iris and pupil, lens, humours, retina with rods and cones, yellow spot, blind spot), accommodation, adaptation to light and dark, stereoscopic vision, eye defects (myopia, hypermetropia, presbyopia, astigmatism, cataract) with ray diagrams only for myopia and hypermetropia (removed topic), the structure of the ear, hearing and balance checked against the ICSE 2027 Biology syllabus (Class X, Human Anatomy and Physiology) — see README \"Verifier pass\"',
    counting_rules: 'The binocular overlap of the two fields of view and the focal length of the lens correcting a myopic far point are computed by src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; a 5-blank fill-in passage from a word list; a 5-pair labelled-diagram match; 10-mark case questions opening with an experiment, a situation or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked; items in one test checked for stems that give away another item\'s answer — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
