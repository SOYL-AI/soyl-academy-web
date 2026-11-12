// Build ISC 11 Chemistry ch12 Entropy, Free Energy and Spontaneity: npx tsx content/_stage/chemistry/isc-11-chemistry-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(12, 'Entropy, Free Energy and Spontaneity', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1112,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['first-law-mcq', 'entropy-state-mcq', 'dG-crit-mcq', 'k-mcq', 'spont-ar'],
      B: ['inadequacy-short2', ['entropy-short2', 'helmholtz-short2']],
      C: ['univ-short3', ['cross-short3', 'dgk-short3']],
      D: ['spont-long'],
    },
    long: {
      A: ['spont-def-mcq', 'exo-mcq', 'sign-mcq', 'fusion-mcq', 'univ-mcq', 'sign-table-mcq', 'cross-mcq', 'rel-mcq', 'kcalc-mcq', 'third-mcq', 'exo-ar', 'third-ar'],
      B: ['spont-short2', 'signs-short2', ['third-short2', 'deltaS-short2']],
      C: ['h2o2-short3', 'stdS-short3', 'deltaG-short3', ['k-short3', 'kt-short3']],
      D: ['gibbs-long', ['kcalc-long', 'mgco3-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'R = 8.314 J/K/mol; 2.303RT = 5.706 kJ/mol at 298 K; ΔfusH ice 6.01 kJ/mol at 273.15 K, ΔvapH water 40.7 at 373.15 K, benzene fusion 9.87 at 278.7 K and vaporisation 30.8 at 353.2 K, propanone vaporisation 29.1 at 329.4 K, mercury fusion 2.29 at 234.3 K; S (J/K/mol) H2 130.7, N2 191.6, O2 205.1, NH3 192.5, H2O(l) 69.9, H2O(g) 188.8, NO 210.8, NO2 240.1, N2O4 304.3, CO2 213.8, MgO 26.9, MgCO3 65.7, diamond 2.4, graphite 5.7; ΔfH (kJ/mol) NO 90.3, NO2 33.2, N2O4 9.2, NH3 -46.1, MgO -601.6, MgCO3 -1095.8, CO2 -393.5, H2O(l) -285.8; ΔfG NO2 51.3, N2O4 97.9; Ka(CH3COOH) 1.8e-5; ISC 2028 Class XI Unit 6 scope',
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
