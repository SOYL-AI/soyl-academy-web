// Build ICSE 10 Chemistry ch09 Study of Compounds: Hydrogen Chloride: npx tsx content/_stage/chemistry/icse-10-chemistry-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(9, 'Study of Compounds: Hydrogen Chloride');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1009,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['jet-mcq', 'copper-mcq', 'bicarb-mcq', 'sulphide-mcq', 'density-ar', 'mg-short1', 'na2so3-short1', 'fountainobs-short1', 'heavy-short2'],
      B: [['prep-long', 'tests-long']],
    },
    long: {
      A: ['below200-mcq', 'full-mcq', 'rim-mcq', 'gold-mcq', 'collect-mcq', 'nh3fume-mcq', 'aqua-ar', 'eq-short1', 'dryname-short1', 'caoh-short1', 'agno3-short1', 'marble-short1', 'hcl-fill', 'obs-match'],
      B: [['fountain-long', 'reactions-long', 'unknown-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Laboratory preparation of hydrogen chloride below 200 °C with concentrated sulphuric acid as drying agent and upward displacement of air, vapour density 18.25, the fountain experiment, the inverted-funnel arrangement, reactions with ammonia, metals, oxides, hydroxides, carbonates, hydrogencarbonates, sulphides and sulphites, aqua regia (3 : 1) and nascent chlorine, and the silver nitrate and lead nitrate precipitates, checked against the ICSE 2027 syllabus (Class X, section 8A); every equation balanced by atom count',
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
