// Build ISC 12 Biology ch13 Microbes in Human Welfare: npx tsx content/authored/biology/isc-12-biology-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(13, 'Microbes in Human Welfare');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1132,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['curd-mcq', 'citric-mcq', 'floc-mcq', 'glomus-mcq', 'penicillin-ar'],
      B: ['curd-short', ['cheese-short', 'biofert-short']],
      C: ['sewage-short', ['biogasplant-short', 'ipm-short']],
      D: ['sewage-long'],
    },
    long: {
      A: ['swiss-mcq', 'statin-mcq', 'cyclosporin-mcq', 'streptokinase-mcq', 'lipase-mcq', 'beverage-mcq', 'bod-mcq', 'methanogen-mcq', 'ladybird-mcq', 'rhizobium-mcq', 'bt-ar', 'primary-ar'],
      B: ['antibiotic-short', 'bod-short', ['biocontrol-short', 'methanogen-short']],
      C: ['medicines-short', 'activated-short', 'biofert3-short', ['pesticide-short', 'fermentation-short']],
      D: ['biogas-long', ['industry-long', 'organic-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Lactobacillus and curd, baker’s and brewer’s yeast, Propionibacterium and Swiss cheese, distilled and undistilled beverages, penicillin (Fleming, Chain and Florey), citric, acetic, butyric and lactic acids, ethanol, lipases, pectinases, proteases, streptokinase, cyclosporin A and statins, primary and secondary sewage treatment and BOD, methanogens, biogas and the biogas plant, ladybirds, dragonflies, Bt, Trichoderma and baculoviruses, integrated pest management, harm from chemical pesticides, and the biofertilisers Rhizobium, Azospirillum, Azotobacter, Glomus and cyanobacteria checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Bacterial counts, curd pH values, fermentation masses, BOD falls, oxygen demands and biogas yields are computed by src/calc.mjs, not typed in',
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
