import './parents.css';
import { BrushArt } from '@/components/brush/BrushArt';

/**
 * "Tonight" (/parents, ADR-034): a marked worksheet that turns over, as the scene scrolls, to show the Thoughtprint
 * on its back (`--f` from the scene's `--p`, parents.css). Under reduced motion the two sides cross-fade at the last
 * step. Both sides are examples; no real pupil's work.
 */
export function FlipCard() {
  return (
    <div className="flip h-full w-full">
      <div className="flip-inner">
        {/* Front: the old way */}
        <figure aria-label="Example: a marked worksheet" className="flip-face flip-front ruled shadow-[0_24px_50px_-28px_rgba(31,28,25,0.55)]">
          <div className="flex h-full flex-col pl-14 pr-5 pt-5 md:pl-16 md:pr-8 md:pt-7">
            <p className="flex justify-between text-[0.8rem] text-graphite md:text-[0.85rem]">
              <span>Science · Class 8</span>
              <span>Homework</span>
            </p>
            <ol className="mt-5 space-y-[0.95rem] font-serif text-[0.98rem] leading-[1.05rem] md:mt-7 md:space-y-[1rem] md:text-[1.05rem]">
              {['Define electric power.', 'State the unit of energy.', 'A bulb is 60 W. Find…', 'Convert 2 kW to W.', 'What is 1 unit?'].map((q, i) => (
                <li key={q} className="flex gap-3">
                  <span className="text-graphite">{i + 1}.</span>
                  <span>{q}</span>
                  <span aria-hidden="true" className="ml-auto font-sans text-[1.1rem] font-bold leading-none" style={{ color: 'var(--color-vermilion-ink)' }}>
                    {i === 1 ? '✗' : i === 3 ? '½' : '✓'}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-auto flex items-end justify-between pb-5 md:pb-8">
              <p className="hand max-w-[16ch] rotate-[-3deg] text-[1.15rem] leading-tight md:text-[1.3rem]" style={{ color: 'var(--color-vermilion-ink)' }}>
                Good. Be careful with units.
              </p>
              <p className="pen-ring grid h-20 w-24 place-items-center md:h-24 md:w-28">
                <span className="hand text-[2.1rem] leading-none md:text-[2.5rem]" style={{ color: 'var(--color-vermilion-ink)' }}>
                  7/10
                </span>
              </p>
            </div>
          </div>
        </figure>

        {/* Back: the Thoughtprint */}
        <article aria-label="Example: the Thoughtprint that comes home instead" className="flip-face flip-back bg-[#fffdf8] shadow-[0_24px_50px_-28px_rgba(31,28,25,0.55)]">
          <div className="flex h-full flex-col px-5 pb-5 pt-5 md:px-8 md:pb-7 md:pt-7">
            <p className="t-eyebrow text-[0.7rem] text-graphite md:text-[0.75rem]">Example · Class 8 · Electricity</p>
            <p className="hand mt-3 text-[1.15rem] text-ultramarine md:text-[1.35rem]">Your child can now</p>
            <p className="mt-1 font-serif text-[1.3rem] leading-[1.1] tracking-[-0.015em] md:text-[1.75rem]">
              Explain why a 2 kW heater running for 3 hours uses 6 units.
            </p>
            <div className="relative my-2 min-h-[4.5rem] flex-1">
              <BrushArt art="thoughtprint" options={{ ridges: 13, blooms: true, weight: 0.85 }} seed={31} bg="#fffdf8" className="absolute inset-0" />
            </div>
            <dl className="divide-y divide-ink/10 border-t border-ink/10 text-[0.9rem] md:text-[0.98rem]">
              <div className="py-2.5 md:py-3">
                <dt className="text-[0.78rem] font-semibold text-graphite">Best moment</dt>
                <dd className="mt-0.5">Worked out why the bill doubled, then explained it out loud.</dd>
              </div>
              <div className="py-2.5 md:py-3">
                <dt className="text-[0.78rem] font-semibold text-graphite">Found and fixed</dt>
                <dd className="mt-0.5 font-medium text-sap">Mixed up two ideas at the start. Sorted by the end.</dd>
              </div>
              <div className="hidden py-3 md:block">
                <dt className="text-[0.78rem] font-semibold text-graphite">Your teacher says</dt>
                <dd className="mt-0.5">“Ask them to explain your electricity bill.”</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </div>
  );
}
