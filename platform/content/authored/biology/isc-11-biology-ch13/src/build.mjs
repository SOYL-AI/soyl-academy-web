// Build ISC 11 Biology ch13 Photosynthesis in Higher Plants: npx tsx content/authored/biology/isc-11-biology-ch13/src/build.mjs [--dump <file>]
// CH_OUT=<folder> builds into a scratch folder instead of the chapter folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(13, 'Photosynthesis in Higher Plants', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1113,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['accessory-mcq', 'p680-mcq', 'rubisco-mcq', 'kranz-mcq', 'xanth-ar'],
      B: ['absact-short', ['cyclic-short', 'blackman-short2']],
      C: ['calvin-short3', ['c4-short3', 'chemio-short3']],
      D: ['chloro-long'],
    },
    long: {
      A: ['cf-mcq', 'action-mcq', 'site-mcq', 'o2-mcq', 'mitchell-mcq', 'zscheme-mcq', 'stage-mcq', 'c4first-mcq', 'prcond-mcq', 'blackman-mcq', 'photoresp-ar', 'c4-ar'],
      B: ['pigment-short2', 'engel-short', ['temp-short2', 'lhc-short2']],
      C: ['carbon-short3', 'cyclic-short3', 'factors-short3', ['c4vs-short3', 'pr-short3']],
      D: ['zscheme-long', ['calvin-long', 'c4-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Photosynthesis as autotrophic nutrition, chloroplast structure, pigments, absorption and action spectra, Engelmann’s experiment, photosystems and light-harvesting complexes, cyclic and non-cyclic photophosphorylation, Mitchell’s chemiosmotic hypothesis, the Calvin cycle, the Hatch and Slack pathway and Kranz anatomy, C3 versus C4 plants, photorespiration, and Blackman’s law of limiting factors checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'ATP and NADPH per CO2 and per glucose, carbon bookkeeping of six turns, water split and oxygen released, proton-gradient fold change, glucose mass from carbon dioxide, photorespiratory carbon loss, spectra curves, Engelmann counts and the limiting-factor model are computed and asserted in src/calc.mjs, not typed in',
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
