/**
 * Provider factory. `mock` needs nothing; `azure` reads the endpoint and deployment names from
 * env (names in models.ts) and authenticates with DefaultAzureCredential from @azure/identity.
 *
 * @azure/identity is an optional peer dependency, loaded only when the Azure provider is created:
 * the current release pins @azure/msal-node 6.x, which has a high-severity advisory
 * (GHSA-xcx6-jx8p-x3h5), and nothing can use Azure until OA-02 anyway. Install it when the
 * credentials arrive: `npm install @azure/identity -w @soyl/ai-core` (see the pipeline README).
 */
import { AZURE_OPENAI_ENV, EMBEDDING_MODEL, MODELS, MODEL_TIERS, type ModelTier } from '@soyl/shared/config/models';
import { AzureOpenAIEmbedder, MockEmbedder, type Embedder } from './embeddings';
import type { Env } from './env';
import { ProviderUnavailableError } from './errors';
import { AzureOpenAIProvider, type TokenCredentialLike } from './providers/azure';
import { MockProvider, type MockProviderOptions } from './providers/mock';
import type { ModelProvider, RawCompletion } from './types';

/**
 * Credentials: pass `credential` — any object with `getToken(scope)` returning `{ token,
 * expiresOnTimestamp }`, e.g. the managed-identity TokenProvider in @soyl/shared/azure/identity
 * (prod-readiness). Only without one does the factory fall back to @azure/identity.
 */
export type ProviderName = 'mock' | 'azure' | 'disabled';

export class ProviderConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ProviderConfigError';
  }
}

export interface AzureEnvConfig {
  endpoint: string;
  deployments: Record<ModelTier, string>;
  batchDeployments: Partial<Record<ModelTier, string>>;
}

/** Reads Azure OpenAI settings from env; lists every missing variable. */
export function azureConfigFromEnv(env: Env = process.env): AzureEnvConfig {
  const missing: string[] = [];
  const endpoint = env[AZURE_OPENAI_ENV.endpoint];
  if (!endpoint) missing.push(AZURE_OPENAI_ENV.endpoint);
  const deployments = {} as Record<ModelTier, string>;
  const batchDeployments: Partial<Record<ModelTier, string>> = {};
  for (const tier of MODEL_TIERS) {
    const name = env[MODELS[tier].deployment_env];
    if (!name) missing.push(MODELS[tier].deployment_env);
    else deployments[tier] = name;
    const batch = env[MODELS[tier].batch_deployment_env];
    if (batch) batchDeployments[tier] = batch;
  }
  if (missing.length)
    throw new ProviderConfigError(
      `Azure OpenAI is not configured (OA-02): set ${missing.join(', ')}. Until then use --provider mock.`,
    );
  return { endpoint: endpoint!, deployments, batchDeployments };
}

async function defaultCredential(): Promise<TokenCredentialLike> {
  const moduleName = '@azure/identity';
  try {
    const identity = (await import(/* @vite-ignore */ moduleName)) as { DefaultAzureCredential: new () => TokenCredentialLike };
    return new identity.DefaultAzureCredential();
  } catch (error) {
    throw new ProviderConfigError(
      `@azure/identity is not installed (optional peer dependency of @soyl/ai-core). Run "npm install @azure/identity -w @soyl/ai-core" from platform/. (${(error as Error).message})`,
    );
  }
}

export interface CreateProviderOptions {
  provider: ProviderName;
  env?: Env;
  concurrency?: number;
  /** Mock only. */
  mock?: Omit<MockProviderOptions, 'env'>;
  /** Azure only: inject a credential (tests) instead of DefaultAzureCredential. */
  credential?: TokenCredentialLike;
  fetch?: typeof fetch;
}

/**
 * A provider that refuses every call (AI_PROVIDER=disabled): production before the Azure OpenAI
 * deployments exist (OA-02). The gateway turns ProviderUnavailableError into a friendly 503.
 */
export class DisabledProvider implements ModelProvider {
  readonly name = 'disabled';
  readonly simulated = false;
  async complete(): Promise<RawCompletion> {
    throw new ProviderUnavailableError();
  }
  async stream(): Promise<RawCompletion> {
    throw new ProviderUnavailableError();
  }
}

/** Embedder from env: `mock` (local/test), `azure` (AZURE_OPENAI_ENDPOINT + AZURE_OPENAI_DEPLOYMENT_EMBEDDING) or null. */
export async function createEmbedder(opts: { provider: 'mock' | 'azure' | 'disabled'; env?: Env; credential?: TokenCredentialLike; fetch?: typeof fetch }): Promise<Embedder | null> {
  const env = opts.env ?? process.env;
  if (opts.provider === 'disabled') return null;
  if (opts.provider === 'mock') return new MockEmbedder(undefined, { env });
  const endpoint = env[AZURE_OPENAI_ENV.endpoint];
  const deployment = env[EMBEDDING_MODEL.deployment_env];
  if (!endpoint || !deployment) return null;
  return new AzureOpenAIEmbedder({ endpoint, deployment, credential: opts.credential ?? (await defaultCredential()), fetch: opts.fetch });
}

export async function createProvider(opts: CreateProviderOptions): Promise<ModelProvider> {
  const env = opts.env ?? process.env;
  if (opts.provider === 'disabled') return new DisabledProvider();
  if (opts.provider === 'mock') return new MockProvider({ ...opts.mock, env });
  if (opts.provider === 'azure') {
    const cfg = azureConfigFromEnv(env);
    return new AzureOpenAIProvider({
      ...cfg,
      credential: opts.credential ?? (await defaultCredential()),
      concurrency: opts.concurrency,
      fetch: opts.fetch,
    });
  }
  throw new ProviderConfigError(`unknown provider "${String(opts.provider)}" (expected mock or azure)`);
}
