/** Errors shared by providers and callers of the model client. */
import type { UsageRecord } from './types';

/** The caller cancelled the call (client disconnect, stream time cap). Not a provider failure; never retried. */
export class CallerAbortedError extends Error {
  constructor() {
    super('model call cancelled by the caller');
    this.name = 'CallerAbortedError';
  }
}

/**
 * A stream failed or was cancelled after it started. `partialText` is what the model produced before
 * that, so the caller can meter it and apply F-008 (output started → charged).
 */
export class StreamInterruptedError extends Error {
  /** Set by ModelClient: the metered (estimated) usage of the partial output. */
  usage?: UsageRecord;
  constructor(
    readonly partialText: string,
    readonly cancelled: boolean,
    cause?: unknown,
  ) {
    super(cancelled ? 'stream cancelled by the caller' : 'stream interrupted', { cause });
    this.name = 'StreamInterruptedError';
  }
}

/** No model is configured (AI_PROVIDER=disabled, e.g. production before the Azure OpenAI deployments exist). */
export class ProviderUnavailableError extends Error {
  constructor(message = 'no model provider is configured') {
    super(message);
    this.name = 'ProviderUnavailableError';
  }
}
