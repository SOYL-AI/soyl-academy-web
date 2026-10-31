// Build ISC 12 Chemistry ch13 Haloarenes: npx tsx content/authored/chemistry/isc-12-chemistry-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(13, 'Haloarenes');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2213,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['aryl-mcq', 'bp-mcq', 'electrophile-mcq', 'dow-mcq', 'sp2-ar'],
      B: ['bond-short', ['sandm-short', 'wf-short']],
      C: ['prep-short3', ['eas-short3', 'aniline-short3']],
      D: ['eas-long'],
    },
    long: {
      A: ['dark-mcq', 'iod-mcq', 'dipole-mcq', 'sol-mcq', 'sigma-mcq', 'fc-mcq', 'phenyl-mcq', 'meta-mcq', 'amine-mcq', 'ddt2-mcq', 'nuc-ar', 'deact-ar'],
      B: ['gatt-short', 'directing-short', ['meisen-short', 'ddt-short']],
      C: ['dipole-short3', 'nitration-short3', 'mechnuc-short3', ['ddt-short3', 'iso-short3']],
      D: ['nuc-long', ['bondprep-long', 'metal-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'The nature of the aryl C–X bond, Sandmeyer and Gattermann preparations, electrophilic and nucleophilic substitution mechanisms, Wurtz–Fittig, Fittig and Grignard reactions, DDT and every numerical checked against the ISC 2027 syllabus (Unit 6)',
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
