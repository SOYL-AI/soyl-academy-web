// Build ISC 12 Physics ch11 Alternating Current: npx tsx content/authored/physics/isc-12-physics-ch11/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(11, 'Alternating Current');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2111,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['meters-mcq', 'Cpeak-mcq', 'chokepf-mcq', 'halfturns-mcq', 'resR-ar'],
      B: ['RLRC-short2', ['choke-short2', 'LCosc-short2']],
      C: ['rms-short3', ['lcrcalc-short3', 'gen-short3']],
      D: ['resonance-long'],
    },
    long: {
      A: ['phase-mcq', 'square-mcq', 'Xfreq-mcq', 'leadlag-mcq', 'Zgraph-mcq', 'RC-mcq', 'LhalfC-mcq', 'resP-mcq', 'fluxemf-mcq', 'genfreq-mcq', 'arith-ar', 'gen-ar'],
      B: ['mean-short2', 'crossover-short2', ['wattless-short2', 'sharp-short2']],
      C: ['Cderive-short3', 'findL-short3', 'Pavg-short3', ['resonance-short3', 'chokecalc-short3']],
      D: ['lcr-long', ['rms-long', 'generator-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (half-cycle mean and rms lines of the sine wave at the numerically averaged heights 2/π and 1/√2, full-cycle mean zero; rotating phasors whose projections equal the waveform values at the marked instant, current drawn φ behind; R, L and C phasors at 0°, −90° and +90°; worked example 3 voltages adding as phasors to 130 V, its phasor diagram and impedance triangle to scale at tan⁻¹(20/48); active and wattless components of a 4.0 A current at power factor 0.80; lamp-and-choke voltages at right angles adding to 230 V; LC quarter-cycle states with the drawn current equal to the rate the top plate loses charge; generator axis perpendicular to B; end-on generator view with opposite emfs v × B in the two sides adding to ∝ sin θ and the normal at θ to B): ${svgFails.length} failures`,
    physics_facts: 'i = I₀ sin(ωt + φ₀), ω = 2πf; half-cycle mean 2I₀/π ≈ 0.637 I₀, full-cycle mean zero; I_rms = I₀/√2 for sine waves only (square wave: rms = peak); mains 230 V rms, 50 Hz, peak ≈ 325 V; pure L: i lags by π/2, X_L = ωL; pure C: i leads by π/2, X_C = 1/ωC; series LCR Z = √(R² + (X_L − X_C)²), tan φ = (X_L − X_C)/R, inductive when X_L > X_C; RL lags, RC leads; P = V_rms I_rms cos φ = I_rms²R, cos φ = R/Z, wattless I sin φ; choke: large L, tiny R; resonance f₀ = 1/(2π√LC), Z = R, V_L = V_C = QV; bandwidth Δω = R/L and Q = ω₀L/R = (1/R)√(L/C) quoted as formulae (derivations removed in the ISC scope); LC oscillations qualitative only (removed: quantitative treatment); generator Φ = NBA cos ωt, e = NBAω sin ωt, e = 0 when the coil faces B, frequency = rotations per second; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question re-solved from its stem by the author; keys, schemes, mark splits and word limits checked — see README "Verifier pass"',
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
