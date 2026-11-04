// Build ISC 11 Biology ch19 Locomotion and Movement: npx tsx content/authored/biology/isc-11-biology-ch19/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(19, 'Locomotion and Movement', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1119,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['palate-mcq', 'hip-mcq', 'tetany-mcq', 'ossicle-mcq', 'rigor-ar'],
      B: ['redwhite-short', ['jointclass-short', 'ribcage-short']],
      C: ['calcium-short3', ['limb-short3', 'osteo-short3']],
      D: ['sliding-long'],
    },
    long: {
      A: ['flagella-mcq', 'muscleprop-mcq', 'cardiac-mcq', 'smooth-mcq', 'sarcq-mcq', 'girdle-mcq', 'marrow-mcq', 'hinge-mcq', 'osteo-mcq', 'arthritis-mcq', 'fibre-ar', 'sliding-ar'],
      B: ['thin-short', 'tetany-short', ['summ-short', 'synfunc-short']],
      C: ['types-short3', 'organise-short3', 'rigor-short3', ['saddle-short3', 'disorders-short3']],
      D: ['chem-long', ['skeleton-long', 'joints-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Types of movement (ciliary, flagellar, muscular), muscle properties, red and white fibres, skeletal muscle structure, sarcomere bands, actin, tropomyosin, troponin and myosin, the sliding filament theory (Huxley and Huxley), the chemical events of contraction, summation, tetanus, rigor mortis, the 206 bones of the axial (80) and appendicular (126) skeleton, joints (fibrous, cartilaginous, synovial and the five synovial types) and the disorders myasthenia gravis, tetany, muscular dystrophy, arthritis, osteoporosis and gout, checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Every sarcomere band width, shortening, stimulation interval, twitch trace and bone count is computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
