// Build ch01 Sexual Reproduction in Flowering Plants: npx tsx content/authored/biology/cbse-12-biology-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Sexual Reproduction in Flowering Plants');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 12,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['tapetum-mcq', 'papaya-mcq', 'coconut-mcq', 'incompat-ar'],
      B: ['bagging-short', 'endosperm-first-short', 'micro-mega-short'],
      C: ['sac-dev-long', 'df-long'],
      D: ['sac-case'],
    },
    long: {
      A: ['synergid-ploidy-mcq', 'viability-mcq', 'cleisto-mcq', 'emasc-mcq', 'yucca-mcq', 'seedcoat-mcq', 'polyembryony-mcq', 'hybrid-seed-mcq', 'polar-ar', 'monoecy-ar'],
      B: ['tapetum-short', 'sporopollenin-short', ['monoecious-short', 'chasmo-short'], 'wind-short', ['double-fert-short', 'apomixis-short']],
      C: ['hybrid-long', ['pollen-pistil-long', 'seed-fruit-long']],
      D: ['pollination-case', 'apomixis-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Anther and microsporangium wall, microsporogenesis, pollen wall and cells, ovule parts, monosporic embryo sac (7 cells, 8 nuclei), pollination kinds and agents, outbreeding devices, pollen–pistil interaction, hybridisation, double fertilisation, endosperm, dicot and grass embryos, seed and fruit, apomixis, polyembryony and parthenocarpy checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Worked-example and item numbers (pollen per anther, ploidy of every tissue, seeds → meioses, embryo sac nuclei) are computed by src/calc.mjs from the rules, not typed in',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
