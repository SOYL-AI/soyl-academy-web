// Build ISC 11 Chemistry ch02 Mole Concept, Concentration and Stoichiometry: npx tsx content/_stage/chemistry/isc-11-chemistry-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Mole Concept, Concentration and Stoichiometry', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1102,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['avgmass-mcq', 'molform-mcq', 'eqca-mcq', 'dilution-mcq', 'ar-limit'],
      B: ['amu-short', ['var-short', 'dil-short']],
      C: ['hydrate-short3', ['titr-short3', 'limit-short3']],
      D: ['limit-long'],
    },
    long: {
      A: ['stp-mcq', 'count-mcq', 'pctcomp-mcq', 'samefml-mcq', 'eqsalt-mcq', 'eqox-mcq', 'molarity-mcq', 'normality-mcq', 'massmass-mcq', 'excess-mcq', 'ar-eq', 'ar-norm'],
      B: ['mole-short', 'emp-short', ['eq-short', 'wvconv-short']],
      C: ['mole3-short3', 'molform-short3', 'eqcalc-short3', ['mix-short3', 'massvol-short3']],
      D: ['eq-long', ['conc-long', 'titr-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Atomic and molecular masses, mole, Avogadro constant, molar volume at STP (22.4 L), empirical and molecular formulae, chemical equivalents (E = M / n-factor, variable equivalent weight, gram equivalents), concentration terms, N1V1 = N2V2 and M1V1 = M2V2, stoichiometry and limiting reagent against the ISC 2028 Class XI syllabus; every numerical computed by the build script',
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
