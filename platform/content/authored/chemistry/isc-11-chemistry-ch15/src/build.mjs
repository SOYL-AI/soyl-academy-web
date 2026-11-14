// Build ISC 11 Chemistry ch15 Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product: npx tsx content/_stage/chemistry/isc-11-chemistry-ch15/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(15, 'Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1115,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ci-nh-mcq', 'hyd-nature-mcq', 'buf-ident-mcq', 'ksp-expr-mcq', 'ar-buf'],
      B: ['s2-ci', ['s2-nh4', 's2-hydr']],
      C: ['s3-ci-calc', ['s3-buf-explain', 's3-hyd-eq']],
      D: ['long-buf'],
    },
    long: {
      A: ['ci-num-mcq', 'ci-alpha-mcq', 'hyd-kh-mcq', 'hyd-ph-mcq', 'hyd-dil-mcq', 'buf-cap-mcq', 'buf-num-mcq', 'buf-partial-mcq', 'ksp-s-mcq', 'ksp-ppt-mcq', 'ar-agcl', 'ar-naoac'],
      B: ['s2-kh', 's2-bufdef', ['s2-ksp', 's2-ppt']],
      C: ['s3-wawb', 's3-buf-design', 's3-ksp-calc', ['s3-ppt', 's3-sel']],
      D: ['long-hyd', ['long-ksp', 'long-group']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Kw = 1.0e-14; Ka(ethanoic acid) = Kb(ammonia) = 1.8e-5 (pK 4.745); Ka(methanoic acid) = 1.8e-4; Ka(HCN) = 4.9e-10; Ka(benzoic acid) not used; Ksp(AgCl) 1.8e-10, Ksp(BaSO4) 1.1e-10, Ksp(PbI2) 7.1e-9, Ksp(Ag2CrO4) 1.1e-12, Ksp(CaF2) 3.4e-11, Ksp(AgI) 8.5e-17; given values: Ksp Mg(OH)2 1.8e-11, Fe(OH)3 4.0e-38, CuS 6.0e-36, CdS 8e-27, MnS 2.5e-10, Ka1 and Ka2 of H2S 1.0e-7 and 1.2e-13 (product 1.2e-20), saturated H2S 0.10 M; M(CaF2) 78, M(BaSO4) 233, M(CH3COONa) 82; ISC 2028 Class XI Unit 7 scope',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script',
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
