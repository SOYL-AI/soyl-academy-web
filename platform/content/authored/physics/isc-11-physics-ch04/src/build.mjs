// Build ISC 11 ch04 Projectile Motion: npx tsx content/authored/physics/isc-11-physics-ch04/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../isc-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, projNumeric, velNumeric, deg } from './phys.mjs';

setChapter(4, 'Projectile Motion');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-short.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by stepping the motion numerically (independent of the closed forms used on the slides)
const { M, ex1, ex2, ex3, ex4, ex5, ex6 } = EX;
const nM = projNumeric(M.u, M.th);
ok(near(nM.T, M.T, 1e-4) && near(nM.H, M.H, 1e-4) && near(nM.R, M.R, 1e-4) && M.T === 4 && M.tTop === 2 && M.H === 19.6, `strobe ball: T = ${M.T} s, H = ${M.H} m, R = ${M.R} m agree with a stepped integration`);
ok(near(ex1.y, 14.7, 1e-6) && near(ex1.x, M.ux * 3, 1e-6), `Example 1: at ${ex1.t} s the ball is ${ex1.x.toFixed(2)} m along and ${ex1.y.toFixed(2)} m up (${M.uy} × 3 − 4.9 × 9 = 14.7)`);
const n2 = projNumeric(ex2.u, ex2.th);
ok(near(n2.T, ex2.T, 1e-4) && near(n2.H, ex2.H, 1e-4) && near(n2.R, ex2.R, 1e-4), `Example 2 and 4: goal kick T = ${ex2.T.toFixed(3)} s, H = ${ex2.H.toFixed(3)} m, R = ${ex2.R.toFixed(3)} m agree with the stepped integration`);
ok(near(projNumeric(ex3.u, ex3.th1).R, ex3.R, 1e-3) && near(projNumeric(ex3.u, ex3.th2).R, ex3.R, 1e-3) && near(projNumeric(ex3.u, 45).R, ex3.Rmax, 1e-4), `Example 3: ${ex3.th1.toFixed(2)}° and ${ex3.th2.toFixed(2)}° both reach ${ex3.R} m; 45° reaches ${ex3.Rmax.toFixed(2)} m`);
const [vx4, vy4] = velNumeric(ex2.u, ex2.th, ex4.t);
ok(near(Math.hypot(vx4, vy4), ex4.v, 1e-5) && near(deg(Math.atan2(vy4, vx4)), -ex4.ang, 1e-5), `Example 4: velocity at ${ex4.t} s by differencing the position: ${Math.hypot(vx4, vy4).toFixed(3)} m/s at ${ex4.ang.toFixed(2)}° below the horizontal`);
const drop = (h) => { let y = h; let v = 0; let t = 0; const dt = 1e-6; while (y > 0) { v += g * dt; y -= v * dt; t += dt; } return { t, v }; };
const d5 = drop(ex5.h);
const d6 = drop(ex6.h);
ok(near(d5.t, ex5.T, 1e-3) && near(Math.hypot(ex5.u, d5.v), ex5.v, 1e-3), `Example 5: fall of ${ex5.h} m takes ${ex5.T.toFixed(3)} s, lands ${ex5.R.toFixed(2)} m away at ${ex5.v.toFixed(2)} m/s (stepped fall agrees)`);
ok(near(d6.t, ex6.T, 1e-3) && near(ex6.T, 10, 1e-9) && near(ex6.R, 200, 1e-9) && near(Math.hypot(ex6.u, d6.v), ex6.v, 1e-3), `Example 6: fall of ${ex6.h} m takes ${ex6.T} s, R = ${ex6.R} m, v = ${ex6.v.toFixed(2)} m/s (stepped fall agrees)`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1204,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['hvel-mcq', 'traj-mcq', 'compl-mcq', 'hspeed-mcq', 'hconst-ar'],
      B: ['indep-short', ['fortyfive-short', 'vtop-short']],
      C: ['trajder-short3', ['rder-short3', 'velder-short3']],
      D: ['horiz-long'],
    },
    long: {
      A: ['acctop-mcq', 'dropthrow-mcq', 'comps-mcq', 'tratio-mcq', 'rmax-mcq', 'rh-mcq', 'angle-mcq', 'landspeed-mcq', 'htime-mcq', 'hpath-mcq', 'topzero-ar', 'range45-ar'],
      B: ['terms-short', 'r4h-short', ['hnum-short', 'rnum-short']],
      C: ['tofder-short3', 'hder-short3', 'hprojder-short3', ['landv-short3', 'twoang-short3']],
      D: ['range-long', ['vel-long', 'packet-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (strobe ball: equal horizontal gaps of 33.9 m, vertical arrows shrinking by 9.8 m/s per second, top at half the range; terms figure H/R = tan θ / 4 with H = 39.2 m and R = 156.8 m at 45°; complementary angles land together at 135.8 m with 45° at 156.8 m; velocity arrows tangent to the path with the stated magnitudes and a direction of 16.1° below the horizontal at 3 s; horizontal launch drawn at 6.6 px per metre with T = 2 s, R = 40 m and landing velocity 28.0 m/s; thrown and dropped balls at equal heights at every instant; worked examples re-derived by stepped integration): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); neglecting air resistance, launch and landing on one level; horizontal a = 0, vertical a = −g; x = (u cos θ)t, y = (u sin θ)t − ½gt²; trajectory y = x tan θ − g x²/(2u² cos² θ), a parabola; T = 2u sin θ/g, H = u² sin² θ/2g, R = u² sin 2θ/g; R_max = u²/g at 45°, R = 4H at 45°, H/R = tan θ/4; complementary angles give equal ranges; v_x = u cos θ, v_y = u sin θ − gt, tan α = v_y/v_x; speed least at the top (u cos θ), landing speed equals u at the launch level; horizontal projection T = √(2h/g), R = u√(2h/g), v = √(u² + 2gh), path y = g x²/(2u²); projectile motion on an inclined plane is not taught (removed by ISC)',
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
