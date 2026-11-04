// Build ISC 11 Biology ch06 Morphology of Root, Stem and Leaf: npx tsx content/authored/biology/isc-11-biology-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(6, 'Morphology of Root, Stem and Leaf', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1106,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['tapfib-mcq', 'beet-mcq', 'venation-mcq', 'pitcher-mcq', 'ar-tendril'],
      B: ['pneumato-short2', ['stipule-short2', 'bryo-short2']],
      C: ['leafparts-short3', ['phyllotaxy-short3', 'roothair-short3']],
      D: ['stem-long'],
    },
    long: {
      A: ['stilt-mcq', 'adventi-mcq', 'rhizome-mcq', 'sweet-mcq', 'runner-mcq', 'colocasia-mcq', 'thorn-mcq', 'phyllo-mcq', 'whorl-mcq', 'pneumato-mcq', 'ar-potato', 'ar-insect'],
      B: ['root-regions-short2', 'venation-short2', ['tendril-short2', 'compound-short2']],
      C: ['rootmod-short3', 'leafmod-short3', 'stem-vs-root-short3', ['subaerial-short3', 'insect-short3']],
      D: ['leaf-long', ['tip-long', 'leafmod-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Root systems, regions of the root tip and root modifications; nodes, internodes, buds and stem modifications; parts of a leaf, venation, simple and compound leaves and phyllotaxy; leaf modifications and insectivorous plants checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Root-tip lengths, leaflet and leaf counts, node and bud counts and the plantlet, pneumatophore, scale-leaf and insect totals are computed and asserted in src/calc.mjs (eq), not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    content_gate: 'npm run content -- lint, verify and originality for this chapter: see README "Verifier pass"',
    verifier_pass: '2026-11-03: every question re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
