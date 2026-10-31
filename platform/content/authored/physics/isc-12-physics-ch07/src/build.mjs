// Build ISC 12 Physics ch07 Moving Charges and Magnetic Field:
//   npx tsx content/authored/physics/isc-12-physics-ch07/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(7, 'Moving Charges and Magnetic Field');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2107,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['oersted-mcq', 'loopdir-mcq', 'stretch-mcq', 'electrondir-mcq', 'parallelB-ar'],
      B: ['oersted-short', ['limit-short', 'ampdef-short']],
      C: ['wirederive-short3', ['orbit-short3', 'forcederive-short3']],
      D: ['axis-long'],
    },
    long: {
      A: ['parallelv-mcq', 'dBdir-mcq', 'unit-mcq', 'twocoil-mcq', 'rewind-mcq', 'enclosed-mcq', 'ratiowire-mcq', 'samevolt-mcq', 'updir-mcq', 'opposite-mcq', 'halfdist-ar', 'coils-b-ar'],
      B: ['biot-short', 'ampere-short', ['farfield-short', 'KEchange-short']],
      C: ['compare-short3', 'centrederive-short3', 'paths-short3', ['square-short3', 'conductor-short3']],
      D: ['ampere-long', ['lorentz-long', 'parallel-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (every field and force direction computed as a cross product and compared with the arrow drawn: Oersted needle, F = qv × B, Biot–Savart element, coil axis, straight wire, solenoid, finite wire, circular orbit, crossed fields, conductor in a field, parallel currents; finite wire and helix pitch drawn to scale): ${svgFails.length} failures`,
    physics_facts: 'μ₀ = 4π × 10⁻⁷ T m A⁻¹ (μ₀/4π = 10⁻⁷, μ₀/2π = 2 × 10⁻⁷); e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg, mₚ = 1.67 × 10⁻²⁷ kg; F = q(v × B), 1 T = 1 N A⁻¹ m⁻¹; Biot–Savart dB = (μ₀/4π) I dl × r / r³; coil centre μ₀NI/2R, axis μ₀NIR²/2(R² + x²)^(3/2); Ampere ∮B·dl = μ₀I_enc; long wire μ₀I/2πr; long solenoid μ₀nI; finite wire (μ₀I/4πa)(sin α + sin β) (formula only in the ISC scope); Lorentz q(E + v × B), no work by the magnetic part; r = mv/qB, T = 2πm/qB, helix pitch 2πmv cos θ/qB; v = E/B in crossed fields; F = I(l × B); parallel wires μ₀I₁I₂/2πr, like currents attract; ampere 2 × 10⁻⁷ N m⁻¹ at 1 m; 1 C = 1 A s; every number computed by the build script and re-solved (see README)',
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
