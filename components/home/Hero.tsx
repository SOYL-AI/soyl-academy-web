import { hero, renames } from '@/content/home';
import { PRIMARY_CTA } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { BrushArt } from '@/components/brush/BrushArt';
import { Arrow, Marked, Note } from '@/components/brush/marks';

/**
 * The opener (ADR-033). The headline is plain server HTML (the LCP element); "assignments" is struck through in
 * vermilion as the page loads. On the right a Thoughtprint draws itself ridge by ridge with p5.brush, seeded per
 * visit, so no two visitors see the same one. Below, the three renames from the spec's cover.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="page grid-12 items-center gap-y-6 pb-4 pt-8 md:pt-12 lg:pb-10 lg:pt-14">
        <div className="col-span-12 lg:col-span-7">
          <div className="rise">
            <Label tone="red" className="mb-6 md:mb-8">
              {hero.label}
            </Label>
          </div>
          <h1 className="t-display rise max-w-[12ch]" style={{ '--d': '60ms' } as React.CSSProperties}>
            {hero.before}{' '}
            <Marked mark="strike" ink="vermilion" load delay={650} className="text-graphite">
              {hero.struck}
            </Marked>{' '}
            {hero.to}{' '}
            <span className="t-accent">
              <Marked mark="under" ink="ultramarine" load delay={1250} weight={4.5}>
                {hero.word}
              </Marked>
            </span>
          </h1>
          {/* Static on purpose: on phones this paragraph can be the LCP element. */}
          <p className="t-lead mt-7 max-w-[44ch] text-graphite md:mt-9">{hero.support}</p>
          <div className="rise mt-8 flex flex-wrap items-center gap-3 md:mt-10" style={{ '--d': '380ms' } as React.CSSProperties}>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <div className="relative col-span-12 lg:col-span-5">
          <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[520px]">
            <BrushArt art="thoughtprint" options={{}} seed="visit" stepMs={55} eager className="absolute inset-0" />
          </div>
          <p className="absolute bottom-0 left-0 hidden max-w-[17ch] text-[1.15rem] sm:block lg:-left-6 lg:bottom-6">
            <Note ink="graphite" tilt={-4}>
              {hero.note}
            </Note>
            <Arrow to="right" ink="graphite" load delay={2600} className="mt-1 h-8 w-24" />
          </p>
        </div>
      </div>

      <div className="page pb-6 md:pb-10">
        <ul className="grid gap-x-8 gap-y-5 border-y-2 border-ink py-6 md:grid-cols-3 md:py-7">
          {renames.map((r, i) => (
            <li key={r.now} className="rise flex flex-col gap-1.5" style={{ '--d': `${500 + i * 90}ms` } as React.CSSProperties}>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <Marked mark="strike" ink="vermilion" weight={2.5} load delay={1600 + i * 220} className="text-[1.05rem] text-graphite">
                  {r.old}
                </Marked>
                <svg width="28" height="14" viewBox="0 0 28 14" fill="none" aria-hidden="true" className="translate-y-0.5 text-graphite">
                  <path d="M2 8 C 9 6, 16 8.5, 25 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M20 2.5 L 25.5 7 L 20 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="font-serif text-[1.75rem] leading-none tracking-[-0.015em]">{r.now}</span>
              </p>
              <p className="text-[0.95rem] leading-snug text-graphite">{r.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
