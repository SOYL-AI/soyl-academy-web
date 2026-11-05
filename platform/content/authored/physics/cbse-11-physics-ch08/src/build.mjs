// Build ch08 Mechanical Properties of Solids: npx tsx content/authored/physics/cbse-11-physics-ch08/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(8, 'Mechanical Properties of Solids');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, CUR, RUB } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-t2.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10 } = EX;

// ---- stress-strain curve plots: self-checks on the computed series
const pts = CUR.pts(CUR.eF);
const sOf = pts.map((p) => p[1]);
const eOf = pts.map((p) => p[0]);
const iMax = sOf.indexOf(Math.max(...sOf));
ok(near(CUR.sigma(CUR.eA) / CUR.eA, CUR.Y, 1e-9) && near(CUR.sA, CUR.Y * CUR.eA, 1e-9), `curve: the straight part OA has slope Y = ${CUR.Y} MPa (7.0 × 10¹⁰ Pa) up to the proportional limit A at strain ${CUR.eA} (${CUR.sA} MPa)`);
ok(CUR.sigma(CUR.eB) < CUR.Y * CUR.eB && CUR.sigma(CUR.eB) > CUR.sigma(CUR.eA), `curve: B (${CUR.eB}, ${CUR.sB} MPa) lies below the extended Hooke line (${(CUR.Y * CUR.eB).toFixed(1)} MPa): Hooke's law has ended and the stress is still rising`);
ok(eOf[iMax] === CUR.eU && sOf[iMax] === CUR.sU && sOf.at(-1) === CUR.sF && CUR.sF < CUR.sU && eOf.at(-1) === CUR.eF, `curve: the highest point C is the ultimate stress ${CUR.sU} MPa at strain ${CUR.eU}; stress falls to ${CUR.sF} MPa at fracture D (strain ${CUR.eF})`);
ok(sOf.slice(0, iMax + 1).every((v, i, a) => i === 0 || v > a[i - 1]) && sOf.slice(iMax).every((v, i, a) => i === 0 || v < a[i - 1]), 'curve: stress rises monotonically to C and falls monotonically to D');
ok(near(CUR.sigma(CUR.eP), CUR.sP, 1e-12) && near(CUR.ePerm, CUR.eP - CUR.sP / CUR.Y, 1e-12) && CUR.ePerm > 0 && CUR.ePerm < CUR.eP, `unloading: the line through P (${CUR.eP}, ${CUR.sP.toFixed(2)} MPa) with slope Y meets zero stress at strain ${CUR.ePerm.toFixed(5)} > 0 (permanent set); P lies beyond B`);
ok(CUR.eP > CUR.eB && near(CUR.Y * (CUR.eP - CUR.ePerm), CUR.sP, 1e-12), 'unloading: parallel to OA (same slope Y), so the recovered strain is sigma_P/Y');
ok(CUR.brittle.eF < CUR.eB && near(CUR.brittle.sF / CUR.brittle.eF, CUR.brittle.Y, 1e-9), `brittle: the straight line stops at strain ${CUR.brittle.eF} (${CUR.brittle.sF.toFixed(1)} MPa), far before the ductile curve's ultimate strain ${CUR.eU}`);
const rub = (x) => RUB.sigma(x);
const slope = (x, h = 1e-6) => (rub(x + h) - rub(x - h)) / (2 * h);
ok(near(slope(1e-4), RUB.slope0, 1e-3) && rub(1) < RUB.slope0 * 1 && slope(2.5) < slope(0.2) && slope(5) > slope(2.5), `elastomer: the curve is not a straight line (initial slope ${RUB.slope0} MPa, slope falls to ${slope(2.5).toFixed(3)} at strain 2.5, then rises to ${slope(5).toFixed(3)} at strain 5), so Hooke's law fails over the range`);
const ex3ok = ex3.loads.slice(0, 6).every((F, i) => near(ex3.ext[i] / F, ex3.k, 1e-9)) && ex3.ext[6] > ex3.pred;
ok(ex3ok, `load-extension plot: six readings at ${ex3.k} mm per newton; the 35 N reading ${ex3.ext[6]} mm exceeds the Hooke value ${ex3.pred.toFixed(2)} mm`);
ok(near(ex1.stress, 150 / (Math.PI * 0.8e-3 ** 2), 1e-12) && near(ex1.strain, 3.2e-4, 1e-9), `Example 1: stress ${ex1.stress.toExponential(3)} Pa and strain ${ex1.strain} recomputed from the radius`);
ok(near(ex2.Fy, 15000, 1e-9) && near(ex2.Fu, 24000, 1e-9), `Example 2: yield load ${ex2.Fy} N, ultimate load ${ex2.Fu} N`);
ok(near(ex4.Y, (ex4.F * ex4.L) / (ex4.A * ex4.dL), 1e-12) && ex4.Y > 1.9e11 && ex4.Y < 2.1e11, `Example 4: Y = ${ex4.Y.toExponential(3)} Pa by the direct formula too (steel)`);
ok(near(ex5.dL, (ex5.m * 9.8 * ex5.L) / (ex5.A * ex5.Y), 1e-12), `Example 5: extension ${(ex5.dL * 1000).toFixed(3)} mm by F L / (A Y)`);
ok(near(ex6.theta, 1e-5, 1e-9) && near(ex6.dx, 1e-6, 1e-9), `Example 6: shear angle ${ex6.theta} rad, shift ${ex6.dx} m`);
ok(near(ex7.p, 3.92e7, 1e-9) && near(ex7.frac, 3.92e7 / 2.2e9, 1e-12), `Example 7: pressure ${ex7.p} Pa, fractional change ${ex7.frac.toFixed(5)}; water plot line slope 100/B_MPa (x/22 per MPa) reproduces ${(ex7.p / 1e6 / 22).toFixed(3)} percent`);
ok(near(ex8.r, Math.sqrt(1.225e-4 / Math.PI), 1e-9) && near(ex8.A, 1.225e-4, 1e-9), `Example 8: working stress ${ex8.sw} Pa, rope area ${ex8.A} m², radius ${(ex8.r * 1000).toFixed(3)} mm`);
ok(near(ex9.ratio, 0.5, 1e-12), 'Example 9: extension ratio (2L, 2r) to (L, r) is 1/2');
ok(near(ex10.tot, ex10.ds + ex10.dc, 1e-12) && near(ex10.ds, (120 * 1.5) / (Math.PI * 0.5e-3 ** 2 * 2.0e11), 1e-12), `Example 10: steel ${(ex10.ds * 1000).toFixed(4)} mm + copper ${(ex10.dc * 1000).toFixed(4)} mm = ${(ex10.tot * 1000).toFixed(4)} mm`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1108,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['stressunit-mcq', 'yieldpt-mcq', 'ytwostrain-mcq', 'permanent-ar'],
      B: ['hookelaw-short', 'ymod-short', 'curve-short3'],
      C: ['curve-long', 'young-long'],
      D: ['lab-case'],
    },
    long: {
      A: ['strainnodim-mcq', 'hookerange-mcq', 'elastomer-mcq', 'ymaterial-mcq', 'radius-mcq', 'girder-mcq', 'deepsea-mcq', 'bulkcompr-mcq', 'steelcopper-ar', 'beamlayers-ar'],
      B: ['elplas-short', 'fluid-short', ['yieldult-short', 'igirder-short'], 'rope-short3', ['permset-short3', 'threemod-short3']],
      C: ['rope-long', ['moduli-long', 'series-long']],
      D: ['lift-case', 'sub-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (the four stress arrangements with balanced forces; shear angle with tan θ = Δx/h; wire extension drawn to a stated exaggeration; extension bars in the ratio 1/Y for steel, brass and aluminium; cube volume ratio 1 − ΔV/V; bent-beam fibre lengths and I-section; stress–strain curve points A to D, slope Y, unloading parallel to OA, brittle and elastomer curves, load–extension data, worked examples recomputed): ${svgFails.length} failures`,
    physics_facts: 'stress = F/A (Pa); strain has no unit (ΔL/L, Δx/h = tan θ ≈ θ, ΔV/V); Hooke: stress ∝ strain within the proportional limit; Y = FL/(AΔL), G = F/(Aθ), B = −pV/ΔV, compressibility 1/B; data in the stems: Y steel 2.0 × 10¹¹, copper 1.1 × 10¹¹, brass 9.1 × 10¹⁰, aluminium 7.0 × 10¹⁰ Pa, B water 2.2 × 10⁹ Pa, g = 9.8 m s⁻², water density 1000 kg m⁻³; other moduli quoted in each stem where used; Poisson’s ratio and the elastic potential energy of a stretched wire are not taught (not in the syllabus topics; cut in the rationalisation); every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
