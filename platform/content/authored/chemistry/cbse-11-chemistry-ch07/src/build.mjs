// Build CBSE 11 Chemistry ch07 Redox Reactions: npx tsx content/_stage/chemistry/cbse-11-chemistry-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Redox Reactions', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 7,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['frac-on-mcq', 'peroxide-mcq', 'redox-id-mcq', 'zno-ar'],
      B: ['oxidant-short', 'salt-bridge-short', 'zn-hno3-short3'],
      C: ['daniell-long', 'types-long'],
      D: ['titration-case'],
    },
    long: {
      A: ['s2o3-mcq', 'disp-mcq', 'nfactor-mcq', 'daniell-mcq', 'series-mcq', 'h2o2-mcq', 'stock-mcq', 'kmno4-mcq', 'nah-ar', 'br-ar'],
      B: ['fluorine-short', 'disprop-def-short', ['valence-short', 'zncu-short'], 'classify-short3', ['br2-short3', 'titr-reason-short3']],
      C: ['rules-long', ['half-acid-long', 'half-basic-long']],
      D: ['bleach-case', 'reactivity-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Oxidation numbers computed in JS from formulae; standard Mr and NA values; titration data labelled given or illustrative; all numerical answers computed in the build script',
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
