/**
 * Content pipeline CLI (ARCHITECTURE §8, D-007). From platform/:
 *   npm run content -- <command> [--board cbse] [--class 10] [--subject science] [--chapter 1] ...
 * See content-pipeline/README.md.
 */
import { parseArgs } from 'node:util';
import { ProviderConfigError, type ProviderName } from '@soyl/ai-core';
import type { Scope } from './catalog';
import { assembleCommand } from './commands/assemble';
import { catalogCommand } from './commands/catalog';
import { coverageCommand } from './commands/coverage';
import { generateCommand, outlineCommand } from './commands/generate';
import { lintCommand, lintExemplarsCommand } from './commands/lint';
import { originalityCommand } from './commands/originality';
import { planCommand } from './commands/plan';
import { publishCommand, rollbackCommand } from './commands/publish';
import { statusCommand } from './commands/status';
import { ttsCommand } from './commands/tts';
import { verifyCommand } from './commands/verify';
import { openPipeline, type PipelineOptions } from './pipeline';
import { DbAccess, openStateStore, stateKind } from './stores';
import { defaultPaths } from './paths';

const USAGE = `usage: npm run content -- <command> [options]

commands
  catalog                 stage 1: validate platform/catalog (subjects, syllabi, blueprints)
  plan                    units in scope, missing stages, dry-run token + INR estimate
  outline                 stage 2: lesson outline + question plan per chapter
  generate                stage 3: decks, notes, flashcards, questions, case passages (runs outline first if needed)
  lint                    stage 4: deterministic checks (--exemplars: exemplars + content/authored)
  verify                  stage 5: deterministic checks + independent solve (verify tier); regenerate flagged x2
  originality             stage 6: reference n-gram overlap, bank duplicates, literature rule
  assemble                stage 7: chapter tests from blueprints (--series: unit tests, mocks, May track, term papers)
  tts                     stage 8: narration audio per slide -> blob store, slide.audio
  publish                 stage 9: ChapterRelease -> blob + Postgres (ingest, activate) + chapter tests
  rollback                re-activate an earlier release: --unit <chapter id> --to <version>
  status                  per-unit stage status, runs, spend
  coverage                board x class x subject x asset counts vs targets (launch gate)

scope
  --board cbse|cisce|icse|isc   --class 7..12   --subject <slug or id>   --chapter <n>

options
  --provider mock|azure   model / speech provider (default mock; azure needs AZURE_* env, see README)
  --state pg|file         pipeline state store (default pg when DATABASE_URL is set, else file)
  --authored              verify/originality/tts/publish: hand-authored chapters + exemplars instead of out/
  --allow-mock            publish: allow mock placeholder content (never in production)
  --series                assemble: the whole test series, not only chapter tests
  --freeze                assemble --series: write the series papers to content/authored/series/<subject>.json (ADR-019;
                          later runs and publish --authored use the frozen papers instead of re-assembling)
  --source db|files       assemble/coverage: published content in Postgres (default) or files
  --strict                assemble: exit 2 when any paper produced a generation request
  --unit <id> --to <n>    rollback target
  --concurrency <n>       parallel model calls (default 4)
  --batch                 use Azure OpenAI Batch (half price, asynchronous) where supported
  --run <id>              resume a run (keeps its spend; resumes an in-flight batch)
  --force                 redo items that are already done (tts: re-synthesise)
  --retry-review          retry items marked needs_review
  --dry-run               outline/generate: show the plan and estimate, call nothing
  --seed <s>              mock provider seed (default "soyl")
  --poll <seconds>        batch poll interval (default 60)
  --exemplars             lint: lint content-templates/exemplars and content/authored instead of out/
  --out <path>            coverage: output file base (default out/coverage/coverage)
  --gate                  coverage: exit 1 unless every subject in scope is complete
  --verbose               show warnings and every finding
`;

export async function main(argv: string[], env: Record<string, string | undefined> = process.env): Promise<number> {
  const { values, positionals } = parseArgs({
    args: argv,
    allowPositionals: true,
    options: {
      board: { type: 'string' },
      class: { type: 'string' },
      subject: { type: 'string' },
      chapter: { type: 'string' },
      provider: { type: 'string', default: 'mock' },
      state: { type: 'string' },
      authored: { type: 'boolean', default: false },
      'allow-mock': { type: 'boolean', default: false },
      series: { type: 'boolean', default: false },
      freeze: { type: 'boolean', default: false },
      source: { type: 'string' },
      strict: { type: 'boolean', default: false },
      unit: { type: 'string' },
      to: { type: 'string' },
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
  const num = (name: string, v: string | undefined, min: number, max: number): number | undefined => {
    if (v === undefined) return undefined;
    const n = Number(v);
    if (!Number.isInteger(n) || n < min || n > max) throw new Error(`--${name} must be an integer ${min}..${max}`);
    return n;
  };
  if (values.provider !== 'mock' && values.provider !== 'azure') throw new Error('--provider must be mock or azure');
  if (values.source !== undefined && values.source !== 'db' && values.source !== 'files') throw new Error('--source must be db or files');
  const source = values.source as 'db' | 'files' | undefined;
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

  const log = (l: string) => console.log(l);
  const dbAccess = new DbAccess(env, log);
  try {
    const kind = stateKind(values.state, env);
    const paths = defaultPaths(env);
    const store = await openStateStore(kind, paths.stateDir, dbAccess);
    if (kind === 'pg' && !['catalog', 'coverage'].includes(command)) log('state: Postgres (pipeline_* tables)');
    const p = openPipeline(opts, { env, store, dbAccess, log });
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
      case 'verify':
        return (await verifyCommand(p, scope, { authored: values.authored, verbose: values.verbose })).exitCode;
      case 'originality':
        return (await originalityCommand(p, scope, { authored: values.authored, verbose: values.verbose })).exitCode;
      case 'assemble':
        return (await assembleCommand(p, scope, { series: values.series, source, allowMock: values['allow-mock'], strict: values.strict, verbose: values.verbose, freeze: values.freeze })).exitCode;
      case 'tts':
        return (await ttsCommand(p, scope, { authored: values.authored, force: values.force })).exitCode;
      case 'publish':
        return (await publishCommand(p, scope, { authored: values.authored, allowMock: values['allow-mock'] })).exitCode;
      case 'rollback': {
        const to = num('to', values.to, 1, 1_000_000);
        if (!values.unit || to === undefined) {
          console.error('rollback needs --unit <chapter id> --to <version>');
          return 1;
        }
        return (await rollbackCommand(p, values.unit, to)).exitCode;
      }
      case 'status':
        return (await statusCommand(p, scope)).exitCode;
      case 'coverage':
        return (await coverageCommand(p, scope, { out: values.out, gate: values.gate, source })).exitCode;
      default:
        console.error(`unknown command "${command}"\n\n${USAGE}`);
        return 1;
    }
  } finally {
    await dbAccess.close();
  }
}

const isEntry = process.argv[1] && /cli\.ts$/.test(process.argv[1]);
if (isEntry) {
  main(process.argv.slice(2)).then(
    // Explicit exit: the embedded Postgres helper's shutdown hooks otherwise reset the exit code to 0.
    (code) => process.exit(code),
    (error) => {
      console.error(error instanceof ProviderConfigError ? error.message : (error as Error).stack ?? String(error));
      process.exit(1);
    },
  );
}
