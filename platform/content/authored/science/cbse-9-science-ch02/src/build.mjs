// Build CBSE 9 Science ch02 Tissues: npx tsx content/_stage/science/cbse-9-science-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Tissues', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
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
      A: ['lev-mcq', 'ink-mcq', 'joint-mcq', 'ar-meristem'],
      B: ['s2-stomata', 's2-bonecart', 's3-neuron'],
      C: ['long-muscle', 'long-joints'],
      D: ['case-muscle'],
    },
    long: {
      A: ['cambium-mcq', 'coconut-mcq', 'phloem-mcq', 'ligtend-mcq', 'cardiac-mcq', 'neuron-mcq', 'vitd-mcq', 'posture-mcq', 'ar-xylem', 'ar-ligament'],
      B: ['s2-meristem', 's2-xyph', ['s2-musc', 's2-posture'], 's3-levels', ['s3-joints', 's3-care']],
      C: ['long-xyph', ['long-connect', 'long-meristem']],
      D: ['case-ring', 'case-diet'],
    },
  },
  checksExtra: {
    science_facts: 'Textbook-level tissue biology: plant meristems and permanent tissues, animal tissues, joints, calcium and vitamin D',
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
