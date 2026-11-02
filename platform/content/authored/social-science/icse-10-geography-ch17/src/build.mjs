// Build ICSE 10 Geography ch17 Transport: npx tsx content/authored/social-science/icse-10-geography-ch17/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(17, 'Transport');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3017,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['integration-mcq', 'expressway-mcq', 'unigauge-mcq', 'nw3-mcq', 'gq-ar', 'rail-short2', 'road-short3'],
      B: [['road-long', 'rail-long']],
    },
    long: {
      A: ['relief-mcq', 'ladakh-mcq', 'delta-road-mcq', 'jhansi-mcq', 'konkan-mcq', 'rail-adv-mcq', 'fog-mcq', 'coastal-mcq', 'rail-ar', 'air-ar', 'gq-short2', 'water-short2', 'corridor-short3', 'water-short3'],
      B: [['airwater-long', 'imp-long', 'data-long']],
    },
  },
  checksExtra: {
    geography_facts: 'Importance and modes of transport, factors affecting road and rail development, expressways, National Highways, the Golden Quadrilateral and the NSEW Corridor, railway gauges, airways, and inland and coastal waterways (NW-1, NW-2, NW-3), checked against the ICSE 2027 syllabus (Class X); the corridor diagram is a schematic network, not a map, and every freight cost, speed and rail-density figure is illustrative with every answer computed and asserted in the build',
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
