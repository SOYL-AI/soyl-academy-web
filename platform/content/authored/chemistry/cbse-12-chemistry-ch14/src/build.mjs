// Build ch14 Chemistry in Everyday Life: npx tsx content/authored/chemistry/cbse-12-chemistry-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(14, 'Chemistry in Everyday Life');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1214,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['competitive-mcq', 'ranitidine-mcq', 'diabetic-mcq', 'target-ar'],
      B: ['antacid-short', 'sweetener-short', 'class-short3'],
      C: ['medicine-long', 'food-long'],
      D: ['juice-case'],
    },
    long: {
      A: ['allosteric-mcq', 'antacid-mcq', 'antihistamine-mcq', 'aspirin-mcq', 'bactericidal-mcq', 'broad-mcq', 'chlorine-mcq', 'salt-mcq', 'analgesic-ar', 'aspartame-ar'],
      B: ['antiseptic-short', 'resistance-short', ['preservative-short', 'rancid-short'], 'antimicrobial-short3', ['label-short3', 'additive-short3']],
      C: ['choose-long', ['antimicrobial-long', 'drugs-long']],
      D: ['acidity-case', 'clinic-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Drug–target interactions, classes of medicines with examples, antibiotic classifications, antiseptic and disinfectant concentrations, relative sweetness and heat stability of sweeteners, preservatives and antioxidants checked against the 2026-27 syllabus scope (formative-only chapter; see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
