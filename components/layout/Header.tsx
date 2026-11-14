import { APP_URL, NAV_LINKS, PLATFORM_ENABLED, PLATFORM_LOGIN_HREF, PRIMARY_CTA, SITE_INDEX, SOCIAL_LINKS } from '@/lib/site';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { Logo } from '@/components/ui/Logo';
import { BrushNavGate } from './BrushNavGate';

/**
 * The marketing header (ADR-033). A server component that resolves the links and hands them to `BrushNavGate`,
 * which loads the header (`BrushNav`) only on marketing pages and renders nothing on learning-platform pages
 * (ADR-023, `platformChromeActive`).
 */
export function Header() {
  const signIn = PLATFORM_ENABLED
    ? { label: 'Log in', href: PLATFORM_LOGIN_HREF, external: false }
    : { label: 'Sign in', href: APP_URL, external: true };

  return (
    <BrushNavGate
      logo={<Logo size={30} className="shrink-0 whitespace-nowrap" />}
      links={NAV_LINKS}
      chapters={SITE_INDEX}
      signIn={signIn}
      cta={PRIMARY_CTA}
      email={SITE_CONTACT_EMAIL}
      social={SOCIAL_LINKS.map(({ label, href }) => ({ label, href }))}
    />
  );
}
