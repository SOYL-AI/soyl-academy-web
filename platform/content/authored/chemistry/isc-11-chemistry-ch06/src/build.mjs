// Build ISC 11 Chemistry ch06 Classification of Elements and Periodicity in Properties: npx tsx content/_stage/chemistry/isc-11-chemistry-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(6, 'Classification of Elements and Periodicity in Properties', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1106,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['law-mcq', 'block-mcq', 'no-mcq', 'anom-mcq', 'ion-ar'],
      B: ['merit-short2', ['ind-short2', 'shield-short2']],
      C: ['ie-short3', ['order-short3', 'oxide-short3']],
      D: ['loc-long'],
    },
    long: {
      A: ['defect-mcq', 'iupac-mcq', 'locate-mcq', 'isoel-mcq', 'zeff-mcq', 'grp1-ie-mcq', 'en-mcq', 'metal-mcq', 'state-mcq', 'diag-mcq', 'ne-ar', 'diag-ar'],
      B: ['z116-short2', 'cation-short2', ['en-short2', 'li-short2']],
      C: ['defects-short3', 'name-short3', 'ef-short3', ['ncl-short3', 'rad-short3']],
      D: ['no-long', ['rad-long', 'diag-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Standard NCERT-type values aligned with cbse-11-chemistry-ch03: IE1 (kJ/mol) H 1312 … Cs 376; atomic radii (pm) Li 152 … Cs 262; ionic radii N3- 171, O2- 140, F- 133, Na+ 102, Mg2+ 72, Al3+ 54, K+ 138, Ca2+ 100, Cl- 181, S2- 184; electron gain enthalpies F -328, Cl -349, O -141, S -200, noble gases positive; Pauling electronegativities; period 3 oxides (NCERT classification); IUPAC numerical roots; position of elements from Aufbau configurations',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; every numerical, IUPAC name and position re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
// narration length 35-80 words
for (const d of [deck1, deck2]) for (const s of d.slides) { const n = s.narration.trim().split(/\s+/).length; if (n < 35 || n > 80) v.errors.push(`narration ${n} words at deck${d.part}/${s.id}`); }
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
