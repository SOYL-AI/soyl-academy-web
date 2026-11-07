// Build ch04 Laws of Motion: npx tsx content/authored/physics/cbse-11-physics-ch04/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(4, 'Laws of Motion');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, NUMCHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-t34.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
const { cart, ball, gun, wag, exp, blk, inc2, whirl, lvl, bk, rough, atw } = EX;
ok(near(cart.p, 2000, 1e-12) && near(NUMCHECK.cartP, cart.p, 1e-9) && near(cart.rate, cart.F, 1e-12), `Example 1: p = ${cart.p} kg m/s and Δp/Δt = ${cart.rate} N = F`);
ok(near(NUMCHECK.ballArea, ball.J, 1e-6) && near(ball.J, 10.08, 1e-9), `Example 2: area of the triangular F–t pulse (Simpson) = ${NUMCHECK.ballArea.toFixed(4)} N s = m(v + u) = ${ball.J.toFixed(2)} N s`);
ok(near(NUMCHECK.gunP, 0, 1e-9) && near(gun.V, 2, 1e-12) && near(gun.keB / gun.keR, gun.M / gun.m, 1e-9), `Example 6: rifle recoil ${gun.V} m/s; momenta cancel; KE ratio M/m = ${gun.M / gun.m}`);
ok(near(wag.V, 1.2, 1e-12) && near(exp.v2, 17.5, 1e-12) && near(NUMCHECK.expP, 0, 1e-9) && exp.keAfter > exp.keBefore, `Examples 7 and the burst table: wagons ${wag.V} m/s; burst piece ${exp.v2} m/s, momentum conserved, kinetic energy ${exp.keBefore} J → ${exp.keAfter} J`);
ok(near(blk.fmax, 117.6, 1e-9) && near(blk.fk, 78.4, 1e-9) && blk.F1 < blk.fmax && blk.F2 > blk.fmax, `Example 9: limiting friction ${blk.fmax} N, kinetic ${blk.fk} N; the ${blk.F1} N push is below the limit, ${blk.F2} N above`);
ok(inc2.tan > inc2.mus, `Example 10: tan ${inc2.theta}° = ${inc2.tan.toFixed(3)} exceeds μs = ${inc2.mus}, so the block slides`);
ok(near(whirl.T, whirl.m * (whirl.w * whirl.r) ** 2 / whirl.r, 1e-9) && near(lvl.v ** 2 / lvl.r, lvl.mu * 9.8, 1e-9) && bk.vmax > bk.v0 && bk.mu > bk.tan, `Examples 12–14: T = m v²/r with v = ωr; level road v² / r = μ g; banked v max ${bk.vmax.toFixed(2)} > v0 ${bk.v0.toFixed(2)} m/s; μ > tan θ so no lower limit`);
ok(near(rough.a, 2.45, 1e-9) && near(rough.T, 22.05, 1e-9) && near(atw.a, 2.45, 1e-9) && near(atw.T, 36.75, 1e-9), `Examples 5 and 11: Atwood a = ${atw.a} m/s², T = ${atw.T} N; rough table a = ${rough.a} m/s², T = ${rough.T} N`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1104,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['atw-mcq', 'repose-mcq', 'bank-mcq', 'recoil-ar'],
      B: ['foam-short', 'skid-short', 'rocket-short3'],
      C: ['impulse-long', 'incline-long'],
      D: ['incline-case'],
    },
    long: {
      A: ['bus-mcq', 'lift-mcq', 'burst-mcq', 'skater-mcq', 'friction-mcq', 'walking-mcq', 'circ-mcq', 'lvl-mcq', 'fric-ar', 'bank-ar'],
      B: ['train-short', 'wheel-short', ['pairbook-short', 'lean-short'], 'lift-short3', ['repose-short3', 'bank-derive']],
      C: ['cons-long', ['conn-long', 'bank-long']],
      D: ['lift-case', 'bank-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (every free-body diagram's drawn vectors are summed and compared with m a: contact pair of blocks, block at rest on a slope, blocks over a pulley, three lift readings, force triangle of a lamp on two ropes, equal and opposite recoil momenta, level and banked road with the net horizontal force m v²/r, four-point circular motion with v perpendicular to a; worked examples re-derived by independent solves): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); F = dp/dt, F = ma for constant mass; impulse = ∫F dt = Δp; third-law pairs act on different bodies; lift reading N = m(g ± a); a = m₂g/(m₁ + m₂) and T = m₁a on a smooth table, Atwood a = (m₂ − m₁)g/(m₁ + m₂); momentum conserved with no external force (recoil, explosion, sticking collision; KE not conserved); f_s ≤ μ_s N, f_k = μ_k N, angle of repose tan θ = μ_s, independence of apparent area; a_c = v²/r = ω²r; level road v max = √(μ r g); banked road tan θ = v²/(rg) and v max = √(rg(μ + tan θ)/(1 − μ tan θ)); every number computed by the build script and re-solved (see README)',
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
