// Build ICSE 10 Chemistry ch14 Hydrocarbons: Alkanes, Alkenes and Alkynes: npx tsx content/_stage/chemistry/icse-10-chemistry-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(14, 'Hydrocarbons: Alkanes, Alkenes and Alkynes');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1014,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sodalime-mcq', 'co-mcq', 'h2so4-mcq', 'weld-mcq', 'co-ar', 'decarb-short1', 'carbide-short1', 'br-short1', 'test-short2'],
      B: [['methane-long', 'ethyne-long']],
    },
    long: {
      A: ['collect-mcq', 'iodo-mcq', 'dark-mcq', 'dibromo-mcq', 'tetrabromo-mcq', 'cl2add-mcq', 'koh-ar', 'propanoate-short1', 'combust-short1', 'dehydr-short1', 'dibromo-short1', 'h2-short1', 'addition-fill', 'prep-match'],
      B: [['ethane-long', 'ethene-long', 'abc-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Preparation of methane and ethane (soda-lime decarboxylation of sodium ethanoate and propanoate; reduction of iodomethane and bromoethane), methane as a greenhouse gas, complete and incomplete combustion, stepwise chlorination, preparation of ethene (alcoholic KOH; conc. H2SO4 at 170 °C) and ethyne (calcium carbide; 1,2-dibromoethane), addition of H2, Cl2, Br2 and I2, the bromine-water test and uses; every \ce equation atom-balanced; checked against the ICSE 2027 syllabus (Class X, section 9)',
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
