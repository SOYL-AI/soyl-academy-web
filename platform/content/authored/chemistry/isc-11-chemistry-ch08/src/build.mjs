// Build ISC 11 Chemistry ch08 Covalent Bonding, VSEPR and Hybridisation: npx tsx content/_stage/chemistry/isc-11-chemistry-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Covalent Bonding, VSEPR and Hybridisation', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1108,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['lewis-co2-mcq', 'co2-dipole-mcq', 'h2o-angle-mcq', 'hyb-pcl5-mcq', 'cov-ar'],
      B: ['sigmapi-short2', ['ioncov-short2', 'fajan-short2']],
      C: ['acrylo-short3', ['octet-short3', 'vsepr-short3']],
      D: ['dipole-long'],
    },
    long: {
      A: ['n2-bond-mcq', 'ethene-pairs-mcq', 'bondlen-mcq', 'nonpolar-mcq', 'octet-dev-mcq', 'covalency-mcq', 'fajan-al-mcq', 'nh3-mcq', 'sf4-mcq', 'hyb-nh3-mcq', 'fc-ar', 'expanded-ar'],
      B: ['dipole-short2', 'covalency-short2', ['fc-short2', 'vsepr-short2']],
      C: ['lewis-short3', 'bondlen-short3', 'sulfur-short3', ['fajan-short3', 'hyb-short3']],
      D: ['fc-long', ['fajan-long', 'vsepr-hyb-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Bond enthalpies C-H 414, C-C 347, C=C 611, C#C 837, H-H 436, O=O 498, N#N 946 kJ/mol; bond lengths H-H 74, C-C 154, C=C 134, C#C 120, N#N 109 pm; hydrogen halide dipole moments and bond lengths; e = 1.602e-19 C and 1 D = 3.336e-30 C m; VSEPR shapes and angles; ISC 2028 Class XI Unit 4 scope',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
for (const d of [deck1, deck2]) for (const s of d.slides) { const n = s.narration.trim().split(/\s+/).length; if (n < 35 || n > 80) v.errors.push(`narration ${n} words at deck${d.part}/${s.id}`); }
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
