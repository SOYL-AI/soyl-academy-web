/**
 * Moderation interfaces (CONTEXT §12, AC-13..AC-15, F-027; ADR-015).
 *
 * Two providers implement `ModerationProvider`:
 * - AzureContentSafetyProvider: Azure AI Content Safety text analysis + Prompt Shields, keyless.
 * - LocalRuleModerationProvider: a deterministic rule set (English, Hindi, Hinglish) for local
 *   development, tests and CI. It is a stand-in, refused in production (GEN-3).
 *
 * Fail closed (API-16, F-027): a provider that cannot answer throws ModerationUnavailableError and the
 * gateway refuses the AI request with 503 (credits refunded). Nothing is ever shown unmoderated.
 */

/** Content Safety harm categories, severity 0..7 (FourSeverityLevels returns 0, 2, 4, 6). */
export type HarmCategory = 'hate' | 'sexual' | 'self_harm' | 'violence';

export interface TextAnalysis {
  severities: Record<HarmCategory, number>;
}

export interface ShieldResult {
  /** Jailbreak / direct prompt injection in the student's own text. */
  userAttack: boolean;
  /** Indirect injection in a document (upload text, an answer being evaluated). */
  documentAttack: boolean;
}

export interface ModerationProvider {
  readonly name: string;
  readonly isStandIn: boolean;
  analyzeText(text: string): Promise<TextAnalysis>;
  shieldPrompt(userPrompt: string, documents: string[]): Promise<ShieldResult>;
}

export class ModerationUnavailableError extends Error {
  constructor(cause?: unknown) {
    super('moderation unavailable', { cause });
    this.name = 'ModerationUnavailableError';
  }
}

/** Why a text was refused (stored in ai_requests.moderation_flags; never the text itself). */
export type ModerationReason = HarmCategory | 'jailbreak' | 'document_attack' | 'off_topic';

export interface ModerationVerdict {
  blocked: boolean;
  reasons: ModerationReason[];
  severities: Partial<Record<HarmCategory, number>>;
  /** Self-harm signal: the student gets a supportive message with helplines (AC-15), and it is logged for review. */
  selfHarm: boolean;
  provider: string;
}

export const NO_SEVERITIES: Record<HarmCategory, number> = { hate: 0, sexual: 0, self_harm: 0, violence: 0 };
