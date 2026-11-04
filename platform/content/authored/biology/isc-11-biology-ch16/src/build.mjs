// Build ISC 11 Biology ch16 Breathing and Exchange of Gases: npx tsx content/authored/biology/isc-11-biology-ch16/src/build.mjs [--dump <file>]
// CH_OUT=<folder> builds into a scratch folder instead of the chapter folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(16, 'Breathing and Exchange of Gases', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1116,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['tracheal-mcq', 'forced-mcq', 'gradient-mcq', 'asthma-mcq', 'vc-ar'],
      B: ['nasal-short2', ['odc-short2', 'co2reg-short2']],
      C: ['insp-short3', ['rightshift-short3', 'disorders-short3']],
      D: ['sys-long'],
    },
    long: {
      A: ['sysfig-mcq', 'alveolus-mcq', 'pressure-mcq', 'spirofig2-mcq', 'hb-mcq', 'foetal-fig-mcq', 'odc-fig2-mcq', 'quarter-mcq', 'pons-mcq', 'asbestos-mcq', 'carbamino-ar', 'chemo-ar'],
      B: ['diaphragm-short2', 'forced-short2', ['cl-short2', 'asthma-short2']],
      C: ['organs-short3', 'compare-short3', 'spiro-short3', ['exchange-short3', 'regulate-short3']],
      D: ['spiro-long', ['cl-long', 'breathhold-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Respiratory organs of animals, the human respiratory system, the mechanism of breathing, pulmonary volumes and capacities, pulmonary and tissue exchange by partial pressure, oxygen transport and the oxyhaemoglobin dissociation curve with the factors that shift it, carbon dioxide transport and the chloride shift, regulation of breathing, asthma, emphysema and occupational disorders checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Every capacity, ventilation, pressure, partial pressure at altitude, saturation, oxygen content and delivery, carbon dioxide share and lung-function percentage is computed and asserted with eq in src/calc.mjs, not typed in; the dissociation curves in the diagram are drawn from the same formula',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
