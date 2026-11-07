// Build ch13 Oscillations: npx tsx content/authored/physics/cbse-11-physics-ch13/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(13, 'Oscillations');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const { G, PI, springAt, springPeriodSim, pendulumPeriodSim } = await import('./phys.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by independent routes (numerical integration of the equation of motion)
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, sinTable } = EX;
ok(near(ex1.T * ex1.f, 1, 1e-12) && near(ex1.om, (2 * PI) / ex1.T, 1e-12), `Example 1: T = ${ex1.T.toFixed(4)} s, f = ${ex1.f} Hz, ω = ${ex1.om.toFixed(4)} rad/s`);
{
  // Example 2: x(t) = 0.12 cos(4 pi t + pi/3) re-integrated from its initial conditions
  const t = 0.137;
  const [x, v] = springAt(1, ex2.om ** 2, ex2.x0, ex2.v0, t);
  ok(near(x, ex2.A * Math.cos(ex2.om * t + ex2.phi), 1e-5) && near(v, -ex2.A * ex2.om * Math.sin(ex2.om * t + ex2.phi), 1e-5) && near(ex2.a0, -(ex2.om ** 2) * ex2.x0, 1e-12), `Example 2: the integrated motion from x(0) = ${ex2.x0.toFixed(3)}, v(0) = ${ex2.v0.toFixed(4)} agrees with A cos(ωt + φ) at t = ${t} s; a(0) = ${ex2.a0.toFixed(4)}`);
}
{
  // Example 3: time from x = A to x = A/2 by integration
  const [x] = springAt(1, ex3.om ** 2, ex3.A, 0, ex3.t);
  ok(near(x, ex3.A / 2, 1e-5) && near(ex3.t, ex3.T / 6, 1e-12), `Example 3: x = ${x.toFixed(5)} m at t = ${ex3.t.toFixed(5)} s = T/6, v_max = ${ex3.vmax.toFixed(4)} m/s`);
}
{
  // Example 4: speed at x = 0.050 m and maximum speed by integration
  const t = Math.acos(ex4.x / ex4.A) / ex4.om;
  const [x, v] = springAt(1, ex4.om ** 2, ex4.A, 0, t);
  const [, vm] = springAt(1, ex4.om ** 2, ex4.A, 0, ex4.T / 4);
  ok(near(x, ex4.x, 1e-5) && near(Math.abs(v), ex4.v, 1e-4) && near(Math.abs(vm), ex4.vmax, 1e-4) && near(ex4.amax, ex4.om ** 2 * ex4.A, 1e-12), `Example 4: v(0.050 m) = ${ex4.v.toFixed(4)} m/s, v_max = ${ex4.vmax.toFixed(4)} m/s, a_max = ${ex4.amax.toFixed(4)} m/s², a(0.050 m) = ${ex4.a.toFixed(4)}`);
}
{
  // Example 5: phase constant: integrate from x(0), v(0) and compare with A cos(ωt + φ)
  const t = 0.31;
  const [x, v] = springAt(1, ex5.om ** 2, ex5.x0, ex5.v0, t);
  ok(near(ex5.phi, (4 * PI) / 3, 1e-12) && ex5.v0 > 0 && near(x, ex5.A * Math.cos(ex5.om * t + ex5.phi), 1e-4) && near(v, -ex5.A * ex5.om * Math.sin(ex5.om * t + ex5.phi), 1e-4), `Example 5: φ = 4π/3 = ${ex5.phi.toFixed(4)} rad reproduces the integrated motion from x(0) = −0.030 m moving towards +x (v(0) = ${ex5.v0.toFixed(4)} m/s)`);
}
{
  const T = springPeriodSim(ex6.m, ex6.k, 0.05);
  ok(near(T, ex6.T, 1e-3) && near(ex6.om, 2 * PI / ex6.T, 1e-12), `Example 6: period ${ex6.T.toFixed(4)} s agrees with the integrated period ${T.toFixed(4)} s; ω = ${ex6.om.toFixed(4)} rad/s`);
}
{
  const T = springPeriodSim(ex7.m, ex7.k, 0.05);
  const T2 = springPeriodSim(ex7.m2, ex7.k, 0.05);
  ok(near(T, ex7.T, 1e-3) && near(T2, ex7.T2, 1e-3) && near(ex7.m2, 5.4, 1e-9), `Example 7: k = ${ex7.k.toFixed(3)} N/m reproduces T = ${ex7.T} s (integrated ${T.toFixed(4)}) and ${ex7.m2.toFixed(3)} kg gives ${ex7.T2} s (integrated ${T2.toFixed(4)})`);
}
{
  const om = ex8.om;
  const t = Math.acos(ex8.x / ex8.A) / om;
  const [x, v] = springAt(ex8.m, ex8.k, ex8.A, 0, t);
  const [, vm] = springAt(ex8.m, ex8.k, ex8.A, 0, springPeriodSim(ex8.m, ex8.k, ex8.A) / 4);
  ok(near(x, ex8.x, 1e-4) && near(Math.abs(v), ex8.v, 1e-3) && near(Math.abs(vm), ex8.vmax, 1e-3) && near(ex8.pe + ex8.ke, ex8.total, 1e-12), `Example 8: E = ${ex8.total.toFixed(4)} J; at 0.030 m PE ${ex8.pe.toFixed(4)} + KE ${ex8.ke.toFixed(4)} J, speed ${ex8.v.toFixed(4)} m/s (integrated ${Math.abs(v).toFixed(4)}); v_max ${ex8.vmax.toFixed(4)} m/s (integrated ${Math.abs(vm).toFixed(4)})`);
}
{
  const om = 10; // any spring: KE = PE where x = A / sqrt 2
  const t = Math.acos(1 / Math.SQRT2) / om;
  const [x, v] = springAt(1, om * om, ex9.A, 0, t);
  const ke = 0.5 * v * v;
  const pe = 0.5 * om * om * x * x;
  ok(near(x, ex9.xEq, 1e-4) && near(ke, pe, 1e-3) && near(ex9.peFrac + ex9.keFrac, 1, 1e-12), `Example 9: KE = PE at x = ${ex9.xEq.toFixed(4)} m (integrated ${x.toFixed(4)}); at 0.060 m KE is ${(ex9.keFrac * 100).toFixed(1)}% of E`);
}
{
  const T = pendulumPeriodSim(ex10.L, G, 0.05);
  const TM = pendulumPeriodSim(ex10.L, ex10.gM, 0.05);
  ok(near(T, 2, 0.001) && near(TM, ex10.TM, 0.001), `Example 10: L = ${ex10.L.toFixed(4)} m gives T = ${T.toFixed(4)} s by integrating θ'' = −(g/L) sin θ (small swing); Moon ${ex10.TM.toFixed(4)} s (integrated ${TM.toFixed(4)})`);
}
{
  const T1 = pendulumPeriodSim(1, G, 0.05);
  const T2 = pendulumPeriodSim(1.02, G, 0.05);
  ok(near(T2 / T1, Math.sqrt(1.02), 5e-4) && near(ex11.lag, 86400 * (1 - T1 / T2), 2e-3), `Example 11: T′ = ${ex11.T2.toFixed(5)} s; the clock loses ${ex11.lag.toFixed(2)} s per day (integrated pendulums give ${(86400 * (1 - T1 / T2)).toFixed(2)} s)`);
}
{
  const exact = pendulumPeriodSim(1, G, (10 * PI) / 180);
  const small = 2 * PI * Math.sqrt(1 / G);
  ok(sinTable.every((o) => o.err > 0) && sinTable.every((o, i) => i === 0 || o.err > sinTable[i - 1].err) && near(exact / small, 1 + ((10 * PI) / 180) ** 2 / 16, 1e-3), `Small-angle table: θ − sin θ grows with θ (${sinTable.map((o) => o.err.toFixed(2)).join(', ')} %); a 10° swing has a period ${((exact / small - 1) * 100).toFixed(2)}% longer than 2π√(L/g)`);
}
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1113,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['vmax-mcq', 'ketime-mcq', 'pend-dep-mcq', 'energy-ar'],
      B: ['refcircle-short', 'springind-short', 'pendT-short3'],
      C: ['spring-long', 'pend-long'],
      D: ['trolley-case'],
    },
    long: {
      A: ['periodic-mcq', 'half-mcq', 'accel-mcq', 'springdep-mcq', 'kepe-mcq', 'ampenergy-mcq', 'pend-moon-mcq', 'pend-angle-mcq', 'phase-ar', 'springamp-ar'],
      B: ['shmnot-short', 'swap-short', ['phaseconst-short', 'pendsmall-short'], 'vela-short3', ['energy-short3', 'compare-short3']],
      C: ['shm-long', ['energy-long', 'ucm-long']],
      D: ['glider-case', 'museum-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (reference circle with the foot of the perpendicular, the velocity of P along the tangent and the drawn x-component matching the slope of A cos(phase); block on a spring at −A, 0, +A with restoring force arrows opposite to the displacement and proportional to it; pendulum with the weight resolved into mg cos θ along the string and mg sin θ along the arc, added back numerically; energy bars with KE + PE = E and PE ∝ x²; worked examples re-derived by numerical integration of the equations of motion): ${svgFails.length} failures`,
    physics_facts: 'x = A cos(ωt + φ), ω = 2π/T = 2πf, v = −Aω sin(ωt + φ) = ±ω√(A² − x²), a = −ω²x; F = −kx, ω² = k/m, T = 2π√(m/k); PE = ½kx², KE = ½k(A² − x²), E = ½kA² (KE = PE at x = A/√2); simple pendulum F = −mg sin θ ≈ −(mg/L)s, T = 2π√(L/g) for small angles; g = 9.8 m s⁻² (1.62 on the Moon and 3.7 on Mars where stated in the stem); every number computed by the build script and re-solved by numerical integration (see README); damped and forced oscillations and resonance are not taught (removed in the rationalisation)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-11-05: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
