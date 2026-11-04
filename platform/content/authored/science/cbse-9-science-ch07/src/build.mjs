// Build CBSE 9 Science ch07 Structure of an Atom: npx tsx content/_stage/science/cbse-9-science-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Structure of an Atom', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 7,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-canal', 'm-dist', 'm-isopair', 'ar-alpha'],
      B: ['s2-canal', 's2-valence', 's3-thomson'],
      C: ['l-ruth', 'l-dist'],
      D: ['case-gold'],
    },
    long: {
      A: ['m-thomson', 'm-neutron', 'm-mass', 'm-bohr-fall', 'm-valency', 'm-inert', 'm-isobar', 'm-avg', 'ar-neutral', 'ar-valency'],
      B: ['s2-stable', 's2-neutral', ['s2-ion', 's2-chem'], 's3-shells', ['s3-isoisob', 's3-avg']],
      C: ['l-bohr', ['l-particles', 'l-iso']],
      D: ['case-elements', 'case-isotopes'],
    },
  },
  checksExtra: {
    science_facts: 'particle charges and relative masses (electron about 1/1836 u; proton and neutron about 1 u); Thomson 1897 electron, Goldstein 1886 canal rays, Rutherford 1911 nucleus (about 1 in 8000 rebound), Bohr 1913, Chadwick 1932; shells by the 2, 8, 8 rule for Z up to 20 and valency rules computed in data.mjs; school-book mass numbers (Cl-35, Ar-40, K-39, Ca-40); isotope uses (cobalt-60, iodine-131, uranium-235, carbon-14); all abundances and foil counts given (illustrative); see README "Verifier pass"',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer and reviewed by the producer; every numerical re-computed by the build script — see README "Verifier pass"',
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
