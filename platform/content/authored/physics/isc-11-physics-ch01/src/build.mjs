// Build ch01 Units and Measurement (ISC 11 Physics): npx tsx content/authored/physics/isc-11-physics-ch01/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ./lib.mjs (do not edit it).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Units and Measurement');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions2.mjs');
const { LY, PARSEC, roundSf } = await import('./calc.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// worked-example numbers used on the slides (independent re-derivation)
const okEx =
  Math.abs(EX.tr.ms - 75) < 1e-9 &&
  Math.abs(EX.star.pc - 2.5) < 1e-9 &&
  Math.abs(EX.star.ly - (2.5 * 3.08e16) / (2.998e8 * 3.156e7)) / EX.star.ly < 1e-9 &&
  Math.abs(LY - 9.46e15) / 9.46e15 < 0.001 &&
  Math.abs(PARSEC - 3.08e16) < 1 &&
  Math.abs(EX.rp.dm - 0.02) < 1e-9 &&
  Math.abs(EX.rp.mean - 1.86) < 1e-9 &&
  EX.ar.sumR === 25.1 &&
  roundSf(EX.ar.prod, 3) === 90.2 &&
  EX.ar.quoR === 32 &&
  EX.oomRows.map((o) => o.k).join() === '-10,-27,7,25,18,9' &&
  EX.eqOk.join() === 'true,true,false,true' &&
  Math.abs(EX.conv.newton - 1e5) < 1e-6 &&
  Math.abs(EX.conv.G - 6.67e-8) / 6.67e-8 < 1e-9;
SELF_CHECKS.push(okEx ? 'ok   worked examples: 270 km/h = 75 m/s; parallax 0.40 arcsecond = 2.5 pc = 8.14 ly; swing times 1.86 ± 0.02 s; sums 25.1, 90.2, 32; orders of magnitude -10, -27, 7, 25, 18, 9; equations consistent / consistent / not / consistent; 1 N = 10^5 dyne; G = 6.67e-8 CGS' : 'FAIL worked examples');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1201,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['dyne-mcq', 'prefix-mcq', 'sfadd-mcq', 'dimpow-mcq', 'parsec-ar'],
      B: ['mksa-short', ['prefix-short', 'limit-short']],
      C: ['ly-short3', ['err-short3', 'check-short3']],
      D: ['rules-long'],
    },
    long: {
      A: ['goodunit-mcq', 'rules-mcq', 'fermi-mcq', 'atomu-mcq', 'sfcount-mcq', 'round-mcq', 'err-mcq', 'spring-mcq', 'coeff-mcq', 'pressconv-mcq', 'sf-ar', 'exp-ar'],
      B: ['radian-short', 'rules-short', ['methods-short', 'accprec-short']],
      C: ['derive-short3', 'prefix-short3', 'mass-short3', ['sfcalc-short3', 'oom-short3']],
      D: ['systems-long', ['dim-long', 'conv-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (log scale of lengths in drawn order and parsec/light-year/AU spacing; parallax triangle b/D = tan p and 1 AU / tan(1 arcsecond) = 1 parsec; radian arc end at 1 rad and chord 2 r sin(½); strip end between the 5.2 and 5.3 cm marks; dot plot mean 1.86 s and mean absolute error 0.02 s with band width; 3.16 drawn at the midpoint of a logarithmic decade; dimension balance [v²] = [u²] = [2as]; worked-example numbers): ${svgFails.length} failures`,
    physics_facts: 'SI base units metre, kilogram, second, ampere, kelvin, mole, candela; radian = arc/radius and steradian = area/radius² dimensionless; prefixes atto 10⁻¹⁸ to tera 10¹²; 1 ly = c × 1 year ≈ 9.46 × 10¹⁵ m (c = 2.998 × 10⁸ m s⁻¹, year 3.156 × 10⁷ s), 1 AU = 1.496 × 10¹¹ m, 1 pc = 3.08 × 10¹⁶ m ≈ 3.26 ly (1 AU / 4.85 × 10⁻⁶ rad), 1 Å = 10⁻¹⁰ m, 1 fm = 10⁻¹⁵ m, 1 u = 1.66 × 10⁻²⁷ kg; parallax D = b/p; significant-figure rules as in NCERT/ISC practice (trailing zeros of a whole number not counted; a dropped exact 5 makes the last kept digit even); order of magnitude by the square-root-of-ten rule; dimensional formulae from the dimension algebra in calc.mjs; unit conversions by n2 = n1 [M1/M2]^a [L1/L2]^b [T1/T2]^c; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: 'every question and every computed value re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
console.log(SELF_CHECKS.join('\n'));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
