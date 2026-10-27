import type { ChatMessage } from './types';

/**
 * Cheap token estimate without a tokenizer dependency. o200k-style tokenizers average about
 * 4 characters per token for English and JSON, and far fewer for Indic scripts; we count
 * Latin-ish characters at 4 per token and everything else at 1.5 per token (conservative).
 * Used for dry-run estimates, budget reservations and the mock provider's usage.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  let ascii = 0;
  let other = 0;
  for (const ch of text) {
    if (ch.codePointAt(0)! < 0x250) ascii++;
    else other++;
  }
  return Math.ceil(ascii / 4 + other / 1.5);
}

/** Per-message overhead of the chat format (role markers etc.). */
const MESSAGE_OVERHEAD = 4;

/**
 * Vision inputs: a high-detail image costs about 85 + 170 per 512 px tile; a phone photo resized to
 * 2048 × 1536 is 12 tiles ≈ 2,125 tokens. We assume that worst case for estimates. A PDF page is
 * sent as text + an image, so a document counts as one image per page (estimated from its size).
 */
export const IMAGE_TOKENS_ESTIMATE = 2_125;
export const FILE_PAGE_TOKENS_ESTIMATE = 2_600;

export function estimateMessagesTokens(messages: ChatMessage[]): number {
  return messages.reduce((sum, m) => {
    const images = (m.images?.length ?? 0) * IMAGE_TOKENS_ESTIMATE;
    // ~ 4 / 3 base64 bytes per byte; assume ~ 100 KB per PDF page.
    const files = (m.files ?? []).reduce((n, f) => n + Math.max(1, Math.ceil((f.dataUrl.length * 0.75) / 100_000)) * FILE_PAGE_TOKENS_ESTIMATE, 0);
    return sum + estimateTokens(m.content) + images + files + MESSAGE_OVERHEAD;
  }, 3);
}
