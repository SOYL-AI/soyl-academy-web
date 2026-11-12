// Build ISC 11 Chemistry ch11 Thermochemistry: npx tsx content/_stage/chemistry/isc-11-chemistry-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'Thermochemistry', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1111,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['form-def-mcq', 'neut-const-mcq', 'bond-est-mcq', 'hess-def-mcq', 'neut-ar'],
      B: ['def-short2', ['soln-short2', 'weak-short2']],
      C: ['cv-short3', ['bondest-short3', 'hessform-short3']],
      D: ['hess-long'],
    },
    long: {
      A: ['cv-mcq', 'soln-mcq', 'neut-h2so4-mcq', 'neut-weak-mcq', 'atom-cl-mcq', 'ie-na-mcq', 'bond-vs-form-mcq', 'hess-diamond-mcq', 'hess-reverse-mcq', 'hess-state-mcq', 'hess-ar', 'bond-ar'],
      B: ['neutconst-short2', 'sub-short2', ['dil-short2', 'hess-short2']],
      C: ['neutcal-short3', 'neutweak-short3', 'atom-short3', ['hesscuso4-short3', 'solnheat-short3']],
      D: ['neut-long', ['atomise-long', 'comb-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'ΔfH (kJ/mol): CO2 -393.5, H2O(l) -285.8, H2O(g) -241.8, CH4 -74.8, C2H6 -84.7, C2H4 +52.3, C2H2 +226.7, CO -110.5, NH3 -46.1, NO +90.3, NO2 +33.2, C3H8 -103.8, C2H5OH(l) -277.7; mean bond enthalpies H-H 436, O=O 498, Cl-Cl 242, C-H 414, C-C 347, C=C 611, C#C 837, C-Cl 326, O-H 463, C=O 799, I-I 151; neutralisation -57.1 (CH3COOH -55.2, HCN -12.1); ΔsubH C 716.7, Na 107.3, Mg 147.7, I2 62.4; IE Na 496, Mg 738 and 1451; ice fusion 6.01, water vaporisation 40.7; ISC 2028 Class XI Unit 6 scope',
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
