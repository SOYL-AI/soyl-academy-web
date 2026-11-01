// Build ICSE 10 Chemistry ch01 Periodic Table, Periodic Properties and Variations of Properties: npx tsx content/authored/chemistry/icse-10-chemistry-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Periodic Table, Periodic Properties and Variations of Properties');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1001,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['period4-mcq', 'pull-mcq', 'oxide-mcq', 'alkali-mcq', 'shield-ar', 'law-short1', 'size-short1', 'water-short1', 'pull-short2'],
      B: [['law-long', 'family-long']],
    },
    long: {
      A: ['valency-mcq', 'ion-mcq', 'ipgroup-mcq', 'en-mcq', 'eaorder-mcq', 'brom-mcq', 'ip-ar', 'group-short1', 'size2-short1', 'metal-short1', 'ipdef-short1', 'displace-short1', 'trend-fill', 'prop-match'],
      B: [['trend-long', 'xyz-long', 'period3-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Modern periodic law, positions of elements 1–20, nuclear charge and shell effects, trends in atomic size, metallic character, ionisation potential, electron affinity and electronegativity, and group 1 and group 17 reactivity, checked against the ICSE 2027 syllabus (Class X, section 1)',
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
