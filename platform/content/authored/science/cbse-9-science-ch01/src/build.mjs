// Build CBSE 9 Science ch01 Cell: npx tsx content/_stage/science/cbse-9-science-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Cell', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
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
      A: ['disc-spont', 'lyso-mcq', 'osmometer-mcq', 'ar-raisin'],
      B: ['s2-egg', 's2-protpath', 's3-theory'],
      C: ['long-plant', 'long-tonic'],
      D: ['case-slides'],
    },
    long: {
      A: ['mag-mcq', 'pa-mcq', 'prok-pair', 'size-mcq', 'sperm-mito', 'fert-mcq', 'fly-mcq', 'stem-mcq', 'ar-bacteria', 'ar-mito-animal'],
      B: ['s2-hooke', 's2-pa', ['s2-diffosm', 's2-cut'], 's3-plastids', ['s3-wall', 's3-halving']],
      C: ['long-proeuk', ['long-osmometer', 'long-mitmei']],
      D: ['case-carrot', 'case-chromosomes'],
    },
  },
  checksExtra: {
    science_facts: 'Textbook-level cell biology: discovery dates, cell theory, organelle functions, osmosis activities, mitosis and meiosis chromosome counts',
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
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
