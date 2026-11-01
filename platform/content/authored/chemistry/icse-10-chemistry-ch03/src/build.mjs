// Build ICSE 10 Chemistry ch03 Acids, Bases and Salts: npx tsx content/authored/chemistry/icse-10-chemistry-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(3, 'Acids, Bases and Salts');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1003,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['dibasic-mcq', 'ph-mcq', 'acidsalt-mcq', 'marble-mcq', 'alkali-ar', 'ionise-short1', 'salt-short1', 'zns-short1', 'method-short2'],
      B: [['ions-long', 'prep-long']],
    },
    long: {
      A: ['alkali-mcq', 'weak-mcq', 'phen-mcq', 'h2s-mcq', 'fecl3-mcq', 'cuso4-mcq', 'salt-ar', 'dissoc-short1', 'ph-short1', 'co2-short1', 'fecl3-short1', 'cuso4-short1', 'indicator-fill', 'salt-match'],
      B: [['salts-long', 'gases-long', 'neutral-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Ionic definitions and ionisation/dissociation equations, indicator colours and pH, kinds of salts, dilute acids on carbonates, sulphites and sulphides with gas tests, and the methods of preparing normal salts, checked against the ICSE 2027 syllabus (Class X, section 3)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
