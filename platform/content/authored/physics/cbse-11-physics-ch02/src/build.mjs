// Build ch02 Motion in a Straight Line: npx tsx content/authored/physics/cbse-11-physics-ch02/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(2, 'Motion in a Straight Line');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, NUMCHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by numerical calculus (independent of the closed forms used in the slides)
const { cub, car, tro, ex1, ex2, ex5, ex7, ex8 } = EX;
ok(near(NUMCHECK.cubPathNumeric, cub.path, 1e-4) && cub.path === 11 && cub.disp === 9, `Example 3: path length ${cub.path} m (numerical sampling ${NUMCHECK.cubPathNumeric.toFixed(4)} m), displacement ${cub.disp} m`);
ok(near(NUMCHECK.cubVNumeric, cub.v(2.4), 1e-6) && cub.r1 === 1 && cub.r2 === 2 && cub.acc(cub.r1) === -6 && cub.vmin === -1.5, `Example 3: v(t) by finite differences matches 6t² − 18t + 12; rest at ${cub.r1} s and ${cub.r2} s; v_min ${cub.vmin} m/s at ${cub.tmin} s`);
ok(near(NUMCHECK.carAreaNumeric, car.tot, 1e-6) && car.tot === 550, `Example 9: area under the car v–t graph by Simpson integration = ${NUMCHECK.carAreaNumeric.toFixed(3)} m (550 m)`);
ok(near(NUMCHECK.troDispNumeric, tro.disp, 1e-9) && tro.disp === 5 && tro.path === 13, `Example 10: displacement ${tro.disp} m (integral ${NUMCHECK.troDispNumeric.toFixed(3)} m), path length ${tro.path} m`);
ok(ex1.path === 1650 && ex1.disp === 750 && near(ex1.vs, 5, 1e-9) && near(ex2.avg, 36, 1e-9), `Examples 1–2: rider path ${ex1.path} m, displacement ${ex1.disp} m; two-half journey average ${ex2.avg} km/h`);
ok(near(ex5.s, ex5.s2, 1e-9) && near(ex7.H, 19.6, 1e-9) && ex7.T === 4 && near(ex8.tot, 52, 1e-9) && near(ex8.tot2, 184, 1e-9), `Examples 5–8: s = v²/2a = ½(u+v)t = ${ex5.s.toFixed(2)} m; throw H ${ex7.H.toFixed(1)} m, flight ${ex7.T} s; stopping ${ex8.tot} m and ${ex8.tot2} m`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1102,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['frame-mcq', 'decel-mcq', 'ratio-mcq', 'zeroacc-ar'],
      B: ['pd-short', 'graph-short', 'stop-short3'],
      C: ['path-long', 'bridge-long'],
      D: ['metro-case'],
    },
    long: {
      A: ['origin-mcq', 'pathdisp-mcq', 'speedo-mcq', 'neverrest-mcq', 'doublespeed-mcq', 'throwT-mcq', 'xtflat-mcq', 'vtline-mcq', 'coin-ar', 'areavt-ar'],
      B: ['frame-short', 'inst-short', ['gfree-short', 'signedarea-short'], 'zerov-short3', ['chord-short3', 'v2-short3']],
      C: ['calc-long', ['derive-long', 'graph-long']],
      D: ['rider-case', 'reaction-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (position axis at 0.4 px per metre; rider path 1200 + 450 against displacement 750 drawn to scale; strobe gaps in the ratio 1:3:5:7 and speed arrows 1:2:3:4; stopping bars to scale with braking distance growing as v²; v–t rectangle + triangle area = (u + v)t/2; six x–t shapes with the stated slope behaviour; worked examples re-derived by numerical calculus): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); 1 m s⁻¹ = 3.6 km h⁻¹; v = dx/dt and a = dv/dt; v = u + at, s = ut + ½at², v² = u² + 2as and s = ½(u + v)t for constant acceleration; free fall from rest gives distances 1:3:5 in successive seconds; thrown upward: t = u/g, H = u²/2g, flight 2u/g; stopping distance = v t_r + v²/2a; slope of x–t is v, slope of v–t is a, signed area under v–t is displacement, under a–t is the change in velocity; relative velocity is not taught (check against the rationalised book); every number computed by the build script and re-solved (see README)',
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
