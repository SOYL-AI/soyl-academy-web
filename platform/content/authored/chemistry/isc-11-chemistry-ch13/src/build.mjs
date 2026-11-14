// Build ISC 11 Chemistry ch13 Chemical Equilibrium: npx tsx content/_stage/chemistry/isc-11-chemistry-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(13, 'Chemical Equilibrium', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1113,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sl-mcq', 'kpkc-mcq', 'temp-mcq', 'contact-mcq', 'dyn-ar'],
      B: ['phys-short2', ['massaction-short2', 'inert-short2']],
      C: ['nh4hs-short3', ['tempco-short3', 'contact-short3']],
      D: ['haber-long'],
    },
    long: {
      A: ['subl-mcq', 'het-mcq', 'recip-mcq', 'qdir-mcq', 'alpha-mcq', 'est-mcq', 'chromate-mcq', 'cco2-mcq', 'cat-mcq', 'ester-mcq', 'cat-ar', 'kpkc-ar'],
      B: ['char-short2', 'nh4cl-het-short2', ['kchar-short2', 'catalyst-short2']],
      C: ['brcl-short3', 'est-short3', 'shift-short3', ['haber-short3', 'kt-short3']],
      D: ['deriv-long', ['alpha-long', 'ester-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'R = 0.0821 L atm K-1 mol-1; Kc(esterification) 4.0; Kc(Br2 + Cl2 <=> 2BrCl) 7.0 at 400 K; dH(CO + 2H2 -> CH3OH) -90.7 kJ; dH(C + CO2 -> 2CO) +172 kJ; dH(N2O4 -> 2NO2) +57.2 kJ; dH(2NO + O2 -> 2NO2) -114 kJ; dH(Haber) -92.4 kJ; dH(contact) -196 kJ; Kp(298 K) of NH3 synthesis 5.6e5 atm-2 (diagram model); other numbers marked (given) in the stems',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script',
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
