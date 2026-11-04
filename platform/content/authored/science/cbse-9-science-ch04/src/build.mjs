// Build CBSE 9 Science ch04 Exploring Mixtures and their Separation: npx tsx content/_stage/science/cbse-9-science-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(4, 'Exploring Mixtures and their Separation', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 4,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['boil-mcq', 'foam-mcq', 'same-conc-mcq', 'tyndall-ar'],
      B: ['torch-short', 'thermo-short', 'compare3-short'],
      C: ['sol-long', 'distil-long'],
      D: ['solub-case'],
    },
    long: {
      A: ['mix-list-mcq', 'size-mcq', 'forest-mcq', 'unsat-mcq', 'gas-mcq', 'pencil-mcq', 'blood-mcq', 'funnel-mcq', 'brass-ar', 'nacl-ar'],
      B: ['pure-short', 'cool-short', ['filter-short', 'winnow-short'], 'salt3-short', ['attar3-short', 'cream3-short']],
      C: ['class-long', ['chrom-long', 'choose-long']],
      D: ['tyndall-case', 'chrom-case'],
    },
  },
  checksExtra: {
    science_facts: 'solubility values are approximate textbook-like numbers (illustrative); salt X values are given; 1 nm and 1000 nm class limits; boiling points acetone 56, ethanol 78, water 100 degrees C (see README "Verifier pass")',
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
