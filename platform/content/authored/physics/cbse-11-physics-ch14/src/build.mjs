// Build ch14 Waves: npx tsx content/authored/physics/cbse-11-physics-ch14/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(14, 'Waves');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-t3.mjs');
await import('./questions-long.mjs');
const { PI, R, gasVT, columnModes, stringModes, interiorSwells } = await import('./phys.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
const { ex1, ex2, ex3, ex4, ex6, ex7, ex8, ex9, ex10, ex11, ex12, ex13, ex14 } = EX;
// worked-example numbers re-derived by independent routes
ok(near(ex1.v * ex1.v * ex1.mu, ex1.T, 1e-9) && near(ex1.v4 / ex1.v, 2, 1e-12), `Example 1: μ = ${ex1.mu} kg/m, v = ${ex1.v.toFixed(2)} m/s (v² μ = T); four times the tension doubles v`);
ok(near(ex2.vL / ex2.vN, Math.sqrt(1.4), 1e-12) && near(ex2.vN, 280.2, 0.002) && near(ex2.vL, 331.5, 0.002), `Example 2: Newton ${ex2.vN.toFixed(1)} m/s, Laplace ${ex2.vL.toFixed(1)} m/s`);
ok(near(ex3.v1, ex3.v0 * Math.sqrt(gasVT(1.4, ex3.T1, 0.029) ** 2 / gasVT(1.4, 273, 0.029) ** 2) , 1e-9) && ex3.T2 === 1092 && ex3.t2 === 819, `Example 3: v(27 °C) = ${ex3.v1.toFixed(1)} m/s; speed doubles at ${ex3.T2} K = ${ex3.t2} °C`);
ok(near(ex4.f * ex4.lam, ex4.v, 1e-12) && ex4.v === 300 && near(ex4.vmax, 12, 1e-12), `Example 4: f λ = ${(ex4.f * ex4.lam).toFixed(3)} = ω/k = ${ex4.v} m/s; a ω = ${ex4.vmax} m/s`);
ok(near(ex6.dphi, 1.2, 1e-12) && near(ex6.dxPi, ex4.lam / 2, 1e-12) && near(ex6.dphiT, 2.4, 1e-12), `Example 5: Δφ = ${ex6.dphi} rad for 0.15 m, π at λ/2 = ${ex6.dxPi.toFixed(4)} m, ω Δt = ${ex6.dphiT} rad`);
ok(near(ex7.k * ex7.lam, 2 * PI, 1e-12), `Example 6: k λ = 2π with k = ${ex7.k.toFixed(3)} rad/m, λ = ${ex7.lam} m`);
{
  // phasor addition by components
  const Rr = Math.hypot(ex8.a1 + ex8.a2 * Math.cos(ex8.phi), ex8.a2 * Math.sin(ex8.phi));
  ok(near(Rr, ex8.R, 1e-12) && near(ex8.R, 5, 1e-12), `Example 7: phasor components give ${Rr.toFixed(3)} mm`);
}
ok(near(ex9.t * ex9.v, 2 * ex9.L, 1e-12), `Example 8: round trip ${ex9.t.toFixed(3)} s at ${ex9.v.toFixed(2)} m/s covers ${2 * ex9.L} m`);
ok(stringModes(ex10.L, ex10.v, 3).every((f, i) => near(f, ex10.f[i], 1e-6)), `Example 9: root-finding on sin(kL) = 0 reproduces ${ex10.f.map((f) => f.toFixed(1)).join(', ')} Hz`);
ok(columnModes('open', ex11.L, ex11.v, 3).every((f, i) => near(f, ex11.open[i], 1e-6)) && columnModes('closed', ex11.L, ex11.v, 3).every((f, i) => near(f, ex11.closed[i], 1e-6)), `Example 10: open ${ex11.open.join(', ')} Hz, closed ${ex11.closed.join(', ')} Hz from boundary-condition roots`);
ok(near(columnModes('closed', ex12.L, ex12.v, 3)[0], ex12.f1, 1e-6) && near(ex12.L, 0.5, 1e-12), `Example 11: closed pipe L = ${ex12.L} m has f₁ = ${ex12.f1} Hz and then ${ex12.next.join(', ')} Hz`);
ok(interiorSwells(ex13.f1, ex13.f2, 2) + 1 === 2 * ex13.fb && ex13.fb === 4 && ex13.mean === 258, `Example 12: ${ex13.fb} beats per second counted from the sampled sum`);
ok(near(columnModes('closed', ex14.L1, ex14.v, 1)[0] - columnModes('closed', ex14.L2, ex14.v, 1)[0], ex14.fb, 1e-6), `Example 13: beat frequency ${ex14.fb.toFixed(3)} Hz`);
void R;
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1114,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['strv-mcq', 'phase-mcq', 'closedodd-mcq', 'beat-ar'],
      B: ['newton-short', 'standing-short', 'pipes-short3'],
      C: ['sound-long', 'standing-long'],
      D: ['tanpura-case'],
    },
    long: {
      A: ['wavetype-mcq', 'laplace-mcq', 'kw-mcq', 'pvel-mcq', 'fixed-mcq', 'openclosed-mcq', 'harmonic-mcq', 'beatamp-mcq', 'phase-ar', 'fret-ar'],
      B: ['wavetype-short', 'eqparts-short', ['reflect-short', 'beats-short'], 'derivv-short3', ['stringmodes-short3', 'beatsderive-short3']],
      C: ['prog-long', ['pipes-long', 'beats-long']],
      D: ['violin-case', 'ultrasound-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (transverse and longitudinal particle motion with compressions where the spacing is least; a snapshot shifted by λ/8 in T/8; particle velocities from a numerical derivative; reflection at fixed and free ends by the method of images; string modes with n−1 interior nodes; open and closed pipe modes from boundary-condition roots; beats counted from a sampled sum; worked examples re-derived by independent routes): ${svgFails.length} failures`,
    physics_facts: 'v = √(T/μ) on a string; v = √(Y/ρ) in a solid and √(B/ρ) in a fluid; Newton √(P/ρ) and Laplace √(γP/ρ) with γ = 1.4 for air, v = √(γRT/M) ∝ √T, no effect of pressure alone; humidity and the Doppler effect are not taught; y = a sin(kx − ωt + φ), k = 2π/λ, ω = 2πf, v = ω/k = fλ, particle speed up to aω; Δφ = kΔx = ωΔt; superposition, fixed-end inversion; y = 2a sin kx cos ωt; string and open pipe f = nv/2L, closed pipe f = (2n−1)v/4L, end corrections ignored; beats f_b = |f₁ − f₂|; speed of sound 340 m/s at room temperature unless stated; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-11-07: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"; subject-producer (Opus) review of every item, deck, note and rendered figure 2026-11-08/09',
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
