// Build ISC 12 Physics ch13 Reflection at Spherical Mirrors and Refraction at Plane Surfaces:
//   npx tsx content/authored/physics/isc-12-physics-ch13/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(13, 'Reflection at Spherical Mirrors and Refraction at Plane Surfaces');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2113,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['signconv-mcq', 'makeup-mcq', 'freq-mcq', 'plastic45-mcq', 'shift-ar'],
      B: ['stick-short2', ['rearview-short2', 'sinC-short2']],
      C: ['Rf-short3', ['lateral-short3', 'fountain-short3']],
      D: ['mirror-long'],
    },
    long: {
      A: ['magsign-mcq', 'atC-mcq', 'uvgraph-mcq', 'chain-mcq', 'stack-mcq', 'lateraldep-mcq', 'kingfisher-mcq', 'speedC-mcq', 'prism30-mcq', 'fibrebend-mcq', 'water-ar', 'cladding-ar'],
      B: ['inside-short2', 'laws-short2', ['addwater-short2', 'diamond-short2']],
      C: ['shaving-short3', 'cycle-short3', 'apparent-short3', ['prisms-short3', 'tank-short3']],
      D: ['refraction-long', ['convex-long', 'tir-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (F midway between P and C; the R = 2f construction with i = r = θ at M, the isosceles triangle FCM and the paraxial limit R/2; signs of the object and focus; the derivation figure with an object beyond C, a real image between C and F, exact reflection at P and the similar-triangle ratios; three worked-example ray diagrams whose images satisfy 1/v + 1/u = 1/f and m = −v/u and whose reflected rays obey the law of reflection at the drawn points (within 3° for paraxial rays, exactly for pole and centre rays); Snell’s law at an air–glass surface; n sin θ constant through water and glass with the emergent ray parallel; the drawn lateral shift of a slab equal to t sin(i − r)/cos r; real and apparent depth under water and under a slab within a few per cent of the near-normal values; rays below, at and beyond the critical angle of glass; three prisms traced face by face with total internal reflection at 45°, 45° + 45° and 60°; a fibre ray refracted at entry and meeting the wall above the critical angle): ${svgFails.length} failures`,
    physics_facts: 'New Cartesian sign convention (distances from the pole, positive along the incident light; real object u < 0, concave f < 0, convex f > 0); f = R/2 for paraxial rays (FC = FM, FM ≈ FP); mirror formula 1/v + 1/u = 1/f derived for a concave mirror from triangles A′B′F ~ MDF and A′B′P ~ ABP; m = h′/h = −v/u; convex mirror images always virtual, erect, diminished, between P and F; n₁ sin i = n₂ sin r, n = c/v, ₁n₂ = n₂/n₁ = v₁/v₂, ₁n₂ × ₂n₃ × ₃n₁ = 1; slab: e = i, lateral shift t sin(i − r)/cos r; n = real depth/apparent depth for near-normal viewing, apparent shift t(1 − 1/n), layers add as Σt/n; sin C = 1/n (or n₂/n₁); total reflecting prisms with 45° and 60° incidences (n > √2 and n > 1.155) and the 30° case (n > 2); optical fibre core n₁ > cladding n₂; prisms (deviation, dispersion), lenses and instruments are left to ch14–ch16; every number computed by the build script and re-solved (see README)',
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
