/**
 * AI action registry (ARCHITECTURE §10, CONTEXT §6). Every AI feature is one action here: its model
 * tier, prompt template, token caps, reasoning effort, credit price, the plans that may use it and its
 * moderation policy. The gateway (platform/api/src/ai) reads nothing else, so prices, caps and tiers
 * are config changes, never code changes.
 *
 * Credits: 1 credit = ₹0.10 (credits.ts). The prices below are CONTEXT §6 "initial values"; the
 * `estCostPaise` column is CONTEXT's estimated real cost, used only for documentation and the
 * 7-day cost guardrail report (the guardrail itself uses metered cost).
 *
 * Dependency-free (type-only imports) so the web can import it for the "costs N credits" labels.
 */
import type { ModelTier } from './models';
import type { PlanId } from './plans';

export const AI_ACTION_IDS = [
  'quick-doubt',
  'explain-slide',
  'hard-doubt',
  'photo-doubt',
  'evaluate-answer',
  'evaluate-paper',
  'paper-from-upload',
] as const;
export type AiActionId = (typeof AI_ACTION_IDS)[number];

/** Prompt templates (platform/api/src/ai/prompts.ts). Each has a fixed system prefix (prompt-cache friendly). */
export type AiTemplate = 'tutor' | 'tutor-steps' | 'explain-slide' | 'photo-doubt' | 'evaluate-answer' | 'paper-blueprint';

export type AiReasoningEffort = 'minimal' | 'low' | 'medium' | 'high';

/**
 * How the student's text and the model's output are checked (AC-13..AC-15, F-027).
 * - input/output: Content Safety (Azure) or the local rule set, blocking at low severity for sexual
 *   and self-harm content (minors' audience) and at medium for hate/violence.
 * - promptShields: Prompt Shields on the student's own text (jailbreak / direct injection).
 * - documentShields: Prompt Shields document-attack detection on text taken from uploads or answers.
 * - topicGuard: refuse clearly off-topic requests (dating, gambling, hacking, …) before any model call.
 * - outputChunkChars: streamed output is moderated in chunks of about this size before it is shown.
 */
export interface AiModerationPolicy {
  input: 'strict';
  output: 'strict' | 'none';
  promptShields: boolean;
  documentShields: boolean;
  topicGuard: boolean;
  outputChunkChars: number;
}

export type AiPricing =
  | { kind: 'flat'; credits: number }
  /** AI evaluation: one price per written answer evaluated, capped per request. */
  | { kind: 'per_answer'; creditsPerAnswer: number; maxCredits: number };

/** Conversation kinds (db ai_conversations.kind). */
export type AiConversationKind = 'tutor' | 'photo_doubt' | 'explain_slide' | 'evaluation' | 'paper_from_upload';

export interface AiActionConfig {
  id: AiActionId;
  /** Student-facing name. */
  label: string;
  tier: ModelTier;
  /** Needs an image/PDF input (photo doubt, paper from upload). */
  vision: boolean;
  /** `stream`: SSE answer (tutor). `job`: queued, polled with GET /v1/ai/jobs/:id (evaluation, paper). */
  mode: 'stream' | 'job';
  template: AiTemplate;
  pricing: AiPricing;
  /** Documentation: CONTEXT §6 estimated real cost per request (paise). */
  estCostPaise: number;
  /** Hard caps (AC-06): characters of student text, prompt tokens (incl. retrieval) and output tokens. */
  maxInputChars: number;
  maxInputTokens: number;
  maxOutputTokens: number;
  reasoningEffort: AiReasoningEffort;
  /** Plans allowed to use the action (`free` = every signed-in student with consent). */
  plans: readonly PlanId[];
  moderation: AiModerationPolicy;
  /** Spend breaker "degraded" state (ARCHITECTURE §10): run on this tier instead; null = pause the action. */
  degradeTo: ModelTier | null;
  /** Tutor grounding: retrieve this many chunks of our published content (0 = no retrieval). */
  retrievalK: number;
  conversationKind: AiConversationKind;
  /** Upload kinds the action accepts (db uploads.kind); empty = no upload. */
  uploadKinds: readonly ('photo_doubt' | 'sample_paper' | 'answer_sheet')[];
  /** A reservation left open longer than this is refunded by the sweeper (AC-08). Must exceed the action's max run time. */
  reservationTtlSeconds: number;
}

const ALL_PLANS: readonly PlanId[] = ['free', 'plus', 'pro', 'board_exam_pass'];
const PAID_PLANS: readonly PlanId[] = ['plus', 'pro', 'board_exam_pass'];

const CHAT_MODERATION: AiModerationPolicy = {
  input: 'strict',
  output: 'strict',
  promptShields: true,
  documentShields: false,
  topicGuard: true,
  outputChunkChars: 400,
};

const DOCUMENT_MODERATION: AiModerationPolicy = { ...CHAT_MODERATION, documentShields: true };

/** Structured outputs (marks, blueprints) are validated by schema; their free text is still moderated. */
const STRUCTURED_MODERATION: AiModerationPolicy = { ...CHAT_MODERATION, documentShields: true, topicGuard: false };

export const AI_ACTIONS: Record<AiActionId, AiActionConfig> = {
  'quick-doubt': {
    id: 'quick-doubt',
    label: 'Quick doubt',
    tier: 'small',
    vision: false,
    mode: 'stream',
    template: 'tutor',
    pricing: { kind: 'flat', credits: 1 },
    estCostPaise: 3,
    maxInputChars: 1_000,
    maxInputTokens: 2_500,
    maxOutputTokens: 600,
    reasoningEffort: 'minimal',
    plans: ALL_PLANS,
    moderation: CHAT_MODERATION,
    degradeTo: 'small',
    retrievalK: 4,
    conversationKind: 'tutor',
    uploadKinds: [],
    reservationTtlSeconds: 15 * 60,
  },
  'explain-slide': {
    id: 'explain-slide',
    label: 'Explain this slide',
    tier: 'small',
    vision: false,
    mode: 'stream',
    template: 'explain-slide',
    pricing: { kind: 'flat', credits: 1 },
    estCostPaise: 3,
    maxInputChars: 500,
    maxInputTokens: 2_500,
    maxOutputTokens: 600,
    reasoningEffort: 'minimal',
    plans: ALL_PLANS,
    moderation: CHAT_MODERATION,
    degradeTo: 'small',
    retrievalK: 2,
    conversationKind: 'explain_slide',
    uploadKinds: [],
    reservationTtlSeconds: 15 * 60,
  },
  'hard-doubt': {
    id: 'hard-doubt',
    label: 'Step-by-step doubt',
    tier: 'mid',
    vision: false,
    mode: 'stream',
    template: 'tutor-steps',
    pricing: { kind: 'flat', credits: 6 },
    estCostPaise: 53,
    maxInputChars: 2_000,
    maxInputTokens: 4_000,
    maxOutputTokens: 1_500,
    reasoningEffort: 'low',
    plans: ALL_PLANS,
    moderation: CHAT_MODERATION,
    degradeTo: 'small',
    retrievalK: 5,
    conversationKind: 'tutor',
    uploadKinds: [],
    reservationTtlSeconds: 15 * 60,
  },
  'photo-doubt': {
    id: 'photo-doubt',
    label: 'Photo doubt',
    tier: 'mid',
    vision: true,
    mode: 'stream',
    template: 'photo-doubt',
    pricing: { kind: 'flat', credits: 10 },
    estCostPaise: 89,
    maxInputChars: 1_000,
    maxInputTokens: 6_000,
    maxOutputTokens: 1_500,
    reasoningEffort: 'low',
    plans: ALL_PLANS,
    moderation: DOCUMENT_MODERATION,
    // Vision needs the mid model; under budget pressure the action pauses rather than guessing.
    degradeTo: null,
    retrievalK: 4,
    conversationKind: 'photo_doubt',
    uploadKinds: ['photo_doubt'],
    reservationTtlSeconds: 15 * 60,
  },
  'evaluate-answer': {
    id: 'evaluate-answer',
    label: 'AI evaluation of an answer',
    tier: 'mid',
    vision: false,
    mode: 'job',
    template: 'evaluate-answer',
    pricing: { kind: 'per_answer', creditsPerAnswer: 6, maxCredits: 6 },
    estCostPaise: 56,
    maxInputChars: 6_000,
    maxInputTokens: 5_000,
    maxOutputTokens: 1_200,
    reasoningEffort: 'low',
    plans: ALL_PLANS,
    moderation: STRUCTURED_MODERATION,
    degradeTo: null,
    retrievalK: 0,
    conversationKind: 'evaluation',
    uploadKinds: [],
    reservationTtlSeconds: 60 * 60,
  },
  'evaluate-paper': {
    id: 'evaluate-paper',
    label: 'AI evaluation of a full paper',
    tier: 'mid',
    vision: false,
    mode: 'job',
    template: 'evaluate-answer',
    pricing: { kind: 'per_answer', creditsPerAnswer: 6, maxCredits: 40 },
    estCostPaise: 56,
    maxInputChars: 6_000,
    maxInputTokens: 5_000,
    maxOutputTokens: 1_200,
    reasoningEffort: 'low',
    plans: ALL_PLANS,
    moderation: STRUCTURED_MODERATION,
    degradeTo: null,
    retrievalK: 0,
    conversationKind: 'evaluation',
    uploadKinds: [],
    reservationTtlSeconds: 2 * 60 * 60,
  },
  'paper-from-upload': {
    id: 'paper-from-upload',
    label: 'Papers like my school’s',
    tier: 'mid',
    vision: true,
    mode: 'job',
    template: 'paper-blueprint',
    pricing: { kind: 'flat', credits: 60 },
    estCostPaise: 610,
    maxInputChars: 500,
    maxInputTokens: 20_000,
    maxOutputTokens: 4_000,
    reasoningEffort: 'medium',
    plans: PAID_PLANS,
    moderation: STRUCTURED_MODERATION,
    degradeTo: null,
    retrievalK: 0,
    conversationKind: 'paper_from_upload',
    uploadKinds: ['sample_paper'],
    reservationTtlSeconds: 2 * 60 * 60,
  },
};

export function isAiActionId(id: string): id is AiActionId {
  return (AI_ACTION_IDS as readonly string[]).includes(id);
}

/**
 * Credits for an action. Per-answer actions take the number of answers (≥ 1) and are capped at
 * `maxCredits` (CONTEXT §6: full paper "per answer, capped", max 40).
 */
export function quoteCredits(action: AiActionConfig, answers = 1): number {
  if (action.pricing.kind === 'flat') return action.pricing.credits;
  const n = Math.max(1, Math.floor(answers));
  return Math.min(action.pricing.maxCredits, n * action.pricing.creditsPerAnswer);
}

/* ------------------------------------------------------------------------------------------------
 * Uploads (ARCHITECTURE §10, AC-16, F-013, ASVS 5.1.1)
 * ---------------------------------------------------------------------------------------------- */

export const AI_UPLOADS = {
  maxBytes: 10 * 1024 * 1024,
  /** Decompression-bomb guard: decoded pixels (width × height) per image. */
  maxPixels: 40_000_000,
  maxPdfPages: 10,
  /** Images and PDF only. SVG is never accepted. HEIC is refused until a decoder is deployed (handoff). */
  contentTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] as const,
  /** Write-only SAS lifetime (AC-16: ≤ 5 min). */
  sasTtlSeconds: 5 * 60,
  /** Uploads and their derivatives are deleted after this many days. */
  retentionDays: 30,
  /** Read SAS for showing an upload back to its owner (attachment, nosniff). */
  readSasTtlSeconds: 5 * 60,
  containers: { quarantine: 'uploads-quarantine', clean: 'uploads' },
} as const;
export type AiUploadContentType = (typeof AI_UPLOADS.contentTypes)[number];
