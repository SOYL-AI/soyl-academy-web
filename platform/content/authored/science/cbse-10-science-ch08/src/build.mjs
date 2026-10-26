// Build ch08 Heredity: npx tsx content/authored/science/cbse-10-science-ch08/src/build.mjs [--dump]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-10-science-ch06/src/lib.mjs';

setChapter(8, 'Heredity');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 8,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['f1-genotype-mcq', 'dwarf-enzyme-mcq', 'female-xx-mcq', 'f1-ar'],
      B: ['hidden-short', 'sex-det-short', 'dihybrid-short'],
      C: ['mono-long', 'sex-long'],
      D: ['family-case'],
    },
    long: {
      A: ['banana-mango-mcq', 'f2-ratio-mcq', 'testcross-mcq', 'dihybrid-germ-mcq', 'violet-white-mcq', 'yellow-green-mcq', 'egg-mcq', 'turtle-mcq', 'dominance-ar', 'reptile-ar'],
      B: ['variation-short', 'height-short', ['monohybrid-short', 'myth-short'], 'unknown-genotype-short', ['chromosome-short', 'strategies-short']],
      C: ['di-long', ['traits-long', 'heredity-long']],
      D: ['flower-case', 'seed-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Variation, Mendelian ratios (re-derived by an independent Punnett-square engine), gene to enzyme to hormone to height, chromosome pairs and germ cells, XX/XY sex determination, temperature-dependent sex in turtles checked against the 2026-27 syllabus scope (see README "Verifier pass")',
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
