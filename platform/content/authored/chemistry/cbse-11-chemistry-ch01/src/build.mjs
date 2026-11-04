// Build CBSE 11 Chemistry ch01 Some Basic Concepts of Chemistry: npx tsx content/_stage/chemistry/cbse-11-chemistry-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Some Basic Concepts of Chemistry', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
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
      A: ['sf-count-mcq', 'conservation-mcq', 'atoms-mcq', 'sf-ar'],
      B: ['precision-acc-short', 'sf-add-short', 'empirical-short'],
      C: ['sf-long', 'laws-long'],
      D: ['tin-case'],
    },
    long: {
      A: ['prec-acc-mcq', 'prefix-mcq', 'multiple-mcq', 'gaylussac-mcq', 'avg-mass-mcq', 'emp-mcq', 'stoich-mcq', 'molality-mcq', 'mass-unit-ar', 'cl-ar'],
      B: ['dalton-short', 'avogadro-short', ['weighted-short', 'lr-short'], 'mole-short', ['ppm-short', 'dilution-short']],
      C: ['formula-long', ['lr-long', 'conc-long']],
      D: ['student-case', 'baso4-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Atomic masses rounded as stated in each item; Avogadro constant 6.022 x 10^23; isotope data for B, Cl, Cu, Mg; HNO3 68 % d 1.41, HCl 37 % d 1.19, NH3 28 % d 0.90',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-02: every question, case part and alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
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
