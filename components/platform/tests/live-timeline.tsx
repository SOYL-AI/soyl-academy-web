/**
 * Upcoming All-India live mocks as kit Timeline items (design language v3, ADR-032 §10: the Tests hub and the
 * leaderboard rail). Pure and server-safe: dates and times in India time, the subject's tint, the status written.
 */
import type { LiveEvent } from '@/platform/shared/api-client';
import { StatusPill, type StatusTone, type TimelineItem } from '@/components/platform/ui/kit/Lists';
import { type Tint } from '@/components/platform/ui/kit/tints';
import { subjectTintFor } from '../learn/subject-style';
import { LIVE_PHASE_LABELS } from './player-model';
import { durationText } from './timer';

const IST = 'Asia/Kolkata';

/**
 * A subject's tint, one rule on every page (DESIGN-LANGUAGE §2: History/Social orange, English pink…): the subject-art
 * kind first, the course hue only for generic subjects.
 */
export function subjectTintOf(id: string, name: string, language?: string | null): Tint {
  return subjectTintFor(id, name, language);
}

export const PHASE_TONES: Partial<Record<LiveEvent['phase'], StatusTone>> = { live: 'live', writing: 'info', registration_open: 'info', results_published: 'success', cancelled: 'neutral' };

/** Phases a student can still join or register for (the hub's "Upcoming live mocks"). */
export const OPEN_PHASES: ReadonlySet<LiveEvent['phase']> = new Set(['upcoming', 'registration_open', 'live', 'writing']);

/** An upcoming live mock as a Timeline item: "Sat / 15 Nov", title, "10:00 IST · 3 h" (+ " · Science" unless the title names it), status (pure; tested). */
export function liveEventItem(e: LiveEvent): TimelineItem {
  const d = new Date(e.startsAt);
  const day = new Intl.DateTimeFormat('en-IN', { weekday: 'short', timeZone: IST }).format(d);
  const date = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: IST }).format(d);
  const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: IST }).format(d);
  const registered = !!e.me?.registered;
  return {
    id: e.id,
    time: day,
    timeSub: date,
    title: e.title,
    // The subject only when the title does not already say it ("Science full mock").
    meta: `${time} IST · ${durationText(e.durationMin)}${e.title.toLowerCase().includes(e.subject.name.toLowerCase()) ? '' : ` · ${e.subject.name}`}`,
    href: `/tests/live/${encodeURIComponent(e.id)}`,
    status: <StatusPill tone={registered ? 'success' : (PHASE_TONES[e.phase] ?? 'neutral')}>{registered ? 'Registered' : (LIVE_PHASE_LABELS[e.phase] ?? e.phase)}</StatusPill>,
    tint: subjectTintOf(e.subject.id, e.subject.name),
  };
}

/** The next open live mocks, soonest first (at most `limit`). */
export function upcomingLive(events: readonly LiveEvent[], limit = 4): LiveEvent[] {
  return events
    .filter((e) => OPEN_PHASES.has(e.phase))
    .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))
    .slice(0, limit);
}
