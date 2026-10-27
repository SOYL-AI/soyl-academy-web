import Link from 'next/link';
import { FOOTER_NAV, PRIMARY_CTA, SOCIAL_LINKS } from '@/lib/site';
import { SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { Logo } from '@/components/ui/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { CookieSettingsButton } from '@/components/legal/CookieSettingsButton';

export function Footer() {
  return (
    <footer className="cv-auto on-dark bg-ink text-white">
      <div aria-hidden="true" className="tri-stripe" />
      <div className="page grid-12 gap-y-14 pb-14 pt-16 md:pb-20 md:pt-24">
        <div className="col-span-12 lg:col-span-5">
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

        <nav aria-label="Footer" className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-7">
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
    </footer>
  );
}
