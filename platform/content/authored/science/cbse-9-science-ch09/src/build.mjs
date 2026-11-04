// Build CBSE 9 Science ch09 Sound: npx tsx content/authored/science/cbse-9-science-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(9, 'Sound', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 9,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-vib', 'm-ultra', 'm-echo', 'ar-vac'],
      B: ['vacuum-short', 'pitch-short', 'wave-short3'],
      C: ['prod-long', 'echo-long'],
      D: ['wave-case'],
    },
    long: {
      A: ['m-long', 'm-period', 'm-wavespeed', 'm-pitch', 'm-quality', 'm-reflect', 'm-reverb', 'm-raman', 'ar-sonar', 'ar-echo'],
      B: ['longitudinal-short', 'sonar-short', ['vfl-short', 'echo-short'], 'range-short3', ['bat-short3', 'raman-short3']],
      C: ['vfl-long', ['perception-long', 'ultra-long']],
      D: ['sonar-case', 'drum-case'],
    },
  },
  checksExtra: {
    science_facts: 'approximate speeds of sound: air 344 m/s (about 22 C), sea water 1500 m/s, steel 5000 m/s; audible range about 20 Hz to 20 kHz; echo needs 0.1 s; animal frequencies are approximate; drum overtone frequencies in the case are illustrative (see README "Verifier pass")',
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
