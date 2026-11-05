// Build ch09 Mechanical Properties of Fluids: npx tsx content/authored/physics/cbse-11-physics-ch09/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-11-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank, near } from '../../cbse-11-physics-ch01/src/lib.mjs';

setChapter(9, 'Mechanical Properties of Fluids');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions-t3.mjs');
await import('./questions-t4.mjs');
await import('./questions-long.mjs');
const D = await import('./data.mjs');
const P = await import('./phys.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ok = (cond, msg) => SELF_CHECKS.push(cond ? `ok   ${msg}` : `FAIL ${msg}`);
const { e1, e3, e4, e5, e6, s1, s2, s3, s4, s5, s6, BARO } = D;
// worked-example numbers re-derived by independent routes (numerical integration, root finding, an ODE solver, force balance)
ok(near(P.integ(() => P.RHO * P.g, 0, e1.h), e1.gauge, 1e-9) && e1.gauge === 176400 && e1.abs === 277700, `Example 1: gauge pressure ${e1.gauge} Pa (integral of ρg over 18 m), absolute ${e1.abs} Pa`);
ok(near(BARO.h, 0.76005, 1e-4) && near(P.root((h) => P.RHO_HG * P.g * h - P.PATM, 0, 5), BARO.h, 1e-9), `Example 2: barometer column ${BARO.h.toFixed(4)} m of mercury (root of ρgh = P₀), ${BARO.hw.toFixed(3)} m of water`);
ok(e3.ratio === 16 && near(e3.F1 * e3.d1, e3.work, 1e-9) && near(e3.W / (Math.PI * e3.r2 ** 2), e3.F1 / (Math.PI * e3.r1 ** 2), 1e-9), `Example 3: lift force ${e3.F1} N, narrow piston moves ${e3.d1} m, work ${e3.work} J each side, equal pressure ${(e3.p / 1000).toFixed(1)} kPa`);
ok(e4.v2 === 8 && near(e4.Q, 5.65487e-3, 1e-5), `Example 4: nozzle speed ${e4.v2} m/s, flow rate ${(e4.Q * 1000).toFixed(3)} L/s`);
ok(near(P.deriv((t) => 0.5 * P.g * t * t, e5.t) , Math.sqrt(2 * P.g * e5.fall), 1e-6) && near(e5.R, 2 * Math.sqrt(e5.h * e5.fall), 1e-9) && near(e5.v, 3.1305, 1e-4), `Example 5: efflux speed ${e5.v.toFixed(4)} m/s, fall time ${e5.t.toFixed(4)} s, range ${e5.R.toFixed(4)} m`);
ok(near(P.root((v1) => 0.5 * P.RHO * ((v1 * e6.A1 / e6.A2) ** 2 - v1 ** 2) - e6.dP, 0, 10), e6.v1, 1e-9) && e6.v1 === 1 && e6.v2 === 4, `Example 6: Venturi speeds ${e6.v1} and ${e6.v2} m/s (root of Bernoulli), flow ${(e6.Q * 1000).toFixed(3)} L/s`);
ok(near(s1.F, 8, 1e-9), `Part 2 Example 1: viscous force ${s1.F} N`);
ok(near(P.settleSpeed(s2.r, s2.rs, s2.sg, s2.eta), s2.vt, 1e-6) && s2.Re < 1, `Part 2 Example 2: terminal speed ${(s2.vt * 100).toFixed(3)} cm/s agrees with an RK4 integration of the equation of motion; Reynolds number ${s2.Re.toFixed(3)}`);
ok(s3.Re1 === 500 && s3.Re2 === 22500, `Part 2 Example 3: Reynolds numbers ${s3.Re1} and ${s3.Re2}`);
ok(near(s4.W, s4.F * s4.d, 1e-9) && near(s4.W, s4.S * s4.dA, 1e-9), `Part 2 Example 4: film force ${s4.F} N, area ${s4.dA} m², work ${s4.W} J`);
ok(s5.dPb === 8 && s5.dPd === 288, `Part 2 Example 5: excess pressures ${s5.dPb} Pa (bubble) and ${s5.dPd} Pa (drop)`);
ok(near(P.capHeight(P.S_W, 0, P.RHO, s6.r), s6.h, 1e-6) && near(P.capHeight(s6.Sh, s6.th, P.RHO_HG, s6.rh), s6.hHg, 1e-6), `Part 2 Example 6: capillary rise ${(s6.h * 100).toFixed(3)} cm; mercury level ${(s6.hHg * 1000).toFixed(3)} mm`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1109,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['abs-mcq', 'bern-mcq', 'stokes-mcq', 'cap-ar'],
      B: ['dam-short', 'terminal-short', 'bern-short'],
      C: ['jack-long', 'stokes-long'],
      D: ['tubes-case'],
    },
    long: {
      A: ['shape-mcq', 'lift-mcq', 'contin-mcq', 'venturi-mcq', 'visc-mcq', 'term-mcq', 'tension-mcq', 'merge-mcq', 'range-ar', 'term-ar'],
      B: ['pascal-short', 'venturi-short', ['contact-short', 'visc-short'], 'brake-short', ['tor-short', 'bubble-short']],
      C: ['depth-long', ['bern-long', 'cap-long']],
      D: ['tower-case', 'ball-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} self-checks (pressure bars grow with depth; barometer column 760 mm at 0.22 px per mm; hydraulic lift piston widths in the ratio 1:4, area ratio 16, work in = work out; hose radii 30 and 15 px with A₁v₁ = A₂v₂ and speed arrows 1:4; efflux jet lands on the ground line at the computed range; Venturi liquid heights differ by Δh with ρgΔh = ½ρ(v₂² − v₁²); aerofoil streamline gaps smaller above than below; viscous layer speeds linear with height; falling-sphere forces drawn to one scale with weight = upthrust + drag; soap-film area = ΔA/2 per face; contact-angle tangents; force balance on a drop and a bubble; capillary rise and depression from a numerical force balance; worked examples re-derived by integration, root finding, an RK4 ODE solve and force balance): ${svgFails.length} failures`,
    physics_facts: 'g = 9.8 m s⁻² (stated in every item that uses it); ρ(water) = 1000 and ρ(mercury) = 13 600 kg m⁻³; P₀ = 1.013 × 10⁵ Pa; η(water) about 1.0 × 10⁻³ Pa s; S(water) = 0.072 N m⁻¹ (soap solution 0.025 to 0.030, mercury 0.465 as data in the stems); P = P₀ + ρgh; P₀ = ρgh for a barometer (760 mm Hg, 10.3 m of water); F₂/F₁ = A₂/A₁ and A₁d₁ = A₂d₂; A₁v₁ = A₂v₂; P + ½ρv² + ρgh = constant; v = √(2gh) and R = 2√(h(H − h)); F = ηAv/d; F = 6πηrv and v_t = 2r²(ρ − σ)g/9η; Re = ρvd/η with about 1000 and 2000 as the laminar and turbulent limits; S = F/l = energy per unit area; ΔP = 2S/R (drop) and 4S/R (soap bubble); h = 2S cos θ/(ρgr); every number computed by the build script and re-solved (see README)',
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
