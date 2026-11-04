// Build ISC 11 Biology ch15 Plant Growth and Development: npx tsx content/authored/biology/isc-11-biology-ch15/src/build.mjs [--dump <file>]
// CH_OUT=<folder> builds into a scratch folder instead of the chapter folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(15, 'Plant Growth and Development', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1115,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['epi-mcq', 'factor-mcq', 'aba-mcq', 'weed-mcq', 'rate-ar'],
      B: ['vivi-short2', ['auxano-short2', 'eth-short2']],
      C: ['diff-short3', ['apps-short3', 'sigmoid-short3']],
      D: ['went-long'],
    },
    long: {
      A: ['vivi-mcq', 'hypo-mcq', 'phase-mcq', 'geo-mcq', 'diff-mcq', 'plastic-mcq', 'ga-mcq', 'cutting-mcq', 'eth-mcq', 'drop-mcq', 'went-ar', 'aba-ar'],
      B: ['seq-short2', 'agr-short2', ['auxin-short2', 'cyto-short2']],
      C: ['rgr-short3', 'factors-short3', 'prom-short3', ['apical-short3', 'culture-short3']],
      D: ['sigmoid-long', ['auxano-long', 'pgr-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Hypogeal, epigeal and viviparous germination, phases of growth in meristems, arithmetic and geometric growth, absolute and relative growth rates, the sigmoid curve, the arc auxanometer, factors affecting growth, differentiation, dedifferentiation and redifferentiation, Went’s experiments, four effects of each of the five growth regulators, and their agricultural and horticultural uses checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Growth lengths, doubling counts, absolute and relative rates, the sigmoid curve and its phase gains, auxanometer magnification, Went curvature, culture-medium ratios and spray dilutions are computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with a lettered figure; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
