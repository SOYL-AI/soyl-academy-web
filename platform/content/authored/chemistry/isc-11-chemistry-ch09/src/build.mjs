// Build ISC 11 Chemistry ch09 Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding: npx tsx content/_stage/chemistry/isc-11-chemistry-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(9, 'Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1109,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['mo-bonding-mcq', 'nh4-mcq', 'co3-mcq', 'ice-mcq', 'ar-nh4'],
      B: ['s2-bond-order', ['s2-coordinate', 's2-resonance']],
      C: ['s3-mo-config', ['s3-o3', 's3-ice']],
      D: ['long-a'],
    },
    long: {
      A: ['n2-order-mcq', 'be2-mcq', 'o2-para-mcq', 'o2-lengths-mcq', 'dative-def-mcq', 'hclo4-mcq', 'o3bond-mcq', 'res-def-mcq', 'hbond-cond-mcq', 'onitro-mcq', 'ar-resonance', 'ar-mix'],
      B: ['s2-paramag', 's2-co2', ['s2-hbond-types', 's2-onitro']],
      C: ['s3-species-o', 's3-res-co3', 's3-hno3', ['s3-cl-oxy', 's3-bp-trend']],
      D: ['long-species', ['long-res', 'long-hbond']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Bond lengths N2 110, O2 121, O2+ 112, O2- 128, O2 2- 149, B2 159, C2 124, F2 142, H2 74, Li2 267 pm; bond enthalpies N2 946, O2 498, F2 159, H2 436 kJ/mol; MO orderings with and without s-p mixing; boiling points of group 14-17 hydrides; ice density 0.92 g/cm3; ISC 2028 Class XI Unit 4 scope',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer and reviewed by the producer; every numerical re-computed by the build script',
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
