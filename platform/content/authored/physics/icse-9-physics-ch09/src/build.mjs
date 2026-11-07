// Build ICSE 9 Physics ch09 Spherical Mirrors:
//   npx tsx content/authored/physics/icse-9-physics-ch09/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(9, 'Spherical Mirrors', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.env.CH_OUT) fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
const report = writeChapter({
  dir,
  seed: 90909,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cc-mcq1', 'cc-mcq5', 'sf-mcq2', 'sf-mcq3', 'rs-ar', 'cx-short2a', 'cx-short3'],
      B: [['long-terms', 'long-conc']],
    },
    long: {
      A: ['tm-mcq1', 'rs-mcq1', 'rs-mcq3', 'rs-mcq4', 'rs-mcq5', 'cx-mcq4', 'sf-mcq1', 'cc-ar', 'tm-short2a', 'rs-short2', 'sf-short2a', 'sf-short3a', 'sf-short3b'],
      B: [['long-case', 'long-conv', 'long-table']],
    },
  },
  checksExtra: {
    physics_facts: 'Spherical mirrors (pole, centre of curvature, radius of curvature, principal axis, principal focus, focal length; f = R/2 used without proof), the paths of the specific rays and parallel rays meeting on the focal plane, the images formed by a concave mirror for six object positions (simple qualitative ray diagrams), the image in a convex mirror, uses of concave and convex mirrors, the Cartesian sign convention, 1/v + 1/u = 1/f and m = h-prime/h = -v/u with direct numericals only, checked against the ICSE 2028 Physics syllabus Class IX (Light); the derivation of the mirror formula and scale drawing are removed topics and are not taught',
    computed_values: 'Image distances, magnifications and heights come from calc.mjs and are asserted there; every ray diagram is computed from the mirror geometry and the build checks that the drawn reflected rays meet where the mirror formula places the image',
    icse_style: 'Assertion-reason items use the 521 option order; 1-mark terms, fill-ins and a 5-pair match; numericals with sign convention, formula, substitution and unit; 10-mark structured questions in parts (two with lettered A to E figures); chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-08: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
