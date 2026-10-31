// Build ISC 12 Chemistry ch20 Cyanides, Isocyanides and Diazonium Salts: npx tsx content/authored/chemistry/isc-12-chemistry-ch20/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(20, 'Cyanides, Isocyanides and Diazonium Salts');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2220,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'smell-mcq', 'reagent-mcq', 'gatt-mcq', 'agcn-ar'],
      B: ['prep-short', ['diazo-short', 'couple-short']],
      C: ['compare-short3', ['replace-short3', 'synth-short3']],
      D: ['replace-long'],
    },
    long: {
      A: ['amide-mcq', 'reduce-mcq', 'carbyl-mcq', 'stab-mcq', 'fluoro-mcq', 'h3po2-mcq', 'iodo-mcq', 'nitro-mcq', 'ph-mcq', 'colour-mcq', 'iso-ar', 'diazo-ar'],
      B: ['kcnag-short', 'sand-short', ['bs-short', 'synth-short']],
      C: ['name-short3', 'stab-short3', 'eq-short3', ['cond-short3', 'path-short3']],
      D: ['couple-long', ['cn-long', 'ident-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Preparations and properties of nitriles and isocyanides, diazotisation and diazonium stability, Sandmeyer, Gattermann, Balz–Schiemann and other replacement reactions, azo coupling conditions, multistep syntheses and every numerical checked against the ISC 2027 syllabus (Unit 9)',
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
