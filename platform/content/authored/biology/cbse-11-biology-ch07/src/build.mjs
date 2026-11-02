// Build ch07 Structural Organisation in Animals: npx tsx content/authored/biology/cbse-11-biology-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(7, 'Structural Organisation in Animals');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1107,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['microvilli-mcq', 'sex-mcq', 'smooth-mcq', 'compound-ar'],
      B: ['exoendo-short', 'breathe-short', 'digestion-short'],
      C: ['epithelium-long', 'frogcirc-long'],
      D: ['slides-case'],
    },
    long: {
      A: ['tendon-mcq', 'gap-mcq', 'neuroglia-mcq', 'identify-mcq', 'skinresp-mcq', 'bileblock-mcq', 'portal-mcq', 'spermroute-mcq', 'poikilo-ar', 'rbc-ar'],
      B: ['tendonlig-short', 'sexes-short', ['airsac-short', 'lymph-short'], 'junctions-short', ['heart-short', 'cloaca-short']],
      C: ['amphibian-long', ['connective-long', 'frogdigresp-long']],
      D: ['pond-case', 'dissect-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Epithelia (simple, glandular, compound) with locations, cell junctions, connective tissues (loose, dense regular and irregular, cartilage, bone, blood), three kinds of muscle, neurons and neuroglia; frog habits, external features, sexual dimorphism, digestive, respiratory, circulatory, excretory, nervous, sensory and reproductive systems checked against the 2026-27 rationalised syllabus scope (frog only; earthworm and cockroach are not in scope) — see README "Verifier pass"',
    counting_rules: 'Digits, cranial nerves, vasa efferentia, real cell sizes from magnification, cell-count percentages and egg survival are computed by src/calc.mjs (with assertions), not typed in',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
