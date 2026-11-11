'use client';

import { useId, useState } from 'react';
import { Ring, type RingProgress } from '@/components/ink/Ring';
import { InkLink } from '@/components/ink/Button';
import { examLabel, learnPath } from '@/components/platform/lib/catalog';
import { DOOR_QUESTIONS, type DoorQuestion } from '@/content/door-questions.generated';
import { PLATFORM_ENABLED } from '@/lib/site';
import { cn } from '@/lib/utils';
import { DEFAULT_PICK, useDoor } from './DoorState';

/**
 * The homepage's playable question, inside the painted ring (plan §3.2, screen 1; phase 6).
 *
 * One real objective question for the class chosen on the door, verbatim from an authored chapter
 * (content/door-questions.generated.ts, made by scripts/build-taste.mjs). Every wrong answer draws a third of the
 * ring (two thirds at most) and stays in the list as a madder mark; the right answer closes the ring, the wash
 * under it blooms and the authored explanation appears. Changing the class on the door changes the question.
 *
 * Wrong options stay focusable (aria-disabled, not disabled) so keyboard focus never drops to the page.
 */
const KEY = `${DEFAULT_PICK.board}-${DEFAULT_PICK.classLevel}`;

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <svg width="14" height="14" viewBox="0 0 12 12" aria-hidden="true" focusable="false" className="shrink-0">
      <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="12" height="12" viewBox="0 0 10 10" aria-hidden="true" focusable="false" className="shrink-0">
      <path d="M2 2l6 6M8 2 2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Question({ q, sizes }: { q: DoorQuestion; sizes: string }) {
  const [tried, setTried] = useState<string[]>([]);
  const ids = { stem: useId(), options: useId() };
  const solved = tried.includes(q.answer);
  const wrong = tried.filter((t) => t !== q.answer).length;
  const progress = (solved ? 3 : Math.min(2, wrong)) as RingProgress;
  const last = tried[tried.length - 1];
  const borrowed = q.fromClass !== q.classLevel;
  const subjectId = q.chapterId.replace(/-ch\d{2}$/, '');

  const choose = (id: string) => {
    if (solved || tried.includes(id)) return;
    setTried((t) => [...t, id]);
  };

  return (
    <div>
      <Ring progress={progress} ghost bloom={solved} priority sizes={sizes} className="mx-auto max-w-[540px]">
        <p id={ids.stem} className="font-serif text-[clamp(0.98rem,3.6vw,1.3rem)] leading-[1.28] tracking-[-0.01em] text-ink [text-wrap:balance] lg:text-[clamp(1.05rem,1.45vw,1.3rem)]">
          {q.stem}
        </p>
      </Ring>

      <div className="mx-auto mt-1 max-w-[460px]">
        <p className="ink-label">
          Try one · {examLabel(q.board, q.fromClass)} Class {q.fromClass} {q.subject}
        </p>
        {borrowed ? (
          <p className="mt-1 text-[0.875rem] text-muted">Class {q.classLevel} chapters are still being written. This one is from Class {q.fromClass}.</p>
        ) : null}

        <ul id={ids.options} aria-labelledby={ids.stem} className="mt-3 space-y-2">
          {q.options.map((o) => {
            const picked = tried.includes(o.id);
            const ok = o.id === q.answer;
            const state = picked ? (ok ? 'right' : 'wrong') : solved ? 'rest' : 'open';
            return (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => choose(o.id)}
                  aria-disabled={state !== 'open' || undefined}
                  className={cn(
                    'flex min-h-12 w-full items-center gap-3 rounded-[var(--radius-sm)] border px-4 py-2.5 text-left text-[1rem] leading-snug transition-colors duration-150',
                    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo',
                    state === 'open' && 'cursor-pointer border-rule bg-paper text-ink hover:border-ink',
                    state === 'wrong' && 'cursor-default border-madder/40 bg-paper text-madder',
                    state === 'right' && 'cursor-default border-leaf bg-leaf text-paper',
                    state === 'rest' && 'cursor-default border-rule bg-paper text-muted'
                  )}
                >
                  {state === 'wrong' || state === 'right' ? <Mark ok={state === 'right'} /> : <span aria-hidden="true" className="size-3.5 shrink-0 rounded-full border border-current opacity-50" />}
                  <span className={cn(state === 'wrong' && 'line-through decoration-madder/50')}>{o.text}</span>
                  {state === 'wrong' ? <span className="sr-only"> (not this one)</span> : state === 'right' ? <span className="sr-only"> (right)</span> : null}
                </button>
              </li>
            );
          })}
        </ul>

        <div aria-live="polite" className="mt-3 min-h-6">
          {solved ? (
            <>
              <p className="font-semibold text-leaf">
                Right{' '}
                <span className="font-normal text-graphite tabular-nums">
                  · {tried.length} {tried.length === 1 ? 'try' : 'tries'}
                </span>
              </p>
              <p className="mt-1.5 text-[0.9375rem] text-graphite">{q.explanation}</p>
            </>
          ) : last ? (
            <p className="text-[0.9375rem] text-ink">Not that one. It stays in the ring; pick again.</p>
          ) : (
            <p className="text-[0.9375rem] text-muted">Pick one. The wrong ones stay in the ring.</p>
          )}
        </div>

        {solved && PLATFORM_ENABLED ? (
          <div className="mt-4">
            <InkLink href={learnPath(q.board, q.fromClass, subjectId, q.chapterId) + '/practice'} variant="quiet" arrow>
              Practise this chapter
            </InkLink>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function RingQuestion({ sizes }: { sizes: string }) {
  const { board, classLevel } = useDoor();
  const key = `${board}-${classLevel}`;
  const q = DOOR_QUESTIONS[key] ?? DOOR_QUESTIONS[KEY]!;
  // A new class is a new question: the key resets the tries and the ring.
  return <Question key={`${key}:${q.id}`} q={q} sizes={sizes} />;
}
