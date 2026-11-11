// Build ISC 11 ch08 Work, Energy and Power: npx tsx content/authored/physics/isc-11-physics-ch08/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../isc-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, c, rad, trapz, piecewise, stopDist, pendulumSpeed, springSpeedAt, fallSpeed } from './phys.mjs';

setChapter(8, 'Work, Energy and Power');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-short.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
const { tow, vf, stop, can, ref, sp, pth, fl, pd, co, os, em, lift, pump, car, kwh } = EX;
// worked-example numbers re-derived by independent routes (dot product, numerical integration of the force, stepping the motion)
const dotW = (tow.F * Math.cos(rad(tow.th))) * tow.S + (tow.F * Math.sin(rad(tow.th))) * 0;
ok(near(dotW, tow.W, 1e-12) && near(trapz(() => tow.F * Math.cos(rad(tow.th)), 0, tow.S, 3000), tow.W, 1e-9), `Example 1: strap ${tow.F} N at ${tow.th}° through ${tow.S} m: W = ${tow.W.toFixed(2)} J by the dot product and by integrating the along-track component`);
ok(near(trapz(piecewise(vf.pts), 0, 9, 90000), vf.W, 1e-6) && vf.areas.join() === '30,120,60', `Example 2: handcart graph, numerical integration of the force gives ${vf.W} J = 30 + 120 + 60`);
ok(near(stopDist(stop.m, stop.v1, stop.F), stop.s1, 1e-3) && near(stopDist(stop.m, stop.v2, stop.F), stop.s2, 1e-3) && near(stop.k, 0.1, 1e-12), `Example 3: stepped stopping distances ${stop.s1.toFixed(2)} m and ${stop.s2.toFixed(2)} m at ${stop.v1} and ${stop.v2} m/s (s = 0.1 v² for 1200 kg, 6000 N, the plotted curve)`);
ok(near(trapz(() => can.m * g, 0, can.h, 1000), can.U, 1e-9) && near(ref.diff, ref.relTable, 1e-12), `Potential energy: lifting ${can.m} kg through ${can.h} m takes ${can.U.toFixed(1)} J by summing the lifting force; the 2 kg ball's shelf-to-table difference is ${ref.diff.toFixed(2)} J for either zero level`);
ok(near(trapz((x) => sp.k * x, sp.x1, sp.x2), sp.W, 1e-9) && near(trapz((x) => sp.k * x, 0, sp.x2), sp.U2, 1e-9) && near(sp.Um / sp.U1, 4, 1e-12) && near(sp.U2 / sp.U1, 9, 1e-12), `Example 4: spring k = ${sp.k}: integral of kx dx gives ${sp.U1.toFixed(2)} J, ${sp.U2.toFixed(2)} J and ${sp.W.toFixed(2)} J for the stretch from ${sp.x1} to ${sp.x2} m; energy ratios 1 : 4 : 9`);
ok(near(Math.hypot(pth.legs[0], pth.legs[1]), 13, 1e-12) && near(-(pth.m * g * (pth.h / pth.ramp)) * pth.ramp, pth.Wg, 1e-12) && near(Math.hypot(pth.base, pth.h), pth.ramp, 1e-12), `Two paths: 5-12-13 ramp, gravity −${(-pth.Wg).toFixed(1)} J on both routes (weight component × 13 m); friction −${(-pth.Wf1).toFixed(0)} J and −${(-pth.Wf2).toFixed(0)} J`);
ok(near(fallSpeed(fl.H - fl.h1), fl.v1, 1e-3) && near(fallSpeed(fl.H), fl.vg, 1e-3) && near(fl.U1 + fl.K1, fl.E, 1e-12), `Example 5: stepped fall gives ${fl.v1.toFixed(2)} m/s after 25 m and ${fl.vg.toFixed(2)} m/s after 40 m; K + U = ${fl.E.toFixed(0)} J at 15 m`);
ok(near(pendulumSpeed(pd.L, pd.th0), pd.v, 2e-3) && near(pendulumSpeed(pd.L, pd.th0, pd.th2), pd.v2, 2e-3), `Example 6: stepping the pendulum equation of motion gives ${pd.v.toFixed(3)} m/s at the lowest point and ${pd.v2.toFixed(3)} m/s at ${pd.th2}°`);
ok(co.speeds.every((s, i) => i === 0 || near(fallSpeed(co.H - co.pts[i][1]), s, 2e-3)), `Roller coaster: stepped free-fall speeds through the drops (${co.speeds.slice(1).map((s) => s.toFixed(1)).join(', ')} m/s at B, C, D)`);
ok(near(springSpeedAt(os.m, os.k, os.A, 0), os.vmax, 3e-3) && near(springSpeedAt(os.m, os.k, os.A, os.x), os.v, 3e-3) && near(os.U + os.K, os.E, 1e-12) && near(os.xeq, 0.056569, 1e-4) && near(os.T, 0.251327, 1e-5), `Example 7: stepping the block-spring motion gives ${os.vmax.toFixed(2)} m/s at the centre and ${os.v.toFixed(3)} m/s at x = ${os.x} m; T = ${os.T.toFixed(4)} s`);
ok(near(em.E, 2.25e11, 1e-12) && near(em.years, em.E / 100 / 31536000, 1e-12), `E = mc²: ${(em.dm * 1e6).toFixed(1)} mg gives ${em.E.toExponential(2)} J, ${em.years.toFixed(1)} years of a 100 W bulb`);
let Ework = 0;
for (let i = 0; i < 10000; i++) Ework += lift.M * g * lift.v * 0.001;
ok(near(Ework / 10, lift.P, 1e-6) && near(pump.W / pump.t, pump.P, 1e-12) && near(car.F * car.v, car.P, 1e-12) && near(kwh.J, kwh.E * 3.6e6, 1e-12), `Example 8 and 9: lift ${lift.P.toFixed(0)} W by summing work per second, pump ${pump.P.toFixed(0)} W, car ${car.P} W; ${kwh.E} kW h = ${kwh.J} J`);
ok(near(g, 9.8, 1e-12) && near(c, 3.0e8, 1e-12), 'g = 9.8 m/s² and c = 3.0 × 10⁸ m/s in every computation');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1208,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['wzero-mcq', 'stop-mcq', 'noncons-mcq', 'fallhalf-mcq', 'osc-ar'],
      B: ['area-short', ['conserve-short', 'kwh-short']],
      C: ['spder-short3', ['pfvder-short3', 'coast-short3']],
      D: ['wet-long'],
    },
    long: {
      A: ['angle-mcq', 'neg-mcq', 'pk-mcq', 'kecalc-mcq', 'sp3-mcq', 'pe-mcq', 'pend-mcq', 'osc-mcq', 'pwr-mcq', 'kwh-mcq', 'fric-ar', 'cars-ar'],
      B: ['neg-short', 'ugraph-short', ['nopot-short', 'emc-short']],
      C: ['stop3-short3', 'sp2-short3', 'wetder-short3', ['fallder-short3', 'pendE-short3']],
      D: ['osc-long', ['spring-long', 'power-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (trolley: strap arrow 90 N at 35° with components 73.7 N and 51.6 N, F·S = 884.7 J; handcart graph: pixel areas 30, 120 and 60 J add to 210 J and agree with numerical integration; spring graph: triangle area ½kx² = 3.6 J, slope 500 N/m; spring: equal stretch and compression of 0.12 m, force 60 N opposing the displacement; falling stone: PE + KE bars add to 784 J at all five heights and v² = 2g(drop); pendulum: bob at 1.5 m from the pivot at all three positions, h = L(1 − cos 50°); roller coaster: markers on the track, all below the start; oscillator: four positions, U + K bars add to 0.80 J, v max 2.00 m/s; worked examples re-derived by dot product, integration and stepping the motion): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it) and c = 3.0 × 10⁸ m s⁻¹; W = F·S = FS cos θ with θ between the force and the displacement; work by a variable force is the area under the F–S graph; K = ½mv² = p²/2m; the net work equals the change in kinetic energy (derived for a constant force); stopping distance s = mv²/2F; U = mgh with a free zero of potential energy; spring F = −kx, U = ½kx² (area and integral); a conservative force does path-independent work, zero round a closed path; E = K + U conserved when only conservative forces do work (tension and normal reaction do no work); v = √(2g·drop), pendulum v = √(2gL(1 − cos θ₀)); oscillating spring U + K = ½kA² with U an upward parabola, K an inverted parabola, E a horizontal line, crossing at E/2 where x = ±A/√2, shown from the work done by the spring (U = E cos² ωt, K = E sin² ωt against time only as a preview of Oscillations); E = mc² as a statement; P = W/t and P = F·v, 1 kW h = 3.6 × 10⁶ J; collisions are chapter 9 and are not taught',
    content_gate: 'npm test -w @soyl/content-templates: run by the subject-producer',
    verifier_pass: '2026-11-10: every question re-solved from its stem by the writer; then the subject-producer review re-solved every item, checked keys, schemes, scope, slides and diagrams and fixed the findings — see README "Verifier pass"',
  },
  extraErrors: svgFails,
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, fs.existsSync(path.join(dir, 'release.json')) ? 'release.json' : 'release.wip.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
