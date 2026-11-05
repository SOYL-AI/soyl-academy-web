// Build ch06 System of Particles and Rotational Motion: npx tsx content/authored/physics/cbse-11-physics-ch06/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(6, 'System of Particles and Rotational Motion');
const { SELF_CHECKS } = await import('./svgs.mjs');
const D = await import('./data.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions-t1.mjs');
await import('./questions-t2.mjs');
await import('./questions-t3.mjs');
await import('./questions-t4.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
const { rod, tri, el, sh, sd, tq, pd, ln, st, po, pl, br, tp, sq, dr, gw, ft } = D;
ok(near(rod.x, 0.6, 1e-9) && near(tri.X, 1.2, 1e-9) && near(tri.Y, 3, 1e-9) && near(el.X, 0.18, 1e-9) && near(el.Y, 0.08, 1e-9), `Examples 1–3: CM of the rod masses ${D.dec(rod.x, 2)} m; of three particles (${tri.X}, ${tri.Y}) m; of the L wire (${D.dec(el.X, 2)}, ${D.dec(el.Y, 2)}) m`);
ok(near(sh.v2, 10 / 3, 1e-9) && near(sh.xc, sh.u * sh.t, 1e-9) && near(sd.s, 0.6, 1e-9) && near(sd.m * sd.c, sd.M * sd.s, 1e-9), `Examples 4–5: burst piece ${D.dec(sh.v2, 3)} m/s, CM after ${sh.t} s at ${D.dec(sh.xc, 4)} m = ${sh.u} × ${sh.t}; sledge slides ${D.dec(sd.s, 2)} m`);
ok(near(tq.tau, 10, 1e-9) && near(pd.tau(60), 44.17, 1e-3) && near(ln.L, 12, 1e-9) && near(st.L, 7.56, 1e-9) && near(st.w2, 10.5, 1e-9), `Examples 6–8: torque ${tq.tau} N m; pedal at 60° ${D.dec(pd.tau(60), 4)} N m; L ${ln.L}; stool ω ${D.dec(st.w2, 3)} rad/s with L ${D.dec(st.L, 3)}`);
ok(near(po.x, 0.6, 1e-9) && near(pl.RR, 269.5, 1e-9) && near(pl.RL, 514.5, 1e-9) && near(br.T, 78.4, 1e-9) && near(br.Hx, 67.9, 1e-3) && near(br.Hy, 19.6, 1e-9), `Examples 9–10: pole ${D.dec(po.x, 2)} m; plank ${D.dec(pl.RL, 4)} N and ${D.dec(pl.RR, 4)} N; bracket T ${D.dec(br.T, 3)} N, hinge (${D.dec(br.Hx, 3)}, ${D.dec(br.Hy, 3)}) N`);
ok(near(sq.I, 0.36, 1e-9) && near(dr.Ir, 0.5, 1e-9) && near(dr.Id, 0.25, 1e-9) && near(gw.K, 473.7, 1e-3) && near(ft.w, 15, 1e-9) && near(ft.K, 225, 1e-9) && near(tp.crit, 18.43, 1e-3), `Examples 11–14: square I ${sq.I}; ring ${dr.Ir}, disc ${dr.Id}; wheel K ${D.dec(gw.K, 4)} J; flywheel ω ${ft.w}, K ${ft.K} J; almirah critical tilt ${D.dec(tp.crit, 3)}°`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1106,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cm2-mcq', 'diver-mcq', 'eqcond-mcq', 'radg-ar'],
      B: ['law-short', 'equil-short', 'ke-short3'],
      C: ['cm-long', 'flywheel-long'],
      D: ['roundabout-case'],
    },
    long: {
      A: ['ring-mcq', 'cmvel-mcq', 'torquezero-mcq', 'unitL-mcq', 'lever-mcq', 'cg-mcq', 'depend-mcq', 'sphere-mcq', 'burst-ar', 'moi-ar'],
      B: ['cm-short', 'tail-short', ['topple-short', 'moi-short'], 'dldt-short3', ['cmmot-short3', 'reactions-short3']],
      C: ['ang-long', ['equil-long', 'rigid-long']],
      D: ['bells-case', 'flywheel-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (CM of two masses balances at 0.60 m; L-wire CM is the length-weighted mean of the arm midpoints and off the wire; the CM of child and sledge is the same before and after; moment arm and torque three ways; |r × m v| equal at three positions of a free particle; I1 ω1 = I2 ω2; plank, bracket and pole: forces and moments balance about several points; plumb line inside the base at 12° and outside at 25°; bar lengths proportional to the I coefficients; worked examples re-derived): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated where used); x_cm = Σ m x / M; M a_cm = F_ext; τ = r F sin θ = F d; l = m v d; τ = dL/dt; L = I ω conserved without external torque; equilibrium needs ΣF = 0 and Στ = 0; moments of inertia (axis through the centre): ring M R², hollow sphere ⅔ M R², disc ½ M R², solid sphere ⅖ M R², thin rod M L²/12; k = √(I/M); τ = I α; K = ½ I ω²; the parallel and perpendicular axes theorems and rolling motion are not taught (removed in the 2023 rationalisation); every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
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
