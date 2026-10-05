import Link from 'next/link';
import { HeroVisual } from '@/components/sections/HeroVisual';
import { hero } from '@/content/home';

function Arrow() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 group-hover:translate-x-0.5"
    >
      <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Server Component. The headline is plain HTML with CSS-only word-rise, so the
 * text is in the first paint (good for LCP/SEO). Only the visual is client-side.
 */
export function Hero() {
  const words = hero.headline;

  return (
    <section className="relative w-full overflow-x-clip bg-brand-cream pt-12 md:pt-24 pb-10 md:pt-28 md:pb-20 lg:pt-16 md:pt-32">
      <div className="container-default">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="text-eyebrow mb-7 text-brand-black/70 md:mb-9">SOYL Academy</p>

            <h1 className="text-hero mb-8 text-brand-black md:mb-10">
              {words.map((word, i) => (
                <span key={word + i}>
                  <span className="word-mask">
                    <span className="word-rise" style={{ '--i': i } as React.CSSProperties}>
                      {word}
                    </span>
                  </span>{' '}
                </span>
              ))}
              <span className="word-mask is-highlight">
                <span className="word-rise" style={{ '--i': words.length } as React.CSSProperties}>
                  {hero.highlight}
                </span>
              </span>
            </h1>

            <p className="text-lead mb-10 max-w-[36ch] text-brand-black/70 md:mb-12">{hero.support}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="#how-it-works"
                className="group press inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-ink px-6 text-[15px] font-medium text-white hover:bg-cobalt"
              >
                See how SOYL works
                <Arrow />
              </Link>
              <Link
                href="/schools"
                className="group press inline-flex h-12 items-center justify-center gap-2 rounded-sm border border-border-dark px-6 text-[15px] font-medium text-brand-black hover:border-ink"
              >
                For Schools
                <Arrow />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
