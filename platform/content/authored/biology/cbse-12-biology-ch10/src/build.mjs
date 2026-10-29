// Build ch10 Biotechnology and its Applications: npx tsx content/authored/biology/cbse-12-biology-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(10, 'Biotechnology and its Applications');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 102,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['protoxin-mcq', 'insulin-mcq', 'mice-mcq', 'biopiracy-ar'],
      B: ['geac-short', 'bt-short', 'insulin-short'],
      C: ['bt-long', 'genetherapy-long'],
      D: ['bt-case'],
    },
    long: {
      A: ['cry-mcq', 'alkaline-mcq', 'hiv-mcq', 'probe-mcq', 'ada-mcq', 'polio-mcq', 'antitrypsin-mcq', 'geac-mcq', 'rnai-ar', 'elisa-ar'],
      B: ['diagnosis-short', 'rosie-short', ['transgenic-short', 'elisa-short'], 'rnai-short', ['genetherapy-short', 'biopiracy-short']],
      C: ['ethics-long', ['diagnosis-long', 'transgenic-long']],
      D: ['insulin-case', 'biopiracy-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Uses of GM crops, golden rice, Bt toxin (protoxin, alkaline activation, midgut pores), cry genes and their pests, RNAi against Meloidogyne incognita, recombinant therapeutics, insulin structure and Eli Lilly production, ADA gene therapy, molecular diagnosis (PCR, probes, ELISA), stem cells, uses of transgenic animals, Rosie, GEAC, patents, basmati, biopiracy and the Indian Patents Bill amendment checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Yield and spray percentages, insulin amino-acid totals and shares, and protein masses in milk are computed by src/calc.mjs, not typed in',
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
