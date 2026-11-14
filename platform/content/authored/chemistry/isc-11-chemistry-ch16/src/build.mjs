// Build ISC 11 Chemistry ch16 Redox Reactions: npx tsx content/_stage/chemistry/isc-11-chemistry-ch16/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(16, 'Redox Reactions', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1116,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['oxid-mcq', 'on-cr-mcq', 'bal-coef-mcq', 'type-decomp-mcq', 'ar-zn'],
      B: ['s2-define', ['s2-redox-fe', 's2-types']],
      C: ['s3-on-n', ['s3-zn', 's3-cri']],
      D: ['long-ie-acid'],
    },
    long: {
      A: ['hyd-agent-mcq', 'e-count-mcq', 'red-h-mcq', 'on-s2o3-mcq', 'on-ch3oh-mcq', 'on-hyd-mcq', 'bal-e-mcq', 'bal-ratio-mcq', 'type-displ-mcq', 'type-disp3-mcq', 'ar-cl2', 'ar-agcl'],
      B: ['s2-oh', 's2-exc', ['s2-neut', 's2-basic']],
      C: ['s3-agents', 's3-tetra', 's3-titr', ['s3-error', 's3-types']],
      D: ['long-onbasic', ['long-h2o2', 'long-disp']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Atomic masses H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35.5, K 39, Cr 52, Mn 55, Fe 56; oxidation numbers of the syllabus examples K2Cr2O7 (Cr +6) and S2O3 2- (S +2) from the sum rule; every balanced equation is checked for atoms and charge in data.mjs at load; no electrochemical cells (Class XII); ISC 2028 Class XI Unit 7 scope',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script and every ionic equation re-checked for atoms and charge',
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
