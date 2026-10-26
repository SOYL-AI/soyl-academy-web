// Build ch06 Control and Coordination: npx tsx content/authored/science/cbse-10-science-ch06/src/build.mjs [--dump]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(6, 'Control and Coordination');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 6,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['impulse-order-mcq', 'scare-mcq', 'sideways-seedling-mcq', 'auxin-ar'],
      B: ['hot-iron-short', 'feedback-short', 'tendril-short'],
      C: ['reflex-long', 'endocrine-long'],
      D: ['kitchen-case'],
    },
    long: {
      A: ['synapse-chem-mcq', 'reflex-classify-mcq', 'medulla-mcq', 'mimosa-mcq', 'auxin-side-mcq', 'sugarcane-ga-mcq', 'dwarf-mcq', 'diabetes-data-mcq', 'reflex-ar', 'insulin-ar'],
      B: ['neuron-parts-short', 'protect-short', ['mimosa-vs-photo-short', 'drought-aba-short'], 'spinal-injury-short', ['goitre-short', 'nerve-vs-hormone-short']],
      C: ['brain-long', ['tropism-long', 'adrenaline-long']],
      D: ['ruler-case', 'glucose-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Neuron, synapse, reflex arc, brain regions, tropisms, plant and animal hormones checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-26: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
