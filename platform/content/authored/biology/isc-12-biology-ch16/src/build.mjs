// Build ISC 12 Biology ch16 Organisms and Populations: npx tsx content/authored/biology/isc-12-biology-ch16/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(16, 'Organisms and Populations');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1162,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['quadrat-mcq', 'jcurve-mcq', 'fig-mcq', 'cuscuta-mcq', 'logistic-ar'],
      B: ['attr-short', ['phases-short', 'mutualism-short']],
      C: ['pyramid-short', ['growth-short', 'parasite-short']],
      D: ['interactions-long'],
    },
    long: {
      A: ['density-mcq', 'natality-mcq', 'immig-mcq', 'rvalue-mcq', 'k-mcq', 'salmon-mcq', 'connell-mcq', 'tortoise-mcq', 'commensal-mcq', 'pisaster-mcq', 'brood-ar', 'k-ar'],
      B: ['lifehistory-short', 'predation-short', ['commensal-short', 'gause-short']],
      C: ['density-short', 'competition-short', 'defence-short', ['rates-short', 'release-short']],
      D: ['pop-long', ['growth-long', 'parasite-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Population density and its measurement (quadrats, cover, pug marks, mark–recapture), natality, mortality, immigration, emigration, sex ratio, age pyramids, carrying capacity, exponential and logistic growth with equations and r values, life history variation, mutualism (lichens, mycorrhizae, fig and wasp, Ophrys), competition (flamingoes and fishes, Abingdon tortoise, interference), competitive release (Connell), Gause’s principle, resource partitioning (MacArthur), predation and anti-predator defences, parasitism (ecto-, endo-, brood), commensalism and amensalism checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Birth and death rates, population sizes, densities, mark–recapture estimates, growth rates, doubling times, percentages and the competition model are computed by src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-12-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
