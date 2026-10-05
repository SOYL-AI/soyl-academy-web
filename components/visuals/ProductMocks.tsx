'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { spring } from '@/lib/motion';

/**
 * Animated product mock-ups for the homepage walkthrough.
 *
 * These are built from real components (not screenshots) so they stay crisp,
 * weigh nothing, and can respond. They are ILLUSTRATIONS of the intended
 * workflow: every name, file and sentence in them is invented for
 * demonstration. The window chrome says so on screen.
 */

/** True once `ms` has elapsed since mount. Drives staged state changes inside a mock. */
function useAfter(ms: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), ms);
    return () => clearTimeout(t);
  }, [ms]);
  return on;
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { ...spring.settle, delay },
});

function Check({ on, light }: { on: boolean; light?: boolean }) {
  return (
    <span
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300',
        on ? (light ? 'border-white bg-brand-cream' : 'border-brand-blue bg-brand-blue') : 'border-brand-black/25 bg-brand-cream'
      )}
    >
      <motion.svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        animate={{ scale: on ? 1 : 0, opacity: on ? 1 : 0 }}
        transition={spring.playful}
      >
        <path d="M2.5 6.2l2.4 2.4 4.6-5" stroke={light ? 'var(--color-brand-blue)' : 'white'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </span>
  );
}

function Typed({ text, delay = 0 }: { text: string; delay?: number }) {
  const count = useMotionValue(0);
  const shown = useTransform(count, (v) => text.slice(0, Math.round(v)));
  useEffect(() => {
    const controls = animate(count, text.length, {
      duration: text.length * 0.032,
      delay,
      ease: 'linear',
    });
    return () => controls.stop();
  }, [count, text, delay]);
  return <motion.span>{shown}</motion.span>;
}

/* ─────────────── 1 · Teacher uploads notes ─────────────── */

function FileRow({ name, meta, delay, progress }: { name: string; meta: string; delay: number; progress?: boolean }) {
  const done = useAfter(delay * 1000 + 1300);
  return (
    <motion.div
      initial={{ opacity: 0, y: -28, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ ...spring.playful, delay }}
      className="rounded-lg border border-border-dark bg-brand-cream p-4"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-8 shrink-0 items-center justify-center rounded-sm bg-brand-black/5 text-[9px] font-bold text-brand-black-light">
          DOC
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] font-medium text-brand-black">{name}</p>
          <p className="text-small text-brand-black-lighter">{meta}</p>
        </div>
        <Check on={done} />
      </div>
      {progress && (
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-ink/10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: delay + 0.2, ease: 'easeInOut' }}
            className="h-full origin-left rounded-full bg-brand-blue"
          />
        </div>
      )}
    </motion.div>
  );
}

function UploadMock() {
  return (
    <div className="space-y-4">
      <p className="text-small font-semibold text-brand-black-light">Add what you’re teaching</p>
      <div className="space-y-3 rounded-xl border-2 border-dashed border-brand-blue/35 bg-brand-blue-light/50 p-4">
        <FileRow name="Energy — Unit 4 notes.pdf" meta="2.1 MB" delay={0.1} progress />
        <FileRow name="Class VIII syllabus.docx" meta="480 KB" delay={0.7} />
      </div>
      <motion.p {...rise(1.6)} className="text-small text-brand-black-lighter">
        SOYL reads your notes so the assignment matches your lessons.
      </motion.p>
    </div>
  );
}

/* ─────────────── 2 · Choose the outcome ─────────────── */

const OUTCOMES = [
  { label: 'Apply', at: 600, on: true },
  { label: 'Reason', at: 0, on: false },
  { label: 'Create', at: 0, on: false },
  { label: 'Defend', at: 1100, on: true },
];

function OutcomeChip({ label, at, on: shouldSelect, i }: { label: string; at: number; on: boolean; i: number }) {
  const selected = useAfter(shouldSelect ? at : 999999);
  return (
    <motion.div
      {...rise(0.1 + i * 0.08)}
      className={cn(
        'flex items-center justify-between rounded-lg border px-4 py-3.5 transition-colors duration-300',
        selected ? 'border-ink bg-ink text-white' : 'border-border-dark bg-brand-cream text-brand-black'
      )}
    >
      <span className="text-[1rem] font-medium">{label}</span>
      <Check on={selected} light />
    </motion.div>
  );
}

function OutcomeMock() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-small text-brand-black-lighter">Topic</p>
        <p className="text-subhead text-brand-black">Energy and sustainability</p>
      </div>
      <p className="text-small font-semibold text-brand-black-light">What should students be able to do?</p>
      <div className="grid grid-cols-2 gap-3">
        {OUTCOMES.map((o, i) => (
          <OutcomeChip key={o.label} {...o} i={i} />
        ))}
      </div>
    </div>
  );
}

/* ─────────────── 3 · SOYL drafts it ─────────────── */

function GenerateMock() {
  const ready = useAfter(1300);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-eyebrow text-brand-blue">The Energy Challenge</p>
        <span className="rounded-full bg-highlighter px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-black">
          Draft
        </span>
      </div>

      <div className="min-h-[9.5rem] rounded-xl border border-border-dark p-5">
        {!ready ? (
          <div className="flex h-[7.5rem] items-center gap-2 text-small text-brand-black-light">
            <span>SOYL is drafting</span>
            {[0, 1, 2].map((d) => (
              <motion.span
                key={d}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                className="h-1.5 w-1.5 rounded-full bg-brand-blue"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2.5 text-brand-black">
            <motion.p {...rise(0)} className="text-[1.05rem] leading-snug">
              Your school must cut electricity use by 25%.
            </motion.p>
            <motion.p {...rise(0.12)} className="text-brand-black-light">Choose three actions.</motion.p>
            <motion.p {...rise(0.24)} className="text-brand-black-light">Explain why they work.</motion.p>
            <motion.p {...rise(0.36)} className="text-brand-black-light">Defend one trade-off.</motion.p>
          </div>
        )}
      </div>

      <motion.div
        animate={{ opacity: ready ? 1 : 0.35 }}
        className="flex items-center gap-3"
      >
        <span className="rounded-sm border border-border-dark px-4 py-2 text-small font-medium text-brand-black">Edit draft</span>
        <span className="rounded-sm bg-ink px-4 py-2 text-small font-medium text-white">Assign</span>
        <span className="ml-auto text-small text-brand-black-lighter">You stay in charge</span>
      </motion.div>
    </div>
  );
}

/* ─────────────── 4 · It adapts ─────────────── */

function AdaptMock() {
  const variants = [
    { who: 'Student A', tag: 'Loves sport', context: 'Your school’s sports hall floodlights run all evening.' },
    { who: 'Student B', tag: 'Loves design', context: 'Your school’s new art studio has no energy plan.' },
  ];
  return (
    <div className="space-y-4">
      <p className="text-small font-semibold text-brand-black-light">Same outcome. A context that fits each student.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {variants.map((v, i) => (
          <motion.div key={v.who} {...rise(0.1 + i * 0.25)} className="rounded-xl border border-border-dark p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-small font-semibold text-brand-black">{v.who}</span>
              <span className="rounded-full bg-brand-blue-light px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-brand-blue">
                {v.tag}
              </span>
            </div>
            <p className="min-h-[4.25rem] text-[0.95rem] leading-snug text-brand-black">{v.context}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        {...rise(0.8)}
        className="flex flex-wrap items-center gap-2 rounded-lg bg-brand-black/5 px-4 py-3 text-small text-brand-black"
      >
        <span className="font-semibold">Both must:</span>
        <span>Choose three actions</span>
        <span aria-hidden="true">·</span>
        <span>Explain why</span>
        <span aria-hidden="true">·</span>
        <span>Defend a trade-off</span>
      </motion.div>
    </div>
  );
}

/* ─────────────── 5 · Student completes it ─────────────── */

const ACTIONS = [
  { label: 'Switch to LED lighting', at: 500 },
  { label: 'Use daylight sensors', at: 1000 },
  { label: 'Switch off projectors after class', at: 1500 },
  { label: 'Buy a new generator', at: 999999 },
];

function ActionRow({ label, at, i }: { label: string; at: number; i: number }) {
  const on = useAfter(at);
  return (
    <motion.li {...rise(0.05 + i * 0.07)} className="flex items-center gap-3 rounded-lg border border-border-dark px-4 py-2.5">
      <Check on={on} />
      <span className="text-[0.95rem] text-brand-black">{label}</span>
    </motion.li>
  );
}

function StudentMock() {
  return (
    <div className="space-y-4">
      <p className="text-small font-semibold text-brand-black-light">Choose three actions</p>
      <ul className="space-y-2">
        {ACTIONS.map((a, i) => (
          <ActionRow key={a.label} {...a} i={i} />
        ))}
      </ul>
      <div>
        <p className="mb-2 text-small font-semibold text-brand-black-light">Why does it work?</p>
        <div className="min-h-[4.75rem] rounded-lg border-2 border-brand-blue/50 bg-brand-cream p-3.5 text-[0.95rem] leading-snug text-brand-black">
          <Typed text="LED lights cost more at first, but they use far less power every day." delay={2} />
          <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-brand-blue" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────── 6 · Teacher sees evidence ─────────────── */

const EVIDENCE = [
  { label: 'Applied the concept', at: 500 },
  { label: 'Gave a reason for each choice', at: 1000 },
  { label: 'Defended a trade-off', at: 1500 },
];

function EvidenceRow({ label, at, i }: { label: string; at: number; i: number }) {
  const on = useAfter(at);
  return (
    <motion.li {...rise(0.05 + i * 0.08)} className="flex items-center gap-3">
      <Check on={on} />
      <span className="text-[0.98rem] text-brand-black">{label}</span>
    </motion.li>
  );
}

function EvidenceMock() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-eyebrow text-brand-blue">Evidence of understanding</p>
        <span className="text-small text-brand-black-lighter">Student A</span>
      </div>
      <ul className="space-y-3 rounded-xl border border-border-dark p-5">
        {EVIDENCE.map((e, i) => (
          <EvidenceRow key={e.label} {...e} i={i} />
        ))}
      </ul>
      <motion.blockquote
        {...rise(1.9)}
        className="border-l-2 border-brand-blue pl-4 text-[0.95rem] leading-snug text-brand-black-light"
      >
        “LED lights cost more at first, but they use far less power every day.”
      </motion.blockquote>
      <motion.span
        {...rise(2.2)}
        className="inline-block rounded-sm border border-border-dark px-4 py-2 text-small font-medium text-brand-black"
      >
        Ask a follow-up
      </motion.span>
    </div>
  );
}

export const MOCKS: Record<string, () => React.JSX.Element> = {
  upload: UploadMock,
  outcome: OutcomeMock,
  generate: GenerateMock,
  adapt: AdaptMock,
  student: StudentMock,
  evidence: EvidenceMock,
};

const ROLE: Record<string, string> = {
  upload: 'Teacher',
  outcome: 'Teacher',
  generate: 'Teacher',
  adapt: 'Teacher',
  student: 'Student',
  evidence: 'Teacher',
};

/** The shared frame every mock sits in. */
export function MockWindow({ id, step, total }: { id: string; step: number; total: number }) {
  const Mock = MOCKS[id];
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-xl border border-border-dark bg-brand-cream shadow-[0_30px_60px_-34px_rgba(23,23,23,0.4)]"
    >
      <div className="flex items-center justify-between border-b border-border bg-bone px-5 py-3">
        <div className="flex items-center gap-2.5">
          <span className="grid h-3.5 w-5 grid-cols-3 grid-rows-2" aria-hidden="true">
            <span />
            <span className="bg-highlighter" />
            <span />
            <span className="bg-teacher-red" />
            <span className="bg-brand-blue" />
            <span className="bg-brand-blue" />
          </span>
          <span className="text-small font-semibold text-brand-black">SOYL</span>
          <span className="text-small text-brand-black-lighter">· {ROLE[id]}</span>
        </div>
        <span className="text-small tabular-nums text-brand-black-lighter">
          {step}/{total}
        </span>
      </div>
      <div className="min-h-[25.5rem] p-5 md:min-h-[24rem] md:p-7">{Mock && <Mock />}</div>
      <p className="border-t border-border px-5 py-2.5 text-[11px] text-brand-black-lighter">
        Illustration of the intended workflow. Content is invented for demonstration.
      </p>
    </div>
  );
}
