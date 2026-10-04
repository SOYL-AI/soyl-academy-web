import Image from 'next/image';
import Link from 'next/link';
import { audiences } from '@/content/home';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { TiltCard } from '@/components/motion/TiltCard';

/**
 * Section 7 — three doors, not three sections. One line each; the detail
 * lives on the destination page. Server Component; only the tilt wrapper and
 * reveal are client-side.
 */
export function AudienceEntryPoints() {
  return (
    <section className="w-full bg-brand-cream section-padding">
      <div className="container-default">
        <ScrollReveal>
          <h2 className="text-display mb-14 max-w-[14ch] text-brand-black md:mb-20">{audiences.headline}</h2>
        </ScrollReveal>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-5">
          {audiences.items.map((item, i) => (
            <li key={item.id}>
              <ScrollReveal delay={i * 0.08}>
                <TiltCard>
                  <Link
                    href={item.href}
                    className="group block rounded-xl focus-visible:outline-offset-4"
                  >
                    <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-xl bg-brand-black/5">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-subhead mb-2 text-brand-black">{item.label}</h3>
                        <p className="text-body max-w-[26ch] text-brand-black/70">{item.line}</p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="press mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-black/20 text-brand-black group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-brand-cream"
                      >
                        <svg width="15" height="15" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
