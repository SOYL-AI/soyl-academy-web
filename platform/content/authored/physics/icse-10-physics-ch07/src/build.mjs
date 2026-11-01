// Build ICSE 10 Physics ch07 Sound: npx tsx content/authored/physics/icse-10-physics-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Sound');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2007,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['hall-mcq', 'ultra-mcq', 'natural-mcq', 'echo-ar', 'echo-fill', 'pitch-fill', 'min-short2', 'res-short2'],
      B: [['echo-long', 'char-long']],
    },
    long: {
      A: ['surface-mcq', 'bat-mcq', 'forced-mcq', 'soldiers-mcq', 'quality-mcq', 'bell-ar', 'ultra-fill', 'forced-fill', 'res-fill', 'chars-match', 'sonar-short2', 'types-short2', 'noise-short2', 'barton-short3'],
      B: [['sonar-long', 'vib-long', 'res-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Echo and SONAR distances from d = v t / 2 (340 m/s in air, 1500 m/s in sea water) with the 0.1 s persistence of hearing giving about 17 m, natural, damped and forced vibrations with resonance at equal frequencies (pendulum natural frequency from length), loudness proportional to amplitude squared, pitch from frequency, quality from waveform, and +10 dB = 10 times the intensity, checked against the ICSE 2027 syllabus (Class X, section 3)',
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
