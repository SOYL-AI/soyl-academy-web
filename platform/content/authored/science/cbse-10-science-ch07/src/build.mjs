// Build ch07 How do Organisms Reproduce?: npx tsx content/authored/science/cbse-10-science-ch07/src/build.mjs [--dump]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-10-science-ch06/src/lib.mjs';

setChapter(7, 'How do Organisms Reproduce?');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 7,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['amoeba-mcq', 'bread-mould-mcq', 'fert-site-mcq', 'germ-ar'],
      B: ['budding-short', 'sperm-path-short', 'post-fert-short'],
      C: ['asexual-long', 'female-long'],
      D: ['nursery-case'],
    },
    long: {
      A: ['plasmodium-mcq', 'spirogyra-mcq', 'mango-graft-mcq', 'unisexual-mcq', 'papaya-glasshouse-mcq', 'villi-mcq', 'blocked-oviduct-mcq', 'pill-mcq', 'urethra-ar', 'foeticide-ar'],
      B: ['consistency-short', 'potato-short', ['poll-types-short', 'contra-compare-short'], 'placenta-short', ['grass-variation-short', 'foeticide-short']],
      C: ['flower-long', ['male-long', 'contra-long']],
      D: ['pumpkin-case', 'sexratio-case'],
    },
  },
  checksExtra: {
    biology_facts: 'DNA copying and variation, asexual methods with examples, flower parts, pollination, fertilisation, human reproductive systems, placenta, menstruation, STDs and contraception checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-26: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
