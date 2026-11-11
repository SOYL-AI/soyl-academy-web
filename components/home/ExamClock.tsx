'use client';

import { InkLink } from '@/components/ink/Button';
import { Stroke } from '@/components/ink/Stroke';
import { examFor } from '@/components/platform/lib/catalog';
import type { PassOffer } from '@/lib/home/numbers';
import { useDoor } from './DoorState';

/**
 * Screen 4, the clock (plan §3.2 and §4, devices 6 and 7). For Classes 10 and 12: the days to the first board
 * paper, only from an official date sheet (content/exam-dates.ts; otherwise the month, never an estimate), and
 * the Board Exam Pass in a parent's units. For the other classes: streaks and the weekly league.
 * Every number is computed on the server from config and passed in. Persuade the parent, motivate the student:
 * no countdown to a price, no guilt.
 */
export interface ExamClockProps {
  /** Days to the first paper by `${exam}-${class}` (cbse-10, cbse-12, icse-10, isc-12), null without a date sheet. */
  days: Record<string, number | null>;
  monthLine: string;
  pass: PassOffer | null;
  passCredits: number;
  freezesPerWeek: number;
  leagueFrom: string;
  leagueTo: string;
}

export function ExamClock({ days, monthLine, pass, passCredits, freezesPerWeek, leagueFrom, leagueTo }: ExamClockProps) {
  const { board, classLevel } = useDoor();
  const boardYear = classLevel === 10 || classLevel === 12;
  const d = boardYear ? days[`${examFor(board, classLevel)}-${classLevel}`] ?? null : null;

  return (
    <section aria-labelledby="clock-title" className="section bg-paper-2">
      <div className="page grid gap-10 md:grid-cols-12 md:items-end">
        {boardYear ? (
          <>
            <div className="md:col-span-7">
              <h2 id="clock-title" className="ink-head max-w-[16ch]">
                {d !== null ? (
                  <>
                    <span className="tabular-nums">{d}</span> {d === 1 ? 'day' : 'days'} to your first paper.
                  </>
                ) : (
                  monthLine
                )}
              </h2>
              <Stroke pigment="madder" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
              <p className="ink-lead mt-6 max-w-[42ch]">Lessons, notes, practice and mock papers stay free, before the exam and after it.</p>
            </div>
            {pass ? (
              <div className="rounded-[var(--radius-md)] border border-rule bg-paper p-6 md:col-span-5 md:p-8">
                <p className="ink-label">Board Exam Pass</p>
                <p className="mt-3 font-serif text-[1.7rem] leading-[1.15]">
                  {pass.price} once.{' '}
                  <span className="text-graphite">
                    About {pass.perDay} a day until {pass.until}.
                  </span>
                </p>
                <p className="mt-4 text-[0.9375rem] text-graphite">
                  {passCredits} AI credits a day, papers made from your own uploads, priority AI checking of written answers, and a weekly report for a parent.
                </p>
                <div className="mt-6">
                  <InkLink href="/plans" variant="quiet" arrow>
                    See the Board Exam Pass
                  </InkLink>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <div className="md:col-span-7">
              <h2 id="clock-title" className="ink-head max-w-[16ch]">
                A streak starts with one question.
              </h2>
              <Stroke pigment="turmeric" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
              <p className="ink-lead mt-6 max-w-[42ch]">
                Miss a day and a freeze covers it, {freezesPerWeek === 1 ? 'once a week' : `${freezesPerWeek} times a week`}.
              </p>
            </div>
            <div className="rounded-[var(--radius-md)] border border-rule bg-paper p-6 md:col-span-5 md:p-8">
              <p className="ink-label">The weekly league</p>
              <p className="mt-3 text-graphite">
                Each week your class plays a league, from {leagueFrom} to {leagueTo}. It starts once a parent says yes.
              </p>
              <div className="mt-6">
                <InkLink href="/leaderboard" variant="quiet" arrow>
                  See the leaderboard
                </InkLink>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
