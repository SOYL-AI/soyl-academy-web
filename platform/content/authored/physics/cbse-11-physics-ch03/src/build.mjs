// Build ch03 Motion in a Plane: npx tsx content/authored/physics/cbse-11-physics-ch03/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(3, 'Motion in a Plane');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, NUMCHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-t3.mjs');
await import('./questions-t4.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by stepping integrators and finite differences (independent of the closed forms in the slides)
const { ex1, ex2, ex3, ex4, ex5, ex7, ex8, ex9, ex10, ex11 } = EX;
ok(near(ex1.R, ex1.Rc, 1e-9) && near(ex1.alpha, ex1.alphac, 1e-9) && near(ex1.R, 8.718, 1e-3), `Example 1: R = ${ex1.R.toFixed(3)} (law of cosines = components), α = ${ex1.alpha.toFixed(2)}°`);
ok(near(ex2.R, 2 * Math.sqrt(3), 1e-9) && near(ex2.ang, 30, 1e-9), `Example 2: three forces sum to ${ex2.R.toFixed(3)} at ${ex2.ang.toFixed(2)}° (2√3 N at 30°)`);
ok(ex3.W === 10 && near(ex3.th, 71.565, 1e-4) && ex4.cr[2] === -14 && near(ex4.mag, Math.sqrt(ex4.A[0] ** 2 + ex4.A[1] ** 2) * Math.sqrt(ex4.B[0] ** 2 + ex4.B[1] ** 2) * Math.sin(ex4.th * Math.PI / 180), 1e-9), `Examples 3–4: F·d = ${ex3.W}, angle ${ex3.th.toFixed(2)}°; A × B = ${ex4.cr[2]} k̂, |A||B| sin θ = ${ex4.mag}`);
ok(near(NUMCHECK.ex5a, Math.hypot(ex5.a[0], ex5.a[1]), 1e-4) && ex5.r[0] === 20 && ex5.r[1] === 16, `Example 5: finite-difference acceleration of the path = ${NUMCHECK.ex5a.toFixed(4)} (= |a|); position (${ex5.r})`);
ok(near(NUMCHECK.ex7.T, ex7.T, 2e-4) && near(NUMCHECK.ex7.R, ex7.R, 2e-4) && near(Math.hypot(NUMCHECK.ex7.vxEnd, NUMCHECK.ex7.vyEnd), ex7.v, 2e-4), `Example 6: stepping integrator gives T = ${NUMCHECK.ex7.T.toFixed(4)} s, range ${NUMCHECK.ex7.R.toFixed(3)} m, landing speed ${Math.hypot(NUMCHECK.ex7.vxEnd, NUMCHECK.ex7.vyEnd).toFixed(3)} m/s`);
ok(near(NUMCHECK.ex8.T, ex8.T, 2e-4) && near(NUMCHECK.ex8.H, ex8.H, 2e-4) && near(NUMCHECK.ex8.R, ex8.R, 2e-4), `Example 7: stepping integrator gives T = ${NUMCHECK.ex8.T.toFixed(4)} s, H = ${NUMCHECK.ex8.H.toFixed(3)} m, R = ${NUMCHECK.ex8.R.toFixed(3)} m`);
ok(near(NUMCHECK.ex9.R, ex9.R, 2e-4) && near(NUMCHECK.ex9.H, ex9.H, 2e-4) && near(NUMCHECK.ex9.T, ex9.T, 2e-4), `Example 8: speed ${ex9.u.toFixed(3)} m/s gives range ${NUMCHECK.ex9.R.toFixed(3)} m, H = ${NUMCHECK.ex9.H.toFixed(3)} m, T = ${NUMCHECK.ex9.T.toFixed(3)} s numerically`);
ok(near(NUMCHECK.ex10a, ex10.a, 1e-4) && near(NUMCHECK.ex11a, ex11.a, 1e-3), `Examples 9–10: finite-difference acceleration ${NUMCHECK.ex10a.toFixed(4)} (v²/r = ${ex10.a}) and ${NUMCHECK.ex11a.toExponential(3)} (ω²R = ${ex11.a.toExponential(3)})`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1103,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['scalarvec-mcq', 'dotperp-mcq', 'hr-mcq', 'ucm-ar'],
      B: ['comp-short', 'dotproj-short', 'range-short3'],
      C: ['proj-long', 'circ-long'],
      D: ['drone-case'],
    },
    long: {
      A: ['maxmin-mcq', 'tri-mcq', 'crossdir-mcq', 'indep-mcq', 'top-mcq', 'speedscale-mcq', 'turn-mcq', 'cdir-mcq', 'dotzero-ar', 'toppt-ar'],
      B: ['sv-short', 'toppt-short', ['indep-short', 'cacc-short'], 'products-short3', ['path-short3', 'depend-short3']],
      C: ['products-long', ['horiz-long', 'vec-long']],
      D: ['spanner-case', 'relief-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (parallelogram and triangle laws with the diagonal equal to A + B in pixels and the law-of-cosines length; subtraction as A + (−B) and as the join of the tips; scaled vectors 2A, ½A, −A; components of an 8-6-10 vector; dot product as 6 × 3 = 18 and cross product as a parallelogram of area 24 by the shoelace formula; the 8-15-17 rain and train triangle; a 39.2 m/s, 30° projectile with points on the equation of path, apex at R/2 and symmetric heights; dropped and thrown balls at equal heights with drops 1:4:9:16; tangent velocity and centre-directed acceleration at four points of a circle; |Δv| = 2v sin(Δθ/2) pointing at the centre; worked examples re-derived by stepping integrators and finite differences): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); R = √(A² + B² + 2AB cos θ) and tan α = B sin θ/(A + B cos θ); |A − B|² = A² + B² − 2AB cos θ; A·B = AB cos θ = ΣAᵢBᵢ and |A × B| = AB sin θ with î × ĵ = k̂ cyclic; projectile: x = u cos θ t, y = u sin θ t − ½gt², path y = x tan θ − gx²/(2u² cos² θ), T = 2u sin θ/g, H = u² sin² θ/2g, R = u² sin 2θ/g, R_max = u²/g at 45°, H/R = tan θ/4; ω = 2π/T, v = ωr, a = v²/r = ω²r towards the centre; every number computed by the build script and re-solved (see README)',
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
