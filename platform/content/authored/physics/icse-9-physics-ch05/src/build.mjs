// Build ICSE 9 Physics ch05 Pressure in Fluids:
//   npx tsx content/authored/physics/icse-9-physics-ch05/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(5, 'Pressure in Fluids', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.env.CH_OUT) fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
const report = writeChapter({
  dir,
  seed: 90505,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['lq-mcq1', 'lq-mcq3', 'lq-mcq4', 'th-mcq4', 'ar-th', 'lq-short2b', 'lq-short3b'],
      B: [['long-block', 'long-pascal']],
    },
    long: {
      A: ['th-mcq6', 'th-mcq5', 'th-mcq3', 'lq-mcq6', 'th-mcq7', 'pl-mcq3', 'pl-mcq5', 'ar-pl', 'th-short2a', 'th-short2c', 'pl-short2', 'th-short3', 'pl-short3'],
      B: [['long-dam', 'long-jets', 'long-tank']],
    },
  },
  checksExtra: {
    physics_facts: 'Thrust and pressure p = F / A (pascal), everyday examples of small and large area, pressure of a liquid column p = h rho g and the factors it does and does not depend on, dams and divers, transmission of pressure and Pascal law with simple force and pressure numericals (g = 10 m s^-2; water 1000, sea water 1030, kerosene 800, mercury 13600 kg m^-3), checked against the ICSE 2028 Physics syllabus Class IX (Fluids); the working of hydraulic machines is a removed topic and is not taught or asked',
    computed_values: 'Pressures, forces, areas and depths are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the 521 option order; 1-mark terms, fill-ins and a 5-pair match; numericals with formula, substitution and unit; 10-mark structured questions in parts (one with a lettered A to E figure, one on the jets figure); chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-07: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
