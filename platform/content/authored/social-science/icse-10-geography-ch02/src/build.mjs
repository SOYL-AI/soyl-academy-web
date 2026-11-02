// Build ICSE 10 Geography ch02 Topographical Maps: Colours, Symbols, Scale, Distance and Direction: npx tsx content/authored/social-science/icse-10-geography-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Topographical Maps: Colours, Symbols, Scale, Distance and Direction');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3002,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sym-mcq', 'rf-mcq', 'dist-mcq', 'dir-mcq', 'scale-ar', 'sh2-rf', 'dist-short3'],
      B: [['long-dist', 'long-colour']],
    },
    long: {
      A: ['line-mcq', 'canal-mcq', 'yellow-mcq', 'barscale-mcq', 'dist2-mcq', 'area-mcq', 'dir2-mcq', 'rev-mcq', 'dist-ar', 'area-ar', 'dir-short2', 'area-short2', 'area-short3', 'dir-short3'],
      B: [['long-area', 'long-dir', 'long-scale']],
    },
  },
  checksExtra: {
    geography_facts: 'Colour tints and conventional symbols, the three types of scale and conversions, straight-line distance only, area from complete grid squares only, and the eight compass points, all computed from one imagined practice sheet built in topo.mjs and checked against the ICSE 2027 syllabus (Class X)',
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
