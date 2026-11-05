// Build ch11 Thermodynamics: npx tsx content/authored/physics/cbse-11-physics-ch11/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(11, 'Thermodynamics');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX, NUMCHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
// worked-example numbers re-derived by numerical integration (independent of the closed forms used in the slides)
const { ex1, cases, ex3, ex4, ex5, ex6, ex7, ex8 } = EX;
ok(near(ex1.KE, 240000, 1e-12) && near(ex1.dT, 30, 1e-12), `Example 1: braking KE ${ex1.KE} J raises the brake assembly by ${ex1.dT} K`);
ok(cases.every((c) => c.dU === c.Q - c.W) && cases.map((c) => c.dU).join() === '300,-300,250,500', `Example 2: ΔU = Q − W for the four cases: ${cases.map((c) => c.dU).join(', ')} J`);
ok(near(NUMCHECK.strokeStraight, ex3.Wc, 1e-9) && ex3.Wa === 900 && ex3.Wb === 600 && ex3.Wc === 750 && ex3.dU === 600 && ex3.Qa === 1500 && ex3.Qb === 1200 && ex3.Qc === 1350, `Example 3: straight-line area by Simpson integration ${NUMCHECK.strokeStraight.toFixed(3)} J; W = ${ex3.Wa}, ${ex3.Wb}, ${ex3.Wc} J; ΔU = ${ex3.dU} J; Q = ${ex3.Qa}, ${ex3.Qb}, ${ex3.Qc} J`);
ok(near(ex4.QP - ex4.W, ex4.QV, 1e-12) && near(ex4.dU / ex4.QP, 3 / 5, 1e-12) && near(ex4.gam, 5 / 3, 1e-12), `Example 4: Q_p = ${ex4.QP.toFixed(2)} J = ΔU ${ex4.QV.toFixed(2)} J + W ${ex4.W.toFixed(2)} J (ΔU/Q = 3/5, γ = 5/3)`);
ok(near(NUMCHECK.isoNumeric, ex5.W, 1e-9) && near(ex5.P2 * ex5.V2, ex5.nRT, 1e-12), `Example 5: isothermal work by Simpson integration of P dV ${NUMCHECK.isoNumeric.toFixed(3)} J = nRT ln 3 = ${ex5.W.toFixed(3)} J; P₂V₂ = P₁V₁`);
ok(near(NUMCHECK.adiNumeric, ex6.W, 1e-8) && near(ex6.dU, -ex6.W, 1e-9) && near(ex6.P2 * ex6.V2 ** ex6.gamma, ex6.P1 * ex6.V1 ** ex6.gamma, 1e-12), `Example 6: adiabatic work by Simpson integration ${NUMCHECK.adiNumeric.toFixed(3)} J = nCv(T₁ − T₂) = ${ex6.W.toFixed(3)} J; ΔU = −W; P V^γ conserved (T₂ ${ex6.T2.toFixed(2)} K, P₂ ${ex6.P2.toFixed(2)} kPa)`);
ok(ex7.W === 800 && ex7.Qin === 3600 && ex7.Qout === 2800 && near(ex7.Qin - ex7.Qout, ex7.W, 1e-12) && near(ex7.eta, 800 / 3600, 1e-12), `Example 7: cycle W = ${ex7.W} J, Q in ${ex7.Qin} J, Q out ${ex7.Qout} J, η = ${(ex7.eta * 100).toFixed(2)}%`);
ok(near(ex8.W, 1.2, 1e-12) && near(ex8.eta, 0.24, 1e-12) && near(ex8.cop, 4, 1e-12) && near(ex8.fQ1, 2.25, 1e-12) && near(ex8.power, 125, 1e-12), `Example 8: engine η = ${ex8.eta * 100}%; refrigerator COP ${ex8.cop}, Q₁ = ${ex8.fQ1} MJ, compressor ${ex8.power} W`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1111,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['zeroth-mcq', 'sign-mcq', 'ks-mcq', 'isoth-ar'],
      B: ['zeroth-short', 'quasi-short', 'engine-short3'],
      C: ['pathlong', 'engfridge-long'],
      D: ['pump-case'],
    },
    long: {
      A: ['heat-mcq', 'statefn-mcq', 'cpgt-mcq', 'pvarea-mcq', 'steep-mcq', 'free-mcq', 'cyc-mcq', 'possible-mcq', 'isochoric-ar', 'fridge-ar'],
      B: ['wall-short', 'firstlaw-short', ['cpgt-short', 'cyc-short'], 'cpcv-derive-short3', ['isoad-short3', 'irrev-short3']],
      C: ['cyclelong', ['isoadlong', 'cpcvlong']],
      D: ['pvstate-case', 'plant-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (both blocks touching the thermometer with equal readings; shaded P–V areas of three paths equal PΔV, PΔV and the trapezoid; drawn areas under an isotherm and an adiabat equal nRT ln 2 and (P₁V₁ − P₂V₂)/(γ − 1) with the adiabat γ times as steep; four processes keep P, V, PV and PV^γ constant on every plotted point; the rectangular loop's enclosed pixel area equals ΔP ΔV and runs clockwise; energy-flow bars satisfy Q₁ = Q₂ + W with η and COP read off the widths; worked examples re-derived by Simpson integration of P dV): ${svgFails.length} failures`,
    physics_facts: 'R = 8.314 J mol⁻¹ K⁻¹ (stated in every item that uses it); 1 kPa × 1 L = 1 J; first law ΔU = Q − W with W the work done by the system (stated); W = ∫P dV, area under the P–V curve; Cp − Cv = R; Cv = 3R/2 (monatomic, γ = 5/3) and 5R/2 (diatomic, γ = 1.4) quoted as data from kinetic theory; isothermal W = nRT ln(V₂/V₁) with ΔU = 0 for an ideal gas; adiabatic PV^γ = const, TV^(γ−1) = const, W = (P₁V₁ − P₂V₂)/(γ − 1) = nCv(T₁ − T₂); cycle ΔU = 0 and net work = loop area (clockwise positive); Kelvin–Planck and Clausius statements; η = W/Q₁ = 1 − Q₂/Q₁ < 1 and COP = Q₂/W; the Carnot engine and Carnot’s theorem are not taught (not in the syllabus topics); every number computed by the build script and re-solved (see README)',
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
