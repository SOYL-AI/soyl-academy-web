// Build ISC 12 Chemistry ch05 Rate of Reaction and Rate Laws: npx tsx content/authored/chemistry/isc-12-chemistry-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(5, 'Rate of Reaction and Rate Laws');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2205,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['tangent-mcq', 'radiation-mcq', 'fraction-order-mcq', 'firstk-mcq', 'order-ar'],
      B: ['rate-short', ['zero-short', 'pseudo-short']],
      C: ['initial-short3', ['derive-short3', 'mech-short3']],
      D: ['first-long'],
    },
    long: {
      A: ['ionic-mcq', 'factor-mcq', 'mass-action-mcq', 'active-mcq', 'kdep-mcq', 'volume-mcq', 'zero-graph-mcq', 'first-graph-mcq', 'pseudo-mcq', 'rds-mcq', 'mass-action-ar', 'first-ar'],
      B: ['rate-law-short', 'first-short', ['order-mol-short', 'mass-action-short']],
      C: ['factor-short3', 'units-short3', 'first-short3', ['zero-short3', 'halflife-short3']],
      D: ['rate-long', ['mechanism-long', 'zero-first-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Rate expressions, factors, law of mass action, rate laws and units of k, zero- and first-order integrated equations, half-lives, molecularity and mechanisms, and every numerical checked against the ISC 2027 syllabus (Unit 3) — see README "Verifier pass"',
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
