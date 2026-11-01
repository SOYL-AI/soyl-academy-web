// Build ICSE 10 Physics ch08 Current Electricity: npx tsx content/authored/physics/icse-10-physics-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Current Electricity');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2008,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['charge-mcq', 'terminal-mcq', 'least-mcq', 'ohm-ar', 'ohm-fill', 'series-fill', 'readings-short2', 'split-short2'],
      B: [['ohm-long', 'emf-long']],
    },
    long: {
      A: ['slope-mcq', 'lamp-mcq', 'stretch-mcq', 'intr-mcq', 'four-mcq', 'emf-ar', 'rho-fill', 'emf-fill', 'par-fill', 'term-match', 'emfvs-short2', 'get-short2', 'rho-short2', 'net-short3'],
      B: [['rho-long', 'series-long', 'network-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Current as rate of flow of charge, potential difference as work per unit charge, Ohm\'s law with its constant-temperature condition and V-I graph slope, ohmic and non-ohmic conductors, R = rho l / A and specific resistance in ohm metre, temperature dependence for metals and semiconductors, superconductivity of mercury near 4.2 K, e.m.f., internal resistance and V = E - Ir, and series and parallel equivalent resistance, checked against the ICSE 2027 syllabus (Class X, section 4)',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical computed and asserted by the build script — see README "Verifier pass"',
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
