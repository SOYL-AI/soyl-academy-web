// Build ch12 Ecosystem: npx tsx content/authored/biology/cbse-12-biology-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(12, 'Ecosystem');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 122,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['strata-mcq', 'fragment-mcq', 'never-mcq', 'mineral-ar'],
      B: ['gpp-short', 'functions-short', 'decomp-short'],
      C: ['energy-long', 'decomp-long'],
      D: ['energy-case'],
    },
    long: {
      A: ['bottom-mcq', 'manmade-mcq', 'bog-mcq', 'litter-mcq', 'par-mcq', 'trophic-mcq', 'levels-mcq', 'tree-mcq', 'dfc-ar', 'biomass-ar'],
      B: ['tenlaw-short', 'limits-short', ['productivity-short', 'strata-short'], 'gfcdfc-short', ['factors-short', 'pyramid-short']],
      C: ['pyramid-long', ['ecosystem-long', 'productivity-long']],
      D: ['productivity-case', 'pyramid-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Ecosystem definition and types, species composition and stratification, pond components and functions, primary and secondary productivity, GPP, NPP and biosphere figures, decomposition steps and factors, energy flow (PAR, second law, GFC and DFC, trophic levels, standing crop, 10 percent law), and pyramids of number, biomass and energy with inversions and limitations checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'NPP and GPP values, percentages, energy at each trophic level by the 10 percent law, transfer efficiencies and pyramid shapes are computed by src/calc.mjs, not typed in',
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
