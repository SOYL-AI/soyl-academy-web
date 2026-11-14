import { monday } from '@/content/home';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Note } from '@/components/brush/marks';

/**
 * The teacher's Monday screen (ADR-033), as an example: pupils grouped by misconception, evidence first, one
 * suggested move to approve. Teacher screens stay calm and professional: no guide, no handwriting inside the screen.
 */
export function MondayScreen() {
  const sc = monday.screen;
  const [first, second] = sc.groups;
  return (
    <section className="section bg-sheet-deep" id="monday">
      <div className="page grid-12 items-start gap-y-14">
        <div className="col-span-12 lg:col-span-5 lg:pt-6">
          <SectionHeader label={monday.label} num="04" title={monday.headline} intro={monday.intro} layout="stack" />
          <ol className="mt-10 space-y-4" data-reveal>
            {monday.steps.map((s, i) => (
              <li key={s} className="flex items-baseline gap-4">
                <span className="t-num font-serif text-[1.5rem] italic text-vermilion-ink">{i + 1}</span>
                <span className="text-[1.1rem] font-medium">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="col-span-12 lg:col-span-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
          <div role="img" aria-label="Example of the teacher's Monday screen: 9 pupils mix up power and energy, with a voice clip, a photo and a quote as evidence, and a suggested ten-minute demo to approve; 5 pupils think current is used up in a bulb; 2 pupils need the teacher; 14 are secure." className="leaf overflow-hidden">
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-white/60 px-5 py-3.5 md:px-7">
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              </div>
              <p className="text-[0.85rem] text-graphite">{sc.context}</p>
            </div>

            <div className="px-5 pb-6 pt-5 md:px-7 md:pb-8">
              <p className="text-[1.25rem] font-semibold tracking-[-0.01em]">{sc.title}</p>

              <div className="mt-4 rounded-[10px] border border-ink/15 bg-white p-4 md:p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="t-num rounded-full bg-vermilion-soft px-2.5 py-0.5 text-[0.85rem] font-semibold text-vermilion-ink">{first.count} pupils</span>
                  <p className="font-semibold">{first.name}</p>
                  <p className="text-[0.9rem] text-graphite">{first.detail}</p>
                </div>
                <ul className="mt-3.5 flex flex-wrap gap-2">
                  {first.evidence?.map((e) => (
                    <li key={e} className="rounded-md border border-ink/12 bg-sheet px-2.5 py-1 text-[0.85rem] text-ink">
                      {e}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-md bg-ultramarine-soft/60 p-3.5">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ultramarine">Suggested move</p>
                  <p className="mt-1 text-[0.95rem]">{first.move}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[0.85rem] font-semibold">
                    <span className="rounded-md bg-ink px-3 py-1.5 text-sheet">Approve</span>
                    <span className="rounded-md border border-ink/20 bg-white px-3 py-1.5">Edit</span>
                    <span className="rounded-md px-3 py-1.5 text-graphite">Skip</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-[10px] border border-ink/15 bg-white px-4 py-3.5 md:px-5">
                <span className="t-num rounded-full bg-ochre-soft px-2.5 py-0.5 text-[0.85rem] font-semibold">{second.count} pupils</span>
                <p className="font-semibold">{second.name}</p>
                <p className="text-[0.9rem] text-graphite">{second.detail}</p>
              </div>

              <div className="mt-5 flex flex-wrap justify-between gap-3 border-t border-ink/10 pt-4 text-[0.9rem]">
                <p className="font-semibold text-vermilion-ink">{sc.needsYou}</p>
                <p className="text-sap">{sc.secure}</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-right text-[1.1rem]">
            <Note ink="graphite" tilt={-2}>
              Example screen. Groups by what to teach, never by score.
            </Note>
          </p>
        </div>
      </div>
    </section>
  );
}
