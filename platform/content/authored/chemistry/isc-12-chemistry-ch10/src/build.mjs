// Build ISC 12 Chemistry ch10 Coordination Compounds: Terms, Nomenclature and Isomerism: npx tsx content/authored/chemistry/isc-12-chemistry-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 'Coordination Compounds: Terms, Nomenclature and Isomerism');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2210,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['alum-mcq', 'ambi-mcq', 'formula-mcq', 'coord-mcq', 'werner-ar'],
      B: ['werner-short', ['chelate-short', 'ionis-short']],
      C: ['os-short3', ['name3-short3', 'count-short3']],
      D: ['werner-long'],
    },
    long: {
      A: ['conduct-mcq', 'ferro-mcq', 'chelate-mcq', 'edta-mcq', 'cn-mcq', 'name-anion-mcq', 'order-mcq', 'geo-mcq', 'facmer-mcq', 'hydrate-mcq', 'chelate-ar', 'cis-ar'],
      B: ['double-short', 'oscn-short', ['name2-short', 'facmer-short']],
      C: ['conduct-short3', 'formula3-short3', 'link-short3', ['geo-short3', 'ptcl-short3']],
      D: ['naming-long', ['isomer-long', 'stereo-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Werner formulas, ligand denticities, oxidation states and coordination numbers, every IUPAC name and formula (2005 recommendations) and every isomer count checked against the ISC 2027 syllabus (Unit 5)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
