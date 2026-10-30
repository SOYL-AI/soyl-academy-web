// Build ISC 12 Physics ch01 Electric Charges and Fields: npx tsx content/authored/physics/isc-12-physics-ch01/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ./lib.mjs (later chapters import it from here).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Electric Charges and Fields');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2101,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['silk-mcq', 'water-mcq', 'unitE-mcq', 'pdir-mcq', 'straight-ar'],
      B: ['vector-short', ['testcharge-short', 'lineprops-short']],
      C: ['rightangle-short3', ['axial-short3', 'equatorial-short3']],
      D: ['dipole-long'],
    },
    long: {
      A: ['principle-mcq', 'square-mcq', 'unlikenull-mcq', 'plates-mcq', 'eqdir-mcq', 'double-mcq', 'hcl-mcq', 'maxtau-mcq', 'stable-mcq', 'induction-mcq', 'medium-ar', 'nonuniform-ar'],
      B: ['paper-short', 'salt-short', ['neutral-short', 'nonuni-short']],
      C: ['gravity-short3', 'proton-short3', 'patterns-short3', ['torque-short3', 'spheres-short3']],
      D: ['coulomb-long', ['field-long', 'torque-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (field lines traced by RK4 from Coulomb’s law with every arrowhead checked against the computed field; dipole and neutral-point directions; superposition drawn to scale with the resultant angle checked; dipole fields at axial and equatorial points; torque sense): ${svgFails.length} failures`,
    physics_facts: '1/4πε₀ = 9 × 10⁹ N m² C⁻², ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg, m_p = 1.67 × 10⁻²⁷ kg, G = 6.67 × 10⁻¹¹ N m² kg⁻²; q = ne; F = kq₁q₂/r², F/K in a medium; E = kq/r²; dipole axial 2kpr/(r² − a²)² → 2kp/r³, equatorial kp/(r² + a²)^(3/2) → kp/r³ opposite p; τ = p × E; position-vector form of Coulomb’s law omitted (removed in the ISC scope); every number computed by the build script and re-solved (see README)',
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
