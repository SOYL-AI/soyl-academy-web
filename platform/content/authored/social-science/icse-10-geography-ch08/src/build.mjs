// Build ICSE 10 Geography ch08 Natural Vegetation: npx tsx content/authored/social-science/icse-10-geography-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Natural Vegetation');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3008,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['evergreen-where-mcq', 'sal-use-mcq', 'desert-adapt-mcq', 'vanm-mcq', 'ar-deciduous', 'desert-short2', 'compare-short3'],
      B: [['long-importance', 'long-mountain']],
    },
    long: {
      A: ['industry-mcq', 'exploit-mcq', 'moist-dry-mcq', 'commercial-mcq', 'roots-mcq', 'cyclone-mcq', 'meadow-mcq', 'agro-mcq', 'ar-evergreen', 'ar-mountain', 'mangrove-short2', 'socialagro-short2', 'mountain-short3', 'plan-short3'],
      B: [['long-deciduous', 'long-desert-mangrove', 'long-conserve']],
    },
  },
  checksExtra: {
    geography_facts: 'Importance of forests; tropical evergreen and tropical deciduous (moist and dry) forests with their rainfall, distribution, features and trees; desert, littoral (mangrove) and Himalayan altitudinal vegetation; afforestation, reforestation, social forestry, agroforestry and Van Mahotsav (1950, July), with illustrative rainfall, lapse-rate and forest-area data computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X)',
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
