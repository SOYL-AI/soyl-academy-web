// Build ch17 Locomotion and Movement: npx tsx content/authored/biology/cbse-11-biology-ch17/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(17, 'Locomotion and Movement');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 171,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['amoeboid-mcq', 'sr-mcq', 'knee-mcq', 'striated-ar'],
      B: ['redwhite-short', 'ribs-short', 'muscles-short3'],
      C: ['sliding-long', 'skeleton-long'],
      D: ['sarcomere-case'],
    },
    long: {
      A: ['cilia-mcq', 'visceral-mcq', 'achblock-mcq', 'redfibre-mcq', 'atlas-mcq', 'shoulder-mcq', 'coxal-mcq', 'tetany-mcq', 'ribs-ar', 'fatigue-ar'],
      B: ['actin-short', 'osteo-short', ['myosin-short', 'squat-short'], 'bands-short3', ['axial-short3', 'clinic-short3']],
      C: ['fibre-long', ['joints-long', 'athlete-long']],
      D: ['biopsy-case', 'clinic-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Types of movement (amoeboid, ciliary, muscular) with human examples; skeletal, visceral and cardiac muscle; fascicles, fascia, sarcolemma, sarcoplasm, sarcoplasmic reticulum as the calcium store; I band (actin, isotropic), A band (myosin, anisotropic), Z line, M line, H zone and sarcomere; F-actin and G-actin, tropomyosin, troponin masking myosin-binding sites; meromyosin with HMM head (ATPase, ATP and actin sites) and LMM tail; the sliding filament sequence from acetylcholine to Ca²⁺, troponin, cross bridges, ATP and relaxation; fatigue and lactic acid; red and white fibres; 206 bones with every sub-count, true, false and floating ribs, vertebral regions 7/12/5/1/1, atlas, girdles, glenoid cavity and acetabulum; fibrous, cartilaginous and synovial joints with the five standard synovial examples; myasthenia gravis, muscular dystrophy, tetany, arthritis, osteoporosis and gout, checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Bone counts (skull 29, vertebrae 26, ribs 24, axial 80, each limb 30, girdles 6, appendicular 126, total 206, phalanges 56, ribs not joined to the sternum 10, upper limbs with girdle 64) and sarcomere band widths, myofibril and fibre shortening are computed and asserted in src/calc.mjs, not typed in; sarcomere lengths are illustrative typical values',
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
