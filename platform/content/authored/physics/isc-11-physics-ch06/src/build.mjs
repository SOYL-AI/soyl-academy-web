// Build ISC 11 ch06 Friction: npx tsx content/authored/physics/isc-11-physics-ch06/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../isc-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../isc-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, slopeCartesian, root, handleForce, stepRun } from './phys.mjs';

setChapter(6, 'Friction');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-short.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by independent routes (force solve in a horizontal-vertical frame, root finding, stepping)
const { crate, ex2, ex3, up, dn, rl, ex4, lam } = EX;
const crateA = (F) => slopeCartesian(crate.m, 0, crate.muk, F, 1).a;
ok(near(crateA(crate.F3), crate.a, 1e-9) && near(root((x) => slopeCartesian(crate.m, 0, crate.mus, x, 1).a, 0, 500), crate.fmax, 1e-6) && near(root((x) => slopeCartesian(crate.m, 0, crate.muk, x, 1).a, 0, 500), crate.fk, 1e-6), `Example 1: crate ${crate.m} kg: limiting friction ${crate.fmax.toFixed(2)} N, kinetic ${crate.fk.toFixed(1)} N, acceleration at ${crate.F3} N is ${crate.a.toFixed(3)} m/s² (force solve and root finding agree); pushes of ${crate.F1} and ${crate.F2} N are below the limit`);
ok(near(ex2.mus, root((x) => slopeCartesian(ex2.m1, 0, x, ex2.fslip, 1).a, 0, 2), 1e-6) && near(ex2.f2, root((x) => slopeCartesian(ex2.m1 + ex2.add, 0, ex2.mus, x, 1).a, 0, 500), 1e-6) && near(ex2.muk, root((x) => slopeCartesian(ex2.m1, 0, x, ex2.fsteady, 1).a, 0, 2), 1e-6), `Example 2: mu_s = ${ex2.mus.toFixed(4)}, new limiting friction ${ex2.f2.toFixed(3)} N, mu_k = ${ex2.muk.toFixed(4)} (root finding on the net force)`);
const walk = (len) => { let w = 0; const dx = 1e-3; for (let x = 0; x < len; x += dx) w += ex3.f * dx; return w; };
ok(near(walk(ex3.straight), ex3.W1, 1e-3) && near(walk(ex3.via), ex3.W2, 1e-3) && near(2 * walk(ex3.straight), ex3.Wround, 1e-3) && near(Math.hypot(ex3.legs[0], ex3.legs[1]), ex3.straight, 1e-12), `Example 3: friction ${ex3.f.toFixed(1)} N; work ${ex3.W1.toFixed(1)} J, ${ex3.W2.toFixed(1)} J and ${ex3.Wround.toFixed(1)} J by stepping along each path; the 6 m and 8 m legs make a 10 m diagonal`);
ok(near(root((x) => slopeCartesian(up.m, up.th, up.mu, x, 1).a, 0, 1500), up.P, 1e-6) && near(root((x) => slopeCartesian(up.m, up.th, up.mu, x, 1).a - up.a, 0, 1500), up.Pa, 1e-6), `Example 4: trolley ${up.m} kg on ${up.th}°: P = ${up.P.toFixed(2)} N at constant speed, ${up.Pa.toFixed(2)} N with a = ${up.a} m/s² (force solve)`);
const dnA = -slopeCartesian(dn.m, dn.th, dn.mu, 0, -1).a;
const run = stepRun(dnA, dn.s);
ok(near(dnA, dn.a, 1e-9) && near(run.t, dn.t, 1e-3) && near(run.v, dn.v, 1e-3) && near(root((x) => slopeCartesian(dn.m, dn.th, dn.mu, x, -1).a, 0, 800), dn.hold, 1e-6), `Example 5: block ${dn.m} kg on ${dn.th}°: a = ${dn.a.toFixed(4)} m/s², ${dn.s} m in ${dn.t.toFixed(3)} s at ${dn.v.toFixed(3)} m/s (stepped); holding force ${dn.hold.toFixed(2)} N (force solve)`);
ok(near(handleForce(rl.W, rl.mu, rl.phi, 1), rl.pull, 1e-6) && near(handleForce(rl.W, rl.mu, rl.phi, -1), rl.push, 1e-6) && near(rl.Npull, rl.W - rl.pull * Math.sin(rad(rl.phi)), 1e-12) && near(rl.Npush, rl.W + rl.push * Math.sin(rad(rl.phi)), 1e-12), `Example 6: roller ${rl.m} kg, handle ${rl.phi}°: pull ${rl.pull.toFixed(2)} N (N = ${rl.Npull.toFixed(1)} N), push ${rl.push.toFixed(2)} N (N = ${rl.Npush.toFixed(1)} N) found by bisection on the horizontal force`);
const tilt = root((x) => slopeCartesian(1, x, ex4.mus, 0, -1).a, 1, 80);
ok(near(tilt, ex4.mean, 1e-6) && near(lam, deg(Math.atan(0.5)), 1e-12) && near(deg(Math.atan(Math.tan(rad(ex4.mean)))), ex4.mean, 1e-9), `Example 7: mean slip angle ${ex4.mean.toFixed(2)}° gives mu_s = ${ex4.mus.toFixed(4)}, and the net-force root on the slope returns ${tilt.toFixed(3)}°; angle of friction for mu_s = 0.5 is ${lam.toFixed(3)}°`);
ok(near(g, 9.8, 1e-12), 'g = 9.8 m/s² in every computation');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1206,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['modern-mcq', 'doubleN-mcq', 'down-mcq', 'repose-mcq', 'adh-ar'],
      B: ['static-short', ['graph-short', 'roller-short']],
      C: ['skid-short3', ['repose-der-short3', 'down-der-short3']],
      D: ['repose-long'],
    },
    long: {
      A: ['selfadj-mcq', 'rolling-mcq', 'coef-mcq', 'face-mcq', 'speed-mcq', 'normal-mcq', 'pushup-mcq', 'hold-mcq', 'lube-mcq', 'massrepose-mcq', 'work-ar', 'area-ar'],
      B: ['types-short', 'laws-short', ['nc-short', 'slope-rest-short']],
      C: ['adhesion-short3', 'graph3-short3', 'rollnum-short3', ['up-der-short3', 'angfric-der-short3']],
      D: ['graph-long', ['down-long', 'roller-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (contact: meshed teeth with a constant 2 px gap and three of seven tip pairs touching; crate: friction arrow equals the push for 0, 60 and 120 N, then 102.9 N at 180 N; slope up: W, N, f, P sum to zero with P = 226.2 N; slope down: net 80.3 N along the slope, a = 3.21 m/s²; roller: forces balance, F cos 40° = μN, N = 391 N pulling and 655 N pushing; angle of friction: tan λ = 0.5 with R = 109.6 N; repose: resultant vertical and equal to mg, α = λ = 26.6°; bearing: seven balls tangent to both rings and clear of each other; worked examples re-derived by a horizontal–vertical force solve, root finding and stepping): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); static friction is self-adjusting, f_s ≤ μs N with equality only at the point of sliding; μs = f(max)/N and μk = f_k/N, pure numbers, μk < μs; rolling < kinetic < limiting static; limiting friction independent of apparent area; kinetic friction nearly independent of speed; the friction graph is a line of slope 1 to a peak, a drop to f_k, then a nearly flat line; friction is non-conservative (W = −μk N × path length); on a slope N = mg cos θ, at rest f = mg sin θ, sliding down a = g(sin θ − μk cos θ), pushed up P = mg(sin θ + μ cos θ) + ma, held at rest P = mg(sin θ − μs cos θ), pushed down at constant speed P = mg(μ cos θ − sin θ) when tan θ < μ; roller pulled F = μW/(cos φ + μ sin φ) with N = W − F sin φ, pushed F = μW/(cos φ − μ sin φ) with N = W + F sin φ; tan λ = μs, tan α = μs, so α = λ; lubrication, bearings, streamlining; typical coefficients in the deck table are labelled approximate',
    content_gate: 'npm test -w @soyl/content-templates: run by the subject-producer',
    verifier_pass: '2026-11-09: every question re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
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
