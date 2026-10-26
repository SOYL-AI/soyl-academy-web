/**
 * The AI gateway's external dependencies, chosen by config (ai/config.ts) and injectable (tests,
 * other environments). Every Azure dependency authenticates with one injectable credential — any
 * object with `getToken(scope)` returning `{ token, expiresOnTimestamp }`, e.g. the managed-identity
 * TokenProvider in @soyl/shared/azure/identity (prod-readiness). Without one, @azure/identity's
 * DefaultAzureCredential is loaded lazily on first use.
 */
import { createEmbedder, createProvider, MockEmbedder, MockProvider, type Embedder, type ModelProvider, type TokenCredentialLike } from '@soyl/ai-core';
import type { Config } from '../config';
import { AzureBlobStore, DisabledBlobStore, MemoryBlobStore, type BlobStore } from './blob';
import type { AiConfig } from './config';
import { FreeEntitlementService, type EntitlementService } from './entitlements';
import { registerGatewayFixtures } from './fixtures';
import { AzureContentSafetyProvider, FailingModerationProvider, LocalRuleModerationProvider } from './moderation/providers';
import type { ModerationProvider } from './moderation/types';
import { LogAlertSink, type AlertSink } from './spend';

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

/** DefaultAzureCredential, imported on first use (optional peer dependency of @soyl/ai-core). */
export function lazyDefaultCredential(): TokenCredentialLike {
  let inner: Promise<TokenCredentialLike> | null = null;
  return {
    async getToken(scope) {
      inner ??= import(/* @vite-ignore */ '@azure/identity' as string).then(
        (m: { DefaultAzureCredential: new () => TokenCredentialLike }) => new m.DefaultAzureCredential(),
      );
      return (await inner).getToken(scope);
    },
  };
}

export async function createAiRuntime(
  config: Pick<Config, 'isProduction' | 'appEnv'>,
  ai: AiConfig,
  opts: { credential?: TokenCredentialLike; env?: Record<string, string | undefined>; now?: () => number } = {},
): Promise<AiRuntime> {
  const env = opts.env ?? process.env;
  const credential = opts.credential ?? lazyDefaultCredential();
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
  return { provider, embedder, moderation, blob, entitlements: new FreeEntitlementService(), alerts: new LogAlertSink() };
}
