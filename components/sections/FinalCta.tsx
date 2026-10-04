import Link from 'next/link';
import { finalCta } from '@/content/home';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { DrawnUnderline } from '@/components/motion/DrawnUnderline';

/**
 * Section 10 — the close. One statement, two ways forward. Nothing else.
 */
export function FinalCta() {
  return (
    <section className="w-full bg-brand-tan section-padding-lg">
      <div className="container-default">
        <ScrollReveal>
          <h2 className="text-manifesto mb-14 max-w-[13ch] text-brand-black md:mb-20">
            Build learning{' '}
            <span className="relative inline-block whitespace-nowrap">
              worth doing.
              <DrawnUnderline className="pointer-events-none absolute -bottom-[0.12em] left-0 h-[0.14em] w-full text-brand-red" />
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href={finalCta.primary.href}
              className="group press inline-flex h-14 items-center justify-center gap-2 rounded-sm bg-brand-black px-8 text-[17px] font-medium text-brand-cream hover:bg-brand-black/80"
            >
              {finalCta.primary.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              href={finalCta.secondary.href}
              className="link-underline press inline-flex h-14 items-center text-[17px] font-medium text-brand-black"
            >
              {finalCta.secondary.label}
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
