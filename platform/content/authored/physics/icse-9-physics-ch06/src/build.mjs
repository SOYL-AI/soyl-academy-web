// Build ICSE 9 Physics ch06 Upthrust and Archimedes' Principle:
//   npx tsx content/authored/physics/icse-9-physics-ch06/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(6, "Upthrust and Archimedes' Principle", { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.env.CH_OUT) fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
const report = writeChapter({
  dir,
  seed: 90606,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['rd-mcq2', 'fl-mcq2', 'sh-mcq2', 'ar-mcq2', 'ar-sink', 'rd-short2', 'sh-short3'],
      B: [['long-spring', 'long-ice']],
    },
    long: {
      A: ['up-mcq3', 'up-mcq4', 'ar-mcq1', 'ar-mcq3', 'fl-mcq4', 'fl-mcq5', 'sh-mcq3', 'ar-up', 'up-short2a', 'fl-short2b', 'sh-short2', 'ar-short3', 'fl-short3'],
      B: [['long-rd', 'long-float', 'long-balloon']],
    },
  },
  checksExtra: {
    physics_facts: 'Buoyancy and upthrust (vertical, depends on volume immersed and density of the liquid), Archimedes principle and apparent weight, relative density and its determination for a solid and a liquid with a spring balance, sinking and floating by comparing densities, the law of floatation and the fraction immersed rho(body) / rho(liquid), ships, submarines, icebergs and balloons (g = 10 m s^-2; water 1000, sea water 1030, ice 900 or 920, brine 1200, oil 800, air 1.2, helium 0.18 kg m^-3), checked against the ICSE 2028 Physics syllabus Class IX (Fluids)',
    computed_values: 'Upthrusts, apparent weights, relative densities, fractions immersed and volumes are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the 521 option order; 1-mark terms, fill-ins and a 5-pair match; numericals with formula, substitution and unit on sinking, floating fully immersed and floating partly immersed; 10-mark structured questions in parts (one with a lettered A to E figure and scale reading); chapter tests on icse-9-default-chapter-test-short / -long',
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
