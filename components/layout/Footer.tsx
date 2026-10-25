import Link from 'next/link';
import { FOOTER_NAV, PRIMARY_CTA, SOCIAL_LINKS } from '@/lib/site';
import { SITE_CONTACT_EMAIL, SITE_LEGAL_NAME } from '@/lib/seo/config';
import { Logo } from '@/components/notebook/Logo';
import { ButtonLink } from '@/components/notebook/Button';
import { CookieSettingsButton } from '@/components/legal/CookieSettingsButton';

export function Footer() {
  return (
    <footer className="border-t border-rule bg-white">
      <div className="page grid-12 gap-y-12 py-14 md:py-20">
        <div className="col-span-12 lg:col-span-4">
          <Logo size={36} />
          <p className="mt-5 max-w-[34ch] text-muted">
            Interactive assignments for <span className="whitespace-nowrap">Grades 1–10</span>, written from your notes and approved by you.
          </p>
          <ButtonLink href={PRIMARY_CTA.href} className="mt-6" arrow>
            {PRIMARY_CTA.label}
          </ButtonLink>
        </div>

        <nav aria-label="Footer" className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:col-span-8">
          {FOOTER_NAV.map((col) => (
            <div key={col.heading}>
              <h2 className="t-label mb-4 text-ink">{col.heading}</h2>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="t-small text-muted hover:text-ink hover:underline underline-offset-4">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {col.heading === 'Legal' && (
                  <li>
                    <CookieSettingsButton className="t-small text-left text-muted hover:text-ink hover:underline underline-offset-4" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="page t-small flex flex-col gap-3 py-6 text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_LEGAL_NAME} · Bengaluru 560043
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="hover:text-ink hover:underline underline-offset-4">
              {SITE_CONTACT_EMAIL}
            </a>
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink hover:underline underline-offset-4"
              >
                {s.label}
              </a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
