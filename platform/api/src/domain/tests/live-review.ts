/**
 * S6-H01 (AC-11): the review of a live-mock attempt — answer keys, solutions, marking schemes,
 * per-item correctness, section/topic/difficulty breakdowns, self-evaluation and AI evaluation —
 * opens only once the event is over for everyone: after `closesAt` (deadline cap + live grace) or
 * when the worker has published the results. Before that a live attempt shows its score and its
 * provisional rank only, so an early submitter cannot read the keys while others are still writing.
 * Attempts outside a live event (practice tests, unranked copies after the event) are always open.
 */
import type { Database } from '@soyl/db';
import { ApiProblem } from '../../errors';
import { closesAt, liveEventById, type LiveEventRow } from './live';

export interface ReviewWindow {
  open: boolean;
  /** When the review opens (null when it is open already). */
  opensAt: Date | null;
  event: LiveEventRow | null;
}

/** Pure rule: open once the event has published results or every attempt has closed. */
export function liveReviewOpen(ev: LiveEventRow, now: number): boolean {
  return ev.status === 'results_published' || now >= closesAt(ev).getTime();
}

export async function reviewWindow(db: Database, attempt: { liveEventId: string | null }, now: number): Promise<ReviewWindow> {
  if (!attempt.liveEventId) return { open: true, opensAt: null, event: null };
  const ev = await liveEventById(db, attempt.liveEventId);
  if (!ev) return { open: true, opensAt: null, event: null };
  const open = liveReviewOpen(ev, now);
  return { open, opensAt: open ? null : closesAt(ev), event: ev };
}

/** 409 `results_after_event` while a live attempt's review is still closed. */
export async function assertReviewOpen(db: Database, attempt: { liveEventId: string | null }, now: number): Promise<ReviewWindow> {
  const w = await reviewWindow(db, attempt, now);
  if (!w.open)
    throw new ApiProblem('results_after_event', {
      detail: `Solutions and marking open when the live test closes at ${w.opensAt!.toISOString()}.`,
      fields: { opensAt: w.opensAt!.toISOString() },
    });
  return w;
}
