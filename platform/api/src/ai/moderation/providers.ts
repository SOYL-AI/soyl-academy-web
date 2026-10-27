/**
 * Moderation providers (ADR-015).
 *
 * AzureContentSafetyProvider — Azure AI Content Safety REST API, keyless (managed identity bearer
 * token, scope https://cognitiveservices.azure.com/.default):
 *   POST {endpoint}/contentsafety/text:analyze?api-version=2024-09-01
 *        { text, categories: [Hate, SelfHarm, Sexual, Violence], outputType: FourSeverityLevels }
 *   POST {endpoint}/contentsafety/text:shieldPrompt?api-version=2024-09-01
 *        { userPrompt, documents[] }  → userPromptAnalysis.attackDetected, documentsAnalysis[].attackDetected
 * Text over 10,000 characters is analysed in slices (the API limit). Any HTTP/network failure or
 * timeout becomes ModerationUnavailableError (fail closed). Unverified against a live resource until
 * the owner creates it (OA-02 / handoff); request/response shapes follow the 2024-09-01 GA API.
 *
 * LocalRuleModerationProvider — rules.ts; deterministic; refused in production by config (GEN-3).
 * FailingModerationProvider — always unavailable (CONTENT_SAFETY_PROVIDER=disabled, fault injection).
 */
import type { TokenCredentialLike } from '@soyl/ai-core';
import { harmSeverities, isDocumentAttack, isJailbreak } from './rules';
import { ModerationUnavailableError, type HarmCategory, type ModerationProvider, type ShieldResult, type TextAnalysis } from './types';

export const CONTENT_SAFETY_API_VERSION = '2024-09-01';
export const CONTENT_SAFETY_SCOPE = 'https://cognitiveservices.azure.com/.default';
const MAX_TEXT = 10_000;
const MAX_SHIELD_CHARS = 10_000;

export class LocalRuleModerationProvider implements ModerationProvider {
  readonly name = 'local-rules';
  readonly isStandIn = true;
  /** Fault injection (API-16 tests). */
  failing = false;

  async analyzeText(text: string): Promise<TextAnalysis> {
    if (this.failing) throw new ModerationUnavailableError(new Error('local moderation: injected failure'));
    return { severities: harmSeverities(text) };
  }

  async shieldPrompt(userPrompt: string, documents: string[]): Promise<ShieldResult> {
    if (this.failing) throw new ModerationUnavailableError(new Error('local moderation: injected failure'));
    return { userAttack: userPrompt ? isJailbreak(userPrompt) : false, documentAttack: documents.some((d) => isDocumentAttack(d)) };
  }

  /**
   * The stand-in cannot see pictures. It flags only images carrying the test marker
   * LOCAL_UNSAFE_IMAGE_MARKER (fixtures); real image classification is Content Safety's.
   */
  async analyzeImage(image: Buffer): Promise<TextAnalysis> {
    if (this.failing) throw new ModerationUnavailableError(new Error('local moderation: injected failure'));
    const flagged = image.includes(LOCAL_UNSAFE_IMAGE_MARKER);
    return { severities: { hate: 0, sexual: flagged ? 6 : 0, self_harm: 0, violence: 0 } };
  }
}

/** Test fixtures embed this in an image to simulate an unsafe picture for the local stand-in. */
export const LOCAL_UNSAFE_IMAGE_MARKER = 'SOYL-TEST-UNSAFE-IMAGE';

/** Content Safety analyses images up to 4 MB; larger photos are refused (the web compresses first). */
export const CONTENT_SAFETY_IMAGE_MAX_BYTES = 4 * 1024 * 1024;

export class FailingModerationProvider implements ModerationProvider {
  readonly name = 'disabled';
  readonly isStandIn = false;
  async analyzeText(): Promise<TextAnalysis> {
    throw new ModerationUnavailableError(new Error('content safety is not configured'));
  }
  async shieldPrompt(): Promise<ShieldResult> {
    throw new ModerationUnavailableError(new Error('content safety is not configured'));
  }
  async analyzeImage(): Promise<TextAnalysis> {
    throw new ModerationUnavailableError(new Error('content safety is not configured'));
  }
}

const CATEGORY: Record<string, HarmCategory> = { Hate: 'hate', SelfHarm: 'self_harm', Sexual: 'sexual', Violence: 'violence' };

export interface AzureContentSafetyOptions {
  endpoint: string;
  credential: TokenCredentialLike;
  fetch?: typeof fetch;
  timeoutMs?: number;
}

export class AzureContentSafetyProvider implements ModerationProvider {
  readonly name = 'azure-content-safety';
  readonly isStandIn = false;
  private readonly base: string;
  private readonly fetchImpl: typeof fetch;

  constructor(private readonly opts: AzureContentSafetyOptions) {
    if (!/^https:\/\//.test(opts.endpoint)) throw new Error('AzureContentSafetyProvider: endpoint must be https');
    this.base = opts.endpoint.replace(/\/+$/, '');
    this.fetchImpl = opts.fetch ?? globalThis.fetch;
  }

  private async post<T>(path: string, body: unknown): Promise<T> {
    try {
      const token = await this.opts.credential.getToken(CONTENT_SAFETY_SCOPE);
      if (!token) throw new Error('no token');
      const res = await this.fetchImpl(`${this.base}/contentsafety/${path}?api-version=${CONTENT_SAFETY_API_VERSION}`, {
        method: 'POST',
        headers: { authorization: `Bearer ${token.token}`, 'content-type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.opts.timeoutMs ?? 5_000),
      });
      if (!res.ok) throw new Error(`Content Safety ${path} → HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (error) {
      throw new ModerationUnavailableError(error);
    }
  }

  async analyzeText(text: string): Promise<TextAnalysis> {
    const severities: Record<HarmCategory, number> = { hate: 0, sexual: 0, self_harm: 0, violence: 0 };
    const slices = text.length ? Array.from({ length: Math.ceil(text.length / MAX_TEXT) }, (_, i) => text.slice(i * MAX_TEXT, (i + 1) * MAX_TEXT)) : [];
    for (const slice of slices) {
      const r = await this.post<{ categoriesAnalysis?: { category: string; severity?: number }[] }>('text:analyze', {
        text: slice,
        categories: ['Hate', 'SelfHarm', 'Sexual', 'Violence'],
        outputType: 'FourSeverityLevels',
      });
      for (const c of r.categoriesAnalysis ?? []) {
        const k = CATEGORY[c.category];
        if (k) severities[k] = Math.max(severities[k], c.severity ?? 0);
      }
    }
    return { severities };
  }

  async analyzeImage(image: Buffer): Promise<TextAnalysis> {
    if (image.length > CONTENT_SAFETY_IMAGE_MAX_BYTES) throw new ModerationUnavailableError(new Error('image larger than Content Safety accepts'));
    const r = await this.post<{ categoriesAnalysis?: { category: string; severity?: number }[] }>('image:analyze', {
      image: { content: image.toString('base64') },
      categories: ['Hate', 'SelfHarm', 'Sexual', 'Violence'],
      outputType: 'FourSeverityLevels',
    });
    const severities: Record<HarmCategory, number> = { hate: 0, sexual: 0, self_harm: 0, violence: 0 };
    for (const c of r.categoriesAnalysis ?? []) {
      const k = CATEGORY[c.category];
      if (k) severities[k] = Math.max(severities[k], c.severity ?? 0);
    }
    return { severities };
  }

  async shieldPrompt(userPrompt: string, documents: string[]): Promise<ShieldResult> {
    const r = await this.post<{ userPromptAnalysis?: { attackDetected?: boolean }; documentsAnalysis?: { attackDetected?: boolean }[] }>('text:shieldPrompt', {
      userPrompt: userPrompt.slice(0, MAX_SHIELD_CHARS),
      documents: documents.map((d) => d.slice(0, MAX_SHIELD_CHARS)),
    });
    return { userAttack: !!r.userPromptAnalysis?.attackDetected, documentAttack: (r.documentsAnalysis ?? []).some((d) => !!d.attackDetected) };
  }
}
