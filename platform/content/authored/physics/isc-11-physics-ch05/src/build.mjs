// Build ISC 11 ch05 Newton's Laws of Motion: npx tsx content/authored/physics/isc-11-physics-ch05/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../isc-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, atwoodEnergy, tableHangLin, lampLin, ladderTop, impulseOf, solveLin, gamma } from './phys.mjs';

setChapter(5, 'Newton’s Laws of Motion');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-short.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
const { e1, e2, e3, RC, inc, tb, at, ct, lf, lp, ld, pt } = EX;
const z = (x) => Math.abs(x) < 1e-9;

// worked-example numbers re-derived by independent routes (a linear solve, stepped integration, energy, torques about the top)
const [ax1, N1] = solveLin([[e1.m, 0], [0, 1]], [e1.F * Math.cos(rad(e1.th)), e1.m * g - e1.F * Math.sin(rad(e1.th))]);
ok(near(ax1, e1.ax, 1e-9) && near(N1, e1.Nr, 1e-9), `Example 1: crate ${e1.m} kg, ${e1.F} N at ${e1.th}°: a = ${e1.ax.toFixed(3)} m/s², N = ${e1.Nr.toFixed(2)} N (component equations solved as a linear system)`);
ok(near(impulseOf(() => e2.F1, 0, e2.t1), e2.J, 1e-9) && near(impulseOf(() => e2.F2, 0, e2.t2), e2.J, 1e-9) && near(e2.F1 / e2.F2, e2.t2 / e2.t1, 1e-9), `Example 2: impulse ${e2.J.toFixed(2)} N s: ${e2.F1.toFixed(1)} N over ${e2.t1} s and ${e2.F2.toFixed(1)} N over ${e2.t2} s (areas integrated)`);
ok(near(e3.m * e3.v + e3.M * -e3.V, 0, 1e-9) || z(e3.m * e3.v - e3.M * e3.V), `Example 3: bullet momentum ${e3.p.toFixed(1)} kg m/s balances the rifle's M V = ${(e3.M * e3.V).toFixed(1)}; V = ${e3.V.toFixed(3)} m/s`);
ok(near((0.5 * e3.M * e3.V ** 2) / (0.5 * e3.m * e3.v ** 2), e3.ratio, 1e-9) && near(1 / e3.ratio, 300, 1e-9), `Example 3: K_rifle/K_bullet from the energies = m/M = 1/${(1 / e3.ratio).toFixed(0)}`);
ok(near(RC.m * RC.v, RC.M * RC.V, 1e-9) && near(RC.V, 2, 1e-9) && near(RC.p, 8, 1e-9), `Recoil figure: ${RC.m} × ${RC.v} = ${RC.p} kg m/s = ${RC.M} × ${RC.V}`);
// incline by energy: speed after sliding d down the plane, a = v^2 / 2d
{
  const d = 2;
  const h = d * Math.sin(rad(inc.th));
  const v2 = 2 * g * h;
  ok(near(v2 / (2 * d), inc.a, 1e-9) && near(inc.N, inc.m * g * Math.cos(rad(inc.th)), 1e-9) && near(inc.a, 4.9, 1e-9), `Example 1 (Part 2): smooth ${inc.th}° incline: a = ${inc.a.toFixed(2)} m/s² (energy over 2 m agrees), N = ${inc.N.toFixed(2)} N`);
}
{
  const l = tableHangLin(tb.m1, tb.m2);
  ok(near(l.a, tb.a, 1e-9) && near(l.T, tb.T, 1e-9) && near(tb.a, 3.92, 1e-9), `Table and hanging mass ${tb.m1} kg, ${tb.m2} kg: a = ${tb.a.toFixed(3)} m/s², T = ${tb.T.toFixed(3)} N (linear solve agrees)`);
}
{
  const en = atwoodEnergy(at.m1, at.m2);
  // stepped integration of the two bodies from rest until m1 has moved h
  let x = 0;
  let v = 0;
  let t = 0;
  const dt = 1e-6;
  while (x < at.h) {
    v += en.a * dt;
    x += v * dt;
    t += dt;
  }
  ok(near(en.a, at.a, 1e-9) && near(en.T, at.T, 1e-9) && near(t, at.t, 2e-3) && near(v, at.v, 2e-3), `Example 2 (Part 2): Atwood ${at.m1}, ${at.m2} kg: a = ${at.a.toFixed(3)} m/s², T = ${at.T.toFixed(3)} N, ${at.h} m takes ${at.t.toFixed(3)} s at ${at.v.toFixed(3)} m/s (energy and stepping agree)`);
}
ok(near(ct.F - ct.m1 * ct.a, ct.Fc, 1e-9) && near(ct.Fc, 6, 1e-9) && near(ct.a, 3, 1e-9), `Contact: a = ${ct.a} m/s², contact force ${ct.Fc} N from either block`);
ok(near(lf.Tc, lf.M * (g + lf.a), 1e-9) && near(lf.Nup, 678, 1e-9) && near(lf.Ndown, 498, 1e-9) && near(lf.m * g - lf.Ndown, lf.m * lf.a, 1e-9), `Example 3 (Part 2): lift cable ${lf.Tc.toFixed(1)} N; readings ${lf.Nup.toFixed(0)}, ${lf.Nrest.toFixed(0)}, ${lf.Ndown.toFixed(0)} N`);
{
  const l = lampLin(lp.W, lp.al, lp.be);
  ok(near(l.T1, lp.T1, 1e-9) && near(l.T2, lp.T2, 1e-9) && near(lp.T1 * Math.cos(rad(lp.al)), lp.T2 * Math.cos(rad(lp.be)), 1e-9), `Example 4 (Part 2): lamp ${lp.W} N on ${lp.al}° and ${lp.be}°: T1 = ${lp.T1.toFixed(2)} N, T2 = ${lp.T2.toFixed(2)} N (resolving as a linear system agrees)`);
}
{
  const l = ladderTop(ld.L, ld.th, ld.m);
  ok(near(l.Nw, ld.Nw, 1e-9) && near(l.Nf, ld.Nf, 1e-9) && near(l.Ff, ld.Ff, 1e-9) && near(Math.tan(rad(ld.ang)), 2 * Math.tan(rad(ld.th)), 1e-9), `Example 5 (Part 2): ladder ${ld.L} m, ${ld.m} kg at ${ld.th}°: N_w = ${ld.Nw.toFixed(2)} N (torques about the top agree), floor reaction ${ld.R.toFixed(1)} N at ${ld.ang.toFixed(1)}°, tan = 2 tan θ`);
}
ok(near(pt.p0 + pt.F * 2, 16, 1e-9) && near(gamma(0.6), 1.25, 1e-9) && gamma(0.9) > 2.29 && gamma(0.9) < 2.30 && gamma(0.99) > 7.08 && gamma(0.99) < 7.09 && near((gamma(0.1) - 1) * 100, 0.5038, 1e-3), `Plots: p = ${pt.p0} + ${pt.F}t (slope = F); γ(0.6) = 1.25, γ(0.9) = ${gamma(0.9).toFixed(3)}, γ(0.99) = ${gamma(0.99).toFixed(3)}; 0.1c raises the mass by ${((gamma(0.1) - 1) * 100).toFixed(2)}%`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1205,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['bus-mcq', 'dpdt-mcq', 'rebound-mcq', 'ladder-mcq', 'tension-ar'],
      B: ['card-short', ['weightnormal-short', 'tensionsame-short']],
      C: ['fma-short3', ['recoil-short3', 'atwood-short3']],
      D: ['second-long'],
    },
    long: {
      A: ['ropeway-mcq', 'newton-mcq', 'comp2-mcq', 'area-mcq', 'explode-mcq', 'fbd-mcq', 'atwood-mcq', 'triangle-mcq', 'lamitension-mcq', 'ladderangle-mcq', 'isolated-ar', 'ladder-ar'],
      B: ['law1-short', 'momcons-short', ['liftdown-short', 'fbd-short']],
      C: ['kick-short3', 'third-short3', 'lami-short3', ['contact-short3', 'tablehang-short3']],
      D: ['recoil-long', ['lamp-long', 'ladder-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (every drawn arrow is read back from its pixel coordinates: skaters' forces equal and opposite with m·a equal; impulse triangle area equal to the rectangle at the average force and to the change in momentum; gun and bullet momentum arrows equal and opposite; free-body diagrams of the table-and-hanging-mass system, the Atwood machine, the blocks in contact and the lift with net force equal to m a; smooth incline with W plus N along the slope; lamp forces summing to zero, the force triangle closing and obeying the sine rule; ladder forces balancing with zero torque about the foot and lines of action meeting at one point; worked examples re-derived by a linear solve, energy, stepping and torques about the top): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); F = dp/dt general, F = ma for constant mass, 1 N = 1 kg m s⁻²; mass near c idea only (graph of 1/√(1 − v²/c²), no calculation required); impulse J = FΔt = Δp, area under the F–t graph; conservation of momentum for an isolated system from the second law for the system, the third law obtained from conservation for an isolated pair; recoil V = −mv/M with K_gun/K_bullet = m/M; free-body diagrams with weight, normal reaction, tension; smooth incline N = mg cos θ, a = g sin θ; table and hanging mass a = m₂g/(m₁ + m₂), T = m₁m₂g/(m₁ + m₂); Atwood machine (one pulley) a = (m₁ − m₂)g/(m₁ + m₂), T = 2m₁m₂g/(m₁ + m₂); blocks in contact F_c = m₂F/(m₁ + m₂); lift N = m(g ± a); triangle law, parallelogram law, resolution, Lami T₁ = W cos β/sin(α + β); rigid body ΣF = 0, Στ = 0, three non-parallel coplanar forces concurrent; ladder on a smooth wall N_f = W, F_f = N_w = (W/2) cot θ (the floor horizontal force is only a reaction component found from equilibrium; friction laws are in ch06); two-pulley problems removed by ISC; friction and circular motion are ch06 and ch07',
    content_gate: 'npm test -w @soyl/content-templates: run by the subject-producer',
    verifier_pass: '2026-11-09: every question re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, fs.existsSync(path.join(dir, 'release.json')) ? 'release.json' : 'release.wip.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
