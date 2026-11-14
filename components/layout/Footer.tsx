import Link from 'next/link';
import { FOOTER_NAV, PRIMARY_CTA, SOCIAL_LINKS } from '@/lib/site';
import { SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { CookieSettingsButton } from '@/components/legal/CookieSettingsButton';
import { MarketingOnly } from '@/components/platform/shell/MarketingOnly';
import { LazyBrushArt as BrushArt } from '@/components/brush/LazyBrushArt';
import { PALETTE } from '@/components/brush/palette';

/**
 * The marketing footer (ADR-033): the back page of the sketchbook. A pencil storyline with a dab of colour for
 * every mission runs across the top (the Story), then the name spelled out, the link columns and the legal line.
 * A server component; `MarketingOnly` hides it on learning-platform pages (ADR-023).
 */
export function Footer() {
  return (
    <MarketingOnly>
      <footer className="cv-auto overflow-hidden bg-sheet-deep text-ink">
        <BrushArt art="storyline" options={{ dots: 9 }} seed={11} bg={PALETTE.sheetDeep} className="h-24 w-full md:h-32" />

        <div className="page grid-12 gap-y-12 pb-14 pt-6 md:pb-20 md:pt-8">
          <div className="col-span-12 lg:col-span-5">
            <p className="font-serif text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.98] tracking-[-0.025em]">
              <span className="text-ultramarine">S</span>tory <span className="text-vermilion-ink">o</span>f{' '}
              <span className="text-[#9a7414]">Y</span>our <span className="text-sap">L</span>ife.
            </p>
            <p className="mt-5 max-w-[36ch] text-graphite">
              Every mission adds a page to a pupil’s Story: what they can now do, and how they got there.
            </p>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" className="mt-8" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
          </div>

          <nav aria-label="Footer" className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-4">
            {FOOTER_NAV.map((col) => (
              <div key={col.heading}>
                <h2 className="hand mb-4 text-[1.2rem] text-vermilion-ink">{col.heading}</h2>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[15px] text-ink/85 underline-offset-4 hover:text-ink hover:underline hover:decoration-vermilion hover:decoration-2">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {col.heading === 'Legal' && (
                    <li>
                      <CookieSettingsButton className="text-left text-[15px] text-ink/85 underline-offset-4 hover:text-ink hover:underline hover:decoration-vermilion hover:decoration-2" />
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="border-t border-ink/15">
          <div className="page t-small flex flex-col gap-4 py-7 text-graphite md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <Logo size={24} href={null} />
              <p>
                © {new Date().getFullYear()} {SITE_LEGAL_NAME} · Bengaluru 560043
              </p>
            </div>
            <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="hover:text-ink">
                {SITE_CONTACT_EMAIL}
              </a>
              {SOCIAL_LINKS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  {s.label}
                </a>
              ))}
              <span>Photography is illustrative.</span>
            </p>
          </div>
        </div>
      </footer>
    </MarketingOnly>
  );
}
