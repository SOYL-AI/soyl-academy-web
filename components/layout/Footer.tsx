import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FOOTER_NAV, PLATFORM_ENABLED, PRIMARY_CTA, SOCIAL_LINKS } from '@/lib/site';
import { SITE_CONTACT_EMAIL, SITE_LEGAL_NAME, SITE_TAGLINE } from '@/lib/seo/config';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { CookieSettingsButton } from '@/components/legal/CookieSettingsButton';
import { MarketingOnly } from '@/components/platform/shell/MarketingOnly';
import { NavIcon } from './NavIcon';

/**
 * The marketing footer (ADR-025): a rounded call-to-action band in the brand colours, then a calm, light
 * footer with a brand block (wordmark, tagline, social links, contact, legal line) and small-caps link
 * columns. A server component; `MarketingOnly` hides it on learning-platform pages (ADR-023).
 */
export function Footer() {
  return (
    // Learning-platform pages have their own app shell and footer (ADR-023).
    <MarketingOnly>
      <footer className="cv-auto border-t border-rule bg-paper/40">
        <div className="page pt-12 md:pt-20">
          <div className="on-dark relative isolate overflow-hidden rounded-[28px] bg-cobalt px-6 py-12 text-white sm:px-10 md:rounded-[36px] md:px-14 md:py-20">
            <div aria-hidden="true" className="tri-stripe absolute inset-x-0 top-0" />
            {/* Brand shapes (decorative): a highlighter disc, a red-pen quarter and two drawn rings. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[44%] md:block">
              <span className="absolute -right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full border border-white/20" />
              <span className="absolute -right-8 top-1/2 h-[17rem] w-[17rem] -translate-y-1/2 rounded-full border border-white/25" />
              <span className="absolute right-20 top-14 h-28 w-28 rounded-full bg-highlighter" />
              <span className="absolute bottom-0 right-48 h-24 w-24 rounded-tl-full bg-red-pen" />
            </div>
            <span aria-hidden="true" className="absolute -right-8 -top-8 -z-10 h-24 w-24 rounded-full bg-highlighter md:hidden" />

            <div className="max-w-[40rem]">
              <p className="t-eyebrow text-white/85">For schools</p>
              <h2 className="t-headline mt-5">
                Bring future-ready learning to your <span className="t-accent">school.</span>
              </h2>
              <p className="mt-5 max-w-[42ch] text-[1.0625rem] leading-relaxed text-white/90 md:text-lg">
                Interactive assignments for <span className="whitespace-nowrap">Grades 1–10</span>, written from your notes and approved by you.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={PRIMARY_CTA.href} variant="inverse" size="lg" arrow>
                  {PRIMARY_CTA.label}
                </ButtonLink>
                {PLATFORM_ENABLED && (
                  <ButtonLink href="/learn" variant="outline-inverse" size="lg">
                    Start learning free
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="page grid-12 gap-y-14 pb-12 pt-16 md:pb-16 md:pt-20">
          <div className="col-span-12 lg:col-span-3">
            <Logo size={34} />
            <p className="mt-4 font-serif text-[1.375rem] leading-snug text-ink">{SITE_TAGLINE}.</p>

            <p className="t-label mt-9 text-muted">Find us at</p>
            <ul className="mt-3 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`SOYL Academy on ${s.label} (opens in a new tab)`}
                    className="press grid h-11 w-11 place-items-center rounded-full border border-rule-strong bg-white text-ink hover:border-ink hover:bg-highlighter"
                  >
                    <NavIcon name={s.icon} size={20} />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${SITE_CONTACT_EMAIL}`}
              className="hover-line mt-5 inline-flex items-center gap-2 py-1 text-[15px] font-medium text-ink"
            >
              <NavIcon name="mail" size={18} className="text-muted" />
              {SITE_CONTACT_EMAIL}
            </a>

            <div className="t-small mt-9 max-w-[34ch] border-t border-rule pt-5 text-muted">
              <p>
                © {new Date().getFullYear()} {SITE_LEGAL_NAME}. Bengaluru, Karnataka 560043
              </p>
              <p className="mt-1.5">Photography is illustrative.</p>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className={cn(
              'col-span-12 grid grid-cols-2 gap-x-6 gap-y-11 sm:grid-cols-3 lg:col-span-9',
              PLATFORM_ENABLED ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
            )}
          >
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <h2 className="t-eyebrow mb-5 text-muted">{col.heading}</h2>
                <ul className="space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="hover-line text-[15px] text-ink/80 hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {col.heading === 'Legal' && (
                    <li>
                      <CookieSettingsButton className="hover-line text-left text-[15px] text-ink/80 hover:text-ink" />
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div aria-hidden="true" className="tri-stripe" />
      </footer>
    </MarketingOnly>
  );
}
