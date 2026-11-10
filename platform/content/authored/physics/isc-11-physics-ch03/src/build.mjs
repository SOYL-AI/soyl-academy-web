// Build ISC 11 ch03 Vectors: npx tsx content/authored/physics/isc-11-physics-ch03/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../isc-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../isc-11-physics-ch01/src/lib.mjs';

setChapter(3, 'Vectors');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
const { Vec, rad, deg, angleBetween, angleByCross, sumPolar, foldPolar } = await import('./phys.mjs');
await import('./questions.mjs');
await import('./questions-short.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by independent routes (component sums, pairwise law of cosines, atan2 of the cross product)
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10 } = EX;
ok(ex1.m === 5 && near(Math.hypot(6 - 2, 4 - 1), ex1.m, 1e-12) && ex1.d.join() === '4,3', `Example 1: Δr = (${ex1.d.join(', ')}) m, |Δr| = ${ex1.m} m, angle ${ex1.ang.toFixed(2)}°`);
ok(ex2.m === 13 && near(ex2.um, 1, 1e-12) && ex2.A.map((c) => c * c).reduce((a, b) => a + b) === 169, `Example 2: |A| = ${ex2.m} (4² + 3² + 12² = 169); unit vector magnitude ${ex2.um}`);
ok(near(sumPolar([[ex3.A, 0], [ex3.B, ex3.th]]).R, ex3.R, 1e-9) && ex3.R === 13 && near(Vec.ang(Vec.add([ex3.A, 0], Vec.polar(ex3.B, ex3.th))), ex3.alpha, 1e-9), `Example 3: R by components = ${ex3.R} N and α = ${ex3.alpha.toFixed(3)}° agree with the law of cosines and tan α`);
ok(ex4.sum.join() === '2,3,6' && ex4.ms === 7 && near(ex4.md ** 2, 93, 1e-12) && near(ex4.ms ** 2 + ex4.md ** 2, 2 * (Vec.dot(ex4.A, ex4.A) + Vec.dot(ex4.B, ex4.B)), 1e-12), `Example 4: A + B = (${ex4.sum.join(', ')}), |A − B|² = 93; diagonals identity |A+B|² + |A−B|² = 2(A² + B²) holds`);
ok(near(Math.hypot(ex5.x, ex5.y), ex5.F, 1e-12) && near(Vec.ang([ex5.x, ex5.y]), ex5.th, 1e-9), `Example 5: Fx = ${ex5.x.toFixed(3)} N, Fy = ${ex5.y.toFixed(3)} N recombine to ${ex5.F} N at ${ex5.th}°`);
ok(ex6.m === 7 && near(ex6.sq, 1, 1e-12) && ex6.A.every((c, i) => near(ex6.ang[i], deg(Math.atan2(Math.hypot(...ex6.A.filter((_, j) => j !== i)), c)), 1e-9)), `Example 6: direction cosines ${ex6.cos.map((c) => c.toFixed(4)).join(', ')} sum of squares ${ex6.sq}; angles by atan2 agree`);
ok(near(foldPolar(ex7.forces).R, ex7.R, 1e-6) && near(ex7.rows.reduce((s, row) => s + row[2], 0), ex7.X, 1e-12), `Example 7: three forces R = ${ex7.R.toFixed(4)} N by components and by pairwise law of cosines`);
ok(ex8.W === 16 && near(ex8.mF * ex8.ms * Math.cos(rad(ex8.ang)), ex8.W, 1e-9) && near(angleByCross(ex8.F, ex8.s), ex8.ang, 1e-9), `Example 8: W = ${ex8.W} J and θ = ${ex8.ang.toFixed(3)}° (same angle from the cross product)`);
ok(ex9.C.join() === '-2,-8,-7' && ex9.pa === 0 && ex9.pb === 0 && near(ex9.m, Vec.mag(ex9.A) * Vec.mag(ex9.B) * Math.sin(rad(angleBetween(ex9.A, ex9.B))), 1e-9) && ex9.rev.join() === '2,8,7', `Example 9: A × B = (${ex9.C.join(', ')}) is perpendicular to A and B; |A × B| = |A||B| sin θ; B × A reverses it`);
ok(ex10.tau.join() === '0,0,12' && near(ex10.m, 0.3 * 40, 1e-12), `Example 10: τ = r × F = (0, 0, ${ex10.tau[2]}) N m = r F sin θ with the 40 N component at right angles`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1203,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['vecpair-mcq', 'mag-mcq', 'fx-mcq', 'dotval-mcq', 'less-ar'],
      B: ['posdisp-short', ['tri-short', 'resolve-short']],
      C: ['magproof-short3', ['rmag-short3', 'dotcomp-short3']],
      D: ['cases-long'],
    },
    long: {
      A: ['kinds-mcq', 'dispvec-mcq', 'coplanar-mcq', 'unitprop-mcq', 'scale-mcq', 'range-mcq', 'diff-mcq', 'sincos-mcq', 'perp-mcq', 'crossunit-mcq', 'current-ar', 'cross-ar'],
      B: ['scalvec-short', 'dircos-short', ['minr-short', 'rhs-short']],
      C: ['coplan-short3', 'equilib-short3', 'comp-short3', ['ralpha-short3', 'crosscomp-short3']],
      D: ['parallel-long', ['resolve-long', 'crosstorque-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (position and displacement drawn at 36 px per metre, Δr = (4, 3) m = 5 m; i-j-k axes with A = 2i + 3j + 6k drawn from its projected unit vectors, |A| = 7; λA lengths and directions; parallelogram and triangle laws with R² = 61; the derivation figure ON = 7, SN = 3.46; diagonals A + B and A − B with |A+B|² + |A−B|² = 2(A² + B²); 3–4–5 force components; work F·s = 36 J; parallelogram area 20 by the shoelace formula and torque 6 N m; worked examples re-derived by component sums, pairwise law of cosines and atan2 of the cross product): ${svgFails.length} failures`,
    physics_facts: 'R = √(A² + B² + 2AB cos θ) and tan α = B sin θ/(A + B cos θ) derived from the right-angled triangle ONS; |A − B| = √(A² + B² − 2AB cos θ); |A − B| ≤ R ≤ A + B; unit vector Â = A/|A|; direction cosines with l² + m² + n² = 1; resultant from ΣX and ΣY with the quadrant from the signs; A·B = AB cos θ = AₓBₓ + A_yB_y + A_zB_z; A × B = AB sin θ n̂ with the right-hand screw rule and the determinant form; î × ĵ = k̂ cyclic; B × A = −A × B; work W = F·s, power P = F·v, torque τ = r × F; electric current is a scalar; proof of the commutative and associative laws of addition is not taught (removed topic); relative velocity and projectiles belong to later chapters',
    content_gate: 'npm test -w @soyl/content-templates: run by the subject-producer',
    verifier_pass: '2026-11-09: every question re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
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
