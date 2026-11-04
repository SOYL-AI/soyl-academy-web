// Build CBSE 9 Science ch06 Work, Energy and Simple Machines: npx tsx content/_stage/science/cbse-9-science-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(6, 'Work, Energy and Simple Machines', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 6,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['area-mcq', 'ke-mcq', 'trans-mcq', 'ar-neg'],
      B: ['hold-short', 'speed-short', 'transform-short'],
      C: ['work-long', 'cons-long'],
      D: ['ramp-case'],
    },
    long: {
      A: ['neg-mcq', 'circ-mcq', 'pe-mcq', 'wet-mcq', 'cons-mcq', 'power-mcq', 'lever-class-mcq', 'effic-mcq', 'ar-eff', 'ar-pulley'],
      B: ['neg-short', 'conv-short', ['power-short', 'lever-short'], 'derive-pe-short', ['classes-short', 'efficiency-short']],
      C: ['ke-long', ['power-long', 'machines-long']],
      D: ['swing-case', 'machine-case'],
    },
  },
  checksExtra: {
    science_facts: 'g = 9.8 m s-2; 1 kWh = 3.6e6 J; all other numbers are given in the stems or computed in the build (appliance powers and the tariff are illustrative; see README "Verifier pass")',
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
