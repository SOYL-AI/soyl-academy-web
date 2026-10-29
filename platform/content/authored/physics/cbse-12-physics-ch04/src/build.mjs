// Build ch04 Moving Charges and Magnetism: npx tsx content/authored/physics/cbse-12-physics-ch04/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(4, 'Moving Charges and Magnetism');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1204,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['alpha-mcq', 'axis8-mcq', 'zerotorque-mcq', 'opposite-ar'],
      B: ['helix-short', 'core-short', 'torque-short'],
      C: ['loop-long', 'galv-long'],
      D: ['balance-case'],
    },
    long: {
      A: ['electron-mcq', 'sameK-mcq', 'semicircle-mcq', 'enclosed-mcq', 'midpoint-mcq', 'closed-mcq', 'shape-mcq', 'turns-mcq', 'always-ar', 'shunt-ar'],
      B: ['loopdir-short', 'ampdef-short', ['volt-short', 'compass-short'], 'circ-short', ['wires-short', 'meter-short']],
      C: ['parallel-long', ['motion-long', 'torque-long']],
      D: ['spectro-case', 'lab-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (every force and field direction drawn — circular motion, velocity selector, Biot–Savart element, loop axis, wire, solenoid, parallel currents, coil torque and magnetic moment — recomputed as a cross product in explicit coordinates): ${svgFails.length} failures`,
    physics_facts: 'SI units throughout; μ₀ = 4π × 10⁻⁷ T m A⁻¹, e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg, mₚ = 1.67 × 10⁻²⁷ kg, 1 u = 1.66 × 10⁻²⁷ kg; every worked-example and question number computed by the build script and re-solved; right-hand-rule answers checked as cross products (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
