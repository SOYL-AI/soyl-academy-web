/**
 * Content pipeline CLI (ARCHITECTURE §8, D-007). From platform/:
 *   npm run content -- <command> [--board cbse] [--class 10] [--subject science] [--chapter 1] ...
 * See content-pipeline/README.md.
 */
import { parseArgs } from 'node:util';
import { ProviderConfigError, type ProviderName } from '@soyl/ai-core';
import type { Scope } from './catalog';
import { catalogCommand } from './commands/catalog';
import { coverageCommand } from './commands/coverage';
import { generateCommand, outlineCommand } from './commands/generate';
import { lintCommand, lintExemplarsCommand } from './commands/lint';
import { planCommand } from './commands/plan';
import { statusCommand } from './commands/status';
import { openPipeline, type PipelineOptions } from './pipeline';

export const M2_STAGES: Record<string, string> = {
  verify: 'stage 5: independent solve with the verify tier + numeric checks',
  originality: 'stage 6: n-gram overlap + model check',
  assemble: 'stage 7: chapter/unit/term/full papers from blueprints',
  tts: 'stage 8: narration audio (Azure AI Speech)',
  publish: 'stage 9: content release + DB rows',
};

const USAGE = `usage: npm run content -- <command> [options]

commands
  catalog                 stage 1: validate platform/catalog (subjects, syllabi, blueprints)
  plan                    units in scope, missing stages, dry-run token + INR estimate
  outline                 stage 2: lesson outline + question plan per chapter
  generate                stage 3: decks, notes, flashcards, questions, case passages (runs outline first if needed)
  lint                    stage 4: deterministic checks (--exemplars: lint hand-written exemplars + content/authored)
  status                  per-unit stage status, runs, spend
  coverage                board × class × subject × asset counts vs targets (launch gate)
  verify | originality | assemble | tts | publish    M2 (not implemented)

scope
  --board cbse|cisce|icse|isc   --class 7..12   --subject <slug or id>   --chapter <n>

options
  --provider mock|azure   model provider (default mock; azure needs AZURE_OPENAI_* env, see README)
  --concurrency <n>       parallel model calls (default 4)
  --batch                 use Azure OpenAI Batch (half price, asynchronous) where supported
  --run <id>              resume a run (keeps its spend; resumes an in-flight batch)
  --force                 redo items that are already done
  --retry-review          retry items marked needs_review
  --dry-run               outline/generate: show the plan and estimate, call nothing
  --seed <s>              mock provider seed (default "soyl")
  --poll <seconds>        batch poll interval (default 60)
  --exemplars             lint: lint content-templates/exemplars and content/authored instead of out/
  --out <path>            coverage: output file base (default out/coverage/coverage)
  --gate                  coverage: exit 1 unless every subject in scope is complete
  --verbose               show warnings and every finding
`;

export async function main(argv: string[]): Promise<number> {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      board: { type: 'string' },
      class: { type: 'string' },
      subject: { type: 'string' },
      chapter: { type: 'string' },
      provider: { type: 'string', default: 'mock' },
      concurrency: { type: 'string' },
      batch: { type: 'boolean', default: false },
      run: { type: 'string' },
      force: { type: 'boolean', default: false },
      'retry-review': { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
      seed: { type: 'string' },
      poll: { type: 'string' },
      exemplars: { type: 'boolean', default: false },
      out: { type: 'string' },
      gate: { type: 'boolean', default: false },
      verbose: { type: 'boolean', default: false },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });
  const command = positionals[0];
  if (!command || values.help) {
    console.log(USAGE);
    return command || values.help ? 0 : 1;
  }
  if (M2_STAGES[command]) {
    console.error(`content ${command}: not implemented (M2) — ${M2_STAGES[command]}`);
    return 2;
  }
  const num = (name: string, v: string | undefined, min: number, max: number): number | undefined => {
    if (v === undefined) return undefined;
    const n = Number(v);
    if (!Number.isInteger(n) || n < min || n > max) throw new Error(`--${name} must be an integer ${min}..${max}`);
    return n;
  };
  if (values.provider !== 'mock' && values.provider !== 'azure') throw new Error('--provider must be mock or azure');
  const scope: Scope = {
    board: values.board,
    class: num('class', values.class, 7, 12),
    subject: values.subject,
    chapter: num('chapter', values.chapter, 1, 99),
  };
  const opts: Partial<PipelineOptions> = {
    provider: values.provider as ProviderName,
    batch: values.batch,
    force: values.force,
    retryReview: values['retry-review'],
    dryRun: values['dry-run'],
    runId: values.run,
  };
  const concurrency = num('concurrency', values.concurrency, 1, 64);
  if (concurrency) opts.concurrency = concurrency;
  if (values.seed) opts.seed = values.seed;
  const poll = num('poll', values.poll, 1, 3600);
  if (poll) opts.pollIntervalMs = poll * 1000;

  const p = openPipeline(opts);
  const catalogErrors = p.catalog.issues.filter((i) => i.severity === 'error');
  if (command !== 'catalog' && catalogErrors.length)
    console.warn(`warning: the catalog has ${catalogErrors.length} error(s); run "npm run content -- catalog" (affected subjects may be missing)`);

  switch (command) {
    case 'catalog':
      return catalogCommand(p, { verbose: values.verbose }).exitCode;
    case 'plan':
      return (await planCommand(p, scope)).exitCode;
    case 'outline':
      if (values['dry-run']) return (await planCommand(p, scope)).exitCode;
      return (await outlineCommand(p, scope)).exitCode;
    case 'generate':
      if (values['dry-run']) return (await planCommand(p, scope)).exitCode;
      return (await generateCommand(p, scope)).exitCode;
    case 'lint':
      return values.exemplars ? (await lintExemplarsCommand(p, { verbose: values.verbose })).exitCode : (await lintCommand(p, scope, { verbose: values.verbose })).exitCode;
    case 'status':
      return (await statusCommand(p, scope)).exitCode;
    case 'coverage':
      return coverageCommand(p, scope, { out: values.out, gate: values.gate }).exitCode;
    default:
      console.error(`unknown command "${command}"\n\n${USAGE}`);
      return 1;
  }
}

const isEntry = process.argv[1] && /cli\.ts$/.test(process.argv[1]);
if (isEntry) {
  main(process.argv.slice(2)).then(
    (code) => {
      process.exitCode = code;
    },
    (error) => {
      console.error(error instanceof ProviderConfigError ? error.message : (error as Error).stack ?? String(error));
      process.exitCode = 1;
    },
  );
}
