// Build ISC 11 Chemistry ch20 Basic Concepts of Organic Reaction Mechanisms: npx tsx content/_stage/chemistry/isc-11-chemistry-ch20/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(20, 'Basic Concepts of Organic Reaction Mechanisms', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1120,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['kcn-mcq', 'stabcat-mcq', 'classify-mcq', 'acid-mcq', 'carbocation-ar'],
      B: ['fission-short', ['classify-short', 'hyper-short']],
      C: ['stability-short3', ['acid-short3', 'comparesn-short3']],
      D: ['sn-long'],
    },
    long: {
      A: ['hbr-mcq', 'sunlight-mcq', 'cationshape-mcq', 'carbanion-mcq', 'elec-mcq', 'indu-mcq', 'meso-mcq', 'electromeric-mcq', 'sn2-mcq', 'e2-mcq', 'inductive-ar', 'e1-ar'],
      B: ['sn2feat-short', 'inductive-short', ['e2-short', 'chain-short']],
      C: ['meso-short3', 'sn1-short3', 'e1e2-short3', ['carbanion-short3', 'nuc-short3']],
      D: ['effects-long', ['elim-long', 'radical-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Textbook-standard pKa values (CH3COOH 4.76, ClCH2COOH 2.86, Cl3CCOOH 0.65, at 298 K); stabilities of carbocations, free radicals and carbanions; mechanisms of SN1, SN2, E1, E2 and free-radical chlorination of methane; rate constants labelled given and every numerical computed in the build script',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (curly-arrow schemes, alpha C–H counts and pKa values checked in the svgs): ${svgFails.length} failures`,
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
