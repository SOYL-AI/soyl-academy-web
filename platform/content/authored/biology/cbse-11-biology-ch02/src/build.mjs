// Build ch02 Biological Classification: npx tsx content/authored/biology/cbse-11-biology-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(2, 'Biological Classification', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 21,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['redtide-mcq', 'methano-mcq', 'lichen-mcq', 'diatom-ar'],
      B: ['hyphae-short2', 'plasmogamy-short2', 'fungi-class-short3'],
      C: ['kingdoms-long', 'virus-long'],
      D: ['swab-case'],
    },
    long: {
      A: ['twok-mcq', 'chemo-mcq', 'myco-mcq', 'phage-mcq', 'fig-vibrio-mcq', 'wall-mcq', 'curd-mcq', 'indicator-mcq', 'monera-ar', 'lichen-ar'],
      B: ['archae-short2', 'fungi-nutrition-short2', ['fungi-spore-short2', 'discovery-short2'], 'compare-short3', ['compare-virus-short3', 'place-short3']],
      C: ['protista-long', ['virus-eval-long', 'fungi-long']],
      D: ['lake-case', 'field-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Failings of the two-kingdom system and Whittaker 1969 with its criteria; the five-kingdom comparison table; Monera (shapes, archaebacteria: halophiles, thermoacidophiles, methanogens; eubacteria: cyanobacteria with heterocysts, chemosynthetic and heterotrophic bacteria, mycoplasma; fission); Protista (chrysophytes and diatomaceous earth, dinoflagellates and red tides, euglenoids and the pellicle, slime moulds, four protozoan groups); Fungi (chitin, hyphae and mycelium, coenocytic and septate, nutrition, vegetative, asexual and sexual reproduction, plasmogamy, dikaryon, karyogamy, four classes with spores and examples); lichens and pollution; viruses (Ivanowsky 1892, Beijerinck 1898, Stanley 1935, capsid, DNA or RNA, bacteriophage) and viroids (Diener 1971) checked against the 2026-27 rationalised NCERT scope (see README "For a reviewer")',
    counting_rules: 'Kingdom counts from the five-kingdom table, the decision key, generations and doubling, spore and chromosome counts, survey percentages, year gaps and case numbers are computed and asserted in src/calc.mjs, not typed in; the lichen caption in src/svgs.mjs reads its values from calc.mjs',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
