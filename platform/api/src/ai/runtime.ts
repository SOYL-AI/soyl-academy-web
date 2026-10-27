/**
 * The AI gateway's external dependencies, chosen by config (ai/config.ts) and injectable (tests,
 * other environments). Every Azure dependency authenticates with one injectable credential — any
 * object with `getToken(scope)` returning `{ token, expiresOnTimestamp }`, e.g. the managed-identity
 * TokenProvider in @soyl/shared/azure/identity (prod-readiness), which is the default.
 */
import { createEmbedder, createProvider, MockEmbedder, MockProvider, type Embedder, type ModelProvider, type TokenCredentialLike } from '@soyl/ai-core';
import { defaultTokenProvider, type TokenProvider } from '@soyl/shared/azure/identity';
import type { Config } from '../config';
import { AzureBlobStore, DisabledBlobStore, MemoryBlobStore, type BlobStore } from './blob';
import type { AiConfig } from './config';
import { FreeEntitlementService, type EntitlementService } from './entitlements';
import { registerGatewayFixtures } from './fixtures';
import { AzureContentSafetyProvider, FailingModerationProvider, LocalRuleModerationProvider } from './moderation/providers';
import type { ModerationProvider } from './moderation/types';
import { LogAlertSink, type AlertSink } from './spend';

/** What createAiRuntime builds per process; entitlements come from the database (AiServices). */
export type AiProcessRuntime = Omit<AiRuntime, 'entitlements'>;

export interface AiRuntime {
  provider: ModelProvider;
  embedder: Embedder | null;
  moderation: ModerationProvider;
  blob: BlobStore;
  entitlements: EntitlementService;
  alerts: AlertSink;
}

/** Local/test defaults (all deterministic stand-ins). GEN-3: never for production. */
export function localRuntime(now: () => number = Date.now): AiRuntime {
  const env = { APP_ENV: 'test' };
  const provider = new MockProvider({ env, seed: 'soyl-gateway' });
  registerGatewayFixtures(provider);
  return {
    provider,
    embedder: new MockEmbedder(undefined, { env }),
    moderation: new LocalRuleModerationProvider(),
    blob: new MemoryBlobStore(now),
    entitlements: new FreeEntitlementService(),
    alerts: new LogAlertSink(),
  };
}

/**
 * The process's managed-identity TokenProvider (prod-readiness, @soyl/shared/azure/identity), created on
 * first use so local runs that never touch Azure need no identity. Shares the token cache with
 * Postgres/Redis/ACS. Production without IDENTITY_ENDPOINT refuses (no developer fallback).
 */
export function managedIdentityCredential(provider: () => TokenProvider = defaultTokenProvider): TokenCredentialLike {
  return {
    async getToken(scope) {
      return provider().getToken(Array.isArray(scope) ? scope[0]! : scope);
    },
  };
}

export async function createAiRuntime(
  config: Pick<Config, 'isProduction' | 'appEnv'>,
  ai: AiConfig,
  opts: { credential?: TokenCredentialLike; env?: Record<string, string | undefined>; now?: () => number } = {},
): Promise<AiProcessRuntime> {
  const env = opts.env ?? process.env;
  const credential = opts.credential ?? managedIdentityCredential();
  const provider = await createProvider({ provider: ai.provider, env, credential: ai.provider === 'azure' ? credential : undefined });
  registerGatewayFixtures(provider);
  const embedder = await createEmbedder({ provider: ai.embeddings, env, credential: ai.embeddings === 'azure' ? credential : undefined });
  const moderation: ModerationProvider =
    ai.contentSafety.provider === 'azure'
      ? new AzureContentSafetyProvider({ endpoint: ai.contentSafety.endpoint!, credential })
      : ai.contentSafety.provider === 'local'
        ? new LocalRuleModerationProvider()
        : new FailingModerationProvider();
  const blob: BlobStore =
    ai.blob.provider === 'azure'
      ? new AzureBlobStore({ accountUrl: ai.blob.accountUrl!, accountKey: ai.blob.accountKey, credential: ai.blob.accountKey ? undefined : credential, now: opts.now })
      : ai.blob.provider === 'memory'
        ? new MemoryBlobStore(opts.now)
        : new DisabledBlobStore();
  // No entitlements here: AiServices reads plans from the database (BillingEntitlementService, ADR-016).
  return { provider, embedder, moderation, blob, alerts: new LogAlertSink() };
}
