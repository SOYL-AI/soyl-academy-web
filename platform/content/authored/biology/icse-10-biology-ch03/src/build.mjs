// Build ICSE 10 Biology ch03 Absorption by Roots and the Ascent of Sap:
//   npx tsx content/authored/biology/icse-10-biology-ch02/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(3, 'Absorption by Roots and the Ascent of Sap');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10033,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['membrane-mcq', 'turgid-mcq', 'surface-mcq', 'cohesion-mcq', 'osmo-ar', 'osmosis-term', 'plasmo-term', 'adhesion-term', 'diff-osmo-short'],
      B: [['osmoscope-case', 'strips-case']],
    },
    long: {
      A: ['imbibition-mcq', 'hypertonic-mcq', 'fertiliser-mcq', 'path-mcq', 'rootpressure-mcq', 'op-mcq', 'sap-ar', 'flaccid-term', 'odd-processes', 'hair-term', 'absorb-fill5', 'hair-match5'],
      B: [['thistle-case', 'plasmo-case', 'sap-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Imbibition, diffusion (potassium permanganate), osmosis and osmotic pressure (thistle funnel, potato osmoscope), hypotonic, isotonic and hypertonic solutions, turgidity, flaccidity, plasmolysis and deplasmolysis, the root hair and root adaptations, the path of water across the root, passive and active uptake of minerals, root pressure, cohesion, adhesion, transpiration pull and the coloured-water xylem experiment checked against the ICSE 2027 Biology syllabus (Class X, Plant Physiology) — see README "Verifier pass"',
    counting_rules: 'Percentage changes in mass, the isotonic strength and the funnel rise per hour are computed by src/calc.mjs from imagined readings, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; 5-blank fill-in passages; a 5-pair lettered root-hair match; 10-mark experiment-based case questions; chapter tests on icse-10-biology-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
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
