// Build ISC 12 Chemistry ch02 Colligative Properties: npx tsx content/authored/chemistry/isc-12-chemistry-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Colligative Properties');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2202,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['colligative-mcq', 'tb-calc-mcq', 'camphor-mcq', 'isotonic-mcq', 'rlvp-ar'],
      B: ['vp-short', ['cooker-short', 'iso-short']],
      C: ['rlvp-short3', ['derive-tb-short3', 'dissoc-short3']],
      D: ['osm-long'],
    },
    long: {
      A: ['vp-order-mcq', 'kb-value-mcq', 'tb-order-mcq', 'kf-calc-mcq', 'road-mcq', 'membrane-mcq', 'ro-mcq', 'diffusion-mcq', 'i-k3fe-mcq', 'abnormal-mcq', 'tb-ar', 'ro-ar'],
      B: ['kb-short', 'road-short', ['osmosis-short', 'abnormal-short']],
      C: ['derive-tf-short3', 'tf-short3', 'osm-short3', ['assoc-short3', 'compare-short3']],
      D: ['tb-long', ['tf-long', 'vanthoff-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Kb and Kf values, van’t Hoff laws, isotonic saline, van’t Hoff factor formulas and every numerical checked against the ISC 2027 syllabus (Unit 1) — see README "Verifier pass"',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
