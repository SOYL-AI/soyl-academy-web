// Build ICSE 9 Biology ch14 Aids to Health and Health Organisations:
//   npx tsx content/authored/biology/icse-9-biology-ch14/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(14, 'Aids to Health and Health Organisations', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90140,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['nose-mcq', 'strong-mcq', 'who-mcq', 'source-mcq', 'ar-tears', 'misuse-short2', 'rc-short3'],
      B: [['vaccgraph-long', 'serum-long']],
    },
    long: {
      A: ['bcg-mcq', 'figV-mcq', 'toxin-mcq', 'cilia-mcq', 'stomach-mcq', 'figDefB-mcq', 'tears-mcq', 'ar-vacc', 'vi-short2', 'skin-short2', 'serum-short2', 'merits-short3', 'ab-table3'],
      B: [['antis-long', 'antib-long', 'org-long']],
    },
  },
  checksExtra: {
    biology_facts: 'How a vaccine produces immunity, vaccination versus immunisation, booster doses; antitoxins, serums and antibiotics; antiseptics versus disinfectants; the first-line defences of the body (skin, mucus, cilia, tears, saliva, stomach acid) and their merits; major activities of the Red Cross and the WHO, checked against the ICSE 2028 Biology syllabus Class IX (Health and Hygiene); time-sensitive points are stated as stable facts or dated "as of 2026" — see README "For a reviewer"',
    counting_rules: 'Ratios, percentages, dilutions, totals and differences are computed and asserted in src/calc.mjs, not typed in',
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
