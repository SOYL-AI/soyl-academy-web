// Build ch13 Plant Growth and Development: npx tsx content/authored/biology/cbse-11-biology-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(13, 'Plant Growth and Development', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 131,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['phases-mcq', 'dorm-mcq', 'cytolat-mcq', 'arith-ar'],
      B: ['conds-short', 'ethylene-short', 'plastic-short'],
      C: ['curve-long', 'auxin-long'],
      D: ['callus-case'],
    },
    long: {
      A: ['growth-mcq', 'indet-mcq', 'arith-mcq', 'plastic-mcq', 'rooting-mcq', 'gibb-mcq', 'ripen-mcq', 'weed-mcq', 'dedif-ar', 'geo-ar'],
      B: ['phases-short', 'cyto-short', ['gibb-short', 'auxin-short'], 'curve-short', ['went-short', 'dominance-short']],
      C: ['diff-long', ['ethabaa-long', 'eval-long']],
      D: ['seedling-case', 'seed-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Growth (irreversible, indeterminate, meristematic, elongation and maturation phases, measurement parameters), arithmetic and geometric growth with equations, sigmoid curve (lag, log, stationary), conditions for growth, differentiation, dedifferentiation, redifferentiation, plasticity and heterophylly, development; auxins (IAA, IBA, NAA, 2,4-D; Darwin and Went), gibberellins (foolish seedling), cytokinins (kinetin, zeatin), ethylene (ethephon), abscisic acid, and their effects, checked against the 2026-27 rationalised NCERT scope; photoperiodism and vernalisation are not taught (see README "Verifier pass")',
    counting_rules: 'Arithmetic and geometric growth values, doubling, the sigmoid data set with increments, growth rates and relative changes, hormone masses and spray volumes, germination and rooting percentages and the A to E experiment letters are computed and asserted in src/calc.mjs, not typed in; the growth curve in src/svgs.mjs is drawn from the same data',
    verifier_pass: '2026-11-02: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
