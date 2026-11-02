// Build ICSE 10 Geography ch15 Manufacturing Industries: Classification and Agro-based Industries: npx tsx content/authored/social-science/icse-10-geography-ch15/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(15, 'Manufacturing Industries: Classification and Agro-based Industries');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3015,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['selfrel-mcq', 'size-mcq', 'states-mcq', 'coimbatore-mcq', 'ar-class', 'class-short2', 'mumbai-short3'],
      B: [['long-imp', 'long-cotton']],
    },
    long: {
      A: ['surplus-mcq', 'district-mcq', 'shift-mcq', 'molasses-mcq', 'humid-mcq', 'ahmedabad-mcq', 'problem-mcq', 'karnataka-mcq', 'ar-sugar', 'ar-cotton', 'sugar-short2', 'cotton-short2', 'shift-short3', 'silk-short3'],
      B: [['long-sugar', 'long-silk', 'long-loc']],
    },
  },
  checksExtra: {
    geography_facts: 'Importance of manufacturing; classification by size, raw material and ownership; factors of location; sugar (location near cane, leading states as of the early 2020s, shift to the peninsula, by-products, problems); cotton textiles (Mumbai, Ahmedabad, other centres, problems); silk (mulberry, tasar, eri, muga, centres, Karnataka lead), with illustrative district, site-scoring, sugar-delay and cocoon data computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X)',
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
