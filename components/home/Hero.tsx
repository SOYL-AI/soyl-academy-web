import { hero } from '@/content/home';
import { images } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { Drawn, RiseWords } from '@/components/motion/Text';

const headlineWords = hero.headline.split(' ').length;

/**
 * Server Component. The headline is plain HTML in the first paint; its words
 * rise in with CSS only. The photograph is the preloaded LCP candidate and only
 * ever animates `transform`.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="page grid-12 items-center gap-y-12 pb-6 pt-10 md:pb-10 md:pt-16 lg:pb-12 lg:pt-20">
        <div className="col-span-12 lg:col-span-6 lg:pr-4">
          <div className="rise">
            <Label tone="blue" className="mb-7 md:mb-9">{hero.label}</Label>
          </div>
          <h1 className="t-display max-w-[11ch]">
            <RiseWords text={hero.headline} />{' '}
            <span className="t-accent">
              <Drawn trigger="load">
                <RiseWords text={hero.highlight} start={headlineWords} />
              </Drawn>
            </span>
          </h1>
          {/* Static on purpose: on phones this paragraph is the LCP element. */}
          <p className="t-lead mt-8 max-w-[46ch] md:mt-10">
            {hero.support}
          </p>
          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ '--d': '480ms' } as React.CSSProperties}>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href={hero.secondary.href} variant="secondary" size="lg">
              {hero.secondary.label}
            </ButtonLink>
          </div>
          <ul className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2" style={{ '--d': '580ms' } as React.CSSProperties}>
            {hero.points.map((p, i) => (
              <li key={p} className="t-small flex items-center gap-2 text-muted">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  className={['rounded-full bg-cobalt p-1 text-white', 'rounded-full bg-red-pen p-1 text-white', 'rounded-full bg-highlighter p-1 text-ink'][i % 3]}
                >
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <div className="relative pb-10 sm:pb-12 lg:pb-0">
            <Photo
              backdrop="yellow"
              image={images.heroCollab}
              priority
              settle
              large
              aspect="aspect-[4/3] lg:aspect-[5/6]"
              sizes="(min-width: 1320px) 600px, (min-width: 1024px) 48vw, 100vw"
            />

            {/* Illustration of a SOYL question, not a real pupil's result. */}
            <div
              role="img"
              aria-label="Illustration of a SOYL question: two attempts marked not yet, a third marked correct, and the line You worked it out, 3 tries, 1 hint"
              className="rise absolute bottom-0 left-3 right-3 sm:left-6 sm:right-auto sm:w-[22rem] lg:-left-10 lg:bottom-10"
              style={{ '--d': '700ms' } as React.CSSProperties}
            >
              <div className="float rounded-[var(--radius-md)] border border-rule bg-white p-4 shadow-[0_24px_48px_-24px_rgba(20,20,20,0.35)] md:p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="t-label text-muted">Question 3 · Coordinates</p>
                  <p className="t-label text-muted">Plot (3, −2)</p>
                </div>
                <ol className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
                  {['(−2, 3)', '(3, 2)'].map((a) => (
                    <li key={a} className="t-num inline-flex h-8 items-center gap-1 rounded-full border border-rule-strong px-2.5 text-[14px]">
                      <span className="text-red-pen">✗</span> {a}
                    </li>
                  ))}
                  <li className="t-num inline-flex h-8 items-center gap-1 rounded-full bg-success px-2.5 text-[14px] text-white">
                    ✓ (3, −2)
                  </li>
                </ol>
                <p className="mt-3 font-semibold text-success">
                  You worked it out <span className="t-num font-medium text-ink">· 3 tries · 1 hint</span>
                </p>
              </div>
            </div>

            <p
              aria-hidden="true"
              className="rise absolute -top-4 right-3 hidden md:block lg:-right-3 lg:top-8"
              style={{ '--d': '850ms' } as React.CSSProperties}
            >
              <span className="float block -rotate-6 rounded-full bg-highlighter t-accent px-4 py-2 text-[1.2rem] text-ink [animation-delay:-3s]">
                Thinking is the work.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
