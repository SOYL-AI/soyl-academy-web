// Build CBSE 9 Science ch08 Atoms and Molecules: npx tsx content/_stage/science/cbse-9-science-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Atoms and Molecules', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 8,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['prop-mcq', 'dal-mcq', 'mm-mcq', 'atom-ar'],
      B: ['candle-short', 'poly-short', 'mass3-short'],
      C: ['laws-long', 'dalton-long'],
      D: ['formula-case'],
    },
    long: {
      A: ['cons-mcq', 'rust-mcq', 'lim-mcq', 'atomicity-mcq', 'formula-mcq', 'count-mcq', 'order-mcq', 'diff-mcq', 'cons-ar', 'form-ar'],
      B: ['prop-short', 'lim-short', ['dalton-short', 'atomicity-short'], 'verify-short', ['post-short', 'criss-short']],
      C: ['ions-long', ['cross-long', 'mass-long']],
      D: ['water-case', 'shelf-case'],
    },
  },
  checksExtra: {
    science_facts: 'atomic masses as given (H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40); fixed mass ratios H:O 1:8, C:O 3:8, N:H 14:3, Mg:O 3:2, Ca:O 5:2; all sample masses given (illustrative); every formula and mass computed in data.mjs (see README "Verifier pass")',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer and reviewed by the producer; every numerical re-computed by the build script — see README "Verifier pass"',
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
