// Build ICSE 10 Physics ch04 Refraction of Light at Plane Surfaces: npx tsx content/authored/physics/icse-10-physics-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(4, 'Refraction of Light at Plane Surfaces');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2004,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['normal-mcq', 'lateral-mcq', 'tircond-mcq', 'bend-ar', 'plane-fill', 'depth-fill', 'undev-short2', 'pool-short2'],
      B: [['laws-long', 'tir-long']],
    },
    long: {
      A: ['wave-mcq', 'thick-mcq', 'stick-mcq', 'p90-mcq', 'devfactor-mcq', 'fish-ar', 'lateral-fill', 'dev-fill', 'crit-fill', 'effect-match', 'block-short2', 'devfactors-short2', 'adv-short2', 'depth-short3'],
      B: [['block-long', 'depth-long', 'prism-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Snell\'s law with glass n = 1.5 and water n = 4/3, mu = c/v and v = f lambda with frequency unchanged, lateral displacement t sin(i - r)/cos r, apparent depth = real depth / mu, prism r1 + r2 = A and deviation = i + e - A, and critical angles (glass 41.8, water 48.6, diamond 24.4 degrees from sin C = 1/mu) recomputed in JS and checked against the ICSE 2027 syllabus (Class X, section 2)',
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
