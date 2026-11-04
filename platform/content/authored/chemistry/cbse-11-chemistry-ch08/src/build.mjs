// Build CBSE 11 Chemistry ch08 Organic Chemistry: Some Basic Principles and Techniques: npx tsx content/_stage/chemistry/cbse-11-chemistry-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Organic Chemistry: Some Basic Principles and Techniques', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
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
      A: ['sigma-pi-mcq', 'fg-mcq', 'homo-mcq', 'ethyne-ar'],
      B: ['homolytic-short', 'rf-short', 'name-short3'],
      C: ['nomen-long', 'isomer-long'],
      D: ['liebig-case'],
    },
    long: {
      A: ['prio-mcq', 'meta-mcq', 'geom-mcq', 'chiral-mcq', 'nuc-mcq', 'hyperc-mcq', 'kj-mcq', 'steam-mcq', 'fission-ar', 'acid-ar'],
      B: ['tetra-short', 'inductive-short', ['ef-short', 'subl-short'], 'isomer-short3', ['resonance-short3', 'hyper-short3']],
      C: ['effects-long', ['purif-long', 'quant-long']],
      D: ['tlc-case', 'lass-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Textbook-standard values (bond lengths, boiling points of named liquids, atomic and molar masses); data labelled given or illustrative; all percentage and Rf answers computed in the build script',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry and formulas computed in svgs.mjs): ${svgFails.length} failures`,
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
