// Build ISC 11 ch07 Circular Motion: npx tsx content/authored/physics/isc-11-physics-ch07/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../isc-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, TAU, root, accFD, speedFD, stepRotation, bankAngle, levelVmax, circleRun } from './phys.mjs';

setChapter(7, 'Circular Motion');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-short.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by independent routes (finite differences of the position on the circle, stepping, root finding, a stepped pendulum)
const { A0, pot, fan, cyc, stn, lv, bk, rail, bkt } = EX;
ok(near(speedFD(A0.r, A0.w), A0.v, 1e-5) && near(accFD(A0.r, A0.w), A0.ac, 1e-5) && near(A0.s, A0.r * A0.th, 1e-12), `Figure arc: r = ${A0.r} m, θ = ${A0.th} rad in ${A0.t} s: s = ${A0.s.toFixed(2)} m, ω = ${A0.w.toFixed(2)} rad/s, v = ${A0.v.toFixed(2)} m/s, a = ${A0.ac.toFixed(2)} m/s² (finite differences of the position agree)`);
ok(near(speedFD(pot.R, pot.w), pot.v, 1e-5) && near(speedFD(pot.r2, pot.w), pot.v2, 1e-5) && near(TAU / pot.T, pot.w, 1e-12), `Example 1: potter's wheel ${pot.rpm} rpm: ω = ${pot.w.toFixed(4)} rad/s, T = ${pot.T.toFixed(2)} s, rim ${pot.v.toFixed(4)} m/s, ${pot.v2.toFixed(4)} m/s at ${pot.r2} m (position differences)`);
const fs_ = stepRotation(0, fan.alpha, fan.t);
ok(near(fs_.w, fan.w, 1e-6) && near(fs_.th, fan.th, 1e-4) && near(accFD(fan.R, fs_.w), fan.ac, 1e-5) && near(Math.hypot(fan.R * fan.alpha, accFD(fan.R, fs_.w)), fan.a, 1e-6), `Example 2: fan tip: ω = ${fan.w} rad/s, θ = ${fan.th} rad (${fan.turns.toFixed(2)} turns), a_t = ${fan.at.toFixed(2)}, a_c = ${fan.ac.toFixed(1)}, total ${fan.a.toFixed(3)} m/s² (stepped rotation and position differences)`);
ok(near(accFD(cyc.R, cyc.v / cyc.R), cyc.a, 1e-5) && near(cyc.m * accFD(cyc.R, cyc.w), cyc.F, 1e-5), `Example 3: cyclist ${cyc.v} m/s on ${cyc.R} m: a = ${cyc.a.toFixed(2)} m/s², F = ${cyc.F.toFixed(1)} N (position differences)`);
ok(near(stn.m * accFD(stn.R, stn.w), stn.T, 1e-5) && near(root((w) => stn.m * w * w * stn.R - stn.Tbreak, 0, 100), stn.wmax, 1e-9), `Example 4: stone ${stn.m} kg on ${stn.R} m at ${stn.f} rev/s: T = ${stn.T.toFixed(3)} N; ω_max = ${stn.wmax.toFixed(3)} rad/s for ${stn.Tbreak} N (root finding)`);
ok(near(levelVmax(lv.dry, lv.R), lv.vd, 1e-6) && near(levelVmax(lv.wet, lv.R), lv.vw, 1e-6) && near(levelVmax(lv.icy, lv.R), lv.vi, 1e-6), `Level road r = ${lv.R} m: v_max ${lv.vd.toFixed(3)} (μ = ${lv.dry}), ${lv.vw.toFixed(3)} (μ = ${lv.wet}), ${lv.vi.toFixed(3)} m/s (μ = ${lv.icy}) by root finding on the force balance`);
ok(near(bankAngle(bk.v, bk.r), bk.th, 1e-6) && near(bk.N * Math.sin(rad(bk.th)), bk.Fc, 1e-9) && near(bk.N * Math.cos(rad(bk.th)), bk.W, 1e-9), `Banking example: ${bk.v} m/s on ${bk.r} m banks at ${bk.th.toFixed(3)}° (root finding); N = ${bk.N.toFixed(1)} N, N sin θ = ${bk.Fc.toFixed(0)} N = mv²/r`);
ok(near(rail.l * Math.sin(rad(bankAngle(rail.v, rail.r))), rail.h, 1e-6) && near(rail.happrox, rail.h, 0.01), `Rail example: ${rail.v} m/s on ${rail.r} m, gauge ${rail.l} m: h = ${rail.h.toFixed(4)} m (l sin θ), approximation ${rail.happrox.toFixed(4)} m`);
const vtop = circleRun(bkt.R, bkt.vbot, Math.PI, 2e-5);
const run5 = circleRun(bkt.R, bkt.vb2, 0, 1e-4);
const runTop = circleRun(bkt.R, bkt.vb2, Math.PI, 2e-5);
ok(vtop !== null && near(vtop.v, bkt.vtop, 2e-3) && near(bkt.m * circleRun(bkt.R, bkt.vbot, 0, 1e-4).T, bkt.Tbot, 1e-6) && runTop !== null && near(bkt.m * runTop.T, bkt.Ttop, 2e-3) && near(bkt.m * run5.T, bkt.Tb2, 1e-6), `Bucket example: ${bkt.m} kg on ${bkt.R} m: top ${bkt.vtop.toFixed(3)} m/s, bottom ${bkt.vbot.toFixed(3)} m/s, T_bottom = ${bkt.Tbot.toFixed(1)} N for the least speed, T_top = ${bkt.Ttop.toFixed(3)} N at ${bkt.v} m/s (stepped pendulum)`);
ok(near(g, 9.8, 1e-12), 'g = 9.8 m/s² in every computation');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1207,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['vr-mcq', 'adirection-mcq', 'levelforce-mcq', 'topmin-mcq', 'cf-ar'],
      B: ['vrder-short', ['whybank-short', 'tbigger-short']],
      C: ['ac-der-short3', ['level-der-short3', 'top-der-short3']],
      D: ['bank-long'],
    },
    long: {
      A: ['omegadir-mcq', 'rpm-mcq', 'ac-double-mcq', 'who-mcq', 'doublecount-mcq', 'wet-mcq', 'bankwho-mcq', 'bankang-mcq', 'bottom-min-mcq', 'tdiff-mcq', 'vmax-ar', 'top-ar'],
      B: ['radian-short', 'accel-short', ['railwhy-short', 'skid-short']],
      C: ['fanrot-short3', 'bank-der-short3', 'bot-der-short3', ['twocars-short3', 'hammer-short3']],
      D: ['centripetal-long', ['level-long', 'vcircle-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (angular displacement: A and B on the circle, angle AOB = θ = 0.9 rad, arc s = rθ = 1.8 m, v = rω = 3.0 m/s drawn perpendicular to OB; velocity triangle: |v1| = |v2| = 5 m/s, angle 50° = Δθ, Δv = v2 − v1 points from the chord midpoint to the centre, |Δv| = 2v sin(Δθ/2) = 4.23 m/s, triangle closes; three centripetal forces: arrows along the line to the centre, velocity perpendicular; level road: N = W, f = μN = mv²/r with v = 18.78 m/s; banked road: road at 22.2° with tan θ = v²/(rg), N perpendicular to the road, N cos θ = mg, N sin θ = mv²/r = 3200 N, resultant W + N drawn horizontal towards the centre; railway: outer rail h = l sin θ = 0.136 m on a 300 px sleeper, θ = 4.67° from tan θ = v²/(rg); vertical circle: mv²/r = mg at the top with T = 0, v_bottom² = v_top² + 4gr, T = 6mg = 29.4 N drawn six times W; worked examples re-derived by position differences, stepped rotation, root finding and a stepped pendulum): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); s = rθ, v = rω along the tangent, a_t = rα, ω = 2π/T = 2πf; constant α: ω = ω0 + αt and θ = ω0 t + ½αt²; uniform circular motion has a = v²/r = ω²r = vω = 4π²r/T² towards the centre (derived from the velocity triangle, |Δv| ≈ vΔθ); centripetal force mv²/r is the name of a direction, never a separate force, and does no work; level road v_max = √(μrg), independent of mass; banked road N cos θ = mg, N sin θ = mv²/r, tan θ = v²/(rg), no friction at the design speed; railway h = l sin θ ≈ l v²/(rg); vertical circle on a string: top T + mg = mv²/r with least speed √(gr) (T = 0), bottom T − mg = mv²/r with least speed √(5gr) from v_b² = v_t² + 4gr, T_bottom − T_top = 6mg for any speed; conical pendulum is not taught (removed from the syllabus)',
    content_gate: 'npm test -w @soyl/content-templates: run by the subject-producer',
    verifier_pass: '2026-11-09: every question re-solved from its stem by the writer; 2026-11-10: subject-producer review re-solved every item, checked keys, schemes, scope, slides and diagrams and fixed the findings — see README "Verifier pass"',
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
