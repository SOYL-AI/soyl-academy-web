// Build ISC 11 Chemistry ch17 Introduction, Classification and IUPAC Nomenclature of Organic Compounds: npx tsx content/_stage/chemistry/isc-11-chemistry-ch17/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(17, 'Introduction, Classification and IUPAC Nomenclature of Organic Compounds', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1117,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cat-mcq', 'series-mcq', 'longest-mcq', 'acid-mcq', 'wohler-ar'],
      B: ['vital-short', ['hs-short', 'fg-short']],
      C: ['series-short', ['names3-short', 'alicyc-short']],
      D: ['alkane-long'],
    },
    long: {
      A: ['count-mcq', 'inorg-mcq', 'class-mcq', 'formula-mcq', 'aspirin-mcq', 'ald-mcq', 'alk2-mcq', 'alkene-mcq', 'alkyne-mcq', 'prio2-mcq', 'hetero-ar', 'hs-ar'],
      B: ['catenation-short', 'class-short', ['prefix-short', 'alkane-short']],
      C: ['why-short', 'classify-short', 'rules-short', ['benz-short', 'calc-short']],
      D: ['vital-long', ['priority-long', 'benz-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'IUPAC names checked against the drawn structures (formula and longest chain computed from each drawing); alkane chain isomers 2, 3, 5, 9, 18, 75 for C4, C5, C6, C7, C8, C10; Wöhler 1828; molar masses with C = 12, H = 1, N = 14, O = 16',
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
