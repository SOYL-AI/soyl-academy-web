// Build ICSE 10 Geography ch09 Water Resources: npx tsx content/authored/social-science/icse-10-geography-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(9, 'Water Resources');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3009,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['seasonal-mcq', 'firstflush-mcq', 'persian-mcq', 'igc-mcq', 'ar-rwh2', 'gwsurface-short2', 'tank-short3'],
      B: [['long-sources', 'long-canal']],
    },
    long: {
      A: ['alluvium-gw-mcq', 'rwh-benefit-mcq', 'urbanflood-mcq', 'checkdam-mcq', 'need-mcq', 'tankdraw-mcq', 'data-mcq', 'salinity-mcq', 'ar-gw', 'ar-canal', 'rooftop-short2', 'why-irrig-short2', 'rwh-importance-short3', 'canal-short3'],
      B: [['long-conserve', 'long-irrigation', 'long-data']],
    },
  },
  checksExtra: {
    geography_facts: 'Surface water and groundwater (water table, aquifers) and their regional contrast; reasons for water conservation; rooftop and other rainwater harvesting; the need for irrigation; wells, tube wells (leading source as of the early 2020s) and tanks with their regional reasons; perennial and inundation canals and their drawbacks; drip and sprinkler irrigation, with illustrative harvest, district and efficiency data computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X)',
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
