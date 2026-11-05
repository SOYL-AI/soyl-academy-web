// Build ICSE 9 Chemistry ch06 Hard and Soft Water; Making Water Potable:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch06/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(6, 'Hard and Soft Water; Making Water Potable', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90106,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['scum-mcq', 'cause-mcq', 'kettle-mcq', 'bact-mcq', 'ar-soft', 's2-boil', 's3-disadv'],
      B: [['soap-long', 'treat-long']],
    },
    long: {
      A: ['hardadv-mcq', 'softdis-mcq', 'both-mcq', 'virus-mcq', 'prevent-mcq', 'ors-mcq', 'order-mcq', 'ar-hard', 's2-alum', 's2-types', 's2-soap', 's3-compare', 's3-test'],
      B: [['wsoda-long', 'outbreak-long', 'fluoride-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'The soap test, temporary and permanent hardness and their salts, removal by boiling and washing soda, the stages of water treatment, the role of alum, chlorination and defluoridation, and water-borne diseases, checked against the ICSE 2028 Chemistry syllabus Class IX (Water) — see README "For a reviewer"',
    counting_rules: 'Soap-test volumes, percentages of hardness, doses of alum and chlorine, fluoride to remove and village case percentages are computed and asserted in src/calc.mjs, not typed in; all data are imagined and illustrative',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, equations, odd one out and give-reason items; numericals with working; a lettered treatment-flow diagram and a 5-pair match; 10-mark structured questions in parts; chapter tests on icse-9-default-chapter-test-short / -long',
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
