// Build ICSE 9 Biology ch08 Economic Importance of Bacteria and Fungi:
//   npx tsx content/authored/biology/icse-9-biology-ch08/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-biology-ch01/src/lib.mjs';

setChapter(8, 'Economic Importance of Bacteria and Fungi', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90088,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['serum-mcq', 'tea-mcq', 'wine-mcq', 'cheese-mcq', 'ar-antib', 'yeast-short', 'harm-three'],
      B: [['farm-long', 'spoil-long']],
    },
    long: {
      A: ['figA-mcq', 'flood-mcq', 'rot-mcq', 'canker-mcq', 'poison-mcq', 'bud-mcq', 'pulse-mcq', 'ar-spoil', 'antib-short', 'bioweapon-short', 'nitrify-short', 'yeast-uses-short', 'nodule-draw'],
      B: [['vacc-long', 'mush-long', 'tan-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Antibiotics, serums and vaccines; the nitrogen cycle and the bacteria of each step; curing of tea and tanning of leather; food spoilage, plant and animal diseases and bio-weapons; yeast in baking and brewing, cheese making and edible mushrooms, checked against the ICSE 2028 Biology syllabus Class IX (Economic Importance of Bacteria and Fungi). The industrial processes of manufacture using fungi are a removed topic and are not taught or asked — see README "For a reviewer"',
    counting_rules: 'Vaccinated children, litres of nitrogen in air, bacterial doublings, yeast doublings, dough volumes, mushrooms picked and hides in a tannery are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd-one-out with category and give-reason items; a 5-blank fill-in; a 5-pair lettered-diagram match; 10-mark structured questions in parts, one part a labelled diagram, graph or flow chart; chapter tests on icse-9-default-chapter-test-short / -long',
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
