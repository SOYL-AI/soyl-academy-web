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

export function estimateMessagesTokens(messages: ChatMessage[]): number {
  return messages.reduce((sum, m) => sum + estimateTokens(m.content) + MESSAGE_OVERHEAD, 3);
}
