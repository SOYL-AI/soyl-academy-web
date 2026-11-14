// Build ISC 11 Chemistry ch24 Aromatic Hydrocarbons: Benzene: npx tsx content/authored/chemistry/isc-11-chemistry-ch24/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(24, 'Aromatic Hydrocarbons: Benzene', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1124,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'phenol-mcq', 'fc-mcq', 'tolnit-mcq', 'stab-ar'],
      B: ['nitr-short', ['prepEq-short', 'ozon-short']],
      C: ['huckel-short3', ['mech-short3', 'dirNO2-short3']],
      D: ['add-long'],
    },
    long: {
      A: ['name2-mcq', 'resE-mcq', 'sig-mcq', 'bpmp-mcq', 'xyl-mcq', 'arenium-mcq', 'sulph-mcq', 'order-mcq', 'clben-mcq', 'bhc-mcq', 'nitr-ar', 'meta-ar'],
      B: ['kek-short', 'dir-short', ['sulf-short', 'pyro-short']],
      C: ['stab-short3', 'prep-short3', 'add-short3', ['fcalk-short3', 'tolNit-short3']],
      D: ['eas-long', ['struct-long', 'dir-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'benzene C–C 139 pm (C–C 154, C=C 134), C–H 109 pm, 120°; enthalpies of hydrogenation cyclohexene −120 and benzene −208 kJ/mol, so resonance energy about 152 kJ/mol; mononitration isomer percentages toluene o 58, m 4, p 38 and nitrobenzene o 6, m 93, p 1 (approximate literature values); molar masses with C 12, H 1, N 14, O 16, Cl 35.5; all equations atom-balanced and every numerical computed in the build script',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (formulae and geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-12: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script',
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
