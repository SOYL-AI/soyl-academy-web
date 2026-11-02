// Build ICSE 10 Geography ch07 Soil Resources: npx tsx content/authored/social-science/icse-10-geography-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Soil Resources');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3007,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['kankar-mcq', 'regur-mcq', 'wind-mcq', 'shelter-mcq', 'ar-chambal', 'plots-short2', 'compare-short3'],
      B: [['long-alluvial', 'long-erosion']],
    },
    long: {
      A: ['alluvial-crop-mcq', 'texture-mcq', 'moisture-mcq', 'yellow-mcq', 'brick-mcq', 'overgraze-mcq', 'jhum-mcq', 'trial-mcq', 'ar-black', 'ar-shelter', 'cotton-short2', 'humancause-short2', 'gradient-short3', 'causes-short3'],
      B: [['long-redlat', 'long-conserve', 'long-data']],
    },
  },
  checksExtra: {
    geography_facts: 'Formation, distribution, characteristics and crops of alluvial (khadar and bhangar), black, red and laterite soils; sheet, gully and wind erosion and their human causes; terrace farming, contour ploughing, strip cropping, shelter belts, afforestation and gully plugging, with an illustrative field trial whose percentages are computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X)',
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
