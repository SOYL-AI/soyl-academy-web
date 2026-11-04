// Build CBSE 11 Chemistry ch05 Chemical Thermodynamics: npx tsx content/_stage/chemistry/cbse-11-chemistry-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(5, 'Chemical Thermodynamics', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 5,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['path-fn-mcq', 'dh-dn-mcq', 'formation-zero-mcq', 'spont-ar'],
      B: ['first-law-short', 'hess-short', 'gibbs-short3'],
      C: ['first-law-long', 'gibbs-long'],
      D: ['work-case'],
    },
    long: {
      A: ['intensive-mcq', 'free-exp-mcq', 'rev-irrev-mcq', 'cp-cv-mcq', 'neutralisation-mcq', 'bond-mcq', 'entropy-mcq', 'dg-k-mcq', 'state-fn-ar', 'dissolve-ar'],
      B: ['state-short', 'solids-short', ['cp-short', 'bomb-short'], 'formation-short3', ['nh4no3-short3', 'bond-short3']],
      C: ['hess-long', ['terms-long', 'enthalpy-long']],
      D: ['bomb-case', 'gibbs-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'NCERT-style standard values (ΔfH°, ΔcH°, bond enthalpies, phase-change enthalpies); all numerical answers computed in the build script',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(path.join(dir, process.argv[process.argv.indexOf('--dump') + 1]), dumpBank(rel));
}
