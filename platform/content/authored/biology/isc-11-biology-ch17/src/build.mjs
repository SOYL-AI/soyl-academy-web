// Build ISC 11 Biology ch17 Body Fluids and Circulation: npx tsx content/authored/biology/isc-11-biology-ch17/src/build.mjs [--dump <file>]
// CH_OUT=<folder> builds into a scratch folder instead of the chapter folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(17, 'Body Fluids and Circulation', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1117,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['neutro-mcq', 'bchild-mcq', 'lymph-mcq', 'vessel-mcq', 'serum-ar'],
      B: ['valves-short2', ['lymphnode-short2', 'ecg-short2']],
      C: ['compat-short3', ['cycle-short3', 'disorders-short3']],
      D: ['heart-long'],
    },
    long: {
      A: ['albumin-mcq', 'slide-mcq', 'circ-mcq', 'heartfig2-mcq', 'cycle-mcq', 'rate-mcq', 'vagus-mcq', 'dbl-mcq', 'htn-mcq', 'nodal-mcq', 'ab-ar', 'angina-ar'],
      B: ['agglut-short2', 'sv-short2', ['capillary-short2', 'cad-short2']],
      C: ['clot-short3', 'corp-short3', 'output-short3', ['lymphblood-short3', 'vessels-short3']],
      D: ['ecg-long', ['cycle-long', 'rh-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Blood composition and plasma proteins, the blood corpuscles, the cascade of clotting, the ABO system (Landsteiner) and the Rh factor with erythroblastosis foetalis, lymph and the lymphatic system, open and closed circulation, the structure of the heart and the cardiac cycle, stroke volume and cardiac output, the regulation of the heartbeat, the ECG, blood pressure, double circulation, the structure of artery, vein and capillary, and hypertension, coronary artery disease, angina pectoris and heart failure checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Blood volumes, red and white cell counts, donor and recipient compatibility among the eight ABO-Rh types, ABO and Rh inheritance, cycle times, joint diastole, stroke volume, cardiac output, heart rate from an ECG strip and pulse pressure are computed and asserted with eq in src/calc.mjs, not typed in; the cardiac-cycle diagram is drawn from the same timings',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
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
