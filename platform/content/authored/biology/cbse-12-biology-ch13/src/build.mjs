// Build ch13 Biodiversity and Conservation: npx tsx content/authored/biology/cbse-12-biology-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(13, 'Biodiversity and Conservation');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 132,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['rauwolfia-mcq', 'rate-mcq', 'exsitu-mcq', 'hotspot-ar'],
      B: ['rivet-short', 'hotspot-short', 'quartet-short'],
      C: ['loss-long', 'conservation-long'],
      D: ['lake-case'],
    },
    long: {
      A: ['z-mcq', 'westernghats-mcq', 'insects-mcq', 'dodo-mcq', 'fragment-mcq', 'coext-mcq', 'sacred-mcq', 'cryo-mcq', 'tropics-ar', 'perch-ar'],
      B: ['speciesarea-short', 'effects-short', ['alien-short', 'fragment-short'], 'levels-short', ['insitu-short', 'tropics-short']],
      C: ['patterns-long', ['why-long', 'levels-long']],
      D: ['sa-case', 'grove-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Levels of biodiversity with Indian examples, global and Indian species numbers, latitudinal gradients and their explanations, the species–area relationship and Z values, Tilman and the rivet popper hypothesis, recent extinctions and the sixth extinction, effects of loss, the evil quartet with examples, reasons for conservation, hotspots, protected areas, sacred groves, Ramsar sites, the Red Data Book, ex situ methods and the Rio and Johannesburg summits checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Ratios, percentages, Z from survey points, species gain for an area factor and the species–area curves are computed by src/calc.mjs, not typed in',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
