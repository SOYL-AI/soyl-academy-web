import { thoughtprint } from '@/content/home';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BrushArt } from '@/components/brush/BrushArt';
import { Note } from '@/components/brush/marks';

/**
 * The Thoughtprint (ADR-033): the card a pupil gets at the end of every mission. The headline is what the pupil can
 * now do; there is no mark anywhere on it. An example, labelled as one.
 */
export function ThoughtprintCard() {
  const ex = thoughtprint.example;
  const rows: { k: string; v: string; tone?: string }[] = [
    { k: 'Where your thinking turned', v: ex.turned },
    { k: 'What we found and fixed', v: ex.fixed, tone: 'text-sap' },
    { k: 'Next', v: ex.next },
  ];

  return (
    <section className="section" id="thoughtprint">
      <div className="page grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-5">
          <SectionHeader label={thoughtprint.label} num="03" title={thoughtprint.headline} intro={thoughtprint.intro} layout="stack" />
          <p className="mt-8 text-[1.35rem]" data-reveal>
            <Note ink="vermilion-ink" tilt={-3}>
              {thoughtprint.note}
            </Note>
          </p>
        </div>

        <div className="relative col-span-12 lg:col-span-6 lg:col-start-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
          <article aria-label="Example Thoughtprint" className="leaf tape tape-r relative overflow-hidden px-6 pb-8 pt-9 md:px-10 md:pb-10">
            <div className="flex items-start justify-between gap-4">
              <p className="t-eyebrow text-graphite">{ex.pupil}</p>
              <BrushArt art="thoughtprint" options={{ ridges: 11, blooms: false, weight: 0.8 }} seed={23} bg="#fffdf8" className="-mr-2 -mt-4 h-20 w-20 shrink-0 md:h-24 md:w-24" />
            </div>
            <p className="hand -mt-2 text-[1.3rem] text-ultramarine">You can now</p>
            <p className="mt-1 max-w-[24ch] font-serif text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[1.08] tracking-[-0.015em]">{ex.canNow}</p>
            <dl className="mt-8 divide-y divide-ink/10 border-t border-ink/10">
              {rows.map((r) => (
                <div key={r.k} className="grid gap-1 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-[0.9rem] font-semibold text-graphite">{r.k}</dt>
                  <dd className={r.tone ? `font-medium ${r.tone}` : undefined}>{r.v}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </div>
    </section>
  );
}
