// Build ch14 Periodic Classification of Elements: npx tsx content/authored/science/cbse-10-science-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-10-science-ch06/src/lib.mjs';

setChapter(14, 'Periodic Classification of Elements');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 14,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['modern-law-mcq', 'gaps-mcq', 'size-group-mcq', 'te-i-ar'],
      B: ['achievements-short', 'locate-short', 'period3-short'],
      C: ['modern-long', 'early-long'],
      D: ['radius-case'],
    },
    long: {
      A: ['triad-def-mcq', 'newlands-neon-mcq', 'mendeleev-basis-mcq', 'hydride-oxide-mcq', 'isotopes-mcq', 'config-group-mcq', 'metallic-mcq', 'formula-mcq', 'gaps-ar', 'metallic-ar'],
      B: ['triad-limit-short', 'size-short', ['isotopes-short', 'modern-advantage-short'], 'te-i-short', ['oxides-short', 'valency-formula-short']],
      C: ['trends-long', ['mendeleev-long', 'compare-long']],
      D: ['gallium-case', 'cards-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Triads (means recomputed), Newlands’ octaves (positions counted), Mendeléev’s oxide/hydride formulas (valencies recomputed), eka-aluminium vs gallium, modern periodic law, configurations, periods, groups and valencies of Z 1–20 (recomputed by an independent shell-filling engine), atomic-radius trends from tabulated data — checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-27: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
    assessment: 'Formative-only chapter (syllabus board_assessed: false): content is for internal assessment, activities and projects; the chapter tests follow the default chapter-test blueprints for practice.',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
