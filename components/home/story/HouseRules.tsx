import { promises } from '@/content/story';
import { renames } from '@/content/home';
import { Kinetic } from '@/components/story/Kinetic';
import { Marked, Note } from '@/components/brush/marks';

/**
 * After the story (ADR-034): the new words (the spec's three renames) and the house rules, written on a ruled page
 * and signed. Unpinned; marks trace in as it scrolls into view.
 */
export function HouseRules() {
  return (
    <section className="bg-sheet">
      <div className="page grid-12 gap-y-14 py-20 md:py-28">
        <div className="col-span-12 lg:col-span-5">
          <p className="hand text-[1.3rem] text-vermilion-ink">A new vocabulary</p>
          <Kinetic as="h2" text="Same school day. New words for it." className="t-headline mt-2 max-w-[16ch]" />
          <dl className="mt-8 divide-y divide-ink/15 border-y border-ink/15" data-reveal="fade">
            {renames.map((r) => (
              <div key={r.now} className="grid grid-cols-[1fr_auto_1fr] items-baseline gap-3 py-4">
                <dt className="text-graphite">
                  <Marked mark="strike" ink="vermilion">
                    {r.old}
                  </Marked>
                </dt>
                <span aria-hidden="true" className="text-graphite">
                  →
                </span>
                <dd className="font-serif text-[1.5rem] leading-none">{r.now}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <div className="ruled relative rotate-[0.8deg] bg-[#fdfaf3] px-6 pb-10 pt-8 shadow-[0_30px_60px_-34px_rgba(31,28,25,0.5)] md:px-10" data-reveal="fade">
            <span aria-hidden="true" className="tape absolute -top-3 right-12 h-6 w-24 rotate-[4deg]" />
            <h2 className="font-serif text-[1.9rem] leading-tight">{promises.heading}</h2>
            <p className="mt-1 text-graphite">{promises.intro}</p>
            <ol className="mt-6 space-y-3">
              {promises.rules.map((r, i) => (
                <li key={r} className="flex items-baseline gap-4 font-serif text-[1.3rem] leading-snug md:text-[1.45rem]">
                  <span className="hand w-6 text-[1.1rem] text-vermilion-ink">{i + 1}.</span>
                  {r}
                </li>
              ))}
            </ol>
            <p className="mt-8 text-right">
              <Note ink="ultramarine" tilt={-4} className="text-[1.8rem]">
                — {promises.signed}
              </Note>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
