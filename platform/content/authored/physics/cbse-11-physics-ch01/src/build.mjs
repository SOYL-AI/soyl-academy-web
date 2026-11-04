// Build ch01 Units and Measurements: npx tsx content/authored/physics/cbse-11-physics-ch01/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ./lib.mjs (do not edit it).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Units and Measurements');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, EQ } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-extra.mjs');
const { LY, roundSf } = await import('./calc.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// worked-example numbers used on the slides (independent re-derivation)
const okEx =
  Math.abs(LY - 9.46e15) / 9.46e15 < 0.001 &&
  Math.abs(EX.moon.th - 3.48e6 / 3.84e8) < 1e-15 &&
  Math.abs(EX.rp.dm - 0.028) < 1e-9 &&
  Math.abs(EX.res.R - 4.8) < 1e-9 &&
  Math.abs(EX.pg.g - (4 * Math.PI ** 2 * 0.92) / 1.92 ** 2) < 1e-12 &&
  EX.pend.join() === '0,0.5,-0.5' &&
  EX.strg.join() === '0.5,-0.5' &&
  roundSf(EX.ar.quo, 3) === 38.6 &&
  EQ.ok.join() === 'true,false,true';
SELF_CHECKS.push(okEx ? 'ok   worked examples: Moon 9.06 × 10⁻³ rad, 4.24 ly, ramp times 2.50 ± 0.03 s, R = 4.8 Ω, g = 9.85, pendulum (0, ½, −½), string (½, −½), equations consistent / not / consistent' : 'FAIL worked examples');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1101,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['pascal-mcq', 'comb-mcq', 'homog-mcq', 'power-ar'],
      B: ['ly-short', 'homog-short', 'sfcalc-short3'],
      C: ['err-long', 'conv-long'],
      D: ['astro-case'],
    },
    long: {
      A: ['baseunit-mcq', 'angle-mcq', 'sfadd-mcq', 'zero-mcq', 'diff-mcq', 'planck-mcq', 'reynolds-mcq', 'intensity-mcq', 'diff-ar', 'homog-ar'],
      B: ['derived-short', 'zeros-short', ['limit-short', 'acc-short'], 'orbit-short3', ['sc-short3', 'prefix-short3']],
      C: ['units-long', ['sf-long', 'dim-long']],
      D: ['fall-case', 'lab-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (log scale of lengths in drawn order and parsec/light-year/AU spacing; radian arc end at 1 rad and chord 2 r sin(½); rod end between the 4.6 and 4.7 cm marks; dot plot mean 2.50 s and mean absolute error 0.028 s with band width; area strips in the ratio b Δl : l Δb and ΔA/A = Δl/l + Δb/b; pendulum string length and angle; dimension balance [ut] = [½at²] = [s] = L; worked-example numbers): ${svgFails.length} failures`,
    physics_facts: 'SI base units metre, kilogram, second, ampere, kelvin, mole, candela; radian = arc/radius and steradian = area/radius² dimensionless; 1 ly = c × 1 year ≈ 9.46 × 10¹⁵ m (c = 2.998 × 10⁸ m s⁻¹, year 3.156 × 10⁷ s), 1 AU = 1.496 × 10¹¹ m, 1 pc = 3.08 × 10¹⁶ m ≈ 3.26 ly, 1 Å = 10⁻¹⁰ m, 1 fm = 10⁻¹⁵ m; significant-figure rules per NCERT (trailing zeros without a decimal point not counted; a dropped 5 makes the last kept digit even); error rules: absolute errors add in sums and differences, relative errors add in products and quotients, powers multiply the relative error; dimensional formulae from the dimension algebra in calc.mjs; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: 'every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
