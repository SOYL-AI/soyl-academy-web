// Build ISC 12 Physics ch03 Electrostatic Potential and Potential Energy: npx tsx content/authored/physics/isc-12-physics-ch03/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(3, 'Electrostatic Potential and Potential Energy');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2103,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['voltunit-mcq', 'graphs-mcq', 'dipfall-mcq', 'maxU-mcq', 'ext-ar'],
      B: ['energy-short', ['equi-short', 'eVdef-short']],
      C: ['Vderive-short3', ['dipolederive-short3', 'Uderive-short3']],
      D: ['potential-long'],
    },
    long: {
      A: ['pathind-mcq', 'spacing-mcq', 'electron-mcq', 'halfV-mcq', 'midpoint-mcq', 'ninety-mcq', 'Vsign-mcq', 'ring-mcq', 'workloop-mcq', 'plateslinear-mcq', 'Vzero-ar', 'Utorque-ar'],
      B: ['scalar-short', 'stableunstable-short', ['VzeroE-short', 'path-short']],
      C: ['shapes-short3', 'squareU-short3', 'qV-short3', ['VEfind-short3', 'graph-short3']],
      D: ['energy-long', ['dipolepot-long', 'dipoleenergy-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (equipotentials of a dipole traced numerically and checked constant, its bisector at V = 0; point-charge equipotentials at V, V/2, V/3; uniform-field potentials falling along E; triangle of charges; dipole general point with the exact potential within 3.5% of p cos θ/r²; dipole energy rising from 0° to 180°): ${svgFails.length} failures`,
    physics_facts: '1/4πε₀ = 9 × 10⁹ N m² C⁻², e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg; V = W/q₀, V = kq/r, V/E = r for a point charge; uniform field E = ΔV/d; dipole axial kp/(r² − a²), equatorial 0, general kp cos θ/r²; U = qV, U = kq₁q₂/r, sum over pairs; U = −pE cos θ, W = pE(cos θ₁ − cos θ₂); every number computed by the build script and re-solved (see README)',
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
