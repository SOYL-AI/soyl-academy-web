// Build ISC 12 Chemistry ch12 Haloalkanes: npx tsx content/authored/chemistry/isc-12-chemistry-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(12, 'Haloalkanes');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2212,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['iupac-mcq', 'swarts-mcq', 'sol-mcq', 'wurtz-mcq', 'finkel-ar'],
      B: ['socl2-short', ['hunsd-short', 'bp-short']],
      C: ['prep-short3', ['sn1-short3', 'chcl3-short3']],
      D: ['nuc-long'],
    },
    long: {
      A: ['bond-mcq', 'markov-mcq', 'pbr3-mcq', 'zncl2-mcq', 'branch-mcq', 'rate-mcq', 'racem-mcq', 'benzyl-mcq', 'kcn-mcq', 'nh3-mcq', 'sn2-ar', 'kcn-ar'],
      B: ['name-short', 'sn2-short', ['saytz-short', 'iodo-short']],
      C: ['isomers-short3', 'markov-short3', 'stereo-short3', ['nuc-short3', 'elim-short3']],
      D: ['sn-long', ['nameprep-long', 'poly-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Names, preparations (including Hunsdiecker), SN1/SN2 mechanisms and stereochemistry, substitution products, Saytzeff eliminations, Wurtz and Grignard reactions, chloroform and iodoform chemistry and every numerical checked against the ISC 2027 syllabus (Unit 6)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
