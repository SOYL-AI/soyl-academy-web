/**
 * Contract of the super-admin dashboard (D-045): request and response schemas of /v1/admin/me,
 * /v1/admin/analytics/*, /v1/admin/users/* and POST /v1/events. Request schemas are strict (API-8);
 * responses strip unknown fields (API-9). Days are IST calendar days (YYYY-MM-DD, Asia/Kolkata);
 * money is integer paise; ratios are 0..1.
 */
import { z } from 'zod/v4';
import { ANALYTICS, ANALYTICS_EVENT_NAMES, STAFF_CAPABILITIES } from '@soyl/shared/config/analytics';
import { ConsentStateSchema } from '../schemas';

const Day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'an IST day YYYY-MM-DD');

/** ?from=&to= (inclusive IST days). Defaults: the last 30 days ending today; at most 180 days. */
export const RangeQuery = z.strictObject({
  from: Day.optional(),
  to: Day.optional(),
});

export const RangeSchema = z
  .object({
    from: Day,
    to: Day,
    days: z.number().int(),
    /** The previous period of the same length (KPI deltas). */
    previousFrom: Day,
    previousTo: Day,
    timezone: z.literal(ANALYTICS.timezone),
    generatedAt: z.iso.datetime(),
  })
  .meta({ id: 'AdminRange' });

export const DayCount = z.object({ date: Day, value: z.number() }).meta({ id: 'AdminDayCount' });
export const Series = z
  .object({ key: z.string(), label: z.string(), points: z.array(DayCount) })
  .meta({ id: 'AdminSeries', description: 'A daily series over the range; every day is present (zeros included).' });
export const LabelledCount = z.object({ key: z.string(), label: z.string(), value: z.number() }).meta({ id: 'AdminLabelledCount' });

export const Kpi = z
  .object({
    key: z.string(),
    label: z.string(),
    value: z.number(),
    /** Same metric over the previous period; null when it has no meaning (e.g. a point-in-time total). */
    previous: z.number().nullable(),
    unit: z.enum(['count', 'paise', 'ratio']),
  })
  .meta({ id: 'AdminKpi' });

export const AdminMe = z
  .object({
    userId: z.uuid(),
    role: z.enum(['reviewer', 'admin']),
    capabilities: z.array(z.enum(STAFF_CAPABILITIES)),
    /** Tabs this account may open (the web hides the rest; the API enforces it anyway). */
    sections: z.array(z.enum(['analytics', 'users', 'reports'])),
  })
  .meta({ id: 'AdminMe' });

export const AnalyticsOverview = z
  .object({
    range: RangeSchema,
    kpis: z.array(Kpi),
    signups: Series,
    dau: Series,
  })
  .meta({ id: 'AdminAnalyticsOverview' });

export const AnalyticsGrowth = z
  .object({
    range: RangeSchema,
    totalUsers: z.number().int(),
    signupsByMethod: z.array(Series).describe('Per day, one series per sign-in method (inferred from the account: Google identity created with it, phone-only placeholder email, else email).'),
    signupsByWeek: z.array(z.object({ week: Day, email: z.number().int(), phone: z.number().int(), google: z.number().int(), total: z.number().int() })),
    consentFunnel: z.array(LabelledCount),
    boards: z.array(LabelledCount),
    classes: z.array(LabelledCount),
    schoolsAdded: z.number().int(),
    guestMerges: Series,
    signupCounter: z.array(LabelledCount).describe('Server-observed sign-up counter by method (exact, from the day counters started).'),
  })
  .meta({ id: 'AdminAnalyticsGrowth' });

export const TopItem = z.object({ key: z.string(), label: z.string(), practiceAnswers: z.number().int(), lessonsOpened: z.number().int(), total: z.number().int() }).meta({ id: 'AdminTopItem' });

export const AnalyticsEngagement = z
  .object({
    range: RangeSchema,
    dau: Series,
    activeUsers: z.number().int().describe('Distinct students with any learning activity in the range.'),
    wau: z.number().int().describe('Distinct active students in the 7 days ending `to`.'),
    mau: z.number().int().describe('Distinct active students in the 30 days ending `to`.'),
    stickiness: z.number().nullable().describe('Average DAU over the 30 days ending `to` divided by MAU.'),
    activity: z.array(Series).describe('lessons_opened, lessons_completed, practice_answers, practice_solved, tests_started, tests_submitted, live_joins'),
    totals: z.array(LabelledCount),
    notesFlashcards: z.array(LabelledCount).describe('From the interest counters (notes_open, flashcards_open); 0 until the web sends them.'),
    topChapters: z.array(TopItem),
    topSubjects: z.array(TopItem),
    streaks: z.array(LabelledCount),
  })
  .meta({ id: 'AdminAnalyticsEngagement' });

export const AnalyticsRetention = z
  .object({
    range: RangeSchema,
    days: z.array(z.number().int()),
    cohorts: z.array(
      z.object({
        week: Day,
        size: z.number().int(),
        /** Share of the cohort active exactly N days after signing up, per `days`; null when no member has reached that day yet. */
        rates: z.array(z.number().nullable()),
        /** Members who have reached day N (the denominator), per `days`. */
        eligible: z.array(z.number().int()),
        retained: z.array(z.number().int()),
      }),
    ),
  })
  .meta({ id: 'AdminAnalyticsRetention' });

export const AnalyticsAi = z
  .object({
    range: RangeSchema,
    actionsByType: z.array(Series),
    statusTotals: z.array(LabelledCount),
    credits: z.object({
      granted: z.array(Series).describe('One series per grant reason (daily_grant, plan_topup, admin_adjustment, learning bonuses).'),
      spent: Series,
      refunded: Series,
      expired: Series,
      totals: z.array(LabelledCount),
    }),
    spend: z.object({
      capPaise: z.number().int(),
      degradeAtShare: z.number(),
      days: z.array(z.object({ date: Day, spentPaise: z.number(), freeSpentPaise: z.number(), share: z.number(), status: z.enum(['normal', 'degraded', 'paused']) })),
      breakerDays: z.number().int().describe('Days the spend breaker degraded or paused AI.'),
      degradedRequests: z.number().int(),
      pausedRefusals: z.number().int().describe('Requests refused with ai_paused (server-observed counter).'),
    }),
    paywallShown: z.array(LabelledCount),
    paywallTotal: z.number().int(),
    moderationBlocks: Series,
  })
  .meta({ id: 'AdminAnalyticsAi' });

export const AnalyticsRevenue = z
  .object({
    range: RangeSchema,
    billingEnabled: z.boolean(),
    plansViews: z.number().int(),
    checkout: z.object({ started: z.number().int(), completed: z.number().int(), failed: z.number().int(), startedCounter: z.number().int(), completedCounter: z.number().int() }),
    activeSubscriptions: z.array(z.object({ plan: z.string(), interval: z.string(), count: z.number().int(), mrrPaise: z.number().int() })),
    mrrPaise: z.number().int(),
    revenue: Series,
    revenueTotalPaise: z.number().int(),
    refundsPaise: z.number().int(),
    boardExamPass: z.object({ sales: z.number().int(), revenuePaise: z.number().int() }),
    coins: z.object({ earned: Series, earnedTotal: z.number().int(), storeViews: z.number().int(), itemViews: z.array(LabelledCount), redemptions: z.array(LabelledCount) }),
  })
  .meta({ id: 'AdminAnalyticsRevenue' });

export const AnalyticsInterest = z
  .object({
    range: RangeSchema,
    events: z.array(
      z.object({
        event: z.enum(ANALYTICS_EVENT_NAMES),
        label: z.string(),
        source: z.enum(['server', 'client']),
        total: z.number().int(),
        previousTotal: z.number().int(),
        byDimension: z.array(LabelledCount),
        series: Series,
      }),
    ),
  })
  .meta({ id: 'AdminAnalyticsInterest' });

export const AnalyticsContent = z
  .object({
    range: RangeSchema,
    subjects: z.array(z.object({ subject: z.string(), label: z.string(), chapters: z.number().int(), published: z.number().int() })),
    openReports: z.array(LabelledCount).describe('Open "report a mistake" items by age.'),
    openReportsByType: z.array(LabelledCount),
    reportsInRange: z.number().int(),
    fixedInRange: z.number().int(),
  })
  .meta({ id: 'AdminAnalyticsContent' });

const SignInMethod = z.enum(['email', 'phone', 'google']);
export const AdminUserRow = z
  .object({
    id: z.uuid(),
    /** a***@g***.com; null for phone-only accounts. */
    maskedEmail: z.string().nullable(),
    /** +91******12 for accounts with a phone number; null otherwise. */
    maskedPhone: z.string().nullable(),
    method: SignInMethod,
    role: z.string(),
    board: z.string().nullable(),
    classLevel: z.number().int().nullable(),
    consent: z.string(),
    createdAt: z.iso.datetime(),
  })
  .meta({ id: 'AdminUserRow' });

export const AdminUsersQuery = z.strictObject({
  limit: z.coerce.number().int().min(1).max(ANALYTICS.recentUsersMax).default(25),
  cursor: z.string().max(200).optional(),
});
export const AdminUsersPage = z.object({ users: z.array(AdminUserRow), nextCursor: z.string().nullable() }).meta({ id: 'AdminUsersPage' });

/** POST, so the address never appears in a URL or an access log. */
export const AdminUserSearchBody = z.strictObject({ email: z.string().min(3).max(254) }).meta({ id: 'AdminUserSearchRequest' });
export const AdminUserSearchResult = z.object({ users: z.array(AdminUserRow) }).meta({ id: 'AdminUserSearchResult' });

export const AdminUserParams = z.strictObject({ id: z.uuid() });
export const AdminUserReveal = z.object({ id: z.uuid(), email: z.string().nullable(), audited: z.literal(true) }).meta({ id: 'AdminUserReveal' });

export const AdminUserSummary = z
  .object({
    user: AdminUserRow,
    signInMethods: z.array(SignInMethod),
    consent: ConsentStateSchema.nullable(),
    ageBand: z.enum(['adult', 'minor']).nullable(),
    hasSchool: z.boolean(),
    activity: z.object({
      lessonsOpened: z.number().int(),
      lessonsCompleted: z.number().int(),
      practiceAnswers: z.number().int(),
      practiceSolved: z.number().int(),
      testsStarted: z.number().int(),
      testsSubmitted: z.number().int(),
      activeDays30: z.number().int(),
      lastActiveDay: Day.nullable(),
      currentStreak: z.number().int(),
      totalXp: z.number().int(),
    }),
    ai: z.object({ requests30: z.number().int(), creditsSpent30: z.number().int(), creditsGranted30: z.number().int() }),
    coins: z.object({ balance: z.number().int(), earned: z.number().int() }),
    subscription: z.object({ plan: z.string(), status: z.string().nullable(), validUntil: z.iso.datetime().nullable() }),
    audited: z.literal(true),
  })
  .meta({ id: 'AdminUserSummary', description: 'Counts only: never AI chats, uploads, answers or free text.' });

export const EventsBody = z
  .strictObject({
    events: z
      .array(
        z.strictObject({
          name: z.string().min(2).max(64).regex(/^[a-z][a-z0-9_]+$/),
          dimension: z.string().min(1).max(64).regex(/^[a-z0-9][a-z0-9_-]*$/).optional(),
        }),
      )
      .min(1)
      .max(ANALYTICS.events.maxPerRequest),
  })
  .meta({ id: 'InterestEventsRequest' });
export const EventsAccepted = z.object({ accepted: z.number().int() }).meta({ id: 'InterestEventsAccepted' });
