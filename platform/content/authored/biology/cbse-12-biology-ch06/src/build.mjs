// Build ch06 Evolution: npx tsx content/authored/biology/cbse-12-biology-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(6, 'Evolution');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 62,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['homolog-mcq', 'finches-mcq', 'stabilising-mcq', 'hw-ar'],
      B: ['convergent-short', 'lamarck-short', 'hw-short'],
      C: ['evidence-long', 'hw-long'],
      D: ['moth-case'],
    },
    long: {
      A: ['fossil-mcq', 'resistance-mcq', 'rural-mcq', 'lamarck-mcq', 'devries-mcq', 'directional-mcq', 'disruptive-mcq', 'order-mcq', 'vonbaer-ar', 'fitness-ar'],
      B: ['radiation-short', 'selection-short', ['trends-short', 'founder-short'], 'darwin-short', ['factors-short', 'human-short']],
      C: ['darwin-long', ['human-long', 'theory-long']],
      D: ['hw-case', 'finch-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Origin of life (Big Bang account, Pasteur, Oparin–Haldane, Miller), fossils, homologous and analogous organs (animal and plant examples), molecular and embryological evidence (with von Baer), industrial melanism and anthropogenic selection, Darwin and Wallace, fitness, Lamarck, adaptive radiation and convergent evolution, de Vries, Hardy–Weinberg, five disturbing factors, three types of selection, and human evolution (times, brain capacities, features) checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Hardy–Weinberg frequencies, allele frequencies from counts, percentages, selection curves, the Hardy–Weinberg square and the brain-capacity chart are computed by src/calc.mjs, not typed in',
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
