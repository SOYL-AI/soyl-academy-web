// Build ICSE 10 Chemistry ch07 Electrolysis: npx tsx content/_stage/chemistry/icse-10-chemistry-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Electrolysis');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1007,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['weak-mcq', 'anode-mcq', 'crucible-mcq', 'ratio-mcq', 'solid-ar', 'ionise-short1', 'h2cathode-short1', 'define-short1', 'strongweak-short2'],
      B: [['basics-long', 'pbbr2-long']],
    },
    long: {
      A: ['nonel-mcq', 'reduced-mcq', 'series-mcq', 'pbanode-mcq', 'colour-mcq', 'plate-mcq', 'agno3-ar', 'pbcathode-short1', 'o2anode-short1', 'cuanode-short1', 'ox-short1', 'nickel-short1', 'terms-fill', 'products-match'],
      B: [['water-long', 'copper-long', 'plating-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Strong, weak and non-electrolytes and the particles they contain, electrode terms, oxidation at the anode and reduction at the cathode, selective discharge (activity series, concentration, nature of electrode), electrolysis of molten lead bromide (silica crucible, graphite electrodes), acidified water with platinum electrodes (hydrogen : oxygen = 2 : 1), copper(II) sulphate with copper and with platinum electrodes, nickel and silver plating (sodium argentocyanide) and refining of copper; every electrode half-equation balanced in atoms and charge, checked against the ICSE 2027 syllabus (Class X, section 6)',
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
