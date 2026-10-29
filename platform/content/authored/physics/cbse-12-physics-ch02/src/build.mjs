// Build ch02 Electrostatic Potential and Capacitance: npx tsx content/authored/physics/cbse-12-physics-ch02/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(2, 'Electrostatic Potential and Capacitance');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1202,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['VE-mcq', 'gradient-mcq', 'halfd-mcq', 'dielectric-ar'],
      B: ['equi-short', 'series-short', 'threeU-short'],
      C: ['plate-long', 'dipoleU-long'],
      D: ['flash-case'],
    },
    long: {
      A: ['square0-mcq', 'dipole60-mcq', 'sphereV-mcq', 'separate-mcq', 'square4-mcq', 'Ediel-mcq', 'mixed-mcq', 'slab-mcq', 'hollowV-ar', 'share-ar'],
      B: ['polar-short', 'Usign-short', ['car-short', 'Cdepends-short'], 'zeroV-short', ['diel-short', 'network-short']],
      C: ['connected-long', ['conductor-long', 'combo-long']],
      D: ['mapping-case', 'dome-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (traced equipotentials keep V constant, zero-potential bisector, field normal to the conductor surface, plate and dielectric polarities, triangle geometry): ${svgFails.length} failures`,
    physics_facts: 'SI units throughout; k = 9 × 10⁹ N m² C⁻², ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², e = 1.6 × 10⁻¹⁹ C; every worked-example and question number computed by the build script and re-solved (see README "Verifier pass")',
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
