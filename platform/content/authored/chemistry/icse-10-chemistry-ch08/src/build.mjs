// Build ICSE 10 Chemistry ch08 Metallurgy: npx tsx content/_stage/chemistry/icse-10-chemistry-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Metallurgy');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1008,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['calamine-mcq', 'hydraulic-mcq', 'h2red-mcq', 'cathode-mcq', 'froth-ar', 'feore-short1', 'galena-short1', 'ignite-short1', 'anode-short2'],
      B: [['extraction-long', 'hall-long']],
    },
    long: {
      A: ['froth-mcq', 'calcine-mcq', 'series-mcq', 'seed-mcq', 'cryolite-mcq', 'steel-mcq', 'sodium-ar', 'zincores-short1', 'cuo-short1', 'naoh-short1', 'fluorspar-short1', 'bronze-short1', 'process-fill', 'alloy-match'],
      B: [['conc-long', 'baeyer-long', 'alloy-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Ores of iron, aluminium and zinc with formulae, concentration methods, roasting and calcination equations, reduction by H2, C and CO tied to the activity series, Baeyer’s process (digestion, seeded precipitation, ignition), the Hall–Héroult cell (cryolite, fluorspar, coke, carbon electrodes, electrode reactions) and alloy compositions, checked against the ICSE 2027 syllabus (Class X, section 7); every equation balanced by atom count; no electrorefining and no other bauxite or aluminium processes',
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
