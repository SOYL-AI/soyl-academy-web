// Build ISC 11 ch02 Motion in a Straight Line: npx tsx content/authored/physics/isc-11-physics-ch02/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../isc-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../isc-11-physics-ch01/src/lib.mjs';

setChapter(2, 'Motion in a Straight Line');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, NUMCHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-short.mjs');
await import('./questions-long.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by numerical calculus (independent of the closed forms used in the slides)
const { ex1, ex2, pol, trg, exq, lgq, itg, cub, car, ex8, ex9, ex10, ex11, thr } = EX;
ok(near(NUMCHECK.polV, pol.v0, 1e-6) && near(NUMCHECK.polA, pol.a0, 1e-5) && pol.v0 === 38 && pol.a0 === 42 && pol.avg === 42, `Example 3: v(2) = ${pol.v0} m/s and a(2) = ${pol.a0} m/s² agree with central differences; average velocity 1 s to 3 s = ${pol.avg} m/s`);
ok(near(NUMCHECK.trgV, trg.v, 1e-6) && near(NUMCHECK.exqV, exq.v, 1e-6) && near(NUMCHECK.lgqV, lgq.v, 1e-6) && lgq.v === 1.5 && lgq.a === -0.75, `Example 4: 5 sin t, 2e^t and 3 ln t differentiate to ${trg.v.toFixed(3)}, ${exq.v.toFixed(3)} and ${lgq.v} m/s (numerical check); a = ${lgq.a} m/s²`);
ok(near(NUMCHECK.itgDisp, itg.disp, 1e-6) && itg.disp === 42 && itg.x2 === 21, `Example 5: Simpson integral of 3t² + 4t from 1 s to 3 s = ${NUMCHECK.itgDisp.toFixed(4)} m (antiderivative ${itg.disp} m); x(2) = ${itg.x2} m`);
ok(near(NUMCHECK.cubPath, cub.path, 1e-4) && cub.path === 12 && cub.disp === 4 && cub.r1 === 1 && cub.r2 === 3, `Example 6: path length ${cub.path} m (fine sampling ${NUMCHECK.cubPath.toFixed(4)} m), displacement ${cub.disp} m, rest at ${cub.r1} s and ${cub.r2} s`);
ok(near(NUMCHECK.carArea, car.tot, 1e-6) && car.tot === 704, `Example 7: Simpson area under the metro v–t graph = ${NUMCHECK.carArea.toFixed(3)} m (${car.tot} m)`);
ok(near(ex8.s2, ex8.s, 1e-9) && ex8.u === 15 && ex8.a === -0.75 && ex8.t === 20 && ex9.sn === 8.25 && near(ex9.sn2, ex9.sn, 1e-9), `Examples 8–9: braking a = ${ex8.a} m/s², t = ${ex8.t} s, s = ut + ½at² = ${ex8.s2} m; distance in the 6th second ${ex9.sn} m both ways`);
ok(near(NUMCHECK.ex11Root, -ex11.H, 1e-9) && ex11.t === 5 && near(ex10.v ** 2, 2 * 9.8 * ex10.h, 1e-9) && near(thr.H, 44.1, 1e-9) && thr.T === 6 && thr.tup === 3, `Examples 10–11: coconut h = ${ex10.h} m, v² = 2gh holds; tower throw lands at t = ${ex11.t} s (y = −49 m); ball thrown at 29.4 m/s: top ${thr.H} m at ${thr.tup} s, flight ${thr.T} s`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1202,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['rest-mcq', 'deriv-mcq', 'retard-mcq', 'meanv-mcq', 'ironwood-ar'],
      B: ['frame-short', ['derivs-short', 'area-short']],
      C: ['roundtrip-short3', ['graphderiv-short3', 'calcderiv-short3']],
      D: ['upnum-long'],
    },
    long: {
      A: ['origin-mcq', 'pointmass-mcq', 'avgtime-mcq', 'sincos-mcq', 'integ-mcq', 'vtslope-mcq', 'areaa-mcq', 'nth-mcq', 'topsame-mcq', 'hmoon-mcq', 'dsin-ar', 'avar-ar'],
      B: ['avginst-short', 'defint-short', ['updown-short', 'meanvel-short']],
      C: ['chord-short3', 'quartic-short3', 'vtdesc-short3', ['analyt-short3', 'maxh-short3']],
      D: ['integpart-long', ['graphall-long', 'calcnum-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (position axis at 0.4 px per metre; cyclist path 900 + 350 against displacement 550 drawn to scale; chord slopes 12, 10, 9 m/s closing in on the tangent slope 8 m/s; strip areas bracketing the integral 26 m; six s–t, v–t and a–t shapes with the stated slope behaviour; v–t rectangle + triangle area = (u + v)t/2; strobe heights and speeds symmetric about the top; worked examples re-derived by numerical calculus): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); 1 m s⁻¹ = 3.6 km h⁻¹; v = dx/dt and a = dv/dt; derivatives of x^n, sin, cos, e^x and ln x (angles in radian) and the integral of x^n, definite and indefinite; v = u + at, s = ut + ½at², v² = u² + 2as and s = ½(u + v)t by graphical, calculus and analytical methods; distance in the nth second u + a(2n − 1)/2; free fall from rest gives distances 1:3:5; thrown upward: t = u/g, H = u²/2g, flight 2u/g, return speed u; slope of s–t is v, slope of v–t is a, signed area under v–t is displacement, under a–t the change in velocity; chain rule, product rule and integrals beyond x^n are not taught (ISC lists only the simple cases)',
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
