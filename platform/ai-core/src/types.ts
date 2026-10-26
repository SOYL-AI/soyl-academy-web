import type { z } from 'zod/v4';
import type { ModelTier, TokenUsage } from '@soyl/shared/config/models';

export type { ModelTier, TokenUsage };

export type ChatRole = 'system' | 'user' | 'assistant';
export interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** Free-form labels carried onto every usage record (run, unit, item) for the spend ledger. */
export interface CallMeta {
  runId?: string;
  unit?: string;
  item?: string;
  purpose?: string;
}

export type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high';

export interface ChatRequest {
  tier: ModelTier;
  messages: ChatMessage[];
  /** Upper bound on output tokens (reasoning included). Defaults to the tier's max in models.ts. */
  maxOutputTokens?: number;
  temperature?: number;
  reasoningEffort?: ReasoningEffort;
  meta?: CallMeta;
  /**
   * Hint for the deterministic mock provider: which fixture to produce and its inputs.
   * Real providers ignore it; it never reaches a model.
   */
  mock?: { fixture: string; input?: unknown };
}

export interface StructuredRequest<T> extends ChatRequest {
  /** zod schema the output must satisfy. Its JSON Schema (z.toJSONSchema) is sent as response_format. */
  schema: z.ZodType<T>;
  /** Short name for the schema (a-z, 0-9, _ and -), sent to the model with the JSON Schema. */
  schemaName: string;
}

/** What a provider receives: a chat request plus an optional JSON Schema response format. */
export interface ProviderRequest extends ChatRequest {
  responseFormat?: { name: string; schema: Record<string, unknown> };
}

export interface RawCompletion {
  text: string;
  finishReason: string;
  usage: TokenUsage;
  /** Deployment / model actually used ("mock" for the mock provider). */
  model: string;
  requestId: string | null;
}

export interface UsageRecord {
  provider: string;
  model: string;
  tier: ModelTier;
  usage: TokenUsage;
  cost_paise: number;
  batch: boolean;
  /** True for the mock provider: the cost is what the call would have cost, nothing was spent. */
  simulated: boolean;
  latency_ms: number;
  request_id: string | null;
  at: string;
  meta?: CallMeta;
}

export interface ChatResult {
  text: string;
  finishReason: string;
  usage: UsageRecord;
}

export interface StructuredResult<T> {
  data: T;
  text: string;
  /** Usage of the final call; `calls` lists every call including repairs. */
  usage: UsageRecord;
  calls: UsageRecord[];
  repairs: number;
}

export type BatchState = 'validating' | 'in_progress' | 'finalizing' | 'completed' | 'failed' | 'expired' | 'cancelled';

export interface BatchStatus {
  jobId: string;
  state: BatchState;
  counts: { total: number; completed: number; failed: number };
}

export type BatchItemResult =
  | { customId: string; ok: true; completion: RawCompletion }
  | { customId: string; ok: false; error: string };

export interface BatchCapability {
  submit(items: { customId: string; request: ProviderRequest }[]): Promise<{ jobId: string }>;
  poll(jobId: string): Promise<BatchStatus>;
  fetch(jobId: string): Promise<BatchItemResult[]>;
}

export interface ModelProvider {
  /** "azure" | "mock" | ... recorded on every usage record. */
  readonly name: string;
  /** True when calls cost nothing (mock); usage is still metered as simulated spend. */
  readonly simulated: boolean;
  complete(req: ProviderRequest): Promise<RawCompletion>;
  /** Streaming hook (used by the AI gateway in M4). Calls onDelta with text chunks, resolves with the whole completion. */
  stream?(req: ProviderRequest, onDelta: (text: string) => void): Promise<RawCompletion>;
  /** Present when the provider supports asynchronous Batch jobs (half price on Azure OpenAI). */
  readonly batch?: BatchCapability;
}
