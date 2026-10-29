import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FOOTER_NAV, PRIMARY_CTA, SOCIAL_LINKS } from '@/lib/site';
import { SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { CookieSettingsButton } from '@/components/legal/CookieSettingsButton';
import { MarketingOnly } from '@/components/platform/shell/MarketingOnly';

/**
 * The marketing footer (ADR-025, revised 2026-10-29 at the owner's request): the dark ink band with the slogan,
 * the link columns and the legal line, closed by an oversized "SOYL" wordmark that runs the full width and is cut
 * off by the bottom edge. A server component; `MarketingOnly` hides it on learning-platform pages (ADR-023).
 */
export function Footer() {
  const fiveColumns = FOOTER_NAV.length > 4;
  return (
    // Learning-platform pages have their own app shell and footer (ADR-023).
    <MarketingOnly>
    <footer className="cv-auto on-dark overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="tri-stripe" />
      <div className="page grid-12 gap-y-14 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className={cn('col-span-12', fiveColumns ? 'lg:col-span-4' : 'lg:col-span-5')}>
          <p className="font-serif text-[clamp(2rem,3.6vw,3rem)] leading-[1.05] tracking-[-0.02em]">
            Learning that still asks students to <span className="t-accent">think.</span>
          </p>
          <p className="mt-5 max-w-[38ch] text-white/70">
            Interactive assignments for <span className="whitespace-nowrap">Grades 1–10</span>, written from your notes and approved by you.
          </p>
          <ButtonLink href={PRIMARY_CTA.href} variant="inverse" size="lg" className="mt-8" arrow>
            {PRIMARY_CTA.label}
          </ButtonLink>
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
              <h2 className="t-eyebrow mb-5 text-white/55">{col.heading}</h2>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover-line text-[15px] text-white/85 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.heading === 'Legal' && (
                  <li>
                    <CookieSettingsButton className="hover-line text-left text-[15px] text-white/85 hover:text-white" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/15">
        <div className="page t-small flex flex-col gap-4 py-7 text-white/65 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Logo size={24} href={null} className="[&>span]:text-white" />
            <p>
              © {new Date().getFullYear()} {SITE_LEGAL_NAME} · Bengaluru 560043
            </p>
          </div>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="hover-line hover:text-white">
              {SITE_CONTACT_EMAIL}
            </a>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-line hover:text-white"
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
        <p className="-mb-[0.035em] mt-4 whitespace-nowrap bg-gradient-to-b from-white/35 to-white/[0.12] bg-clip-text font-semibold leading-[0.8] tracking-[-0.06em] text-transparent [font-size:41.5cqw]">
          SOYL
        </p>
      </div>
    </footer>
    </MarketingOnly>
  );
}
