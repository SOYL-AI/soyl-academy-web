// Build ICSE 9 Chemistry ch03 Chemical Changes and Reactions:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch03/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(3, 'Chemical Changes and Reactions', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 93033,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['comb-mcq4', 'dec-mcq2', 'dec-mcq5', 'en-mcq1', 'ar-dec', 'dec-short2b', 'disp-short3'],
      B: [['iron-sulphur-long', 'ppt-long']],
    },
    long: {
      A: ['comb-mcq1', 'dec-mcq1', 'dec-mcq3', 'dec-mcq6', 'disp-mcq3', 'dd-mcq3', 'dd-mcq4', 'ar-comb', 'comb-short2b', 'disp-short2b', 'en-short2a', 'comb-short3', 'dec-short3'],
      B: [['electrolysis-long', 'displacement-long', 'energy-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Direct combination, decomposition by heat, light and electricity, displacement and the activity series, the three prescribed double decomposition reactions with precipitate colours, and exothermic and endothermic reactions, checked against the ICSE 2028 Chemistry syllabus Class IX (Chemical Changes and Reactions) — see README "For a reviewer"',
    counting_rules: 'Every equation is atom-balanced and every displacement prediction is made from the activity series in src/calc.mjs; temperature changes and gas volumes are computed there, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark balanced equations, colours and names; a 5-pair match; 10-mark structured questions in parts, two with lettered diagrams; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-05: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
