/**
 * Typed client for the platform API (ARCHITECTURE §3.2, web-platform M1).
 *
 * - `schema.gen.ts` is generated from `platform/api/openapi.json` by openapi-typescript
 *   (`npm run generate:api-client -w @soyl/shared`); a test in `api-client.test.ts` fails when it is stale.
 * - This file is a dependency-free fetch wrapper typed by that schema (ADR-001: anything the Next.js pages
 *   import from platform/shared must not add runtime dependencies to the marketing app).
 * - Browser calls go to the same-origin proxy `/api/platform` (ADR-005), with `credentials: 'same-origin'`
 *   so the HttpOnly session cookie travels and nothing else does (WEB-5). The API's CSRF check (AUTH-12)
 *   relies on the browser's own `Origin` header, which a same-origin fetch always sends on POST/PATCH/DELETE.
 * - Errors are RFC 7807 problem+json; they surface as `ApiError` with the stable `code`.
 */
import type { components, paths } from './schema.gen';

export type { components, paths };
export type Schemas = components['schemas'];

export type SessionResponse = Schemas['SessionResponse'];
export type SessionUser = Schemas['SessionUser'];
export type ConsentState = Schemas['ConsentState'];
export type Board = Schemas['Board'];
export type SignInResponse = Schemas['SignInResponse'];
export type OtpSentResponse = Schemas['OtpSentResponse'];
export type Me = Schemas['Me'];
export type PatchMe = Schemas['PatchMeInput'];
export type DeleteMeResponse = Schemas['DeleteMeResponse'];
export type ConsentStartResponse = Schemas['ConsentStartResponse'];
// D-039 built-in consent flow and public names
export type ConsentView = Schemas['ConsentView'];
export type ConsentParentResponse = Schemas['ConsentParentResponse'];
export type PublicNameResponse = Schemas['PublicNameResponse'];
export type GuestProgress = Schemas['GuestProgressInput'];
export type GuestLesson = Schemas['GuestLessonInput'];
export type GuestPracticeAnswer = Schemas['GuestPracticeAnswerInput'];
export type MergeGuestResponse = Schemas['MergeGuestResponse'];
export type CatalogBoards = Schemas['CatalogBoards'];
export type CatalogSubjects = Schemas['CatalogSubjects'];
export type CatalogSubject = Schemas['CatalogSubject'];
export type CatalogChapters = Schemas['CatalogChapters'];
export type CatalogChapter = CatalogChapters['chapters'][number];
export type Problem = Schemas['Problem'];
export type AuthMethods = Schemas['AuthMethods'];
// M2 learning core (backend-api M2 handoff)
export type ChapterHub = Schemas['ChapterHub'];
export type LessonDeck = Schemas['LessonDeck'];
export type DeckSlide = LessonDeck['slides'][number];
export type ChapterNotes = Schemas['ChapterNotes'];
export type ChapterFlashcards = Schemas['ChapterFlashcards'];
export type Flashcard = ChapterFlashcards['cards'][number];
export type StudentQuestion = Schemas['StudentQuestion'];
export type StudentQuestionPart = Schemas['StudentQuestionPart'];
export type QuestionType = Schemas['QuestionType'];
export type ReviewStatus = Schemas['ReviewStatus'];
export type PracticePage = Schemas['PracticePage'];
export type PracticeResponse = Schemas['PracticeResponse'];
export type PracticePartResponse = Schemas['PracticePartResponse'];
export type PracticeAnswerRequest = Schemas['PracticeAnswerRequest'];
export type PracticeAnswerResult = Schemas['PracticeAnswerResult'];
export type AnswerKey = Schemas['AnswerKey'];
export type PracticeSelfAssessment = Schemas['PracticeSelfAssessment'];
export type LessonProgressRequest = Schemas['LessonProgressRequest'];
export type LessonProgress = Schemas['LessonProgress'];
export type MyProgress = Schemas['MyProgress'];
export type MyChapterProgress = Schemas['MyChapterProgress'];
export type Streak = Schemas['Streak'];
// Learning insights (2026-10-28): heatmap, mastery, practice status/difficulty, private player card
export type MyActivity = Schemas['MyActivity'];
export type ActivityDay = Schemas['ActivityDay'];
export type MyMastery = Schemas['MyMastery'];
export type SubjectMastery = Schemas['SubjectMastery'];
export type ChapterMastery = Schemas['ChapterMastery'];
export type ChapterEvidence = Schemas['ChapterEvidence'];
export type MasteryLevel = Schemas['MasteryLevel'];
export type DifficultyBand = Schemas['DifficultyBand'];
export type PracticeStatus = Schemas['PracticeStatus'];
export type PracticeSummary = Schemas['PracticeSummary'];
export type MyPlayerCard = Schemas['MyPlayerCard'];
export type CardAttribute = Schemas['CardAttribute'];
// Student dashboard and school capture (2026-10-28): GET /v1/me/dashboard, GET /v1/schools, PATCH /v1/me school/weeklyGoal
export type MyDashboard = Schemas['MyDashboard'];
export type DashboardProfile = Schemas['DashboardProfile'];
export type DashboardTotals = Schemas['DashboardTotals'];
export type DashboardScope = Schemas['DashboardScope'];
export type DashboardMastery = Schemas['DashboardMastery'];
export type AccuracyWindow = Schemas['AccuracyWindow'];
export type DayRange = Schemas['DayRange'];
export type SolvedByDifficulty = Schemas['SolvedByDifficulty'];
export type TestHistoryItem = Schemas['TestHistoryItem'];
export type FocusChapter = Schemas['FocusChapter'];
export type ChapterLink = Schemas['ChapterLink'];
export type RecentEvent = Schemas['RecentEvent'];
export type NextBadge = Schemas['NextBadge'];
export type WeeklyGoal = Schemas['WeeklyGoal'];
export type School = Schemas['School'];
export type SchoolSearch = Schemas['SchoolSearch'];
export type SchoolStatus = Schemas['SchoolStatus'];
export type SchoolPick = Schemas['SchoolPickInput'];
export type SchoolCreate = Schemas['SchoolCreateInput'];
export type ContentReportRequest = Schemas['ContentReportRequest'];
export type ContentReportReceipt = Schemas['ContentReportReceipt'];
export type MfaStatus = Schemas['MfaStatus'];
export type MfaEnrollment = Schemas['MfaEnrollment'];
export type MfaRecoveryCodes = Schemas['MfaRecoveryCodes'];
export type MfaVerified = Schemas['MfaVerified'];
export type AdminContentReports = Schemas['AdminContentReports'];
// Super-admin dashboard (D-045): /v1/admin/me, /v1/admin/analytics/*, /v1/admin/users/*, POST /v1/events
export type AdminMe = Schemas['AdminMe'];
export type AdminRange = Schemas['AdminRange'];
export type AdminKpi = Schemas['AdminKpi'];
export type AdminSeries = Schemas['AdminSeries'];
export type AdminDayCount = Schemas['AdminDayCount'];
export type AdminLabelledCount = Schemas['AdminLabelledCount'];
export type AdminTopItem = Schemas['AdminTopItem'];
export type AdminAnalyticsOverview = Schemas['AdminAnalyticsOverview'];
export type AdminAnalyticsGrowth = Schemas['AdminAnalyticsGrowth'];
export type AdminAnalyticsEngagement = Schemas['AdminAnalyticsEngagement'];
export type AdminAnalyticsRetention = Schemas['AdminAnalyticsRetention'];
export type AdminAnalyticsAi = Schemas['AdminAnalyticsAi'];
export type AdminAnalyticsRevenue = Schemas['AdminAnalyticsRevenue'];
export type AdminAnalyticsInterest = Schemas['AdminAnalyticsInterest'];
export type AdminAnalyticsContent = Schemas['AdminAnalyticsContent'];
export type AdminUserRow = Schemas['AdminUserRow'];
export type AdminUsersPage = Schemas['AdminUsersPage'];
export type AdminUserSearchResult = Schemas['AdminUserSearchResult'];
export type AdminUserReveal = Schemas['AdminUserReveal'];
export type AdminUserSummary = Schemas['AdminUserSummary'];
export type InterestEventsRequest = Schemas['InterestEventsRequest'];
// M3 tests (backend-api M3 handoff)
export type MyTestStatus = Schemas['MyTestStatus'];
export type LivePhase = Schemas['LivePhase'];
export type LiveEvent = Schemas['LiveEvent'];
export type LiveEvents = Schemas['LiveEvents'];
export type TestSeries = Schemas['TestSeries'];
export type TestSeriesGroup = TestSeries['series'][number];
export type TestSeriesTest = TestSeriesGroup['tests'][number];
export type TestMeta = Schemas['TestMeta'];
export type CustomTestRequest = Schemas['CustomTestRequest'];
export type CustomTest = Schemas['CustomTest'];
export type AttemptStatus = Schemas['AttemptStatus'];
export type AttemptState = Schemas['AttemptState'];
export type AttemptItem = AttemptState['items'][number];
export type AttemptSection = AttemptState['sections'][number];
export type SavedResponse = AttemptState['responses'][number];
export type SaveResponsesRequest = Schemas['SaveResponsesRequest'];
export type SaveResponsesResult = Schemas['SaveResponsesResult'];
export type SubmitResult = Schemas['SubmitResult'];
export type AttemptResult = Schemas['AttemptResult'];
export type AttemptResultItem = AttemptResult['items'][number];
export type SelfEvaluationRequest = Schemas['SelfEvaluationRequest'];
export type LiveLeaderboard = Schemas['LiveLeaderboard'];
export type MyAttempts = Schemas['MyAttempts'];
export type MyAttempt = MyAttempts['attempts'][number];
// M4 AI gateway + billing (ai-gateway M4, billing-razorpay M4 handoffs)
export type AiActionId = Schemas['AiQuote']['action'];
export type AiActionRequest = Schemas['AiActionRequest'];
export type AiJobAccepted = Schemas['AiJobAccepted'];
export type AiJob = Schemas['AiJob'];
export type Credits = Schemas['Credits'];
export type CreditLedger = Schemas['CreditLedger'];
/** D-044: GET /v1/me/credits/guide, GET /v1/me/credits/history, bonus awards on practice answers. */
export type CreditGuide = Schemas['CreditGuide'];
export type CreditHistory = Schemas['CreditHistory'];
export type CreditBonusAward = Schemas['CreditBonusAward'];
export type CreditBonusKind = Schemas['CreditBonusKind'];
/** Avatars: GET /v1/me/avatars, Me.avatar, PATCH /v1/me avatar, public boards. */
export type AvatarCatalog = Schemas['AvatarCatalog'];
export type AvatarRef = Schemas['AvatarRef'];
export type MyAvatar = Schemas['MyAvatar'];
export type AvatarChoice = Schemas['AvatarChoice'];
export type AvatarUnlockRule = Schemas['AvatarUnlockRule'];
export type AvatarId = Schemas['AvatarId'];
export type AvatarBackground = Schemas['AvatarBackground'];
export type AiQuote = Schemas['AiQuote'];
export type AiUploadRequest = Schemas['AiUploadRequest'];
export type AiUploadTarget = Schemas['AiUploadTarget'];
export type AiUpload = Schemas['AiUpload'];
export type AiConversation = Schemas['AiConversation'];
export type AiConversations = Schemas['AiConversations'];
export type AiConversationDetail = Schemas['AiConversationDetail'];
export type AiEvaluation = Schemas['AiEvaluation'];
export type PlansResponse = Schemas['PlansResponse'];
export type PlanView = PlansResponse['plans'][number];
export type SubscriptionCheckout = Schemas['SubscriptionCheckout'];
export type OrderCheckout = Schemas['OrderCheckout'];
export type MySubscription = Schemas['MySubscription'];
// SOYL Coins (ADR-021, D-037)
export type CoinAward = Schemas['CoinAward'];
export type CoinEarnSource = Schemas['CoinEarnSource'];
export type CoinsSummary = Schemas['CoinsSummary'];
export type CoinHistory = Schemas['CoinHistory'];
export type CoinHistoryEntry = CoinHistory['entries'][number];
export type CoinLedgerSource = CoinHistoryEntry['source'];
export type CoinCheckIn = Schemas['CoinCheckIn'];
export type CoinStore = Schemas['CoinStore'];
export type CoinStoreItem = CoinStore['items'][number];
export type StoreItemState = Schemas['StoreItemState'];
export type CoinRedemption = Schemas['CoinRedemption'];
export type CoinRedeemResult = Schemas['CoinRedeemResult'];
export type CoinEquipped = Schemas['CoinEquipped'];
export type ShippingAddress = Schemas['ShippingAddress'];
export type DailyChallenge = Schemas['DailyChallenge'];
export type DailyChallengeEntry = DailyChallenge['challenges'][number];

/** Browser base path of the same-origin proxy (ADR-005). */
export const API_BROWSER_BASE = '/api/platform';

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

/** Paths that support method M. */
export type PathsWith<M extends HttpMethod> = {
  [P in keyof paths]: paths[P][M] extends { responses: unknown } ? P : never;
}[keyof paths];

type Op<P extends keyof paths, M extends HttpMethod> = NonNullable<paths[P][M]>;

type ParamGroup<O, K extends 'path' | 'query'> = O extends { parameters: infer PS }
  ? PS extends Record<string, unknown>
    ? NonNullable<PS[K]>
    : never
  : never;

type BodyOf<O> = O extends { requestBody: { content: { 'application/json': infer B } } } ? B : never;

/** The JSON body of the 200 (or 201, or 202 for AI jobs) response, `null` for 204, `unknown` otherwise (e.g. a 302 redirect). */
export type ResponseOf<O> = O extends { responses: { 200: { content: { 'application/json': infer R } } } }
  ? R
  : O extends { responses: { 201: { content: { 'application/json': infer R } } } }
    ? R
    : O extends { responses: { 202: { content: { 'application/json': infer R } } } }
      ? R
      : O extends { responses: { 204: unknown } }
        ? null
        : unknown;

type IfNever<T, A, B> = [T] extends [never] ? A : B;

export type RequestOptions<O> = IfNever<ParamGroup<O, 'path'>, { params?: undefined }, { params: ParamGroup<O, 'path'> }> &
  IfNever<ParamGroup<O, 'query'>, { query?: undefined }, { query?: ParamGroup<O, 'query'> }> &
  IfNever<BodyOf<O>, { body?: undefined }, { body: BodyOf<O> }> & {
    signal?: AbortSignal;
    /** Extra request headers (e.g. `if-none-match`). Never put personal data in a query string (WEB-12). */
    headers?: Record<string, string>;
    /** fetch keepalive: the request may outlive the page (test-player autosave on page hide). */
    keepalive?: boolean;
  };

/** A failed API call. `code` is the problem's stable machine code (backend handoff list). */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly problem: Problem | null;
  constructor(status: number, code: string, problem: Problem | null, message?: string) {
    super(message ?? problem?.title ?? `API error ${status} (${code})`);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.problem = problem;
  }
  /** Seconds the server asked us to wait (OTP lockouts, rate limits), if any. */
  get retryAfterSeconds(): number | undefined {
    return typeof this.problem?.retryAfterSeconds === 'number' ? this.problem.retryAfterSeconds : undefined;
  }
}

export function isApiError(err: unknown, code?: string): err is ApiError {
  return err instanceof ApiError && (code === undefined || err.code === code);
}

/** Fills `{name}` placeholders. Values are encoded so a param can never add a path segment. */
export function buildPath(template: string, params?: Record<string, unknown>): string {
  return template.replace(/\{([A-Za-z0-9_]+)\}/g, (_, name: string) => {
    const value = params?.[name];
    if (value === undefined || value === null || value === '') throw new Error(`Missing path parameter "${name}"`);
    return encodeURIComponent(String(value));
  });
}

export function buildQuery(query?: Record<string, unknown>): string {
  if (!query) return '';
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    qs.set(key, String(value));
  }
  const s = qs.toString();
  return s ? `?${s}` : '';
}

function looksLikeProblem(value: unknown): value is Problem {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as { code?: unknown }).code === 'string' &&
    typeof (value as { status?: unknown }).status === 'number'
  );
}

export interface ApiClientOptions {
  /** Default `/api/platform` (browser, same origin). Server code passes the API origin. */
  baseUrl?: string;
  fetch?: typeof fetch;
  /** Headers added to every request (server-side: the edge secret). */
  headers?: Record<string, string>;
}

export interface ApiClient {
  get<P extends PathsWith<'get'>>(path: P, ...opts: OptionalArgs<Op<P, 'get'>>): Promise<ResponseOf<Op<P, 'get'>>>;
  post<P extends PathsWith<'post'>>(path: P, ...opts: OptionalArgs<Op<P, 'post'>>): Promise<ResponseOf<Op<P, 'post'>>>;
  put<P extends PathsWith<'put'>>(path: P, ...opts: OptionalArgs<Op<P, 'put'>>): Promise<ResponseOf<Op<P, 'put'>>>;
  patch<P extends PathsWith<'patch'>>(path: P, ...opts: OptionalArgs<Op<P, 'patch'>>): Promise<ResponseOf<Op<P, 'patch'>>>;
  delete<P extends PathsWith<'delete'>>(path: P, ...opts: OptionalArgs<Op<P, 'delete'>>): Promise<ResponseOf<Op<P, 'delete'>>>;
}

/** The options argument is optional when the operation needs no path params and no body. */
type OptionalArgs<O> = IfNever<ParamGroup<O, 'path'>, IfNever<BodyOf<O>, [opts?: RequestOptions<O>], [opts: RequestOptions<O>]>, [opts: RequestOptions<O>]>;

export function createApiClient(options: ApiClientOptions = {}): ApiClient {
  const base = (options.baseUrl ?? API_BROWSER_BASE).replace(/\/+$/, '');
  const doFetch = options.fetch ?? ((input: RequestInfo | URL, init?: RequestInit) => globalThis.fetch(input, init));

  async function request(method: HttpMethod, path: string, opts: RequestOptions<unknown> | undefined): Promise<unknown> {
    const o = (opts ?? {}) as { params?: Record<string, unknown>; query?: Record<string, unknown>; body?: unknown; signal?: AbortSignal; headers?: Record<string, string>; keepalive?: boolean };
    const url = `${base}${buildPath(path, o.params)}${buildQuery(o.query)}`;
    const headers: Record<string, string> = { accept: 'application/json', ...options.headers, ...o.headers };
    const init: RequestInit = { method: method.toUpperCase(), headers, credentials: 'same-origin', cache: 'no-store', signal: o.signal };
    if (o.keepalive) init.keepalive = true;
    if (o.body !== undefined) {
      headers['content-type'] = 'application/json';
      init.body = JSON.stringify(o.body);
    }
    let res: Response;
    try {
      res = await doFetch(url, init);
    } catch (err) {
      if ((err as { name?: string })?.name === 'AbortError') throw err;
      throw new ApiError(0, 'network_error', null, 'Network error: could not reach the server');
    }
    const type = res.headers.get('content-type') ?? '';
    const isJson = /\bjson\b/i.test(type);
    if (res.ok) {
      if (res.status === 204 || !isJson) return null;
      return res.json();
    }
    let problem: Problem | null = null;
    if (isJson) {
      try {
        const body: unknown = await res.json();
        if (looksLikeProblem(body)) problem = body;
      } catch {
        // fall through to a generic error
      }
    }
    const fallbackCode = res.status === 401 ? 'unauthenticated' : res.status === 404 ? 'not_found' : res.status >= 500 ? 'service_unavailable' : 'http_error';
    throw new ApiError(res.status, problem?.code ?? fallbackCode, problem);
  }

  return {
    get: (path, ...opts) => request('get', path, opts[0] as RequestOptions<unknown>) as never,
    post: (path, ...opts) => request('post', path, opts[0] as RequestOptions<unknown>) as never,
    put: (path, ...opts) => request('put', path, opts[0] as RequestOptions<unknown>) as never,
    patch: (path, ...opts) => request('patch', path, opts[0] as RequestOptions<unknown>) as never,
    delete: (path, ...opts) => request('delete', path, opts[0] as RequestOptions<unknown>) as never,
  };
}
