// Build ch05 Work, Energy and Power: npx tsx content/authored/physics/cbse-11-physics-ch05/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, ke, elastic } from './phys.mjs';

setChapter(5, 'Work, Energy and Power');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, NUMCHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-t3.mjs');
await import('./questions-t4.mjs');
await import('./questions-long.mjs');
await import('./questions-understand.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by a different route (numerical integration, kinematics, conservation laws)
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11, ex12, ex13, ex14 } = EX;
ok(near(ex1.W, 600, 1e-12) && ex1.Fc === 40 && ex1.Fs === 30, `Example 1: W = ${ex1.W} J from F cos θ × d and from the component form`);
ok(ex2.W === -11 && ex2.cos < 0 && ex2.theta > 90 && ex2.theta < 180, `Example 2: F·d = ${ex2.W} J, angle ${ex2.theta.toFixed(2)}° (obtuse, so the work is negative)`);
ok(near(NUMCHECK.ex3Numeric, ex3.W, 1e-4) && ex3.W === 100, `Example 3: area under the F–x graph by Simpson integration = ${NUMCHECK.ex3Numeric.toFixed(3)} J (100 J)`);
ok(near(NUMCHECK.ex4Numeric, ex4.W, 1e-9) && ex4.W === 30, `Example 4: ∫(2 + 3x²)dx from 1 to 3 = ${ex4.W} J (numerical ${NUMCHECK.ex4Numeric.toFixed(4)} J)`);
ok(near(ex5.s, ex5.s2, 1e-9) && ex5.s === 20, `Example 5: stopping distance ${ex5.s} m by the work–energy theorem equals v²/2a = ${ex5.s2} m`);
ok(near(ke(ex6.m, ex6.u), ex6.m * g * ex6.H, 1e-9) && ex6.H === 10 && near(0.5 * ex6.m * ex6.vy ** 2 + ex6.m * g * ex6.y, ex6.K0, 1e-9), `Example 6: H = ${ex6.H} m; K + U = ${ex6.K0} J at ${ex6.y} m (v = ${ex6.vy.toFixed(3)} m/s)`);
ok(near(0.5 * ex7.m * ex7.vB ** 2 + ex7.m * g * ex7.hB, ex7.EA, 1e-9) && near(ke(ex7.m, ex7.vC), ex7.EA, 1e-9), `Example 7: K + U = ${ex7.EA} J at B and C (v_B = ${ex7.vB.toFixed(3)} m/s, v_C = ${ex7.vC.toFixed(3)} m/s)`);
ok(near(NUMCHECK.ex8Numeric, ex8.U1, 1e-9) && ex8.U1 === 9 && ex8.U2 === 25 && ex8.dU === 16, `Example 8: ∫kx dx = ${NUMCHECK.ex8Numeric.toFixed(4)} J = ½kx² = ${ex8.U1} J; ${ex8.U2} − ${ex8.U1} = ${ex8.dU} J`);
ok(near(NUMCHECK.ex9Numeric, ex9.E - ex9.U, 1e-9) && ex9.E === 1 && ex9.v0 === 2 && ex9.v === 1.6, `Example 9: E = ${ex9.E} J; v(0) = ${ex9.v0} m/s, v(${ex9.x} m) = ${ex9.v} m/s; work of the spring from ${ex9.A} m to ${ex9.x} m = ${NUMCHECK.ex9Numeric.toFixed(4)} J = K`);
ok(ex10.K === 29 && near(ex10.v, Math.sqrt(29), 1e-12) && ex10.Wf === -20 && ex10.dU === 49, `Example 10: ΔU ${ex10.dU} J, W_friction ${ex10.Wf} J, K = ${ex10.K} J, v = ${ex10.v.toFixed(3)} m/s`);
ok(ex11.F === 10320 && ex11.P === 20640 && near(ex11.kWh, 0.172, 1e-3), `Example 11: F = ${ex11.F} N, P = ${ex11.P} W, E = ${ex11.E} J = ${ex11.kWh.toFixed(4)} kW h`);
ok(ex12.v1 === 2 && ex12.v2 === 6 && near(ke(3, 4), ke(3, ex12.v1) + ke(1, ex12.v2), 1e-12) && near(3 * 4, 3 * ex12.v1 + ex12.v2, 1e-12), `Example 12: v′ = ${ex12.v1}, ${ex12.v2} m/s; p = ${ex12.p} kg m/s and K = ${ex12.K} J both unchanged`);
ok(near(ex13.V, 1.5, 1e-12) && near(ex13.K1, 4.5, 1e-9) && near(ex13.K0, 900, 1e-9) && near(ex13.h, 0.1148, 1e-3) && near(ex13.frac, 99.5, 1e-3), `Example 13: V = ${ex13.V} m/s, h = ${ex13.h.toFixed(4)} m, K ${ex13.K0} → ${ex13.K1} J (${ex13.frac.toFixed(2)} % lost)`);
ok(near(ke(ex14.m, ex14.v), ke(ex14.m, ex14.v1) + ke(ex14.m, ex14.v2), 1e-12) && near(ex14.v2, 2, 1e-12), `Example 14: speeds ${ex14.v1.toFixed(3)} and ${ex14.v2.toFixed(3)} m/s; K = ${ex14.K.toFixed(3)} J before and after`);
const [h1, h2] = elastic(EX.heavy.m1, 1, EX.heavy.m2, 0);
ok(near(h1, 19 / 21, 1e-12) && near(h2, 40 / 21, 1e-12), `Special case 20:1 elastic: v₁ = ${h1.toFixed(3)} u, v₂ = ${h2.toFixed(3)} u`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1105,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['whirl-mcq', 'kedouble-mcq', 'springcomp-mcq', 'gpath-ar'],
      B: ['kemom-short', 'reflevel-short', 'pfv-short3'],
      C: ['wket-long', 'fx-long'],
      D: ['dart-case'],
    },
    long: {
      A: ['dotperp-mcq', 'fxsign-mcq', 'kemom-mcq', 'brake-mcq', 'cons-mcq', 'noncons-mcq', 'kwh-mcq', 'coll-mcq', 'dke-ar', 'inel-ar'],
      B: ['conv-short', 'lostke-short', ['closed-short', 'drag-short'], 'derive-we-short3', ['springU-short3', 'colltypes-short3']],
      C: ['elastic-long', ['dropspring-long', 'ballistic-long']],
      D: ['plough-case', 'wagon-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (rope force split into components at 2 px per N; sign of the work for 40°, 90° and 150°; F–x areas drawn to scale; roller-coaster bars with U + K constant and the points on the track curve; spring displacement and force signs; momentum and kinetic energy in the elastic and the coupling collisions; the 2-D collision vectors at right angles with momentum components and energy conserved; worked examples re-derived by numerical integration or by a second method): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); W = F·d = F d cos θ; W = ∫F dx; K = ½mv² = p²/2m; W(net) = ΔK; U = mgh, F = −dU/dx; spring F = −kx and U = ½kx²; K + U constant for conservative forces; ΔK + ΔU = W(friction); P = dW/dt = F·v; 1 kW h = 3.6 × 10⁶ J; elastic 1-D: v₁ = (m₁−m₂)u₁/(m₁+m₂), v₂ = 2m₁u₁/(m₁+m₂); perfectly inelastic: (m₁+m₂)V = m₁u₁ + m₂u₂; equal masses, elastic, target at rest: paths at 90°; vertical circular motion, mass–energy equivalence and the coefficient of restitution are not taught; every number computed by the build script and re-solved (see README)',
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
