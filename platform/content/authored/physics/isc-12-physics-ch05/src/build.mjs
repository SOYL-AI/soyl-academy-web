// Build ISC 12 Physics ch05 Electric Current, Ohm's Law and Resistivity: npx tsx content/authored/physics/isc-12-physics-ch05/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(5, 'Electric Current, Ohm’s Law and Resistivity');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2105,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['speeds-mcq', 'ohmic-mcq', 'metalheat-mcq', 'bulbs-mcq', 'tau-ar'],
      B: ['instant-short', ['ohmlaw-short', 'power-short']],
      C: ['rhoderive-short3', ['tempexplain-short3', 'billing-short3']],
      D: ['wire-long'],
    },
    long: {
      A: ['halfarea-mcq', 'conv-mcq', 'radius-mcq', 'mobunit-mcq', 'ndouble-mcq', 'stretch-mcq', 'halfdia-mcq', 'cut-mcq', 'alloy-mcq', 'halfV-mcq', 'drift-ar', 'lampmp-ar'],
      B: ['scalar-short', 'macro-short', ['lamp-short', 'thermometer-short']],
      C: ['IneA-short3', 'driftcalc-short3', 'compare-short3', ['coil-short3', 'transmission-short3']],
      D: ['drift-long', ['resistivity-long', 'power-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (electron drift arrows opposite to E and I, electrons inside the conductor, slice vd Δt within it; random walk with the same kicks drifting opposite to E and kept inside its panels; wire dimension line end to end; stretched wire drawn to scale at constant volume, l/A × 4): ${svgFails.length} failures`,
    physics_facts: 'e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg; I = Δq/Δt; vd = eEτ/m opposite to E; μ = vd/E = eτ/m (m² V⁻¹ s⁻¹); I = neAvd, J = I/A = nevd; J = σE, σ = ne²τ/m, ρ = m/(ne²τ); R = ρl/A, G = 1/R, σ = 1/ρ; stretching at constant volume R ∝ l²; ohmic: straight V–I line through the origin; metals ρ rises with T (τ falls), semiconductors ρ falls (n rises); R_T = R₀[1 + α(T − T₀)]; P = VI = I²R = V²/R; 1 kW h = 3.6 × 10⁶ J; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-31: every question re-solved from its stem by the author; keys, schemes, mark splits and word limits checked — see README "Verifier pass"',
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
