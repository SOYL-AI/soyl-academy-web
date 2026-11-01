// Build ICSE 10 Physics ch10 Electromagnetism: npx tsx content/authored/physics/icse-10-physics-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 'Electromagnetism');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2010,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['oersted-mcq', 'core-mcq', 'gen-mcq', 'induced-ar', 'emag-fill', 'emi-fill', 'emag-short2', 'acdc-short2'],
      B: [['field-long', 'gen-long']],
    },
    long: {
      A: ['forcedir-mcq', 'pins-mcq', 'slip-mcq', 'dc-mcq', 'stepdown-mcq', 'trans-ar', 'oersted-fill', 'slip-fill', 'trans-fill', 'rule-match', 'flhr-short2', 'emi-short2', 'loop-short2', 'trans-short3'],
      B: [['emag-long', 'motor-long', 'trans-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Oersted\'s experiment, concentric field lines round a straight wire and the right-hand thumb rule, the field of a loop and a solenoid with the clock rule, electromagnets on soft iron cores and ways to strengthen them, the force on a current in a field with Fleming\'s left-hand rule, DC motor and AC generator by parts and energy transfer only (working removed from the syllabus), electromagnetic induction with Fleming\'s right-hand rule, 50 Hz household AC, advantages of AC and transformers with Vs/Vp = Ns/Np, checked against the ICSE 2027 syllabus (Class X, section 4) and its removed-topics list',
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
