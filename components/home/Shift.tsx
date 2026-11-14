import { shift } from '@/content/home';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Arrow, Dab, Marked, Note, type Ink } from '@/components/brush/marks';

const STAGES = ['Spark', 'Build', 'Defend', 'Fix', 'Reflect'];
const PROMISE_INK: Ink[] = ['ultramarine', 'vermilion', 'ochre', 'sap'];

/**
 * The shift (ADR-033): an exercise-book worksheet, corrected in red pen against the spec's non-negotiables
 * (no counter, no countdown, no mark as the headline), next to a mission pinned to the page.
 */
export function Shift() {
  const w = shift.worksheet;
  const c = shift.corrections;
  return (
    <section className="section" id="the-shift">
      <div className="page">
        <SectionHeader label={shift.label} num="01" title={shift.headline} layout="stack" />

        <div className="grid-12 mt-12 items-start gap-y-16 md:mt-16">
          {/* The worksheet, marked in red pen. */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5" data-reveal>
            <article aria-label="A traditional worksheet" className="ruled leaf tilt-l relative px-6 pb-8 pl-16 pt-6 md:px-8 md:pl-[4.25rem]">
              <div className="flex items-baseline justify-between gap-3 text-[0.95rem] text-graphite">
                <span>{w.subject}</span>
                <span className="t-eyebrow">{w.kind}</span>
              </div>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-10">
                <span className="relative font-semibold">
                  <Marked mark="strike" ink="vermilion" weight={3}>
                    {w.counter}
                  </Marked>
                  <Note ink="vermilion-ink" tilt={-5} className="absolute -top-7 left-6 whitespace-nowrap text-[1.05rem]">
                    {c.counter}
                  </Note>
                </span>
                <span className="t-num relative font-semibold">
                  <Marked mark="strike" ink="vermilion" weight={3} delay={500}>
                    {`⏱ ${w.timer}`}
                  </Marked>
                  <Note ink="vermilion-ink" tilt={4} className="absolute -bottom-7 left-2 whitespace-nowrap text-[1.05rem]">
                    {c.timer}
                  </Note>
                </span>
              </div>
              <p className="mt-14 font-serif text-[1.6rem] leading-tight">{w.question}</p>
              <div className="mt-16 flex items-end justify-between gap-4">
                <Marked mark="ring" ink="vermilion" delay={900} className="t-num px-1 text-[1.4rem] font-semibold">
                  {w.score}
                </Marked>
                <Note ink="vermilion-ink" tilt={-3} className="text-[1.15rem]">
                  {c.score}
                </Note>
              </div>
            </article>
          </div>

          {/* The arrow between them. */}

          {/* The mission. */}
          <div className="relative col-span-12 md:col-span-6 lg:col-span-6 lg:col-start-7" data-reveal style={{ '--d': '150ms' } as React.CSSProperties}>
            <Arrow to="right" ink="graphite" className="absolute -left-[22%] top-24 hidden h-12 w-36 lg:block" />
            <article aria-label="A SOYL mission" className="leaf tape tilt-r relative px-6 pb-7 pt-8 md:px-9" style={{ '--tape': 'var(--color-ultramarine)' } as React.CSSProperties}>
              <p className="hand text-[1.2rem] text-ultramarine">{shift.mission.tag}</p>
              <p className="mt-3 max-w-[22ch] font-serif text-[clamp(1.6rem,2.6vw,2.15rem)] leading-[1.1] tracking-[-0.015em]">{shift.mission.scene}</p>

              {/* The mission path: stages as places, the current one lit. No counter. */}
              <ol className="mt-8 flex items-center" aria-label="Mission stages, Build is current">
                {STAGES.map((s, i) => (
                  <li key={s} className="flex flex-1 items-center last:flex-none">
                    <span
                      className={
                        i === 1
                          ? 'sketch flex h-9 items-center bg-ochre-soft px-3 text-[0.9rem] font-semibold'
                          : 'flex h-9 items-center px-1 text-[0.9rem] text-graphite'
                      }
                      aria-current={i === 1 ? 'step' : undefined}
                    >
                      {s}
                    </span>
                    {i < STAGES.length - 1 && <span aria-hidden="true" className="mx-1 h-0 flex-1 border-t-2 border-dotted border-ink/30" />}
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex items-start gap-3">
                <span aria-hidden="true" className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sheet">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="10" r="1.4" fill="currentColor" />
                    <circle cx="15" cy="10" r="1.4" fill="currentColor" />
                    <path d="M8 15 C 10 17, 14 17, 16 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="sketch-soft relative bg-sheet px-4 py-3">
                  <span className="sr-only">The guide says: </span>
                  <span className="hand text-[1.2rem] leading-snug">{shift.mission.guide}</span>
                </p>
              </div>
            </article>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-8 gap-y-4 border-t border-ink/15 pt-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" data-reveal>
          {shift.promises.map((p, i) => (
            <li key={p} className="flex items-start gap-3 font-medium">
              <Dab ink={PROMISE_INK[i]} className="mt-1.5" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
