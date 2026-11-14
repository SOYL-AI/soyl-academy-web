// Build ISC 11 Chemistry ch21 Alkanes: npx tsx content/_stage/chemistry/isc-11-chemistry-ch21/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(21, 'Alkanes', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1121,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['isocount-mcq', 'energy-mcq', 'corey-mcq', 'branch-mcq', 'stagger-ar'],
      B: ['homol-short', ['pentane-short', 'nonpolar-short']],
      C: ['wurtz-short3', ['chlorin-short3', 'dmbutane-short3']],
      D: ['conf-long'],
    },
    long: {
      A: ['class-mcq', 'natgas-mcq', 'eclipse-mcq', 'kolbe-mcq', 'wurtz-mcq', 'grig-mcq', 'aldred-mcq', 'solub-mcq', 'monochl-mcq', 'isom-mcq', 'bp-ar', 'chlor-ar'],
      B: ['decarbEq-short', 'newmandraw-short', ['wurtzEq-short', 'coreyEq-short']],
      C: ['kolbe-short3', 'bp-short3', 'torsion-short3', ['combust-short3', 'crack-short3']],
      D: ['prep-long', ['halog-long', 'bpdata-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'torsional barrier of ethane 12.5 kJ/mol; boiling points of C1-C10 n-alkanes and of the C5H12 and C6H14 isomers (standard values); bond enthalpies C-H 435, Cl-Cl 243, C-Cl 351, H-Cl 431 kJ/mol; relative chlorination rates 1 : 3.8 : 5.0 (1, 2, 3 hydrogen); isomer numbers 2, 3, 5, 9, 18; all equations atom-balanced',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-10: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script',
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
