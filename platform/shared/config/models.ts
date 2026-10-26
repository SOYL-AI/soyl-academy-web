/**
 * Model registry (ARCHITECTURE §10, D-021). Logical tiers map to Azure OpenAI deployments whose
 * names come from env vars; changing a model is a config change, never a code change.
 *
 * PRICES ARE PLACEHOLDERS (`price_status: 'unverified'`). They were derived so that the per-action
 * costs in CONTEXT §6 come out right with typical prompt sizes, assuming USD 1 = INR 88:
 *   - small (GPT-6 Luna): quick doubt ≈ 600 input + 100 output tokens → ₹0.013 + ₹0.018 ≈ ₹0.03
 *   - mid (GPT-6.1 Sol): hard doubt ≈ 1,500 in + 400 out → ₹0.17 + ₹0.35 ≈ ₹0.52 (CONTEXT: ₹0.53);
 *     paper-from-upload ≈ 15,000 in + 5,000 out → ₹1.65 + ₹4.40 ≈ ₹6.05 (CONTEXT: ₹6.10)
 *   - verify (GPT-6 Astra): not priced in CONTEXT; assumed 1.6× mid.
 * Cached input is assumed at 10% of input; Azure OpenAI Batch at 50% of the standard price.
 * The owner confirms real prices for the deployed models under OA-02; update the numbers here only.
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
  /** Fraction of the standard price charged for Batch requests (0.5 = half price). */
  batch_price_factor: number;
  max_output_tokens: number;
  context_window: number;
  price_status: 'verified' | 'unverified';
}

export const USD_TO_INR_ASSUMED = 88;

export const MODELS: Record<ModelTier, ModelConfig> = {
  small: {
    tier: 'small',
    display_name: 'GPT-6 Luna',
    deployment_env: 'AZURE_OPENAI_DEPLOYMENT_SMALL',
    batch_deployment_env: 'AZURE_OPENAI_DEPLOYMENT_SMALL_BATCH',
    price_inr_per_1m: { input: 22, cached_input: 2.2, output: 176 },
    batch_price_factor: 0.5,
    max_output_tokens: 16_000,
    context_window: 400_000,
    price_status: 'unverified',
  },
  mid: {
    tier: 'mid',
    display_name: 'GPT-6.1 Sol',
    deployment_env: 'AZURE_OPENAI_DEPLOYMENT_MID',
    batch_deployment_env: 'AZURE_OPENAI_DEPLOYMENT_MID_BATCH',
    price_inr_per_1m: { input: 110, cached_input: 11, output: 880 },
    batch_price_factor: 0.5,
    max_output_tokens: 32_000,
    context_window: 400_000,
    price_status: 'unverified',
  },
  verify: {
    tier: 'verify',
    display_name: 'GPT-6 Astra',
    deployment_env: 'AZURE_OPENAI_DEPLOYMENT_VERIFY',
    batch_deployment_env: 'AZURE_OPENAI_DEPLOYMENT_VERIFY_BATCH',
    price_inr_per_1m: { input: 176, cached_input: 17.6, output: 1_408 },
    batch_price_factor: 0.5,
    max_output_tokens: 32_000,
    context_window: 400_000,
    price_status: 'unverified',
  },
};

/** Embeddings for tutor retrieval (pgvector, ARCHITECTURE §6). */
export const EMBEDDING_MODEL = {
  display_name: 'text-embedding-3-small',
  deployment_env: 'AZURE_OPENAI_DEPLOYMENT_EMBEDDING',
  dimensions: 1536,
  price_inr_per_1m: { input: 1.76 },
  price_status: 'unverified' as const,
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
