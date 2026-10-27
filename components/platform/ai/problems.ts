/**
 * AI gateway problem codes → what the page does (ai-gateway M4 handoff "What web needs" §6; D-014).
 * Never shows server error text: every message here is ours.
 */
import { isApiError, type ApiError, type Problem } from '@/platform/shared/api-client';

export type AiBlock =
  | { kind: 'paywall'; balance: number | null; required: number | null; resetAt: string | null; resetInSeconds: number | null; plansUrl: string }
  | { kind: 'plan'; plan: string | null; plansUrl: string }
  | { kind: 'consent' }
  | { kind: 'paused'; retryAfterSeconds: number | null }
  | { kind: 'unavailable' }
  | { kind: 'busy' }
  | { kind: 'during-test' }
  | { kind: 'login' }
  | { kind: 'other'; message: string };

/** Only our own pages: a same-origin path from the API's plansUrl, else /plans. */
export function safePlansPath(raw: string | null | undefined): string {
  if (!raw) return '/plans';
  try {
    const base = typeof window === 'undefined' ? 'http://localhost' : window.location.origin;
    const u = new URL(raw, base);
    if ((u.origin === base || /(^|\.)soylai\.com$/.test(u.hostname)) && u.pathname.startsWith('/plans')) return u.pathname;
  } catch {
    // ignore
  }
  return '/plans';
}

function num(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

export function aiBlockFrom(err: unknown): AiBlock {
  if (!isApiError(err)) return { kind: 'other', message: 'Something went wrong. Please try again.' };
  const p: Partial<Problem> = (err as ApiError).problem ?? {};
  switch (err.code) {
    case 'credits_exhausted':
      return { kind: 'paywall', balance: num(p.balance), required: num(p.required), resetAt: p.resetAt ?? null, resetInSeconds: num(p.resetInSeconds), plansUrl: safePlansPath(p.plansUrl) };
    case 'plan_required':
      return { kind: 'plan', plan: p.plan ?? null, plansUrl: safePlansPath(p.plansUrl) };
    case 'consent_required':
    case 'consent_unavailable':
      return { kind: 'consent' };
    case 'ai_paused':
      return { kind: 'paused', retryAfterSeconds: err.retryAfterSeconds ?? null };
    case 'ai_unavailable':
      return { kind: 'unavailable' };
    case 'ai_busy':
    case 'rate_limited':
      return { kind: 'busy' };
    case 'ai_blocked_during_test':
      return { kind: 'during-test' };
    case 'unauthenticated':
      return { kind: 'login' };
    default:
      return { kind: 'other', message: aiMessage(err) };
  }
}

export function aiMessage(err: unknown): string {
  if (!isApiError(err)) return 'Something went wrong. Please try again.';
  switch (err.code) {
    case 'validation_failed': {
      const first = err.problem?.errors?.[0];
      if (first?.path === 'body.message') return 'Type your question first (up to 2,000 characters).';
      if (first?.path === 'body.uploadId') return 'Add a photo of the question first.';
      return 'Please check what you entered.';
    }
    case 'duplicate_request':
      return 'That request is already being answered.';
    case 'upload_rejected':
      return 'We could not use that file. Try a clear photo (JPEG or PNG) under 10 MB.';
    case 'upload_not_ready':
      return 'Your photo is still uploading. Please wait a moment.';
    case 'network_error':
    case 'upstream_unavailable':
    case 'upstream_timeout':
      return 'We could not reach SOYL Academy. Check your connection and try again.';
    case 'not_found':
      return 'We could not find that. It may have expired (AI chats are kept for 30 days).';
    default:
      return err.status >= 500 ? 'The AI helper is having trouble. Please try again in a minute.' : 'Something went wrong. Please try again.';
  }
}

/** Upload rejection reasons (ai-gateway M4 handoff §7) → plain words. */
export const UPLOAD_REJECT_TEXT: Record<string, string> = {
  unsupported_type: 'That file type is not supported. Use a JPEG, PNG or WebP photo (or a PDF for sample papers).',
  type_mismatch: 'That file is not what its name says. Try taking the photo again.',
  too_large: 'That file is too large (10 MB at most).',
  too_many_pixels: 'That image is too large. Try a normal phone photo.',
  too_many_pages: 'That PDF has too many pages (10 at most).',
  unsafe_pdf: 'That PDF cannot be used. Try a photo of the page instead.',
  corrupt: 'That file seems to be damaged. Try again.',
  empty: 'That file is empty.',
  unsafe_content: 'That image cannot be used. Please send only a photo of your question.',
  image_too_large_to_check: 'That image is too large to check. Try again: we will make it smaller first.',
  processing_failed: 'We could not process that file. Please try again later.',
};

/** Credits as words: "1 credit", "6 credits". */
export function creditsText(n: number): string {
  return `${n} credit${n === 1 ? '' : 's'}`;
}

/** A fresh Idempotency-Key per question (reused on retry). */
export function newIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  return `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}
