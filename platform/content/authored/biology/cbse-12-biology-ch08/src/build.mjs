// Build ch08 Microbes in Human Welfare: npx tsx content/authored/biology/cbse-12-biology-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(8, 'Microbes in Human Welfare');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 82,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['idli-mcq', 'juice-mcq', 'paddy-mcq', 'statin-ar'],
      B: ['curd-short', 'methanogen-short', 'stp-short'],
      C: ['microbes-long', 'biofert-long'],
      D: ['bod-case'],
    },
    long: {
      A: ['swiss-mcq', 'stain-mcq', 'transplant-mcq', 'river-mcq', 'inoculum-mcq', 'aphid-mcq', 'ipm-mcq', 'cold-mcq', 'primary-ar', 'baculo-ar'],
      B: ['bod-short', 'bioactive-short', ['biocontrol-short', 'resistance-short'], 'biogas-short', ['penicillin-short', 'biofert-short']],
      C: ['stp-long', ['organic-long', 'antibiotic-long']],
      D: ['field-case', 'antibiotic-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Household fermentations (curd, idli, bread, toddy, cheese), beverages, penicillin, organic acids, enzymes and bioactive molecules, primary and secondary sewage treatment, BOD, activated sludge, anaerobic digestion, biogas and methanogens, biocontrol agents, biofertilisers and judicious use of antibiotics checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'BOD stages, percentage changes and oxygen demand are computed by src/calc.mjs, not typed in',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
