// Build ISC 11 Biology ch18 Excretory Products and Their Elimination: npx tsx content/authored/biology/isc-11-biology-ch18/src/build.mjs [--dump <file>]
// CH_OUT=<folder> builds into a scratch folder instead of the chapter folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(18, 'Excretory Products and Their Elimination', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1118,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['kid2-mcq', 'proteinuria-mcq', 'epo-mcq', 'sebum-mcq', 'aldo-ar'],
      B: ['modes-short2', ['counter-short2', 'micturition-short2']],
      C: ['gfr-short3', ['anf-short3', 'disorders-short3']],
      D: ['nephron-long'],
    },
    long: {
      A: ['kid3-mcq', 'neph1-mcq', 'neph2-mcq', 'neph3-mcq', 'counter-mcq', 'jg-mcq', 'micturition-mcq', 'homeo-mcq', 'uraemia-mcq', 'glom-mcq', 'brush-ar', 'sweat-ar'],
      B: ['skin-short2', 'kidney-short2', ['epo-short2', 'calculi-short2']],
      C: ['habitat-short3', 'bloodpath-short3', 'counter-short3', ['secretion-short3', 'dialvstrans-short3']],
      D: ['urine-long', ['regul-long', 'dialysis-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Ammonotelism, ureotelism and uricotelism and their habitats, excretory structures of animals, the human excretory system, the kidney in L.S. and the nephron, ultrafiltration, selective reabsorption, tubular secretion and GFR, the counter-current mechanism, ADH, the renin-angiotensin-aldosterone system, ANF, erythropoietin, micturition, homeostasis, excretion by the skin, liver and lungs, uraemia, renal failure, renal calculi, glomerulonephritis, haemodialysis and kidney transplant checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Nephron counts, daily filtrate and reabsorption, net filtration pressure, creatinine clearance, the osmolarity gradient, water balance, urea concentration and dialysis percentages are computed and asserted with eq in src/calc.mjs, not typed in; the counter-current diagram uses the same gradient values',
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
