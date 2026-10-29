// Build ch11 Organisms and Populations: npx tsx content/authored/biology/cbse-12-biology-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(11, 'Organisms and Populations');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 112,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['urn-mcq', 'adds-mcq', 'mutual-mcq', 'logistic-ar'],
      B: ['attr-short', 'predation-short', 'growth-short'],
      C: ['growth-long', 'interactions-long'],
      D: ['growth-case'],
    },
    long: {
      A: ['tiger-mcq', 'cover-mcq', 'salmon-mcq', 'k-mcq', 'jcurve-mcq', 'pisaster-mcq', 'warbler-mcq', 'cuckoo-mcq', 'gause-ar', 'egret-ar'],
      B: ['density-short', 'mutualism-short', ['lifehist-short', 'defence-short'], 'classify-short', ['parasite-short', 'competition-short']],
      C: ['predation-long', ['competition-long', 'attr-long']],
      D: ['attributes-case', 'interaction-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Population attributes (per capita rates, sex ratio, age pyramids, density measures), density change, exponential and logistic growth with r values, carrying capacity, life history variation, and population interactions (predation and prey defences, competition and Gause’s principle, Balanus and Chthamalus, resource partitioning, parasitism and brood parasitism, commensalism, mutualism, fig–wasp and Ophrys) checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Per capita rates, sex-ratio and age-group percentages, next-year populations, exponential and logistic growth rates and the growth curves are computed by src/calc.mjs, not typed in',
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
