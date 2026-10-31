// Build ISC 12 Biology ch18 Biodiversity and its Conservation: npx tsx content/authored/biology/isc-12-biology-ch18/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(18, 'Biodiversity and its Conservation');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1182,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['species-mcq', 'colombia-mcq', 'coextinct-mcq', 'biosphere-mcq', 'rivet-ar'],
      B: ['levels-short', ['rivet-short', 'exsitu-short']],
      C: ['gradient-short', ['evil-short', 'compare-short']],
      D: ['patterns-long'],
    },
    long: {
      A: ['genetic-mcq', 'humboldt-mcq', 'continent-mcq', 'utilitarian-mcq', 'nileperch-mcq', 'habitat-mcq', 'hotspot-mcq', 'sacred-mcq', 'seedbank-mcq', 'rio-mcq', 'fragment-ar', 'cryo-ar'],
      B: ['loss-short', 'insitu-short', ['summits-short', 'ethical-short']],
      C: ['sar-short', 'conserve-short', 'hotspot-short', ['redlist-short3', 'sacred-short3']],
      D: ['evil-long', ['insitu-long', 'conservation-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Genetic, species and ecological diversity, global numbers and proportions of major taxa, India as a mega-diversity country, the latitudinal gradient and its explanations, the species–area relationship (Humboldt) with its equation and Z values, Tilman’s experiments and the rivet popper hypothesis, reasons for conservation, recent extinctions, the evil quartet, hotspots, biosphere reserves, national parks, sanctuaries, sacred groves, Ramsar sites, the Red Data Book, ex-situ methods, and the Earth Summit and World Summit checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Species–area values, Z, ratios and percentages are computed by src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-12-default-chapter-test-short / -long',
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
