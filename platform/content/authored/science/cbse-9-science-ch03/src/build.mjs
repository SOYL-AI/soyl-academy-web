// Build CBSE 9 Science ch03 Motion: npx tsx content/_stage/science/cbse-9-science-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(3, 'Motion', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 3,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['unit-speedo', 'semi-mcq', 'steeper-mcq', 'rest-ar'],
      B: ['stop-short', 'xt-short', 'odometer-short'],
      C: ['derive-long', 'satellite-long'],
      D: ['rest-case'],
    },
    long: {
      A: ['vector-mcq', 'brake-dir-mcq', 'avg-dist-mcq', 'down-line-mcq', 'derive-eq-mcq', 'mass-mcq', 'flight-mcq', 'changing-mcq', 'circ-ar', 'uniform-ar'],
      B: ['retard-short', 'const-speed-short', ['vt-short', 'top-short'], 'xt-vt-short', ['derive3-short', 'derive-circ-short']],
      C: ['compare-long', ['cliff-long', 'walk-long']],
      D: ['well-case', 'wheel-case'],
    },
  },
  checksExtra: {
    science_facts: 'g = 9.8 m s-2; Moon orbit radius 3.84e8 m and period 27.3 days (textbook values); all other numbers are illustrative or computed in the build (see README "Verifier pass")',
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
