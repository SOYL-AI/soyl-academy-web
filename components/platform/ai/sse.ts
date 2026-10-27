/**
 * AI streaming over fetch (ai-gateway M4 handoff "SSE protocol"): POST with a JSON body, an
 * Idempotency-Key and an AbortController; the reply is text/event-stream read from `response.body`
 * (EventSource cannot POST). Errors before the stream (paywall, plan, consent, breaker, validation) are
 * problem+json and surface as ApiError, like every other call.
 *
 *   meta    {requestId, conversationId, action, credits, balance, tier, degraded, mode, language}
 *   delta   {text}
 *   refusal {kind, message, creditsRefunded, balance}
 *   error   {code, message, creditsRefunded | creditsCharged, balance}
 *   done    {status, creditsCharged, balance, sources?}
 */
import { API_BROWSER_BASE, ApiError, type AiActionId, type AiActionRequest, type Problem } from '@/platform/shared/api-client';

export interface MetaEvent {
  requestId: string;
  conversationId: string;
  action: string;
  credits: number;
  balance: number;
  tier: string;
  degraded: boolean;
  mode: 'hint' | 'full' | 'explain';
  language: 'english' | 'hinglish' | 'hindi';
}
export interface RefusalEvent {
  kind: 'unsafe' | 'off_topic' | 'self_harm' | 'output_blocked';
  message: string;
  creditsRefunded?: number;
  balance?: number;
}
export interface ErrorEvent {
  code: string;
  message: string;
  creditsRefunded?: number;
  creditsCharged?: number;
  balance?: number;
}
export interface DoneEvent {
  status: string;
  creditsCharged: number;
  balance: number;
  sources?: unknown[];
}

export type AiStreamEvent =
  | { type: 'meta'; data: MetaEvent }
  | { type: 'delta'; data: { text: string } }
  | { type: 'refusal'; data: RefusalEvent }
  | { type: 'error'; data: ErrorEvent }
  | { type: 'done'; data: DoneEvent };

const KNOWN = new Set(['meta', 'delta', 'refusal', 'error', 'done']);

/**
 * Incremental SSE parser: feed it decoded text chunks; it returns complete events. Handles events split
 * across chunks, CRLF line endings, comments (`:`), multi-line `data:` and unknown event names (ignored).
 */
export class SseParser {
  private buffer = '';

  push(chunk: string): AiStreamEvent[] {
    this.buffer += chunk.replace(/\r\n?/g, '\n');
    const out: AiStreamEvent[] = [];
    let idx: number;
    while ((idx = this.buffer.indexOf('\n\n')) >= 0) {
      const block = this.buffer.slice(0, idx);
      this.buffer = this.buffer.slice(idx + 2);
      const ev = parseBlock(block);
      if (ev) out.push(ev);
    }
    return out;
  }

  /** Whatever is left when the stream ends (a final event without the blank line). */
  end(): AiStreamEvent[] {
    const rest = this.buffer.trim();
    this.buffer = '';
    const ev = rest ? parseBlock(rest) : null;
    return ev ? [ev] : [];
  }
}

function parseBlock(block: string): AiStreamEvent | null {
  let name = 'message';
  const data: string[] = [];
  for (const line of block.split('\n')) {
    if (!line || line.startsWith(':')) continue;
    const colon = line.indexOf(':');
    const field = colon < 0 ? line : line.slice(0, colon);
    let value = colon < 0 ? '' : line.slice(colon + 1);
    if (value.startsWith(' ')) value = value.slice(1);
    if (field === 'event') name = value;
    else if (field === 'data') data.push(value);
  }
  if (!KNOWN.has(name) || data.length === 0) return null;
  try {
    return { type: name, data: JSON.parse(data.join('\n')) } as AiStreamEvent;
  } catch {
    return null;
  }
}

export interface StreamOptions {
  idempotencyKey: string;
  signal?: AbortSignal;
  onEvent: (ev: AiStreamEvent) => void;
  fetchImpl?: typeof fetch;
}

/** POST /v1/ai/:action and dispatch its events. Resolves when the stream ends. */
export async function streamAiAction(action: AiActionId, body: AiActionRequest, o: StreamOptions): Promise<void> {
  const doFetch = o.fetchImpl ?? ((i: RequestInfo | URL, init?: RequestInit) => globalThis.fetch(i, init));
  let res: Response;
  try {
    res = await doFetch(`${API_BROWSER_BASE}/v1/ai/${encodeURIComponent(action)}`, {
      method: 'POST',
      credentials: 'same-origin',
      cache: 'no-store',
      headers: { accept: 'text/event-stream', 'content-type': 'application/json', 'idempotency-key': o.idempotencyKey },
      body: JSON.stringify(body),
      signal: o.signal,
    });
  } catch (err) {
    if ((err as { name?: string })?.name === 'AbortError') throw err;
    throw new ApiError(0, 'network_error', null, 'Network error: could not reach the server');
  }
  const type = res.headers.get('content-type') ?? '';
  if (!res.ok || !/text\/event-stream/i.test(type)) {
    let problem: Problem | null = null;
    if (/json/i.test(type)) {
      try {
        problem = (await res.json()) as Problem;
      } catch {
        problem = null;
      }
    }
    const code = typeof problem?.code === 'string' ? problem.code : res.status === 401 ? 'unauthenticated' : res.status >= 500 ? 'service_unavailable' : 'http_error';
    throw new ApiError(res.status, code, problem && typeof problem.status === 'number' ? problem : null);
  }
  if (!res.body) return;
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const parser = new SseParser();
  try {
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      for (const ev of parser.push(decoder.decode(value, { stream: true }))) o.onEvent(ev);
    }
    for (const ev of parser.push(decoder.decode())) o.onEvent(ev);
    for (const ev of parser.end()) o.onEvent(ev);
  } finally {
    reader.releaseLock();
  }
}
