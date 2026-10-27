/**
 * Model registry (ARCHITECTURE §10, D-021). Logical tiers map to Azure OpenAI deployments whose
 * names come from env vars; changing a model is a config change, never a code change.
 *
 * PRICES ARE VERIFIED (2026-10-28) against the Azure Retail Prices API
 * (https://prices.azure.com/api/retail/prices, currencyCode=INR, serviceName 'Foundry Models',
 * armRegionName 'southindia'), for the deployments production actually uses (ADR-008):
 *   - GPT-6 Luna, GlobalStandard, short context (meters "6-luna ShortCo {Inp|Cd Inp|Opt} Std Gl",
 *     effective 2026-09-01): input ₹9.5989, cached input ₹0.9599, output ₹47.9947 per 1M tokens.
 *   - GPT-6.1 Sol, GlobalStandard, short context (meters "6.1-sol ShortCo ... Std Gl", effective
 *     2026-10-01): input ₹191.9788, cached input ₹9.5989, output ₹959.894 per 1M tokens.
 *   - text-embedding-3-small, DataZoneStandard ("text embedding 3 small DZ Tokens", 2026-06-01):
 *     ₹0.0023 per 1K = ₹2.30 per 1M.
 * The INR meters correspond to USD 1 ≈ INR 95.99 (e.g. Sol input USD 2.00, output USD 10.00 per 1M).
 * Not modelled here (both make real cost HIGHER than costPaise; the 7-day cost guardrail sees metered cost):
 *   - prompt-cache WRITES ("Cd Wr" meters) are billed at 1.25× input (Luna ₹11.9987, Sol ₹239.9735);
 *   - LONG-context requests ("LongCo" meters) cost 2× input and 1.5× output; our prompts stay short.
 * At these prices the CONTEXT §6 per-action estimates (made with placeholder prices) move: quick doubt
 * ≈ ₹0.011 (was ₹0.03), hard doubt ≈ ₹0.67 (was ₹0.53), paper-from-upload ≈ ₹7.68 (was ₹6.10).
 * No Batch deployment exists for these models (no GlobalBatch sku in South India, ADR-008), so
 * batch_price_factor only applies if one is added later. Update the numbers here only.
 *
 * Dependency-free (no zod) so the API, worker, pipeline and web can all import it.
 */

export const MODEL_TIERS = ['small', 'mid', 'verify'] as const;
export type ModelTier = (typeof MODEL_TIERS)[number];

/** INR (rupees, not paise) per 1,000,000 tokens. */
export interface TokenPrices {
  input: number;
  cached_input: number;
  output: number;
}

export interface ModelConfig {
  tier: ModelTier;
  /** Product name shown in docs and admin screens. */
  display_name: string;
  /** Env var holding the Azure OpenAI deployment name for this tier. */
  deployment_env: string;
  /** Optional env var for a separate Global-Batch deployment of the same model; falls back to `deployment_env`. */
  batch_deployment_env: string;
  price_inr_per_1m: TokenPrices;
  /** Fraction of the standard price charged for Batch requests (0.5 = half price). Unused while no Batch deployment exists. */
  batch_price_factor: number;
  max_output_tokens: number;
  context_window: number;
  price_status: 'verified' | 'unverified';
}

/** The rate implied by Azure's INR retail meters on 2026-10-28 (documentation only; prices above are INR). */
export const USD_TO_INR_ASSUMED = 95.99;

export const MODELS: Record<ModelTier, ModelConfig> = {
  small: {
    tier: 'small',
    display_name: 'GPT-6 Luna',
    deployment_env: 'AZURE_OPENAI_DEPLOYMENT_SMALL',
    batch_deployment_env: 'AZURE_OPENAI_DEPLOYMENT_SMALL_BATCH',
    price_inr_per_1m: { input: 9.5989, cached_input: 0.9599, output: 47.9947 },
    batch_price_factor: 0.5,
    max_output_tokens: 16_000,
    context_window: 400_000,
    price_status: 'verified',
  },
  mid: {
    tier: 'mid',
    display_name: 'GPT-6.1 Sol',
    deployment_env: 'AZURE_OPENAI_DEPLOYMENT_MID',
    batch_deployment_env: 'AZURE_OPENAI_DEPLOYMENT_MID_BATCH',
    price_inr_per_1m: { input: 191.9788, cached_input: 9.5989, output: 959.894 },
    batch_price_factor: 0.5,
    max_output_tokens: 32_000,
    context_window: 400_000,
    price_status: 'verified',
  },
  /**
   * The pipeline's independent re-solve pass (stage 5). Owner decision D-033: only two models are used,
   * GPT-6 Luna and GPT-6.1 Sol; there is no separate (more expensive) verification model. This tier
   * therefore runs on the Sol deployment, normally through Batch. It is a fresh call with a different
   * prompt and no access to the generated answer, so it still checks the content independently.
   */
  verify: {
    tier: 'verify',
    display_name: 'GPT-6.1 Sol (verification pass)',
    deployment_env: 'AZURE_OPENAI_DEPLOYMENT_MID',
    batch_deployment_env: 'AZURE_OPENAI_DEPLOYMENT_MID_BATCH',
    price_inr_per_1m: { input: 191.9788, cached_input: 9.5989, output: 959.894 },
    batch_price_factor: 0.5,
    max_output_tokens: 32_000,
    context_window: 400_000,
    price_status: 'verified',
  },
};

/** Embeddings for tutor retrieval (pgvector, ARCHITECTURE §6). */
export const EMBEDDING_MODEL = {
  display_name: 'text-embedding-3-small',
  deployment_env: 'AZURE_OPENAI_DEPLOYMENT_EMBEDDING',
  dimensions: 1536,
  price_inr_per_1m: { input: 2.3 },
  price_status: 'verified' as const,
};

export const AZURE_OPENAI_ENV = {
  endpoint: 'AZURE_OPENAI_ENDPOINT',
  /** Optional; the provider uses the v1 API path (/openai/v1/...) which needs no api-version. */
  apiVersion: 'AZURE_OPENAI_API_VERSION',
} as const;

export interface TokenUsage {
  input_tokens: number;
  /** Subset of input_tokens served from the prompt cache. */
  cached_input_tokens: number;
  /** Includes reasoning tokens, which are billed as output. */
  output_tokens: number;
}

/**
 * Cost of a call in paise (1 INR = 100 paise), unrounded. Callers that store money round at the
 * aggregate (4 decimal places of a paisa is plenty: a 1-token call costs ~0.002 paise).
 */
export function costPaise(tier: ModelTier, usage: TokenUsage, opts: { batch?: boolean } = {}): number {
  const p = MODELS[tier].price_inr_per_1m;
  const cached = Math.min(usage.cached_input_tokens, usage.input_tokens);
  const uncached = usage.input_tokens - cached;
  const rupees = (uncached * p.input + cached * p.cached_input + usage.output_tokens * p.output) / 1_000_000;
  const factor = opts.batch ? MODELS[tier].batch_price_factor : 1;
  return rupees * 100 * factor;
}

export function paiseToInr(paise: number): number {
  return Math.round(paise) / 100;
}

export function formatInr(paise: number): string {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
