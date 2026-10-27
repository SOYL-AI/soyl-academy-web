/**
 * Schemas for the test engine routes (ADR-012). Requests are strict (API-8); responses list every
 * field (API-9: serialisation strips the rest). Before submission no schema has a field that could
 * carry an answer, solution, marking scheme, rubric or correctness (contract test in tests.test.ts).
 */
import { z } from 'zod/v4';
import { QUESTION_TYPES } from '@soyl/shared/content/question';
import { TEST_ENGINE } from '@soyl/shared/config/tests';
import { BoardSchema } from '../schemas';
import { StreakSchema, StudentQuestionSchema } from './content-schemas';
import { KeyRevealSchema, PracticeResponseSchema } from './practice';

export const TestKey = z
  .string()
  .max(120)
  .regex(/^t_[a-z0-9_-]+$/)
  .meta({ id: 'TestId', description: 'Test id (TestDefinition.id), e.g. t_cbse10sci_ch01_short.' });
export const TestParams = z.strictObject({ id: TestKey });
export const AttemptParams = z.strictObject({ id: z.uuid() });
export const LiveEventParams = z.strictObject({ id: z.string().max(120).regex(/^live_[a-z0-9_-]+$/) });

const MyTestStatus = z
  .object({
    attempts: z.number().int(),
    bestScore: z.number().nullable(),
    lastScore: z.number().nullable(),
    maxScore: z.number().nullable(),
    activeAttemptId: z.uuid().nullable(),
    lastAttemptId: z.uuid().nullable(),
  })
  .meta({ id: 'MyTestStatus', description: 'Signed in only (null for guests): your attempts at this test, across its versions.' });

const SubjectRef = z.object({ id: z.string(), name: z.string(), board: z.string(), classLevel: z.number().int() });

const LivePhase = z
  .enum(['cancelled', 'upcoming', 'registration_open', 'live', 'writing', 'closed', 'results_published'])
  .meta({ id: 'LivePhase', description: 'live = you can start (until lateStartUntil); writing = running, no new starts; closed = awaiting final ranks.' });

export const LiveEventSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    phase: LivePhase,
    subject: z.object({ id: z.string(), name: z.string() }),
    testId: z.string(),
    durationMin: z.number().int(),
    totalMarks: z.number(),
    registrationOpensAt: z.iso.datetime(),
    startsAt: z.iso.datetime(),
    lateStartUntil: z.iso.datetime(),
    endsAt: z.iso.datetime(),
    resultsPublishedAt: z.iso.datetime().nullable(),
    ranksBeta: z.boolean(),
    me: z.object({ registered: z.boolean(), attemptId: z.uuid().nullable(), attemptStatus: z.string().nullable() }).nullable(),
  })
  .meta({ id: 'LiveEvent' });

const TestSummary = z.object({
  id: z.string(),
  version: z.number().int(),
  title: z.string(),
  kind: z.string(),
  paperType: z.string(),
  durationMin: z.number().int(),
  totalMarks: z.number(),
  questionCount: z.number().int(),
  chapterIds: z.array(z.string()),
  chapter: z.object({ id: z.string(), number: z.number().int(), title: z.string() }).nullable(),
  position: z.number().int().nullable(),
  me: MyTestStatus.nullable(),
});

export const TestSeriesResponse = z
  .object({
    subject: SubjectRef,
    series: z.array(
      z.object({
        id: z.string(),
        kind: z.enum(['chapter', 'unit', 'term', 'full', 'second_exam', 'live']),
        title: z.string(),
        tests: z.array(TestSummary),
      }),
    ),
    liveEvents: z.array(LiveEventSchema),
  })
  .meta({ id: 'TestSeries' });

export const TestSeriesQuery = z.strictObject({
  board: BoardSchema.optional(),
  class: z.coerce.number().int().min(7).max(12).optional(),
  /** Subject id (cbse-10-science) or its last part (science) with board and class. */
  subject: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
});

const SectionOutline = z.object({
  id: z.string(),
  title: z.string(),
  instructions: z.string(),
  questionCount: z.number().int(),
  maxMarks: z.number(),
  choiceGroups: z.array(z.object({ id: z.string(), attempt: z.number().int(), of: z.number().int() })),
});

export const TestMetaResponse = z
  .object({
    id: z.string(),
    version: z.number().int(),
    title: z.string(),
    kind: z.string(),
    paperType: z.string(),
    subject: SubjectRef,
    chapterIds: z.array(z.string()),
    durationMin: z.number().int(),
    totalMarks: z.number(),
    questionCount: z.number().int(),
    autoGradedCount: z.number().int(),
    custom: z.boolean(),
    shuffle: z.boolean(),
    instructions: z.array(z.string()),
    sections: z.array(SectionOutline),
    live: LiveEventSchema.nullable(),
    me: MyTestStatus.nullable(),
  })
  .meta({ id: 'TestMeta', description: 'Metadata only: questions are delivered inside an attempt.' });

export const CustomTestRequest = z
  .strictObject({
    subjectId: z.string().max(80).regex(/^[a-z]+-\d+-[a-z0-9-]+$/),
    chapterIds: z.array(z.string().max(100).regex(/^[a-z]+-\d+-[a-z0-9-]+-ch\d{2}$/)).min(1).max(TEST_ENGINE.custom.maxChapters),
    types: z.array(z.enum(QUESTION_TYPES)).min(1).max(QUESTION_TYPES.length).optional(),
    difficulty: z
      .strictObject({ min: z.number().int().min(1).max(5), max: z.number().int().min(1).max(5) })
      .refine((d) => d.min <= d.max, 'min must be ≤ max')
      .optional(),
    questionCount: z.number().int().min(TEST_ENGINE.custom.minQuestions).max(TEST_ENGINE.custom.maxQuestions),
    durationMin: z.number().int().min(TEST_ENGINE.custom.minDurationMin).max(TEST_ENGINE.custom.maxDurationMin).optional(),
    title: z.string().trim().min(1).max(120).optional(),
  })
  .meta({ id: 'CustomTestRequest' });

export const CustomTestResponse = TestMetaResponse.extend({ skippedChapters: z.array(z.string()) }).meta({ id: 'CustomTest', description: 'skippedChapters: chosen chapters with no matching questions.' });

export const StartAttemptRequest = z
  .strictObject({ start: z.boolean().default(true) })
  .meta({ id: 'StartAttemptRequest', description: 'start=false creates the attempt without starting the clock (instructions / live waiting room).' });

const DeliveredItem = z.object({
  itemId: z.uuid(),
  sectionId: z.string(),
  number: z.number().int(),
  marks: z.number(),
  choiceGroup: z.string().nullable(),
  question: StudentQuestionSchema,
});

const DeliveredSection = z.object({
  id: z.string(),
  title: z.string(),
  instructions: z.string(),
  questionCount: z.number().int().optional(),
  maxMarks: z.number(),
  itemIds: z.array(z.uuid()),
  choiceGroups: z.array(z.object({ id: z.string(), attempt: z.number().int(), of: z.number().int(), itemIds: z.array(z.uuid()) })),
});

const AttemptStatus = z.enum(['created', 'in_progress', 'submitted', 'auto_submitted']).meta({ id: 'AttemptStatus' });

const TestHeader = z.object({
  id: z.string(),
  version: z.number().int(),
  title: z.string(),
  kind: z.string(),
  paperType: z.string(),
  subject: SubjectRef,
  chapterIds: z.array(z.string()),
  durationMin: z.number().int(),
  totalMarks: z.number(),
  questionCount: z.number().int(),
  shuffle: z.boolean(),
});

export const AttemptStateResponse = z
  .object({
    attempt: z.object({
      id: z.uuid(),
      status: AttemptStatus,
      testId: z.string(),
      testVersion: z.number().int(),
      liveEventId: z.string().nullable(),
      ranked: z.boolean(),
      startedAt: z.iso.datetime().nullable(),
      deadlineAt: z.iso.datetime().nullable(),
      submittedAt: z.iso.datetime().nullable(),
      serverNow: z.iso.datetime(),
      remainingSec: z.number().int().nullable(),
      graceSeconds: z.number().int(),
      tabSwitchCount: z.number().int(),
    }),
    test: TestHeader,
    sections: z.array(DeliveredSection),
    /** Empty until the attempt is started. */
    items: z.array(DeliveredItem),
    responses: z.array(
      z.object({
        itemId: z.uuid(),
        response: PracticeResponseSchema.nullable(),
        markedForReview: z.boolean(),
        timeSpentSec: z.number().int(),
        seq: z.number().int(),
        savedAt: z.iso.datetime(),
      }),
    ),
  })
  .meta({ id: 'AttemptState', description: 'Questions without answers (DB-6/API-9). serverNow + deadlineAt drive the timer (AC-12).' });

export const SaveResponsesRequest = z
  .strictObject({
    items: z
      .array(
        z.strictObject({
          itemId: z.uuid(),
          /** Strictly increasing per item and device; e.g. Date.now() at the change. Higher wins. */
          seq: z.number().int().min(1).max(TEST_ENGINE.autosave.maxSeq),
          /** Same shapes as practice (PracticeResponse); null clears the item. */
          response: PracticeResponseSchema.nullable(),
          markedForReview: z.boolean().optional(),
          /** Cumulative seconds on this item (the stored value never goes down). */
          timeSpentSec: z.number().int().min(0).max(86_400).optional(),
          /** When the change happened on the device (advisory, F-007). */
          changedAt: z.iso.datetime({ offset: true }).optional(),
        }),
      )
      .max(TEST_ENGINE.autosave.maxItemsPerBatch),
    /** Cumulative tab/app switches seen by the player (recorded, never punished). */
    tabSwitchCount: z.number().int().min(0).max(100_000).optional(),
  })
  .meta({ id: 'SaveResponsesRequest' });

export const SaveResponsesResponse = z
  .object({
    status: z.string(),
    serverNow: z.iso.datetime(),
    deadlineAt: z.iso.datetime().nullable(),
    applied: z.array(z.object({ itemId: z.uuid(), seq: z.number().int() })),
    stale: z.array(z.object({ itemId: z.uuid(), seq: z.number().int(), storedSeq: z.number().int() })),
    rejected: z.array(z.object({ itemId: z.uuid(), seq: z.number().int(), reason: z.literal('after_deadline') })),
  })
  .meta({ id: 'SaveResponsesResult', description: 'Drop queued entries that are applied, stale or rejected; retry only on network/5xx/429.' });

export const SubmitResponse = z
  .object({
    attemptId: z.uuid(),
    status: z.enum(['submitted', 'auto_submitted']),
    alreadySubmitted: z.boolean(),
    submittedAt: z.iso.datetime(),
    score: z.number(),
    maxScore: z.number(),
    autoScore: z.number(),
    pendingSelfEvaluation: z.object({ items: z.number().int(), marks: z.number() }),
    xpAwarded: z.number().int(),
    badgesAwarded: z.array(z.string()),
    streak: StreakSchema.nullable(),
  })
  .meta({ id: 'SubmitResult' });

const PartResult = z.object({
  id: z.string(),
  alternative: z.string().nullable(),
  type: z.enum(QUESTION_TYPES),
  correct: z.boolean().nullable(),
  marksAwarded: z.number().nullable(),
  maxMarks: z.number(),
  grading: z.enum(['auto', 'self']),
  key: KeyRevealSchema,
});

export const ResultResponse = z
  .object({
    attempt: z.object({
      id: z.uuid(),
      status: z.enum(['submitted', 'auto_submitted']),
      startedAt: z.iso.datetime(),
      deadlineAt: z.iso.datetime(),
      submittedAt: z.iso.datetime(),
      timeTakenSec: z.number().int(),
      tabSwitchCount: z.number().int(),
    }),
    test: TestHeader,
    score: z.object({
      total: z.number(),
      max: z.number(),
      auto: z.number(),
      self: z.number(),
      percentage: z.number().nullable(),
      pendingSelfEvaluation: z.object({ items: z.number().int(), marks: z.number() }),
      answered: z.number().int(),
      questions: z.number().int(),
    }),
    sections: z.array(z.object({ id: z.string(), title: z.string(), score: z.number(), autoScore: z.number(), maxScore: z.number() })),
    topics: z.array(z.object({ id: z.string(), title: z.string(), earned: z.number(), max: z.number(), items: z.number().int(), mastery: z.number().nullable() })),
    byDifficulty: z.array(z.object({ difficulty: z.number().int(), total: z.number().int(), attempted: z.number().int(), correct: z.number().int(), accuracy: z.number().nullable() })),
    time: z.object({ totalSec: z.number().int(), averagePerQuestionSec: z.number().int() }),
    percentile: z.object({ value: z.number().nullable(), attempts: z.number().int(), minAttempts: z.number().int() }),
    live: z
      .object({ eventId: z.string(), status: z.enum(['provisional', 'final']), rank: z.number().int().nullable(), total: z.number().int(), percentile: z.number().nullable() })
      .nullable(),
    review: z
      .object({
        status: z.enum(['open', 'after_event']),
        /** after_event: when the live test closes for everyone and the full review opens. */
        opensAt: z.iso.datetime().nullable(),
      })
      .describe('S6-H01: a live-mock attempt is score-only until the event closes (after_event): sections, topics, byDifficulty, sectionsLayout and items are empty, self- and AI evaluation return 409 results_after_event.'),
    sectionsLayout: z.array(z.object({ id: z.string(), title: z.string(), itemIds: z.array(z.uuid()), choiceGroups: z.array(z.object({ id: z.string(), attempt: z.number().int(), of: z.number().int(), itemIds: z.array(z.uuid()) })) })),
    items: z.array(
      z.object({
        itemId: z.uuid(),
        sectionId: z.string(),
        number: z.number().int(),
        marks: z.number(),
        choiceGroup: z.string().nullable(),
        /** Choice groups: whether this item is among the best ones that count. */
        counted: z.boolean(),
        status: z.enum(['correct', 'partial', 'wrong', 'unanswered', 'pending_self', 'evaluated']),
        autoMarks: z.number(),
        autoMax: z.number(),
        selfMarks: z.number().nullable(),
        selfMax: z.number(),
        correct: z.boolean().nullable(),
        timeSpentSec: z.number().int(),
        markedForReview: z.boolean(),
        response: PracticeResponseSchema.nullable(),
        question: StudentQuestionSchema,
        key: KeyRevealSchema.nullable(),
        parts: z.array(PartResult),
      }),
    ),
  })
  .meta({ id: 'AttemptResult', description: 'After submission only. Percentile and ranks use auto-graded marks (AC-14).' });

export const SelfEvaluationRequest = z
  .strictObject({
    items: z
      .array(
        z.strictObject({
          itemId: z.uuid(),
          marks: z.number().min(0).max(100).multipleOf(0.5).optional(),
          steps: z.array(z.number().min(0).max(100).multipleOf(0.5)).min(1).max(30).optional(),
          parts: z.array(z.strictObject({ id: z.string().max(64).regex(/^[A-Za-z0-9_-]+$/), marks: z.number().min(0).max(100).multipleOf(0.5) })).min(1).max(20).optional(),
        }),
      )
      .min(1)
      .max(100),
  })
  .meta({ id: 'SelfEvaluationRequest', description: 'Per item exactly one of: marks (total of its written parts), steps (marks per marking-scheme step), parts (case-based: marks per written part).' });

export const LiveEventsQuery = z.strictObject({
  board: BoardSchema.optional(),
  class: z.coerce.number().int().min(7).max(12).optional(),
  subject: z.string().max(80).regex(/^[a-z]+-\d+-[a-z0-9-]+$/).optional(),
});

export const LeaderboardQuery = z.strictObject({ limit: z.coerce.number().int().min(1).max(100).default(TEST_ENGINE.live.leaderboardSize) });

export const LeaderboardResponse = z
  .object({
    event: LiveEventSchema,
    status: z.enum(['not_started', 'provisional', 'final']),
    maxScore: z.number(),
    total: z.number().int(),
    entries: z.array(
      z.object({
        rank: z.number().int(),
        /** First name + last initial (F-017); null when the student's consent is not granted (D-014). */
        name: z.string().nullable(),
        score: z.number(),
        isMe: z.boolean(),
      }),
    ),
    me: z.object({ rank: z.number().int(), score: z.number(), percentile: z.number().nullable() }).nullable(),
  })
  .meta({ id: 'LiveLeaderboard', description: 'Auto-graded marks only; ties on marks are broken by time taken. Ranks are beta.' });

export const MyAttemptsResponse = z
  .object({
    attempts: z.array(
      z.object({
        id: z.uuid(),
        testId: z.string(),
        title: z.string(),
        kind: z.string(),
        status: AttemptStatus,
        liveEventId: z.string().nullable(),
        startedAt: z.iso.datetime().nullable(),
        deadlineAt: z.iso.datetime().nullable(),
        submittedAt: z.iso.datetime().nullable(),
        score: z.number().nullable(),
        maxScore: z.number().nullable(),
      }),
    ),
    nextCursor: z.string().nullable(),
  })
  .meta({ id: 'MyAttempts' });
