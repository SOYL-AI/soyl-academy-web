// Build ISC 12 Chemistry ch17 Benzaldehyde: npx tsx content/authored/chemistry/isc-12-chemistry-ch17/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(17, 'Benzaldehyde');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2217,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['benzal-mcq', 'oxime-mcq', 'cann-mcq', 'chlor-mcq', 'kmno4-ar'],
      B: ['prep-short', ['ox-short', 'dist-short']],
      C: ['add-short3', ['named-short3', 'eas-short3']],
      D: ['named-long'],
    },
    long: {
      A: ['gk-mcq', 'crystals-mcq', 'pcl5-mcq', 'nabh4-mcq', 'clem-mcq', 'react-mcq', 'benzoin-mcq', 'hydride-mcq', 'deact-mcq', 'iodo-mcq', 'cann-ar', 'cold-ar'],
      B: ['props-short', 'nh2-short', ['cann-short', 'perkin-short']],
      C: ['etard-short3', 'red-short3', 'cannmech-short3', ['uses-short3', 'compare-short3']],
      D: ['ring-long', ['prep-long', 'ident-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'The Etard and other preparations, oxidation (Tollens’ but not Fehling’s), reduction, HCN, NaHSO₃, ammonia-derivative and PCl₅ reactions, the Cannizzaro, benzoin and Perkin reactions, meta substitution, distinguishing tests and every numerical checked against the ISC 2027 syllabus (Unit 8)',
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
