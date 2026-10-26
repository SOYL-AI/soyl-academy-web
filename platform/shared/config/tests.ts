/**
 * Test engine numbers (ARCHITECTURE §9, §16; CONTEXT §5, §10; threat model AC-11/AC-12, F-007).
 * Owner: backend-api. No imports: the web uses the same values for the player (timer, autosave
 * cadence, offline grace). Decisions behind them: docs/platform/adr/012-test-engine.md.
 */

export const TEST_ENGINE = {
  /**
   * F-007 / AC-12: a save received after `deadline_at` is accepted only when it arrives within this
   * grace AND every change in it claims a client time ≤ deadline_at (the offline queue flushing late).
   * Client times are advisory; the grace bounds what a forged client time can buy.
   */
  graceSeconds: { normal: 120, live: 60 },
  autosave: {
    /** The player saves every N seconds while something changed (and on page hide / submit). */
    intervalSeconds: 10,
    /** At most this many item states in one PUT /v1/attempts/:id/responses. */
    maxItemsPerBatch: 200,
    /** Largest accepted sequence number (JS safe integer; ms-epoch × 1000 fits). */
    maxSeq: Number.MAX_SAFE_INTEGER,
  },
  /** A result shows a percentile once this many first attempts at the test version are graded. */
  percentileMinAttempts: 50,
  /** Auto-submit sweep (worker): attempts whose deadline + grace has passed. */
  autoSubmit: { cron: '* * * * *', batchSize: 200 },
  custom: {
    minQuestions: 5,
    maxQuestions: 60,
    maxChapters: 20,
    minDurationMin: 5,
    maxDurationMin: 180,
    /** Duration when the student does not set one: expected time of the chosen questions × this, rounded up to 5 min. */
    durationFactor: 1.25,
  },
  live: {
    /** AC-11: a registered student may start up to this many minutes after `starts_at`. */
    lateStartMinutes: 15,
    /** Rows on GET /v1/live-events/:id/leaderboard. */
    leaderboardSize: 50,
    /** Provisional rank sorted sets live this long after the event (cleanup TTL). */
    leaderboardTtlDays: 30,
    /** Final ranks are computed this long after the last possible submission (deadline cap + grace). */
    finalizeDelaySeconds: 120,
    /** Registration opens this many days before the event unless the schedule says otherwise. */
    registrationOpensDaysBefore: 21,
  },
} as const;

/** Problem codes the test player handles (besides the generic ones). */
export const TEST_PROBLEM_CODES = ['attempt_closed', 'live_not_open', 'test_unavailable', 'bank_too_small'] as const;

/**
 * Wave 1 All-India live mocks (CONTEXT §10: "2 scheduled All-India Mocks before the boards").
 * Times are IST (+05:30). Each sitting runs one live paper per Wave 1 subject that has one: the
 * paper's duration from `starts` (a 3-hour board paper fills 10:00–13:00); late start ≤ 15 min.
 * `npm run live -w @soyl/api -- schedule` creates the events (ADR-012).
 */
export const LIVE_MOCK_SITTINGS = [
  { sitting: 1, title: 'All-India Mock 1', starts: '2026-12-13T10:00:00+05:30', ends: '2026-12-13T13:00:00+05:30' },
  { sitting: 2, title: 'All-India Mock 2', starts: '2027-01-17T10:00:00+05:30', ends: '2027-01-17T13:00:00+05:30' },
] as const;

/** Classes whose subjects get the live mocks (Wave 1, CONTEXT §4). */
export const LIVE_MOCK_CLASSES = [10, 12] as const;
