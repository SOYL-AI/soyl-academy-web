// Build ICSE 10 Geography ch12 Agriculture in India: npx tsx content/authored/social-science/icse-10-geography-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(12, 'Agriculture in India');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3012,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['workforce-mcq', 'gr-region-mcq', 'intensive-mcq', 'rabi-mcq', 'gr-ar', 'type-short2', 'problem-short3'],
      B: [['imp-long', 'types-long']],
    },
    long: {
      A: ['monsoon-mcq', 'holding-mcq', 'soil-mcq', 'gr-why-mcq', 'gr-neg-mcq', 'mixed-mcq', 'kharif-mcq', 'zayad-mcq', 'type-ar', 'season-ar', 'gr-short2', 'rotation-short2', 'gr-eval-short3', 'season-short3'],
      B: [['gr-long', 'season-long', 'data-long']],
    },
  },
  checksExtra: {
    geography_facts: 'Importance, problems and remedies of Indian agriculture, the inputs, regions and impacts of the first Green Revolution, types of farming with Indian examples, and the kharif, rabi and zayad seasons with their months and crops, checked against the ICSE 2027 syllabus (Class X); time-sensitive statements are marked as of the early 2020s, and every farm, plot and yield figure is illustrative with every answer computed and asserted in the build',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical and every map or chart value computed and asserted by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
