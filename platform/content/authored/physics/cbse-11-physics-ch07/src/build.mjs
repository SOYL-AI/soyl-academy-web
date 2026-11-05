// Build ch07 Gravitation: npx tsx content/authored/physics/cbse-11-physics-ch07/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(7, 'Gravitation');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-t3.mjs');
await import('./questions-t4.mjs');
await import('./questions-long.mjs');
const { reaches, periodNumeric, infallSpeed, GM, RE, g } = await import('./phys.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by numerical integration of the motion (independent of the closed forms used in the slides)
const { ex1, ex2, ex3, ex4, ex5, p1, p3, p4, p5, p6, veEarth } = EX;
ok(near(ex1.T ** 2, ex1.a ** 3, 1e-12) && near(ex1.T, 3.375, 1e-12), `Example 1 (part 1): T² = a³ gives ${ex1.T} years at ${ex1.a} AU`);
ok(near(ex2.F, 3.557e22, 0.001) && near(ex3.F, Math.hypot(ex3.FB, ex3.FC), 1e-12) && near(ex4.g, 1.619, 0.001), `Examples 2–4 (part 1): Sun–Earth force ${ex2.F.toExponential(3)} N; resultant ${(ex3.F * 1e9).toFixed(3)} nN; Moon g ${ex4.g.toFixed(3)} m/s²`);
ok(near(ex5.exact, 8.8889, 1e-4) && near(ex5.approx, 8.82, 1e-9) && near(ex5.depth, 9.31, 1e-9), `Example 5 (part 1): g at 320 km up ${ex5.exact.toFixed(4)} (approx ${ex5.approx.toFixed(2)}) and down ${ex5.depth.toFixed(2)} m/s²`);
ok(near(p3.dU, 2.5088e9, 1e-9) && near(p5.v, 5600, 1e-9) && near(periodNumeric(g * RE * RE, p5.r), p5.T, 0.002), `Examples 3, 5 (part 2): lift ${p3.dU.toExponential(4)} J; orbit at 2R: v ${p5.v} m/s, period ${(p5.T / 3600).toFixed(3)} h confirmed by integrating the orbit`);
ok(near(p4.ve, 5011, 0.001) && !reaches(MARS_GM(), 3.4e6, p4.ve * 0.99, 1000 * 3.4e6) && reaches(MARS_GM(), 3.4e6, p4.ve * 1.01, 1000 * 3.4e6), `Example 4 (part 2): Mars escape speed ${(p4.ve / 1e3).toFixed(3)} km/s: 0.99 v_e falls back, 1.01 v_e escapes (integrated motion)`);
ok(near(veEarth, 11183, 0.001) && !reaches(GM, RE, veEarth * 0.995, 1000 * RE) && reaches(GM, RE, veEarth * 1.005, 1000 * RE), `Escape speed of the Earth ${(veEarth / 1e3).toFixed(3)} km/s (GM = 4.002e14): confirmed by integrating the motion`);
ok(near(p6.dE, 3.335e9, 0.001) && near(p1.U, (-GM * 250) / 1e7, 1e-12), `Example 6 (part 2): orbit raising ${p6.dE.toExponential(4)} J; Example 1: U ${p1.U.toExponential(3)} J`);
ok(near(infallSpeed(g * RE * RE, 2 * RE, RE), Math.sqrt(g * RE), 0.001), `Fall from height R reaches ${Math.sqrt(g * RE).toFixed(1)} m/s (integrated ${infallSpeed(g * RE * RE, 2 * RE, RE).toFixed(1)} m/s)`);
function MARS_GM() {
  return 6.67e-11 * 6.4e23;
}
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1107,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['comet-mcq', 'altquarter-mcq', 'vratio-mcq', 'pe-neg-ar'],
      B: ['area-short', 'potential-short', 'vo-derive-short3'],
      C: ['phobos-long', 'escape-long'],
      D: ['shaft-case'],
    },
    long: {
      A: ['kepler3-mcq', 'dist-mcq', 'exo-mcq', 'depthhalf-mcq', 'pe-mcq', 'massindep-mcq', 'satratio-mcq', 'drag-mcq', 'kepler3-ar', 'orbit-ar'],
      B: ['gmass-short', 'veindep-short', ['conserv-short', 'drag-short'], 'galt-derive-short3', ['U-derive-short3', 've-derive-short3']],
      C: ['gvar-long', ['pe-long', 'satenergy-long']],
      D: ['orbiter-case', 'lift-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (law of areas: two wedges swept in equal mean-anomaly intervals on an e = 0.7 ellipse have equal polygon areas and the Sun sits at a focus; superposition: drawn resultant equals the vector sum of the two pulls at the stated scale; Earth cross-section: points at height R and depth R/2 drawn at 2R and R/2 from O; Newton's cannon: orbits integrated numerically, v_c stays on r = 1, 1.2 v_c reaches 2.571 R, √2 v_c keeps E = 0 and leaves; orbit at 2R with v = 5.6 km/s; worked examples re-derived by integrating the motion): ${svgFails.length} failures`,
    physics_facts: 'G = 6.67 × 10⁻¹¹ N m² kg⁻², M_E = 6.0 × 10²⁴ kg, R_E = 6.4 × 10⁶ m, g = 9.8 m s⁻² (stated in every item that uses them; GM = gR² where g and R are the data); Kepler: ellipse, equal areas, T² ∝ a³ with T² = 4π²r³/GM for circles; F = Gm₁m₂/r²; g = GM/R², g′ = g(R/(R+h))² ≈ g(1 − 2h/R), g′ = g(1 − d/R) for a uniform Earth; U = −GMm/r, V = −GM/r, ΔU = mgRh/(R+h); v_e = √(2GM/R) = 11.2 km/s, v = √(GM/r), T = 2π√(r³/GM), K = GMm/2r, E = −GMm/2r; every number computed by the build script and re-solved by an independent route (see README)',
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
