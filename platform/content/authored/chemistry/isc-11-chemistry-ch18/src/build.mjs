// Build ISC 11 Chemistry ch18 Isomerism: npx tsx content/_stage/chemistry/isc-11-chemistry-ch18/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(18, 'Isomerism', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1118,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['c4h10o-mcq', 'geomshow-mcq', 'chiralC-mcq', 'racemic-mcq', 'geom-ar'],
      B: ['chain-short', ['position-short', 'tauto-short']],
      C: ['geom-short', ['chiral-short', 'compens-short']],
      D: ['geom-long'],
    },
    long: {
      A: ['chainiso-mcq', 'metamer-mcq', 'enol-mcq', 'dce-mcq', 'hexadiene-mcq', 'tube-mcq', 'nicol-mcq', 'nstereo-mcq', 'tartaric-mcq', 'synanti-mcq', 'func-ar', 'meso-ar'],
      B: ['cistrans-short', 'polarised-short', ['spec-short', 'meso-short']],
      C: ['c4h10o-short', 'hexadiene-short', 'polarimeter-short', ['speccalc-short', 'tartaric-short']],
      D: ['tauto-geom-long', ['polar-long', 'compens-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'isomer counts recomputed by an enumerator (C4H10O 7 structural, C5H12O 8 alcohols and 6 ethers, C4H8 and C5H10 alkenes, alkane chain isomers 2, 3, 5, 9, 18, 75); chiral carbons found by comparing ligands; specific rotations sucrose +66.5, glucose +52.7, fructose -92.4 (given)',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-10: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical and every isomer count re-computed by the build script',
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
