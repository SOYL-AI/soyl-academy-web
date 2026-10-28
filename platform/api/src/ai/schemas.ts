/** Request/response schemas of the AI gateway routes (API-8 strict requests, API-9 response allowlists). */
import { z } from 'zod/v4';
import { AI_ACTION_IDS, AI_UPLOADS } from '@soyl/shared/config/ai-actions';
import { MODEL_TIERS } from '@soyl/shared/config/models';
import { CREDIT_BONUS_KINDS, CREDIT_HISTORY } from '@soyl/shared/config/credit-bonuses';
import { PlanId } from '@soyl/shared/config/plans';

const ChapterKey = z.string().max(100).regex(/^[a-z]+-\d+-[a-z0-9-]+-ch\d{2}$/);
const SubjectKey = z.string().max(80).regex(/^[a-z]+-\d+-[a-z0-9-]+$/);

export const AiActionParam = z.strictObject({ action: z.enum(AI_ACTION_IDS) });

export const AiActionRequest = z
  .strictObject({
    /** The student's question (doubts), or an optional note (photo doubt, explain slide). */
    message: z.string().max(2_000).optional(),
    /** The student's own working: unlocks the full solution (hint first). */
    attempt: z.string().max(2_000).optional(),
    /** "Show me the full solution" after a hint in the same conversation. */
    reveal: z.boolean().optional(),
    conversationId: z.uuid().optional(),
    chapterId: ChapterKey.optional(),
    /** explain-slide: the slide (part 0 = single-deck chapter). */
    slide: z.strictObject({ part: z.number().int().min(0).max(20).optional(), slideId: z.string().regex(/^s\d{2}$/) }).optional(),
    /** photo-doubt / paper-from-upload: a processed upload of yours. */
    uploadId: z.uuid().optional(),
    /** paper-from-upload: the subject to build the paper from. */
    subjectId: SubjectKey.optional(),
    /** evaluate-answer / evaluate-paper. */
    attemptId: z.uuid().optional(),
    itemIds: z.array(z.uuid()).min(1).max(60).optional(),
  })
  .meta({ id: 'AiActionRequest' });

export const AiStreamResponse = z.string().meta({
  description:
    'text/event-stream. Events: `meta` {requestId, conversationId, action, credits, balance, tier, degraded, mode: hint|full|explain, language: english|hinglish|hindi}; `delta` {text} (moderated chunks, Markdown); `refusal` {kind: unsafe|off_topic|self_harm|output_blocked, message, creditsRefunded, balance}; `error` {code: ai_unavailable|ai_failed|ai_interrupted, message, creditsRefunded|creditsCharged, balance}; `done` {status, creditsCharged, balance, sources?}.',
});

export const AiJobAccepted = z
  .object({
    jobId: z.uuid(),
    status: z.literal('queued'),
    action: z.enum(AI_ACTION_IDS),
    credits: z.number().int(),
    balance: z.number().int(),
    answers: z.number().int().optional(),
    skipped: z.array(z.object({ itemId: z.uuid(), reason: z.enum(['not_written', 'unanswered', 'already_evaluated']) })).optional(),
  })
  .meta({ id: 'AiJobAccepted', description: 'Poll GET /v1/ai/jobs/:id.' });

export const AiJobView = z
  .object({
    id: z.uuid(),
    kind: z.enum(['evaluation', 'paper_from_upload']),
    action: z.string().nullable(),
    status: z.enum(['queued', 'running', 'succeeded', 'failed']),
    result: z.record(z.string(), z.unknown()).nullable(),
    error: z.string().nullable(),
    createdAt: z.iso.datetime(),
    finishedAt: z.iso.datetime().nullable(),
  })
  .meta({
    id: 'AiJob',
    description:
      'evaluation result: {attemptId, evaluated[], notEvaluated[{itemId, reason}], creditsCharged, creditsRefunded, countsForRanks:false}. paper_from_upload result: {blueprint {durationMin, totalMarks, sections[{id, questionType, count, marksEach, internalChoice}], chapterIds}, testId, skippedChapters, creditsCharged}.',
  });

export const IdParam = z.strictObject({ id: z.uuid() });

export const CreditsResponse = z
  .object({
    plan: z.string(),
    planName: z.string(),
    dailyCredits: z.number().int(),
    balance: z.number().int(),
    grantedToday: z.number().int(),
    /** D-044 bonus credits earned today (daily practice goal, streak milestone); included in `balance`; lapse at 00:00 IST. */
    bonusToday: z.number().int(),
    reservedNow: z.number().int(),
    spentToday: z.number().int(),
    day: z.string(),
    resetAt: z.iso.datetime(),
    resetInSeconds: z.number().int(),
    plansUrl: z.string(),
    prices: z.array(
      z.object({
        action: z.enum(AI_ACTION_IDS),
        label: z.string(),
        credits: z.number().int(),
        perAnswer: z.boolean(),
        maxCredits: z.number().int(),
        allowedForPlan: z.boolean(),
      }),
    ),
  })
  .meta({ id: 'Credits', description: 'Today’s AI credits (1 credit = ₹0.10 of AI). Resets at 00:00 IST; no rollover.' });

export const LedgerQuery = z.strictObject({ cursor: z.uuid().optional(), limit: z.coerce.number().int().min(1).max(100).default(30) });

export const LedgerResponse = z
  .object({
    entries: z.array(
      z.object({
        id: z.uuid(),
        /** bonus_goal / bonus_streak: D-044 bonus credits for learning (same IST day only). */
        kind: z.enum(['grant', 'reserve', 'charge', 'refund', 'expire', ...CREDIT_BONUS_KINDS]),
        /** Signed change in credits. A charge returns unused credits (usually 0); the spend is its reserve. */
        amount: z.number().int(),
        action: z.string(),
        label: z.string(),
        day: z.string(),
        createdAt: z.iso.datetime(),
      }),
    ),
    nextCursor: z.uuid().nullable(),
  })
  .meta({ id: 'CreditLedger' });

export const CreditBonusKindSchema = z.enum(CREDIT_BONUS_KINDS).meta({ id: 'CreditBonusKind' });

/** A D-044 bonus just granted (practice answer / self-mark responses), for a "+10 credits" toast. */
export const CreditBonusAwardSchema = z
  .object({ kind: CreditBonusKindSchema, credits: z.number().int(), label: z.string() })
  .meta({ id: 'CreditBonusAward', description: 'Bonus AI credits for learning (D-044): usable today only (they lapse at 00:00 IST). Consent-granted accounts only.' });

export const CreditGuideResponse = z
  .object({
    plan: PlanId,
    planName: z.string(),
    dailyCredits: z.number().int(),
    balance: z.number().int(),
    bonusToday: z.number().int(),
    /** 1 credit = this many paise of AI budget (₹0.10). */
    creditValuePaise: z.number().int(),
    day: z.iso.date(),
    resetAt: z.iso.datetime(),
    resetInSeconds: z.number().int(),
    plansUrl: z.string(),
    /** Every plan in display order (for the "which plan has it" columns). */
    plans: z.array(z.object({ id: PlanId, name: z.string(), creditsPerDay: z.number().int() })),
    actions: z.array(
      z.object({
        action: z.enum(AI_ACTION_IDS),
        label: z.string(),
        /** One student-facing line: what the action does. */
        guide: z.string(),
        /** Price of one action (per answer for evaluations). */
        credits: z.number().int(),
        perAnswer: z.boolean(),
        maxCredits: z.number().int(),
        mode: z.enum(['stream', 'job']),
        requiresUpload: z.boolean(),
        allowedForPlan: z.boolean(),
        /** Whole actions today's balance still pays for ("≈ 7 hard doubts left today"); 0 when the plan lacks it. */
        remainingToday: z.number().int(),
        /** Per plan that offers the action: how many its daily credits pay for. */
        perDay: z.array(z.object({ plan: PlanId, count: z.number().int() })),
      }),
    ),
    /** D-044 learning bonuses; null unless consent is granted (then nothing is earned or shown). */
    bonuses: z
      .object({
        dailyGoal: z.object({ credits: z.number().int(), target: z.number().int(), solvedToday: z.number().int(), earnedToday: z.boolean() }),
        streakMilestone: z.object({ credits: z.number().int(), everyDays: z.number().int(), currentStreak: z.number().int(), nextMilestone: z.number().int(), earnedToday: z.boolean() }),
      })
      .nullable(),
  })
  .meta({ id: 'CreditGuide', description: 'What you can do with your credits today (D-044). Prices and plans are config; counts use today’s balance.' });

export const CreditHistoryQuery = z.strictObject({ days: z.coerce.number().int().min(1).max(CREDIT_HISTORY.maxDays).default(CREDIT_HISTORY.defaultDays) });

export const CreditHistoryResponse = z
  .object({
    timezone: z.literal('Asia/Kolkata'),
    from: z.iso.date(),
    to: z.iso.date(),
    days: z.array(
      z.object({
        day: z.iso.date(),
        /** Daily grant and plan top-ups. */
        granted: z.number().int(),
        /** D-044 bonus credits for learning. */
        bonus: z.number().int(),
        /** Credits actually used by AI actions (refunds and unused per-answer credits excluded). */
        spent: z.number().int(),
        /** Credits returned for failed or blocked actions. */
        refunded: z.number().int(),
        /** Reservations still open (today only, normally 0). */
        held: z.number().int(),
        /** The day's remaining balance: lapsed at its 00:00 IST reset (today: still usable). */
        left: z.number().int(),
      }),
    ),
  })
  .meta({ id: 'CreditHistory', description: 'Per-IST-day credit usage, oldest first, every day of the window present (zeros when nothing happened).' });

export const QuoteQuery = z.strictObject({ attemptId: z.uuid().optional(), answers: z.coerce.number().int().min(1).max(60).optional() });

export const QuoteResponse = z
  .object({
    action: z.enum(AI_ACTION_IDS),
    label: z.string(),
    credits: z.number().int(),
    perAnswer: z.boolean(),
    answers: z.number().int().nullable(),
    maxCredits: z.number().int(),
    tier: z.enum(MODEL_TIERS),
    mode: z.enum(['stream', 'job']),
    requiresUpload: z.boolean(),
    plan: z.string(),
    allowedForPlan: z.boolean(),
    balance: z.number().int(),
    affordable: z.boolean(),
    /** available | degraded (smaller model) | paused (spend breaker until 00:00 IST). */
    status: z.enum(['available', 'degraded', 'paused']),
    resetAt: z.iso.datetime(),
    resetInSeconds: z.number().int(),
    plansUrl: z.string(),
  })
  .meta({ id: 'AiQuote', description: 'Show the cost before the student confirms (CONTEXT §6).' });

export const UploadCreateRequest = z
  .strictObject({
    kind: z.enum(['photo_doubt', 'sample_paper']),
    contentType: z.enum(AI_UPLOADS.contentTypes),
    bytes: z.number().int().min(1).max(AI_UPLOADS.maxBytes),
  })
  .meta({ id: 'AiUploadRequest' });

export const UploadCreated = z
  .object({
    uploadId: z.uuid(),
    uploadUrl: z.string(),
    method: z.literal('PUT'),
    headers: z.record(z.string(), z.string()),
    uploadExpiresAt: z.iso.datetime(),
    maxBytes: z.number().int(),
    expiresAt: z.iso.datetime(),
  })
  .meta({ id: 'AiUploadTarget', description: 'PUT the file to uploadUrl with these headers within uploadExpiresAt, then POST /v1/ai/uploads/:id/complete.' });

export const UploadView = z
  .object({
    id: z.uuid(),
    kind: z.enum(['photo_doubt', 'sample_paper', 'answer_sheet']),
    status: z.enum(['pending_upload', 'uploaded', 'scanning', 'ready', 'rejected']),
    rejectReason: z.string().nullable(),
    contentType: z.string(),
    bytes: z.number().int().nullable(),
    pages: z.number().int().nullable(),
    expiresAt: z.iso.datetime(),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'AiUpload' });

export const ConversationKind = z.enum(['tutor', 'photo_doubt', 'explain_slide', 'evaluation', 'paper_from_upload']);

export const ConversationCreateRequest = z
  .strictObject({ kind: ConversationKind.default('tutor'), chapterId: ChapterKey.optional(), title: z.string().trim().min(1).max(80).optional() })
  .meta({ id: 'AiConversationCreate' });

export const ConversationSummary = z
  .object({
    id: z.uuid(),
    kind: ConversationKind,
    chapterId: z.string().nullable(),
    title: z.string().nullable(),
    lastMessageAt: z.iso.datetime().nullable(),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'AiConversation' });

export const ConversationList = z.object({ conversations: z.array(ConversationSummary), nextCursor: z.uuid().nullable() }).meta({ id: 'AiConversations' });

export const ConversationDetail = z
  .object({
    conversation: ConversationSummary,
    messages: z.array(z.object({ id: z.uuid(), role: z.enum(['user', 'assistant']), content: z.string(), createdAt: z.iso.datetime() })),
  })
  .meta({ id: 'AiConversationDetail', description: 'Messages are kept for 30 days.' });

export const AiEvaluationRequest = z.strictObject({ itemIds: z.array(z.uuid()).min(1).max(60).optional() }).meta({ id: 'AiEvaluationRequest' });

export const AiEvaluationView = z
  .object({
    attemptId: z.uuid(),
    items: z.array(
      z.object({
        itemId: z.uuid(),
        marks: z.number(),
        maxMarks: z.number(),
        confidence: z.number(),
        lowConfidence: z.boolean(),
        /** "AI-graded" or, below 0.6 confidence, "AI-graded — check with your teacher". */
        label: z.string(),
        steps: z.array(z.object({ part: z.string().nullable(), index: z.number().int(), step: z.string(), awarded: z.number(), max: z.number(), reason: z.string() })),
        feedback: z.string(),
        evaluatedAt: z.iso.datetime(),
      }),
    ),
    totalMarks: z.number(),
    maxMarks: z.number(),
    /** Always false: AI marks never feed scores, percentiles, ranks or leaderboards (F-028). */
    countsForRanks: z.literal(false),
    job: z.object({ id: z.uuid(), status: z.string() }).nullable(),
  })
  .meta({ id: 'AiEvaluation' });
