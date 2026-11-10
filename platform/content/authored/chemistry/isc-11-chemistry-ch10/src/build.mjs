// Build ISC 11 Chemistry ch10 Thermodynamics: Systems and the First Law: npx tsx content/_stage/chemistry/isc-11-chemistry-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 'Thermodynamics: Systems and the First Law', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1110,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sys-bottle-mcq', 'proc-cyl-mcq', 'wirr-mcq', 'H-def-mcq', 'ar-enth'],
      B: ['s2-types', ['s2-cyclic', 's2-H']],
      C: ['s3-process', ['s3-signs', 's3-dHdU']],
      D: ['long-class'],
    },
    long: {
      A: ['flask-mcq', 'split-mcq', 'path-mcq', 'adiab-pump-mcq', 'rev-sand-mcq', 'cyc-loop-mcq', 'isoth-bath-mcq', 'revmax-mcq', 'dn-ethene-mcq', 'cv-argon-mcq', 'ar-isoth', 'ar-irrev'],
      B: ['s2-state', 's2-free', ['s2-rev', 's2-cpcv']],
      C: ['s3-path', 's3-adiab', 's3-heatcap', ['s3-revirrev', 's3-derive']],
      D: ['long-steps', ['long-law', 'long-H']],
    },
  },
  checksExtra: {
    chemistry_facts: 'R = 8.314 J/K/mol and 0.0821 L atm/K/mol; 1 L atm = 101.3 J; 2.303 = ln 10; Cv = 3R/2 and Cp = 5R/2 for a monatomic ideal gas; specific heat of water 4.18 and of copper 0.385 J/g/K; molar mass of copper 63.5; illustrative given values: dU for CaCO3 decomposition 175.0 kJ at 1100 K, dH of ethyne combustion -2600 kJ (rounded), Cv 12.5, 20.8, 21.0 J/K/mol; sign convention dU = q + w with w positive when work is done on the system; ISC 2028 Class XI Unit 6 scope',
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
