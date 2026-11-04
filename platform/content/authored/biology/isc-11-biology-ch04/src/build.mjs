// Build ISC 11 Biology ch04 Plant Kingdom: npx tsx content/authored/biology/isc-11-biology-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(4, 'Plant Kingdom', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1104,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['mannitol-mcq', 'gemma-mcq', 'prothallus-mcq', 'cycas-root-mcq', 'gym-ar'],
      B: ['sphag-short', ['hetero-short', 'pollen-short']],
      C: ['algae-compare-short3', ['algae-uses-short3', 'pine-ovule-short3']],
      D: ['funaria-long'],
    },
    long: {
      A: ['single-cell-mcq', 'holdfast-mcq', 'moss-fig-mcq', 'moss-fig3-mcq', 'amph-mcq', 'class-mcq', 'needle-mcq', 'azolla-mcq', 'naked-mcq', 'sago-mcq', 'moss-ar', 'fern-ar'],
      B: ['grade-short', 'algae-use-short', ['fernuse-short', 'gymuse-short']],
      C: ['algae-reproduction-short3', 'bryo-uses-short3', 'fern-sporophyte-short3', ['gym-pter-short3', 'liver-moss-short3']],
      D: ['pinus-long', ['algae-long', 'compare-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Algae (three classes compared, reproduction, uses), bryophytes (liverworts, mosses, Funaria life cycle, alternation of generations), pteridophytes (four classes, fern life cycle, homospory and heterospory), gymnosperms (characters, Pinus life cycle, comparison with pteridophytes) checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Every spore, ovule, megaspore, pollen-grain and chromosome count and every percentage is computed and asserted in src/calc.mjs (eq), not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with a lettered figure; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    content_gate: 'npm run content -- lint, verify and originality for this chapter: see README "Verifier pass"',
    verifier_pass: '2026-11-02: every question re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
