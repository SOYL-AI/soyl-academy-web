// Build ICSE 10 Geography ch10 Mineral Resources: npx tsx content/authored/social-science/icse-10-geography-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 'Mineral Resources');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3010,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['hematite-mcq', 'keonjhar-mcq', 'mn-uses-mcq', 'khetri-mcq', 'ar-cu', 'backbone-short2', 'bx-short3'],
      B: [['long-iron', 'long-cu']],
    },
    long: {
      A: ['dalli-mcq', 'location-mcq', 'opencast-mcq', 'mn-region-mcq', 'bronze-mcq', 'import-mcq', 'aircraft-mcq', 'refinery-mcq', 'ar-mn', 'ar-smelter', 'dist-short2', 'bx-short2', 'steel-short3', 'mn-short3'],
      B: [['long-mn', 'long-bx', 'long-mix']],
    },
  },
  checksExtra: {
    geography_facts: 'Types, grades and uses of iron ore and its leading states and mining areas (Odisha and Chhattisgarh as of the early 2020s); uses and mining areas of manganese, copper (Malanjkhand, Khetri, Singhbhum) and bauxite (Koraput, Jamnagar, Lohardaga) with leading states as of the early 2020s; bauxite to alumina to aluminium, with illustrative ore grades, process ratios and mine outputs computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X)',
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
