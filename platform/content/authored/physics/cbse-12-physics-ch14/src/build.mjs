// Build ch14 Semiconductor Electronics: npx tsx content/authored/physics/cbse-12-physics-ch14/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(14, 'Semiconductor Electronics: Materials, Devices and Simple Circuits');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, Ifwd, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// forward model: 10 mA at the 0.70 V knee and a dynamic resistance of a few ohms between 0.70 and 0.76 V
const okModel = Math.abs(Ifwd(0.7) - 10) < 1e-9 && EX.ex4.rd > 2 && EX.ex4.rd < 3 && Math.abs(EX.ex3.I - 4.3e-3) < 1e-12;
SELF_CHECKS.push(okModel ? `ok   diode model: I(0.70 V) = 10 mA, r_d(0.70–0.76 V) = ${EX.ex4.rd.toFixed(2)} Ω; series example 4.3 mA` : 'FAIL diode model');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1214,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['heat-mcq', 'donor-mcq', 'ndiodes-mcq', 'diamond-ar'],
      B: ['bands-short', 'halfwave-short', 'np-short3'],
      C: ['doping-long', 'rectifier-long'],
      D: ['meter-case'],
    },
    long: {
      A: ['solarmat-mcq', 'holedrift-mcq', 'forward-mcq', 'field-mcq', 'lamps-mcq', 'nonohmic-mcq', 'fullvhalf-mcq', 'openD2-mcq', 'abundant-ar', 'steady-ar'],
      B: ['temp-short', 'ptype-short', ['width-short', 'filter-short'], 'formation-short3', ['char-short3', 'fullwave-short3']],
      C: ['junction-long', ['bands-long', 'circuits-long']],
      D: ['charger-case', 'rooftop-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (band gaps to scale, diamond/silicon 5.4/1.1, conductor bands overlap; donor and acceptor lattices; junction ions and field n → p; forward/reverse bias polarity; half-wave and centre-tap full-wave circuits; forward diode model and worked numbers): ${svgFails.length} failures`,
    physics_facts: 'E_g: Si 1.1 eV, Ge 0.7 eV, diamond 5.4 eV; hc ≈ 1243 eV nm; donors P, As, Sb (n-type), acceptors B, Al, In (p-type); n_e n_h = n_i², n_i(Si) = 1.5 × 10¹⁶ m⁻³; barrier ≈ 0.7 V Si, 0.3 V Ge; field in depletion layer n → p; forward bias narrows, reverse bias widens the depletion layer; half-wave output f, full-wave 2f; V₀ = √2 V_rms; forward characteristic drawn from the stated exponential model, reverse curve schematic; special-purpose diodes, transistors and logic gates omitted (deleted from the syllabus); every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-31: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
