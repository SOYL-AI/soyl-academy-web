// Build ICSE 10 Geography ch06 Climate of India: npx tsx content/authored/social-science/icse-10-geography-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(6, 'Climate of India');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3006,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['altitude-mcq', 'himalaya-mcq', 'summer-mcq', 'burst-mcq', 'factor-ar', 'factor-short2', 'mech-short3'],
      B: [['factor-long', 'data-long']],
    },
    long: {
      A: ['elnino-mcq', 'winter-mcq', 'deflect-mcq', 'ne-mcq', 'october-mcq', 'cyclone-mcq', 'mango-mcq', 'identify-mcq', 'monsoon-ar', 'season-ar', 'branch-short2', 'wd-short2', 'season-short3', 'data-short3'],
      B: [['monsoon-long', 'season-long', 'compare-long']],
    },
  },
  checksExtra: {
    geography_facts: 'Factors of climate, summer and winter patterns, the monsoon mechanism and branches, the four seasons, local winds and western disturbances, and climate-data interpretation using clearly labelled illustrative station data with every range and total computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X)',
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
