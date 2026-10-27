/** Wires the AI gateway's services from the app's dependencies (one instance per app or worker). */
import type { Database } from '@soyl/db';
import { AI_GATEWAY } from '@soyl/shared/config/credits';
import type { Clock } from '../clock';
import type { Config } from '../config';
import type { KeyValueStore } from '../kv';
import { loadAiConfig, type AiConfig } from './config';
import { CreditService } from './credits';
import type { EntitlementService } from './entitlements';
import { AiGateway, type GatewayDeps } from './gateway';
import { AiJobRunner } from './jobs';
import { localRuntime, type AiRuntime } from './runtime';
import { LogAlertSink, SpendBreaker, type MinimalLogger } from './spend';
import { UploadService } from './uploads';

export interface AiDeps {
  config?: AiConfig;
  /** Overrides of the local stand-ins (production passes a complete runtime from createAiRuntime). */
  runtime?: Partial<AiRuntime>;
}

export interface AiServiceDeps {
  config: Pick<Config, 'isProduction' | 'isLocal' | 'appEnv' | 'academicYear' | 'publicBaseUrl'>;
  db: Database;
  kv: KeyValueStore;
  clock: Clock;
  ai?: AiDeps;
}

const consoleLogger: MinimalLogger = {
  warn: (o, m) => console.warn(JSON.stringify({ ...o, msg: m })),
  error: (o, m) => console.error(JSON.stringify({ ...o, msg: m })),
  info: () => {},
};

export class AiServices {
  /** Mutable so tests can swap one dependency (a failing provider, a plan) without a new app. */
  runtime: AiRuntime;
  readonly config: AiConfig;
  readonly credits: CreditService;
  readonly breaker: SpendBreaker;
  readonly gateway: AiGateway;
  readonly jobs: AiJobRunner;
  readonly uploads: UploadService;
  private logger: MinimalLogger = consoleLogger;

  constructor(deps: AiServiceDeps) {
    const missing = (['provider', 'moderation', 'blob'] as const).filter((k) => !deps.ai?.runtime?.[k]);
    if (deps.config.isProduction && missing.length) throw new Error(`AI runtime must be configured explicitly in production (missing ${missing.join(', ')}); GEN-3 forbids the local stand-ins`);
    this.config = deps.ai?.config ?? loadAiConfig({ isLocal: true, isProduction: false, appEnv: 'test' }, {});
    this.runtime = { ...localRuntime(() => deps.clock.now()), ...deps.ai?.runtime };
    const entitlements: EntitlementService = { name: 'runtime', planFor: (u, at) => this.runtime.entitlements.planFor(u, at) };
    this.credits = new CreditService(deps.db, deps.clock, entitlements);
    this.breaker = new SpendBreaker(deps.db, deps.clock, this.config.dailySpendCapPaise, { emit: (a) => this.runtime.alerts.emit(a) });
    const gd: GatewayDeps = {
      db: deps.db,
      kv: deps.kv,
      clock: deps.clock,
      year: deps.config.academicYear,
      plansUrl: `${deps.config.publicBaseUrl}${AI_GATEWAY.plansPath}`,
      runtime: () => this.runtime,
      credits: this.credits,
      breaker: this.breaker,
      log: () => this.logger,
    };
    this.gateway = new AiGateway(gd);
    this.jobs = new AiJobRunner({ ...gd, preflight: this.gateway.preflight });
    this.uploads = new UploadService(deps.db, deps.clock, () => this.runtime, this.jobs);
  }

  /** Routes attach the app's logger; alerts then go to the structured log (Azure Monitor). */
  attachLogger(log: MinimalLogger): void {
    this.logger = log;
    if (this.runtime.alerts instanceof LogAlertSink) this.runtime.alerts.attach(log);
  }
}
