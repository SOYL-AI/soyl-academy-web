// Build ICSE 10 Chemistry ch04 Analytical Chemistry: npx tsx content/_stage/chemistry/icse-10-chemistry-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(4, 'Analytical Chemistry');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1004,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['fe3-mcq', 'crystal-mcq', 'al-mcq', 'nh4-mcq', 'zincate-ar', 'fe2-short1', 'nh4-short1', 'cu-obs-short1', 'fe-short2'],
      B: [['nh4oh-long', 'nh4salt-long']],
    },
    long: {
      A: ['cu-naoh-mcq', 'whiteppt-mcq', 'znpb-mcq', 'same-mcq', 'koh-mcq', 'fe-oxid-mcq', 'nh3-ar', 'colour-short1', 'zn-nh4-short1', 'al-short1', 'pbmetal-short1', 'nh3-test-short1', 'amph-fill', 'colour-match'],
      B: [['naoh-long', 'amph-long', 'ident-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Colours of copper, iron(II), iron(III), zinc and lead salts, oxides and solutions; sodium hydroxide and ammonium hydroxide added drop by drop and in excess to Fe²⁺, Fe³⁺, Cu²⁺, Zn²⁺, Pb²⁺ and Ca²⁺ (Zn and Pb hydroxides soluble in excess NaOH as zincate and plumbite; Cu and Zn hydroxides soluble in excess NH₄OH as tetraammine complexes; Pb hydroxide not), ammonia from ammonium salts and its tests, and NaOH with Al, Zn, Pb and their oxides and hydroxides, checked against the ICSE 2027 syllabus (Class X, section 4); every equation balanced by atom count',
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
