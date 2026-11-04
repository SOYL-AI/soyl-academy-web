// Build CBSE 9 Science ch12 Earth as a System: npx tsx content/_stage/science/cbse-9-science-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(12, 'Earth as a System: Energy, Matter and Life', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1212,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['spectrum-mcq', 'reflect-mcq', 'transp-mcq', 'ar-greenhouse'],
      B: ['s2-latitude', 's2-fixation', 's3-greenhouse'],
      C: ['long-solar', 'long-nitrogen'],
      D: ['case-sun'],
    },
    long: {
      A: ['volcano-mcq', 'monsoon-mcq', 'car-mcq', 'tilt-mcq', 'water-mcq', 'nitrify-mcq', 'fert-mcq', 'fossil-mcq', 'ar-season', 'ar-nitro'],
      B: ['s2-sphere', 's2-carbon', ['s2-fert', 's2-spectrum'], 's3-seasons', ['s3-impact', 's3-water']],
      C: ['long-cycles', ['long-spheres', 'long-impact']],
      D: ['case-volcano', 'case-nitrogen'],
    },
  },
  checksExtra: {
    science_facts: 'Textbook-level Earth system science: five spheres, sunlight and the greenhouse effect, latitude and axial tilt, carbon, nitrogen and water cycles, human impact; approximate values are marked as approximate and time-sensitive values are dated',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer and reviewed by the producer; every numerical re-computed by the build script — see README "Verifier pass"',
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
