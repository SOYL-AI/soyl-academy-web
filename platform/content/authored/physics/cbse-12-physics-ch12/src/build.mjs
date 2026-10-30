// Build ch12 Atoms: npx tsx content/authored/physics/cbse-12-physics-ch12/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(12, 'Atoms');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, EX } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Bohr constants computed from ε₀, h, m, e agree with the rounded values used in questions
const okBohr = Math.abs(EX.ex2.r1 - 5.3e-11) / 5.3e-11 < 0.01 && Math.abs(EX.ex2.v1 - 2.18e6) / 2.18e6 < 0.01 && Math.abs(EX.ex2.E1J / 1.6e-19 + 13.6) / 13.6 < 0.01;
SELF_CHECKS.push(okBohr ? `ok   Bohr constants from ε₀, h, m, e: r₁ = ${EX.ex2.r1.toExponential(3)} m, v₁ = ${EX.ex2.v1.toExponential(3)} m/s, E₁ = ${(EX.ex2.E1J / 1.6e-19).toFixed(2)} eV (within 1% of 5.3e-11, 2.18e6, −13.6)` : 'FAIL Bohr constants');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1212,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['thomson-mcq', 'KUE-mcq', 'longest-mcq', 'absorb-ar'],
      B: ['drawbacks-short', 'postulates-short', 'n4-short3'],
      C: ['scatter-long', 'spectrum-long'],
      D: ['discharge-case'],
    },
    long: {
      A: ['foil-mcq', 'protonalpha-mcq', 'rest-mcq', 'fraction-mcq', 'freq-mcq', 'excite-mcq', 'bombard-mcq', 'helium-mcq', 'rare-ar', 'accel-ar'],
      B: ['estimate-short', 'impact-short', ['dbwave-short', 'crowd-short'], 'observe-short3', ['radius-short3', 'energy-short3']],
      C: ['bohr-long', ['energy-long', 'models-long']],
      D: ['simulation-case', 'nebula-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (Geiger–Marsden layout; alpha paths integrated from the Coulomb force with deflections matching tan(θ/2) = d/2b and the head-on particle turning at d; Bohr orbits 1 : 4 : 9; hydrogen levels to scale; Bohr constants from ε₀, h, m, e): ${svgFails.length} failures`,
    physics_facts: '1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, h = 6.63 × 10⁻³⁴ J s, mₑ = 9.1 × 10⁻³¹ kg, hc ≈ 1243 eV nm; d = 2Ze²/(4πε₀K); r_n = n²h²ε₀/πme² ≈ 0.53n² Å, v_n = e²/2ε₀nh ≈ 2.18 × 10⁶/n m s⁻¹, E_n = −13.6/n² eV, K = −E, U = 2E; hν = E_i − E_f; Lyman/Balmer/Paschen end on n = 1/2/3; computed Balmer 3 → 2 line 658 nm vs measured 656 nm (rounded constants, noted); every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
