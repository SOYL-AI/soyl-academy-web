// Build ICSE 10 Chemistry ch11 Study of Compounds: Nitric Acid: npx tsx content/_stage/chemistry/icse-10-chemistry-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'Study of Compounds: Nitric Acid');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1011,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['volatile-mcq', 'sulphur-mcq', 'storage-mcq', 'test-mcq', 'glass-ar', 'lab-short1', 'cuconc-short1', 'ring-short1', 'temp-short2'],
      B: [['ostwald-long', 'acid-long']],
    },
    long: {
      A: ['step2-mcq', 'nh3air-mcq', 'mg-mcq', 'monobasic-mcq', 'sulphite-mcq', 'basic-mcq', 'ostwald-ar', 'ostwald3-short1', 'zno-short1', 'khco3-short1', 'naoh-short1', 'decomp-short1', 'ostwald-fill', 'cond-match'],
      B: [['prep-long', 'oxid-long', 'test-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Laboratory preparation from KNO₃ or NaNO₃ and conc. H₂SO₄ below 200 °C (acid salt, all-glass retort, cooled receiver, reasons for the temperature limit), decomposition by light and the yellow colour, Ostwald’s process equations with conditions only (Pt gauze, about 800 °C, NH₃ : air about 1 : 10; 2NO + O₂ → 2NO₂; 4NO₂ + 2H₂O + O₂ → 4HNO₃), copper with conc. (NO₂) and dil. (NO) acid, carbon and sulphur with hot conc. acid, hydrogen only from very dilute acid with Mg and Mn, acidic reactions with oxides, hydroxides, carbonates, hydrogen carbonates, sulphites and hydrogen sulphites, and the copper-turnings and brown ring tests, checked against the ICSE 2027 syllabus (Class X, section 8C); every equation balanced by atom count',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question re-solved from its stem by the author; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
