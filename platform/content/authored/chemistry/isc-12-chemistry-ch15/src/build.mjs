// Build ISC 12 Chemistry ch15 Phenols and Ethers: npx tsx content/authored/chemistry/isc-12-chemistry-ch15/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(15, 'Phenols and Ethers');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2215,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['resorcinol-mcq', 'zn-mcq', 'picric-mcq', 'nameether-mcq', 'acid-ar'],
      B: ['acid-short', ['kolbe-short', 'cleave-short']],
      C: ['eas-short3', ['react-short3', 'anisole-short3']],
      D: ['ether-long'],
    },
    long: {
      A: ['cresol-mcq', 'cumene-mcq', 'nitroacid-mcq', 'intra-mcq', 'pcl5-mcq', 'brcs2-mcq', 'carbene-mcq', 'sulph-mcq', 'peroxide-mcq', 'nitr-mcq', 'brw-ar', 'hi-ar'],
      B: ['sulph-short', 'azo-short', ['will-short', 'anisole-short']],
      C: ['rank-short3', 'test-short3', 'cleave-short3', ['classify-short3', 'reactether-short3']],
      D: ['phenoleas-long', ['phenolprep-long', 'anisole-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Preparations of phenol (diazonium, Dow, sulphonate fusion, cumene), acidity and substituent effects, reactions of the –OH group, electrophilic substitution, Kolbe and Reimer–Tiemann reactions, tests, Williamson synthesis, ether reactions with Cl₂, O₂, HI and PCl₅, anisole and every numerical checked against the ISC 2027 syllabus (Unit 7)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
