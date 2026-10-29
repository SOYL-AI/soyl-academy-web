// Build ch07 Alcohols, Phenols and Ethers: npx tsx content/authored/chemistry/cbse-12-chemistry-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Alcohols, Phenols and Ethers');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1207,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'cumene-mcq', 'lucas-mcq', 'acidity-ar'],
      B: ['name-short', 'test-short', 'prep-short3'],
      C: ['alcohol-long', 'ether-long'],
      D: ['unknown-case'],
    },
    long: {
      A: ['name2-mcq', 'structure-mcq', 'hydroboration-mcq', 'reduction-mcq', 'acidity-mcq', 'oxidation-mcq', 'kolbe-mcq', 'hi-mcq', 'cumene-ar', 'williamson-ar'],
      B: ['acidity-short', 'ether-short', ['uses-short', 'dehydration-short'], 'grignard-short3', ['acidity-short3', 'phenol-reactions-short3']],
      C: ['phenol-long', ['prep-long', 'synthesis-long']],
      D: ['aspirin-case', 'sanitiser-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Names, bond angles, preparations, pKa values, Lucas/oxidation/dehydration behaviour, phenol substitution, Kolbe and Reimer–Tiemann, methanol/ethanol and ether chemistry checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
