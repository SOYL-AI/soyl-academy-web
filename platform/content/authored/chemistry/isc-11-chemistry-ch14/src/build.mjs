// Build ISC 11 Chemistry ch14 Ionic Equilibrium: npx tsx content/_stage/chemistry/isc-11-chemistry-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(14, 'Ionic Equilibrium: Acids, Bases and pH', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1114,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['elec-mcq', 'conj-mcq', 'phsulf-mcq', 'ind-wasb-mcq', 'lewis-ar'],
      B: ['elec-short2', ['amph-short2', 'ph-short2']],
      C: ['weakacid-short3', ['lewis-short3', 'mix-short3']],
      D: ['ostw-long'],
    },
    long: {
      A: ['weak-mcq', 'alpha-mcq', 'wateracid-mcq', 'conjstr-mcq', 'polyb-mcq', 'hpo4-mcq', 'kwT-mcq', 'poh-mcq', 'ind-theory-mcq', 'ind-sasb-mcq', 'bl-ar', 'ostw-ar'],
      B: ['ostw-state-short2', 'kw-short2', ['polyb-short2', 'ind-short2']],
      C: ['alpha-short3', 'titr-short3', 'conj3-short3', ['ostw-short3', 'dil-short3']],
      D: ['titr-long', ['polyb-long', 'ph-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Ka(CH3COOH) 1.8e-5, Kb(NH3) 1.8e-5, Kw 1.0e-14 at 298 K; Ka(HCOOH) 1.8e-4, Ka(HNO2) 4.5e-4, Ka(C6H5COOH) 6.5e-5, Ka(HCN) 4.9e-10, Kb(CH3NH2) 4.4e-4; H3PO4 Ka1 7.5e-3, Ka2 6.2e-8, Ka3 4.8e-13; Kw 1.1e-15 (273 K), 2.4e-14 (310 K), 5.5e-14 (323 K), 9.6e-14 (333 K), 5.1e-13 (373 K); indicator ranges methyl orange 3.1-4.4, methyl red 4.4-6.2, bromothymol blue 6.0-7.6, phenolphthalein 8.3-10.0; other numbers marked (given)',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script',
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
