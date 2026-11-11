import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FOOTER_NAV, PLATFORM_ENABLED, PRIMARY_CTA, SOCIAL_LINKS, START_FREE } from '@/lib/site';
import { SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { Logo } from '@/components/ui/Logo';
import { InkLink } from '@/components/ink/Button';
import { Stroke } from '@/components/ink/Stroke';
import { CookieSettingsButton } from '@/components/legal/CookieSettingsButton';
import { MarketingOnly } from '@/components/platform/shell/MarketingOnly';

/**
 * The marketing footer (ADR-025, revised 2026-10-29 at the owner's request; restyled for ADR-028): the slate band
 * (the night ground of "Ink and wash") with the slogan, the link columns and the legal line, closed by an
 * oversized "SOYL" wordmark that runs the full width and is cut off by the bottom edge. Chalk text, mint for the
 * action. A server component; `MarketingOnly` hides it on learning-platform pages (ADR-023).
 */
export function Footer() {
  const fiveColumns = FOOTER_NAV.length > 4;
  return (
    // Learning-platform pages have their own app shell and footer (ADR-023).
    <MarketingOnly>
    <footer className="on-dark overflow-hidden bg-slate text-chalk">
      <div className="page grid-12 gap-y-14 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className={cn('col-span-12', fiveColumns ? 'lg:col-span-4' : 'lg:col-span-5')}>
          <p className="font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            Learning that still asks students to <span className="t-accent">think.</span>
          </p>
          <Stroke pigment="chalk" width="6.5em" className="mt-3 text-[clamp(2rem,3.6vw,3rem)] opacity-80" />
          {PLATFORM_ENABLED ? (
            <p className="mt-5 max-w-[38ch] text-chalk-muted">
              Free lessons, notes, practice and tests for Classes 7 to 12, and interactive assignments for schools. You only
              ever pay for AI.
            </p>
          ) : (
            <p className="mt-5 max-w-[38ch] text-chalk-muted">
              Interactive assignments for Grades 1 to 10, written from your notes and approved by you.
            </p>
          )}
          <InkLink href={(PLATFORM_ENABLED ? START_FREE : PRIMARY_CTA).href} variant="night" size="lg" className="mt-8" arrow>
            {(PLATFORM_ENABLED ? START_FREE : PRIMARY_CTA).label}
          </InkLink>
        </div>

        <nav
          aria-label="Footer"
          className={cn(
            'col-span-12 grid grid-cols-2 gap-x-6 gap-y-10',
            fiveColumns ? 'sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5' : 'md:grid-cols-4 lg:col-span-7'
          )}
        >
          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              {/* Two lines tall from lg up, set on the baseline, so a heading that wraps ("Future Builders") does not drop its links below the others. */}
              <h2 className="t-eyebrow mb-5 text-chalk-muted lg:flex lg:min-h-[3em] lg:items-end">{col.heading}</h2>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover-line text-[15px] text-chalk/90 hover:text-chalk">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.heading === 'Legal' && (
                  <li>
                    <CookieSettingsButton className="hover-line text-left text-[15px] text-chalk/90 hover:text-chalk" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-chalk-rule">
        <div className="page t-small flex flex-col gap-4 py-7 text-chalk-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Logo size={24} href={null} className="[&>span]:text-chalk" />
            <p>
              © {new Date().getFullYear()} {SITE_LEGAL_NAME} · Bengaluru 560043
            </p>
          </div>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="hover-line hover:text-chalk">
              {SITE_CONTACT_EMAIL}
            </a>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-line hover:text-chalk"
              >
                {s.label}
              </a>
            ))}
            <span>Photography is illustrative.</span>
          </p>
        </div>
      </div>

      {/* The wordmark (decorative: the name is in the logo and the legal line above). Sized to the page width
          (container query units), centred even though its advance box is wider than the page, and resting on the
          footer's bottom edge: the baseline sits on the edge so every letter, including the foot of the L, stays whole. */}
      <div aria-hidden="true" className="page flex select-none justify-center [container-type:inline-size]">
        {/* The letters come from CSS (::before): decoration, not text, for screen readers and contrast checks. */}
        <p className="-mb-[0.035em] mt-4 whitespace-nowrap font-semibold leading-[0.8] tracking-[-0.06em] text-chalk/[0.13] [font-size:41.5cqw] before:content-['SOYL']" />
      </div>
    </footer>
    </MarketingOnly>
  );
}
