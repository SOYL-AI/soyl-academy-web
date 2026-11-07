// Build ICSE 9 Physics ch10 Sound and Wave Motion:
//   npx tsx content/authored/physics/icse-9-physics-ch10/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(10, 'Sound and Wave Motion', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const svgMod = await import('./svgs.mjs');
const SELF_CHECKS = svgMod.SELF_CHECKS;
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91010,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-hot', 'm-flash', 'm-solid', 'm-kind', 'ar-vac', 's2d', 's3b'],
      B: [['graph-long', 'ultra-long']],
    },
    long: {
      A: ['m-energy', 'm-source', 'm-amp', 'm-humid', 'm-dog', 'm-range', 'm-sub', 'ar-loud', 's2e', 's2h', 's2b', 's3d', 's3f'],
      B: [['kinds-long', 'thunder-long', 'medium-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Transverse and longitudinal waves, sound needs a medium, speed of sound in solids, liquids and gases (air 340, water 1500, iron 5100 m s⁻¹ as stated in each stem) and its dependence on temperature and humidity, v = f λ and T = 1/f, thunder and lightning with the speed of light 3 × 10⁸ m s⁻¹, infrasonic, audible (20 Hz to 20 000 Hz) and ultrasonic sound and their uses, ultrasonic against supersonic, checked against the ICSE 2028 Physics syllabus Class IX (Sound and Wave Motion) — see README "For a reviewer"',
    counting_rules: 'Every wavelength, frequency, period, speed, time gap and distance is computed and asserted in src/calc.mjs; the wave diagrams are drawn from computed geometry and self-checked',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    icse_style: 'Assertion-reason items use the ICSE option order; numericals with formula, substitution and unit; 10-mark structured questions in parts, one on a displacement graph; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-08: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
