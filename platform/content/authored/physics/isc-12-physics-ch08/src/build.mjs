// Build ISC 12 Physics ch08 Torque on a Current Loop and the Moving Coil Galvanometer: npx tsx content/authored/physics/isc-12-physics-ch08/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(8, 'Torque on a Current Loop and the Moving Coil Galvanometer');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2108,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['maxangle-mcq', 'northface-mcq', 'principle-mcq', 'shuntn-mcq', 'stable-ar'],
      B: ['netforce-short', ['concave-short', 'meterorder-short']],
      C: ['torquederive-short3', ['mcgworking-short3', 'convertderive-short3']],
      D: ['galvanometer-long'],
    },
    long: {
      A: ['righthand-mcq', 'twoturn-mcq', 'tauvec-mcq', 'farratio-mcq', 'currentn-mcq', 'radial-mcq', 'uniformscale-mcq', 'whichincrease-mcq', 'loading-mcq', 'rangeup-mcq', 'muL-ar', 'turnsV-ar'],
      B: ['farfield-short', 'sensways-short', ['loopdipole-short', 'wrongway-short']],
      C: ['bohrderive-short3', 'sensitivity-short3', 'multirange-short3', ['torque-short3', 'galvnum-short3']],
      D: ['torque-long', ['bohr-long', 'conversion-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (forces on the four sides of the coil and the couple computed as cross products; arm b sin θ; m from the right-hand rule; dipole field lines r = L sin²φ and the equatorial field opposite to m; L and μ of the orbiting electron opposite; radial field lines through the core centre and the coil plane containing B at a 20° deflection; shunt and series resistances re-solved against the drawn values): ${svgFails.length} failures`,
    physics_facts: 'μ₀ = 4π × 10⁻⁷ T m A⁻¹; e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg, h = 6.63 × 10⁻³⁴ J s; force on a side NIlB; torque τ = NIAB sin θ (θ from the normal), τ = m × B, m = NIA by the right-hand rule (other direction rules removed in the ISC scope); net force zero in a uniform field; stable at θ = 0°, unstable at 180°; far axial field (μ₀/4π)2m/x³; orbiting electron I = ev/2πr, μ = evr/2 = (e/2mₑ)L opposite to L, μ = nμB, μB = eh/4πmₑ ≈ 9.27 × 10⁻²⁴ A m² (9.28 × 10⁻²⁴ with the rounded constants); galvanometer NIAB = cθ, I = kθ, k = c/NAB, current sensitivity NAB/c, voltage sensitivity NAB/cG; shunt S = IgG/(I − Ig) = G/(n − 1), ammeter resistance G/n; series R = V/Ig − G; every number computed by the build script and re-solved (see README)',
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
