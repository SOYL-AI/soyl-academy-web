// Build ICSE 9 Biology ch02 Tissues:
//   npx tsx content/authored/biology/icse-9-biology-ch02/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(2, 'Tissues', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90022,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sclere-mcq', 'ciliated-mcq', 'blood-mcq', 'dendrite-mcq', 'ar-squam', 'tendon-short', 'meristem-three'],
      B: [['celery-long', 'muscle-long']],
    },
    long: {
      A: ['intercal-mcq', 'meristem-feat-mcq', 'chlorench-mcq', 'bone-mcq', 'joint-mcq', 'epi-mcq', 'flex-mcq', 'ar-sclero', 'sieve-short', 'smooth-short', 'meristem-short', 'xylem-phloem-table', 'parenchyma-short'],
      B: [['girth-long', 'epith-long', 'neuron-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Meristems (apical, intercalary, lateral), simple and complex permanent tissues, epithelial, connective, muscular and nervous tissue and the role of tissues, checked against the ICSE 2028 Biology syllabus Class IX (Basic Biology) — see README "For a reviewer"',
    counting_rules: 'Shoot growth, ink speed, heartbeats, sieve-tube count, percentage of striped cells, ring thickness and impulse time are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd-one-out with category and give-reason items; a 5-blank fill-in; a 5-pair lettered-diagram match; 10-mark structured questions in parts, one part a labelled diagram; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-04: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
