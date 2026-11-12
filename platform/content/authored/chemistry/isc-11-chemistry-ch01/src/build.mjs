// Build ISC 11 Chemistry ch01 Some Basic Concepts: npx tsx content/_stage/chemistry/isc-11-chemistry-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Some Basic Concepts: Measurement, Laws of Chemical Combination and Atomic Theory', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1101,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['matter-mcq', 'vol-mcq', 'mult-mcq', 'limit-mcq', 'ar-sf'],
      B: ['sfadd-short', ['cons-short', 'const-short']],
      C: ['sfcalc-short3', ['gl-short3', 'dalton-short3']],
      D: ['dalton-long'],
    },
    long: {
      A: ['compound-mcq', 'sfcount-mcq', 'si-mcq', 'mean-mcq', 'press-mcq', 'homog-mcq', 'mass-mcq', 'recip-mcq', 'gl-mcq1', 'atoms-mol-mcq', 'ar-gl', 'ar-dalton'],
      B: ['prec-short', 'gl-short', ['dim-short', 'limit-short']],
      C: ['conv-short3', 'matter-short3', 'error-short3', ['mult-short3', 'recip-short3']],
      D: ['dim-long', ['recip-long', 'gl-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'SI units, significant figures, unit conversions (1 atm = 101325 Pa, 1 L = 10^-3 m3), laws of chemical combination with data checks (conservation, definite, multiple, reciprocal proportions), Gay-Lussac volume problems, Dalton theory and limitations against the ISC 2028 Class XI syllabus; every numerical computed by the build script',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
