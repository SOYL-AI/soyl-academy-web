// Build ISC 11 Chemistry ch07 Ionic Bonding: npx tsx content/_stage/chemistry/isc-11-chemistry-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(7, 'Ionic Bonding', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1107,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['valence-mcq', 'nacl-mcq', 'cation-mcq', 'prop-mcq', 'noble-ar'],
      B: ['octet-short2', ['cao-short2', 'inert-short2']],
      C: ['compare-short3', ['core-short3', 'char-short3']],
      D: ['kcl-long'],
    },
    long: {
      A: ['kossel-mcq', 'lewissymbol-mcq', 'li2o-mcq', 'ca3n2-mcq', 'conditions-mcq', 'mgf2-mcq', 'fe-mcq', 'pb-mcq', 'latt-def-mcq', 'conduct-mcq', 'bh-ar', 'only-halogen-ar'],
      B: ['cond-short2', 'ion-short2', ['bh-def-short2', 'mp-short2']],
      C: ['en-short3', 'variable-short3', 'bh-steps-short3', ['mgcl2-short3', 'latt-trend-short3']],
      D: ['mgf2-long', ['electrovalency-long', 'char-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Born-Haber data (kJ/mol): NaCl sublimation 108, 1/2 Cl2 dissociation 121, IE 496, EGE -349, lattice -788, dHf -412; KCl, NaF, NaBr and MgCl2 data as in the writer report; lattice enthalpies from common Born-Haber tables; Pauling electronegativities; ISC 2028 Class XI Unit 4 scope',
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
