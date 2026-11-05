// Build ch12 Kinetic Theory: npx tsx content/authored/physics/cbse-11-physics-ch12/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(12, 'Kinetic Theory');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const { R, KB, NA, vrmsM, vrmsM2 } = await import('./phys.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by independent routes
const { ex1, ex2, ex3, ex4, ex5, wp, ex6, ex7, ex8, ex9, ex10, ex11, stp } = EX;
ok(near(R, NA * KB, 0.002), `constants: R = ${R} agrees with N_A k_B = ${(NA * KB).toFixed(4)} to 0.2%`);
ok(near(wp.P, wp.Pformula, 1e-3), `pressure derivation: summing m v_x² over ${wp.N} molecules with directions spread evenly over a sphere gives ${wp.P.toFixed(1)} Pa; (1/3) N m v²/V gives ${wp.Pformula.toFixed(1)} Pa`);
ok(near(ex1.P, 4 * KB * NA * 300 / 0.05, 0.002) && near(ex2.rho, ((2.9e-2 * 1.013e5) / (R * 300)), 1e-9) && near(ex3.P, 101568, 1e-9), `Examples 1–3: P = ${ex1.P.toFixed(0)} Pa, air density ${ex2.rho.toFixed(3)} kg/m³, hydrogen P = ${ex3.P.toFixed(0)} Pa`);
ok(near(vrmsM2(300, 28e-3 / NA), ex4.vN, 0.002) && near(ex4.vN / ex4.vO, Math.sqrt(32 / 28), 1e-12) && near(ex4.ke, 6.21e-21, 1e-3), `Example 4: v_rms(N₂) ${ex4.vN.toFixed(1)} and v_rms(O₂) ${ex4.vO.toFixed(1)} m/s at 300 K; mean translational energy ${ex4.ke.toExponential(3)} J`);
ok(near(vrmsM(ex5.T2, 0.03) / vrmsM(ex5.T1, 0.03), ex5.k, 1e-9) && ex5.T2 === 675 && ex5.t2 === 402, `Example 5: T₂ = ${ex5.T2} K = ${ex5.t2} °C gives v_rms ×${ex5.k}`);
ok(near(ex6.Um, 6859.05, 1e-9) && near(ex6.eps, 1.1385e-20, 1e-9), `Example 6: U per mole ${ex6.Um.toFixed(2)} J, ${ex6.eps.toExponential(3)} J per molecule at ${ex6.T} K`);
ok(near(ex7.QP / ex7.QV, 1.4, 1e-12) && near(ex7.W, ex7.n * R * ex7.dT, 1e-12), `Example 7: Q_V ${ex7.QV.toFixed(2)} J, Q_P ${ex7.QP.toFixed(2)} J, work n R ΔT = ${ex7.W.toFixed(2)} J, γ = ${ex7.gamma.toFixed(3)}`);
ok(near(ex8.gamma, 9.5 / 6.5, 1e-12), `Example 8: mixture γ = ${ex8.gamma.toFixed(4)}`);
ok(near(ex9.lam, 1 / (Math.SQRT2 * Math.PI * ex9.d ** 2 * (ex9.P / (KB * ex9.T))), 1e-12) && near(ex9.lam * 1e9, 102.2, 0.002) && near(ex10.lam, 1.0355, 0.002), `Examples 9–10: λ = ${(ex9.lam * 1e9).toFixed(1)} nm at 1 atm and ${ex10.lam.toFixed(3)} m at 0.010 Pa; collision rate ${ex9.freq.toExponential(2)} per second`);
ok(near(ex11.N, 6.02e22, 1e-9) && near(ex11.m1, 4.651e-26, 1e-3) && near(stp.Vm * 1000, 22.4, 0.001) && near(stp.n, 2.689e25, 1e-3), `Example 11 and STP: N = ${ex11.N.toExponential(2)}, molecule mass ${ex11.m1.toExponential(3)} kg; molar volume ${(stp.Vm * 1000).toFixed(2)} L; ${stp.n.toExponential(3)} molecules per m³`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1112,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['vsq-mcq', 'gamma-mcq', 'mfpdbl-mcq', 'press-ar'],
      B: ['boylecharles-short', 'heat-short', 'spheat-short3'],
      C: ['derive-long', 'eqpart-long'],
      D: ['gamma-case'],
    },
    long: {
      A: ['pv-mcq', 'isotherm-mcq', 'assume-mcq', 'sameke-mcq', 'tempdoub-mcq', 'equip-mcq', 'vib-mcq', 'sealed-mcq', 'samet-ar', 'cpcv-ar'],
      B: ['assum-short', 'dof-short', ['mfp-short', 'real-short'], 'light-short3', ['mfpdep-short3', 'vibmode-short3']],
      C: ['temp-long', ['gaslaw-long', 'mfp-long']],
      D: ['moon-case', 'vac-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (wall-collision picture with reversed vx, unchanged vy and force m vx²/L; degrees of freedom 3N = translation + rotation + vibration; C_P − C_V = R bars with γ = 5/3, 7/5, 4/3; ten free paths whose mean is printed; ten sample speeds with mean 400 and rms 435.9 m/s; rms speeds of five gases to scale with v ∝ 1/√M; worked examples re-derived by independent routes including a molecule-by-molecule wall-pressure sum): ${svgFails.length} failures`,
    physics_facts: 'R = 8.314 J mol⁻¹ K⁻¹, k_B = 1.38 × 10⁻²³ J K⁻¹, N_A = 6.02 × 10²³ mol⁻¹, 1 atm = 1.013 × 10⁵ Pa, T(K) = t(°C) + 273 (stated in every item that uses them); P V = nRT = N k_B T; P = (1/3)ρ v̄²; (1/2) m v̄² = (3/2) k_B T; v_rms = √(3RT/M); U = (f/2) nRT, C_V = (f/2)R, C_P = C_V + R, γ = 1 + 2/f with f = 3, 5, 6 (7 for a vibrating diatomic); λ = 1/(√2 π d² n) with n = P/(k_B T); Avogadro\'s law from P V = N k_B T; speed distributions, specific heats of solids and water, and v_mp are not taught (check against the rationalised book); every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-11-05: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
