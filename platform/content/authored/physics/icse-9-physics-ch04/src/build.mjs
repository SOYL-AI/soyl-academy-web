// Build ICSE 9 Physics ch04 Gravitation:
//   npx tsx content/authored/physics/icse-9-physics-ch04/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(4, 'Gravitation', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.env.CH_OUT) fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
const report = writeChapter({
  dir,
  seed: 90404,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['law-mcq2', 'fall-mcq2', 'wt-mcq1', 'wt-mcq6', 'ar-wt', 'law-short2b', 'wt-short3a'],
      B: [['long-pair', 'long-tube']],
    },
    long: {
      A: ['law-mcq5', 'law-mcq6', 'law-mcq7', 'fall-mcq1', 'fall-mcq3', 'fall-mcq4', 'wt-mcq4', 'ar-law', 'law-short2a', 'fall-short2b', 'wt-short2c', 'law-short3a', 'fall-short3'],
      B: [['long-table', 'long-sack', 'long-mango']],
    },
  },
  checksExtra: {
    physics_facts: 'Universal law of gravitation F = G m1 m2 / r^2 with G = 6.67e-11 N m^2 kg^-2 and ratio-type changes, equal and opposite gravitational pairs, gravity and free fall (v = g t, s = 1/2 g t^2, same acceleration for all bodies, air resistance), mass and weight (W = m g, newton and kgf with 1 kgf = 9.8 N), checked against the ICSE 2028 Physics syllabus Class IX (Fluids and Laws of Motion groupings); problems on the variation of g are a removed topic and are not asked',
    computed_values: 'Forces, ratios, times, speeds, distances and weights are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the 521 option order; 1-mark terms, fill-ins and a 5-pair match; numericals with formula, substitution and unit; 10-mark structured questions in parts (one with a lettered A to E figure); chapter tests on icse-9-default-chapter-test-short / -long',
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
