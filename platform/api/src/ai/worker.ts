/**
 * AI services for the worker (no HTTP): job runner, credits sweeper, retention, cost guardrail and the
 * content indexer use the same code as the API. The runtime (model provider, moderation, blob,
 * embedder) is created once per process from env (ai/config.ts); each job run gets services whose
 * clock is the run's evaluation instant, so handlers are deterministic in tests.
 */
import type { Database } from '@soyl/db';
import type { TokenCredentialLike } from '@soyl/ai-core';
import { MemoryKv } from '../kv';
import { loadAiConfig, type AiConfig } from './config';
import { createAiRuntime, type AiRuntime } from './runtime';
import { AiServices } from './services';
import type { MinimalLogger } from './spend';

export type AppEnvName = 'local' | 'test' | 'dev' | 'stg' | 'prod';

export interface AiWorkerSettings {
  appEnv?: AppEnvName;
  env?: Record<string, string | undefined>;
  academicYear?: string;
  publicBaseUrl?: string;
  credential?: TokenCredentialLike;
  /** Tests: a ready runtime (stand-ins) instead of one built from env. */
  runtime?: Partial<AiRuntime>;
}

export interface AiWorkerContext {
  config: AiConfig;
  runtime: AiRuntime | null;
  services(db: Database, now: Date, log?: MinimalLogger): AiServices;
}

/** Builds the per-process AI context (the runtime is created lazily on first use). */
export function createAiWorker(settings: AiWorkerSettings = {}): AiWorkerContext & { init(): Promise<void> } {
  const env = settings.env ?? process.env;
  const appEnv = settings.appEnv ?? ((env.APP_ENV as AppEnvName | undefined) ?? 'local');
  const flags = { isLocal: appEnv === 'local' || appEnv === 'test', isProduction: appEnv === 'prod', appEnv };
  const config = loadAiConfig(flags, env);
  const kv = new MemoryKv();
  const ctx: AiWorkerContext & { init(): Promise<void> } = {
    config,
    runtime: null,
    async init() {
      if (ctx.runtime || settings.runtime) return;
      ctx.runtime = await createAiRuntime(flags, config, { env, credential: settings.credential });
    },
    services(db, now, log) {
      const s = new AiServices({
        config: { ...flags, academicYear: settings.academicYear ?? env.ACADEMIC_YEAR ?? '2026-27', publicBaseUrl: settings.publicBaseUrl ?? env.PUBLIC_BASE_URL ?? 'https://www.soylai.com' },
        db,
        kv,
        clock: { now: () => now.getTime() },
        ai: { config, runtime: settings.runtime ?? ctx.runtime ?? undefined },
      });
      if (log) s.attachLogger(log);
      return s;
    },
  };
  return ctx;
}
