// Build ICSE 9 Physics ch07 Heat and Energy:
//   npx tsx content/authored/physics/icse-9-physics-ch07/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(7, 'Heat and Energy', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.env.CH_OUT) fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
const report = writeChapter({
  dir,
  seed: 90707,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['an-mcq3', 'gh-mcq3', 'hp-mcq3', 'ht-mcq3', 'ar-gh', 'gh-short2b', 'ht-short3'],
      B: [['long-hope', 'long-engine']],
    },
    long: {
      A: ['ht-mcq1', 'ht-mcq2', 'ht-mcq5', 'hp-mcq5', 'ed-mcq2', 'ed-mcq3', 'ed-mcq4', 'ar-ed', 'hp-short2', 'ed-short2', 'ht-short2a', 'gh-short3', 'ed-short3'],
      B: [['long-graph', 'long-gh', 'long-heat']],
    },
  },
  checksExtra: {
    physics_facts: 'Heat as energy flowing from higher to lower temperature, temperature as degree of hotness, joule and calorie (1 cal = 4.186 J, 1 kcal = 1000 cal), anomalous expansion of water (maximum density and minimum volume at 4 degrees C; density table 0 to 10 degrees C from standard tables, rounded), Hope\'s experiment and its consequences (frozen ponds, burst pipes; ice 900 and water 1000 kg m^-3 in the numericals), the greenhouse effect (infrared from the ground absorbed by greenhouse gases) and global warming (time-sensitive figures marked as of 2026), energy degradation with simple numericals, checked against the ICSE 2028 Physics syllabus Class IX (Heat and Energy)',
    computed_values: 'Conversions between cal and J, volumes and densities of water, ice volumes, degraded energies and graph values are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the 521 option order; 1-mark terms, fill-ins (one with 5 blanks) and a 5-pair match; numericals with formula, substitution and unit; 10-mark structured questions in parts (two with lettered A to E figures); chapter tests on icse-9-default-chapter-test-short / -long',
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
