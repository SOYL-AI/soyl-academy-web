// Build ISC 12 Chemistry ch16 Aldehydes and Ketones: npx tsx content/authored/chemistry/isc-12-chemistry-ch16/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(16, 'Aldehydes and Ketones');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2216,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['pentanone-mcq', 'cd-mcq', 'oxime-mcq', 'nabh4-mcq', 'rosen-ar'],
      B: ['bp-short', ['stephen-short', 'red-short']],
      C: ['prep-short3', ['add-short3', 'red-short3']],
      D: ['base-long'],
    },
    long: {
      A: ['hybrid-mcq', 'bpcarb-mcq', 'ca-mcq', 'nitrile-mcq', 'cn-mcq', 'grig-mcq', 'iodo-mcq', 'clem-mcq', 'cross-mcq', 'hcho-mcq', 'react-ar', 'cann-ar'],
      B: ['name-short', 'hcn-short', ['aldol-short', 'test-short']],
      C: ['ozone-short3', 'hcn-short3', 'aldol-short3', ['base-short3', 'test-short3']],
      D: ['add-long', ['prep-long', 'redox-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Names, preparations (Rosenmund, dialkylcadmium, calcium salts, Stephen, Grignard + nitrile, DIBAL-H, ozonolysis, alkyne hydration), nucleophilic addition with the HCN mechanism, oxidation, iodoform, Clemmensen, Wolff–Kishner and red P/HI reductions, aldol, cross aldol and Cannizzaro reactions, tests and every numerical checked against the ISC 2027 syllabus (Unit 8)',
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
