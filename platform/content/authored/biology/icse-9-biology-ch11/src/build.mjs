// Build ICSE 9 Biology ch11 Skeleton: Movement and Locomotion:
//   npx tsx content/authored/biology/icse-9-biology-ch11/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(11, 'Skeleton: Movement and Locomotion', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90110,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['synovial-mcq', 'gliding-mcq', 'fixed-mcq', 'disc-mcq', 'ar-skull', 'pivot-short', 'ballhinge-table3'],
      B: [['func-long', 'axial-long']],
    },
    long: {
      A: ['ribcage-mcq', 'lever-mcq', 'attach-mcq', 'axial-mcq', 'girdle-mcq', 'figSkelD-mcq', 'figSkelC-mcq', 'ar-armour', 'suture-short', 'slight-short', 'synovial-short', 'func-short3', 'vcol-short3'],
      B: [['joint-long', 'casejoint-long', 'design-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Functions of the skeleton, the axial and appendicular skeleton with bone counts, and the types of joint (immovable, slightly movable, hinge, ball and socket, gliding, pivot) with locations, checked against the ICSE 2028 Biology syllabus Class IX (Human Anatomy and Physiology) — see README "For a reviewer"',
    counting_rules: 'Bone counts, rib and vertebra totals, joint tallies and the model-skeleton arithmetic are computed and asserted in src/calc.mjs, not typed in',
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
