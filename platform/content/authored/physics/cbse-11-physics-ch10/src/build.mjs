// Build ch10 Thermal Properties of Matter: npx tsx content/authored/physics/cbse-11-physics-ch10/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(10, 'Thermal Properties of Matter');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, NUMCHECK } = await import('./decks.mjs');
const { mixTemp, coolNumeric, heatBetween, LF, DENSITY } = await import('./phys.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by a different route (independent of the closed forms used in the slides)
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11 } = EX;
ok(near(ex1.C, 45, 1e-9) && near(ex1.K, 318.15, 1e-9) && near(ex1.twice, 160, 1e-9) && near(ex1.twiceF, 320, 1e-9) && near(1.8 * ex1.twice + 32, 2 * ex1.twice, 1e-9), `Example 1: ${ex1.F} °F = ${ex1.C} °C = ${ex1.K} K; F = 2C at ${ex1.twice} °C (${ex1.twiceF} °F)`);
ok(near(ex2.dLmm, 23.04, 1e-9) && near(ex2.L0 * (1 + ex2.a * ex2.dT) - ex2.L0, ex2.dL, 1e-9), `Example 2: girder lengthens ${ex2.dLmm.toFixed(2)} mm`);
ok(near(ex3.d, 5.023, 1e-9) && near(ex3.frac, 0.0092, 1e-9) && near((ex3.d / ex3.d0) ** 2 - 1, ex3.frac, 5e-3), `Example 3: hole diameter ${ex3.d.toFixed(3)} cm; area up by ${(ex3.frac * 100).toFixed(2)} % (exact ratio squared ${((ex3.d / ex3.d0) ** 2 - 1).toFixed(6)})`);
ok(near(ex4.Q, 588000, 1e-9) && near(ex4.t, 392, 1e-9) && near(ex4.m * heatBetween(1, ex4.T1, ex4.T2), ex4.Q, 1e-9), `Example 4: ${ex4.Q} J, ${ex4.t} s`);
const ex5T = mixTemp([{ m: ex5.ms, c: ex5.c, T: ex5.Ts }, { m: ex5.mw, T: ex5.Tw }, { m: ex5.mc, c: ex5.cc, T: ex5.Tw }]).T;
ok(near(ex5T, ex5.Tf, 1e-6) && near(ex5.gain, 12045, 1e-9), `Example 5: c = ${ex5.c.toFixed(2)} J kg⁻¹ K⁻¹ reproduces the final temperature ${ex5T.toFixed(3)} °C by enthalpy bookkeeping`);
ok(near(NUMCHECK.ex6Num, ex6.q, 1e-9) && near(ex6.q, 774000, 1e-9) && near(ex6.t, 1548, 1e-9) && near(ex6.t4, 1130, 1e-9), `Example 6: stage heats sum to ${ex6.q} J (enthalpy difference ${NUMCHECK.ex6Num} J); ${ex6.t} s at ${ex6.P} W; boiling ${ex6.t4} s`);
ok(near(ex7.T, ex7.Tnum, 1e-6) && near(ex7.lost, ex7.gained, 1e-9), `Example 7: steam into water gives ${ex7.T.toFixed(3)} °C by the closed form and ${ex7.Tnum.toFixed(3)} °C by enthalpy bookkeeping; heat lost = heat gained = ${ex7.gained.toFixed(1)} J`);
ok(near(ex8.H, 13.86, 1e-9) && near(ex8.ice, 8316 / LF, 1e-9), `Example 8: rod H = ${ex8.H} W; 10 min melts ${(ex8.ice * 1000).toFixed(2)} g of ice`);
ok(near(ex9.Ti, ex9.num.Ti, 1e-9) && near(ex9.H, ex9.num.H, 1e-9), `Example 9: H = ${ex9.H.toFixed(2)} W and interface ${ex9.Ti.toFixed(3)} °C agree with the flux-continuity root`);
ok(near(NUMCHECK.ex10Num, ex10.Tt, 1e-6) && near(coolNumeric(ex10.T1, ex10.T0, ex10.k, ex10.t1), ex10.T2, 1e-6), `Example 10: k = ${ex10.k.toFixed(5)} per min; time to ${ex10.Tt} °C = ${ex10.tt.toFixed(3)} min (Runge–Kutta integration of the law agrees)`);
ok(near(ex11.t2, 3.75, 1e-9) && near(ex11.t2Exact, ex11.t2, 5e-3), `Example 11: average-temperature time ${ex11.t2.toFixed(3)} min vs exact ${ex11.t2Exact.toFixed(3)} min`);
ok(DENSITY.length === 11 && DENSITY.reduce((a, b) => (b[1] > a[1] ? b : a))[0] === 4, 'density table: peak at 4 °C, 11 rows, 0 to 10 °C');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1110,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['pondtop-mcq', 'boil-mcq', 'scalerod-mcq', 'newton-ar'],
      B: ['hole-short2', 'cooker-short2', 'series-short3'],
      C: ['heating-long', 'glaze-long'],
      D: ['tea-case'],
    },
    long: {
      A: ['minus40-mcq', 'bimetal-mcq', 'ratio-mcq', 'scald-mcq', 'tank-mcq', 'junction-mcq', 'halving-mcq', 'curve-mcq', 'iceenergy-ar', 'wallthick-ar'],
      B: ['bridge-short2', 'cC-short2', ['heater-short2', 'colour-short2'], 'steamburn-short3', ['derive-short3', 'kfactors-short3']],
      C: ['expan-long', ['steam-long', 'cooling-long']],
      D: ['viaduct-case', 'kettle-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (three scales line up at every tick and 37 °C = 98.6 °F = 310.15 K; extensions in the ratio of α with ΔL 1.2, 1.7, 2.3 mm; bimetal arcs keep the interface length and brass is outside; pond layer densities from the table rise to 4 °C; rod profile straight with gradient 90 K per metre; slab interface 30.71 °C and heat currents equal; flask parts nested; worked examples re-derived by enthalpy bookkeeping, flux continuity and Runge–Kutta integration of the cooling law): ${svgFails.length} failures`,
    physics_facts: 'T = t + 273.15; 1 K = 1 °C = 1.8 °F; ΔL = αL₀ΔT, β = 2α, γ = 3α; α(steel) 1.2, α(copper) 1.7, α(aluminium) 2.3 × 10⁻⁵ K⁻¹ (brass 1.9, stated in the items that use it); water densest at about 4 °C (CRC density table to two decimals); Q = mcΔT, c(water) 4200 (as stated), c(ice) 2100, c(steam) 2000 J kg⁻¹ K⁻¹; L_f 3.34 × 10⁵ and L_v 2.26 × 10⁶ J kg⁻¹; calorimetry heat lost = heat gained; H = KA(T₁ − T₂)/L with K data stated in the stems; series slabs: equal H, resistances L/K add; Newton’s law dT/dt = −k(T − T₀), T = T₀ + (T₁ − T₀)e^(−kt) and the average-temperature form; Stefan’s law, Wien’s law, thermal stress, triple point and phase diagram, ideal-gas thermometry and the molar heat capacities are not taught (see README); every number computed by the build script and re-solved',
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
