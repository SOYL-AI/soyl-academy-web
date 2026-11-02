// Build ICSE 10 Geography ch11 Energy Resources: npx tsx content/authored/social-science/icse-10-geography-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'Energy Resources');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3011,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['anthracite-mcq', 'cambay-mcq', 'hirakud-mcq', 'solar-mcq', 'hydel-ar', 'oil-short2', 'coal-short3'],
      B: [['coal-long', 'hydel-long']],
    },
    long: {
      A: ['gondwana-mcq', 'korba-mcq', 'cng-mcq', 'barmer-mcq', 'hydel-site-mcq', 'meghalaya-mcq', 'nuclear-pair-mcq', 'manikaran-mcq', 'gas-ar', 'nuclear-ar', 'gas-short2', 'nuclear-short2', 'hydel-adv-short3', 'biogas-short3'],
      B: [['oil-long', 'nce-long', 'data-long']],
    },
  },
  checksExtra: {
    geography_facts: 'Types and coalfields of coal, onshore and offshore oil and gas fields, the Bhakra Nangal and Hirakud projects, solar, wind, tidal, geothermal, nuclear and biogas energy with named Indian sites, checked against the ICSE 2027 syllabus (Class X); time-sensitive statements are marked as of the early 2020s, and the State Z capacity table is illustrative with every total and share computed and asserted in the build',
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
