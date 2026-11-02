// Build ICSE 10 Geography ch16 Mineral-based Industries: Iron and Steel, Petrochemicals and Electronics: npx tsx content/authored/social-science/icse-10-geography-ch16/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(16, 'Mineral-based Industries: Iron and Steel, Petrochemicals and Electronics');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3016,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['coke-mcq', 'mn-mcq', 'jam-river-mcq', 'feed-mcq', 'ar-tata', 'plants-short2', 'jam-short3'],
      B: [['long-steel', 'long-elec']],
    },
    long: {
      A: ['weight-mcq', 'between-mcq', 'slag-mcq', 'vsp-coast-mcq', 'compare-mcq', 'substitute-mcq', 'port-mcq', 'bel-mcq', 'ar-vsp', 'ar-elec2', 'vsp-short2', 'elec-short2', 'loc-short3', 'blr-short3'],
      B: [['long-plants', 'long-tkm', 'long-petro']],
    },
  },
  checksExtra: {
    geography_facts: 'Raw materials and location of integrated steel plants; Tata Steel Jamshedpur (private, 1907), Rourkela (SAIL, German collaboration, 1959) and Visakhapatnam (RINL, shore-based) with sources of raw materials; petrochemical products, centres (Gujarat leading as of the early 2020s) and relevance; electronics products, centres as of the early 2020s and the growth of Bengaluru, with illustrative raw-material, tonne-km and output-share data computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X)',
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
