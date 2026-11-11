'use client';

import { useId, useState } from 'react';
import { Chip } from '@/components/ink/Chip';
import { Dab } from '@/components/ink/Dab';
import { method, type MethodCheckpoint, type MethodStep } from '@/content/home';
import { pillars } from '@/content/method';
import { cn } from '@/lib/utils';

/**
 * The SOYL Method as a short walk (/method, plan §3.3): five stops on one route, a checkpoint at each.
 *
 * At four stops the reader picks which of the pillar's two real assignments (content/method.ts) does what the
 * question asks. A wrong pick stays marked in madder, as wrong tries do everywhere on the site; the right one
 * passes the checkpoint, and that stop's mark on the route washes in from an outline (plan §2.1: an untouched
 * chapter is an outline, a finished one is washed in). At the fifth, Reflect, the reader names the checkpoint that
 * made them think hardest, so the last verb is done, not read about. The finish counts the tries.
 *
 * Every control is a native button (Tab, then Enter or Space). A button already used keeps its focus and is
 * marked aria-disabled, never disabled, so focus does not drop to the page. Without JS every verb, line and
 * assignment is still on the page; only the feedback needs the script. No library.
 */

type Side = 'traditional' | 'soyl';
type Verb = MethodStep['verb'];
type Pick = Extract<MethodCheckpoint, { kind: 'pick' }>;
type Reflect = Extract<MethodCheckpoint, { kind: 'reflect' }>;

interface StopState {
  /** Sides picked wrongly, in order. */
  misses: Side[];
  passed: boolean;
  /** Reflect only: the checkpoint the reader named. */
  named?: Verb;
}

const SIDE_LABEL: Record<Side, string> = { traditional: 'Traditional', soyl: 'SOYL' };
const anchor = (verb: Verb) => verb.toLowerCase();
const pillarFor = (verb: Verb) => pillars.find((p) => p.name === verb)!;

function Mark({ ok }: { ok: boolean }) {
  return ok ? (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2 6.5 5 9l5-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" focusable="false">
      <path d="M2 2l6 6M8 2 2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** A stop on the route: an outline until its checkpoint is passed, then a washed pool of leaf with a tick. */
function RouteMark({ passed, className }: { passed: boolean; className?: string }) {
  return (
    <span aria-hidden="true" className={cn('relative grid h-8 w-8 place-items-center', className)}>
      <span className={cn('h-6 w-6 rounded-full border-[1.5px] border-ink/35 bg-paper transition-opacity duration-150', passed && 'opacity-0')} />
      <span className={cn('absolute grid place-items-center text-leaf transition-opacity duration-300', passed ? 'opacity-100' : 'opacity-0')}>
        <Dab pigment="leaf" className="text-[2.4rem]" />
        <span className="absolute">
          <Mark ok />
        </span>
      </span>
    </span>
  );
}

function PickCheckpoint({ verb, cp, state, onPick }: { verb: Verb; cp: Pick; state: StopState; onPick: (side: Side) => void }) {
  const askId = useId();
  const pillar = pillarFor(verb);
  const lastMiss = state.misses.length > 0 && !state.passed;
  return (
    <div>
      <p className="ink-label">Checkpoint</p>
      <p id={askId} className="ink-ask mt-2">
        {cp.ask}
      </p>
      <div role="group" aria-labelledby={askId} className="mt-5 grid gap-3">
        {cp.order.map((side) => {
          const missed = state.misses.includes(side);
          const right = state.passed && side === cp.answer;
          const used = state.passed || missed;
          return (
            <button
              key={side}
              type="button"
              aria-disabled={used}
              onClick={() => {
                if (!used) onPick(side);
              }}
              className={cn(
                'flex min-h-11 w-full flex-col gap-2 rounded-[var(--radius-sm)] border p-4 text-left transition-colors duration-150',
                right ? 'border-leaf bg-leaf/[0.07]' : missed ? 'border-madder/45' : 'border-rule bg-paper',
                !used && 'cursor-pointer hover:border-ink',
                used && 'cursor-default'
              )}
            >
              <span className={cn(missed && !right && 'text-graphite')}>{side === 'traditional' ? pillar.traditional : pillar.soyl}</span>
              {right || missed || state.passed ? (
                <span className="ink-label inline-flex flex-wrap items-center gap-x-2 gap-y-1">
                  {right ? (
                    <span className="inline-flex items-center gap-1 text-leaf">
                      <Mark ok /> Yes
                    </span>
                  ) : missed ? (
                    <span className="inline-flex items-center gap-1 text-madder">
                      <Mark ok={false} /> Not this one
                    </span>
                  ) : null}
                  {(right || missed) && state.passed ? <span aria-hidden="true">·</span> : null}
                  {state.passed ? <span className="text-muted">{SIDE_LABEL[side]}</span> : null}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-4 text-[0.9375rem] text-ink">
        {state.passed ? cp.right : lastMiss ? cp.wrong : null}
      </p>
    </div>
  );
}

function ReflectCheckpoint({ verb, cp, state, onName }: { verb: Verb; cp: Reflect; state: StopState; onName: (named: Verb) => void }) {
  const askId = useId();
  const pillar = pillarFor(verb);
  const earlier = method.steps.filter((s) => s.verb !== verb).map((s) => s.verb);
  return (
    <div>
      <p className="ink-label">Checkpoint</p>
      <p id={askId} className="ink-ask mt-2">
        {cp.ask}
      </p>
      <div role="group" aria-labelledby={askId} className="mt-5 flex flex-wrap gap-2">
        {earlier.map((v) => (
          <Chip key={v} pressed={state.named === v} onClick={() => onName(v)}>
            {v}
          </Chip>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 text-[0.9375rem] text-ink">
        {state.named ? cp.done : null}
      </p>
      <dl className="mt-5 grid gap-4 border-t border-rule pt-5 text-[0.9375rem]">
        <div>
          <dt className="ink-label">Traditional</dt>
          <dd className="mt-1 text-graphite">{pillar.traditional}</dd>
        </div>
        <div>
          <dt className="ink-label">SOYL</dt>
          <dd className="mt-1">{pillar.soyl}</dd>
        </div>
      </dl>
    </div>
  );
}

export function MethodWalk() {
  const [stops, setStops] = useState<Record<Verb, StopState>>(() =>
    Object.fromEntries(method.steps.map((s) => [s.verb, { misses: [], passed: false }])) as unknown as Record<Verb, StopState>
  );

  const update = (verb: Verb, next: (s: StopState) => StopState) => setStops((all) => ({ ...all, [verb]: next(all[verb]) }));

  const passedCount = method.steps.filter((s) => stops[s.verb].passed).length;
  const tries = method.steps.reduce((n, s) => n + stops[s.verb].misses.length + (stops[s.verb].passed ? 1 : 0), 0);
  const complete = passedCount === method.steps.length;
  const named = stops.Reflect.named;

  const finish = (
    <div className="grid gap-6 rounded-[var(--radius-md)] border border-rule bg-paper p-6 md:grid-cols-12 md:items-center md:p-8">
      <ol aria-label="The route" className="flex flex-wrap gap-x-5 gap-y-3 md:col-span-6">
        {method.steps.map((s) => (
          <li key={s.verb} className="flex flex-col items-center gap-1">
            <RouteMark passed={stops[s.verb].passed} />
            <span className="text-[0.8125rem] text-graphite">
              {s.verb}
              <span className="sr-only">{stops[s.verb].passed ? ', passed' : ', not yet'}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="md:col-span-6">
        {complete ? (
          <>
            <p className="ink-title">You walked the method.</p>
            <p className="mt-2 tabular-nums text-graphite">
              5 checkpoints · {tries} {tries === 1 ? 'try' : 'tries'}
              {named ? <> · hardest for you: {named}</> : null}
            </p>
          </>
        ) : (
          <>
            <p className="ink-title tabular-nums">
              {passedCount} of {method.steps.length} checkpoints
            </p>
            <p className="mt-2 text-graphite">Each one you pass is washed in on the route.</p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <ol className="mt-12 md:mt-16">
        {method.steps.map((step, i) => {
          const state = stops[step.verb];
          const cp = step.checkpoint;
          const last = i === method.steps.length - 1;
          return (
            <li key={step.verb} id={anchor(step.verb)} className="grid scroll-mt-20 grid-cols-[2rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[2.5rem_minmax(0,1fr)] md:gap-x-6">
              {/* The route: a mark per stop, and the line to the next one, inked once this stop is passed. */}
              <div aria-hidden="true" className="relative flex justify-center pt-1">
                <RouteMark passed={state.passed} />
                {last ? null : (
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 top-11 -translate-x-1/2 border-l-[1.5px] transition-colors duration-300',
                      state.passed ? 'border-solid border-leaf' : 'border-dashed border-ink/25'
                    )}
                  />
                )}
              </div>

              <div className={cn('grid gap-8 lg:grid-cols-12', last ? 'pb-0' : 'pb-14 md:pb-20')}>
                <div className="lg:col-span-5">
                  <h3 className="font-serif text-[clamp(2rem,3.6vw,2.75rem)] leading-none tracking-[-0.02em]">
                    {step.verb}
                    <span className="sr-only">{state.passed ? ', checkpoint passed' : ''}</span>
                  </h3>
                  <p className="mt-3 text-[1.125rem] font-medium">{step.line}</p>
                  <p className="mt-3 max-w-[44ch] text-graphite">{step.why}</p>
                </div>
                <div className="rounded-[var(--radius-md)] border border-rule bg-paper p-5 md:p-6 lg:col-span-7">
                  {cp.kind === 'pick' ? (
                    <PickCheckpoint
                      verb={step.verb}
                      cp={cp}
                      state={state}
                      onPick={(side) => update(step.verb, (s) => (side === cp.answer ? { ...s, passed: true } : { ...s, misses: [...s.misses, side] }))}
                    />
                  ) : (
                    <ReflectCheckpoint verb={step.verb} cp={cp} state={state} onName={(named) => update(step.verb, (s) => ({ ...s, passed: true, named }))} />
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {/* The finish lies on the painted wash once all five are passed (the wash bleeds in; with reduced motion it is
          simply there). The padding is always there, so finishing never moves the page. */}
      <div className="relative isolate mt-14 p-3 sm:p-5 md:mt-20">
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -inset-x-[3%] -inset-y-[5%] -z-10 bg-[url(/art/panel.webp)] bg-[length:100%_100%] bg-no-repeat transition-opacity duration-700 ease-[var(--ease-ink)]',
            complete ? 'opacity-100' : 'opacity-0'
          )}
        />
        {finish}
      </div>
    </>
  );
}
