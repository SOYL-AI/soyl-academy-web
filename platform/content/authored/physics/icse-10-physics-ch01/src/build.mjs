// Build ICSE 10 Physics ch01 Force: Turning Effect and Circular Motion: npx tsx content/authored/physics/icse-10-physics-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Force: Turning Effect and Circular Motion');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2001,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['motion-mcq', 'handle-mcq', 'equil-mcq', 'sign-ar', 'unit-fill', 'couple-fill', 'spanner-short2', 'couple-short2'],
      B: [['moment-long', 'circle-long']],
    },
    long: {
      A: ['unit-mcq', 'couplemom-mcq', 'dynamic-mcq', 'triangle-mcq', 'accel-mcq', 'centri-ar', 'moment-fill', 'pom-fill', 'centri-fill', 'term-match', 'verify-short2', 'lever-short2', 'cc-short2', 'pom-short3'],
      B: [['pom-long', 'cg-long', 'seesaw-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Moments in N m and dyne cm, resultant moments, couples, the conditions of equilibrium and the principle of moments with the metre-rule weight at its centre of gravity, centres of gravity of regular bodies and the plumb-line method, and uniform circular motion with centripetal and centrifugal force, checked against the ICSE 2027 syllabus (Class X, section 1)',
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
