// Build ISC 12 Physics ch14 Refraction and Dispersion by a Prism:
//   npx tsx content/authored/physics/isc-12-physics-ch14/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(14, 'Refraction and Dispersion by a Prism');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2114,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['towardsbase-mcq', 'inside-mcq', 'thinA-mcq', 'violet-mcq', 'redsky-ar'],
      B: ['thinderive-short2', ['grazing-short2', 'drop-short2']],
      C: ['deriv-short3', ['disp-short3', 'silver-short3']],
      D: ['mindev-long'],
    },
    long: {
      A: ['r1r2-mcq', 'quad-mcq', 'emerge-mcq', 'pair-mcq', 'density-mcq', 'liquid-mcq', 'spectro-mcq', 'thinratio-mcq', 'bowred-mcq', 'evening-mcq', 'noemerge-ar', 'omega-ar'],
      B: ['reverse-short2', 'measure-short2', ['noon-short2', 'slabprism-short2']],
      C: ['geom-short3', 'thin-short3', 'rainbow-short3', ['idm-short3', 'redviolet-short3']],
      D: ['deviation-long', ['thin-long', 'disp-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (every prism ray traced face by face with Snell’s law in vector form: r1 + r2 = A and a bend towards the base; the normals meeting at 180° − A and the traced deviation equal to i + e − A; the symmetric path at minimum deviation with the inside ray parallel to the base, r = A/2, e = i and neighbouring incidences deviating more; emergence at 50°, grazing emergence at the least angle with r2 = C, and total internal reflection at the second face below it; a thin prism deviating rays at 0°, 5° and 10° within 2% of (n − 1)A; red, yellow and violet deviations increasing with n; an inverted second prism returning both colours parallel to the incident beam; a raindrop ray obeying Snell’s law at entry and exit and the law of reflection inside, leaving at the bunching angles for red and violet (red larger); the observer’s drops at those angles from the antisolar direction, red higher; every drawn point inside its drawing): ${svgFails.length} failures`,
    physics_facts: 'Snell’s law at each face (sin i = n sin r1, n sin r2 = sin e); r1 + r2 = A and δ = i + e − A from the quadrilateral and triangle formed by the normals; U-shaped i–δ graph with each δ > δm at two incidences (reversibility); emergence needs r2 ≤ C, least incidence sin i = n sin(A − C), none if A > 2C; minimum deviation i = e, r = A/2, n = sin((A + δm)/2)/sin(A/2); spectrometer turning-point method; thin prism δ = (n − 1)A, (n/nl − 1)A in a liquid; dispersion n_v > n_r; angular dispersion (n_v − n_r)A and dispersive power (n_v − n_r)/(n − 1) for thin prisms; primary rainbow by refraction, one internal reflection and refraction, red about 42° and violet about 40° from the antisolar direction (computed, not derived: the derivation is removed from the syllabus); secondary bow reversed; total reflecting prisms are left to ch13 and lenses to ch15; every number computed by the build script and re-solved (see README)',
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
