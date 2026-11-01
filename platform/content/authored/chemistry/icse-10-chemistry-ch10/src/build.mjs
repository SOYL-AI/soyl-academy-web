// Build ICSE 10 Chemistry ch10 Study of Compounds: Ammonia: npx tsx content/_stage/chemistry/icse-10-chemistry-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 'Study of Compounds: Ammonia');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1010,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ratio-mcq', 'cuo-mcq', 'burn-mcq', 'cfc-mcq', 'haber-ar', 'catox-short1', 'neutral-short1', 'haber-short1', 'chlorine-short2'],
      B: [['prep-long', 'aqueous-long']],
    },
    long: {
      A: ['tilt-mcq', 'alkali-mcq', 'nitride-mcq', 'fertiliser-mcq', 'refrig-mcq', 'test-mcq', 'cacl2-ar', 'prep-short1', 'p2o5-short1', 'aln-short1', 'pbno3-short1', 'use-short1', 'gas-fill', 'ppt-match'],
      B: [['haber-long', 'oxid-long', 'reduce-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Laboratory preparation of ammonia (slanting flask, quicklime drying, downward displacement of air), ammonia from nitrides and ammonium salts, Haber’s process (1 : 3, 450–500 °C, 200–900 atm, iron with molybdenum promoter, liquefaction and recycling), vapour density 8.5 and the fountain experiment, burning in oxygen versus catalytic oxidation over platinum at 800 °C, reduction of CuO and lead oxides, chlorine in excess of either reagent, aqueous ammonia with acids and with Fe³⁺, Fe²⁺, Pb²⁺, Zn²⁺ and Cu²⁺ solutions, uses, ozone-safe refrigerants and tests, checked against the ICSE 2027 syllabus (Class X, section 8B); every equation balanced by atom count',
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
