// Build ISC 12 Chemistry ch19 Amines: npx tsx content/authored/chemistry/isc-12-chemistry-ch19/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(19, 'Amines');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2219,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'nitrile-mcq', 'bp-mcq', 'alkyl-mcq', 'gabriel-ar'],
      B: ['hofmann-short', ['bp-short', 'carbyl-short']],
      C: ['prep-short3', ['subst-short3', 'anilrx-short3']],
      D: ['tests-long'],
    },
    long: {
      A: ['formula-mcq', 'shape-mcq', 'gabriel-mcq', 'alumina-mcq', 'snhcl-mcq', 'isobp-mcq', 'gas-mcq', 'anil-mcq', 'subst-mcq', 'hno2-mcq', 'base-ar', 'hins-ar'],
      B: ['name-short', 'base-short', ['gabriel-short', 'acyl-short']],
      C: ['isomer-short3', 'rank-short3', 'test-short3', ['hno2-short3', 'nitro-short3']],
      D: ['aniline-long', ['prep-long', 'basic-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Names, preparations (alcohols, alkyl halides, nitrile reduction, Hofmann, nitro reduction, Gabriel), boiling points, basicity in gas and water and of substituted anilines, alkylation and acylation mechanisms, nitrous acid, carbylamine and Hinsberg tests, aniline chemistry and every numerical checked against the ISC 2027 syllabus (Unit 9)',
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
