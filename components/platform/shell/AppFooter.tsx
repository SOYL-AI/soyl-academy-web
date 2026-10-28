/**
 * The platform's quiet app footer (ADR-023): the way back to the main site, the legal links and cookie
 * preferences (the cookie bar must stay reachable on every page). Server component.
 */
import Link from 'next/link';
import { CookieSettingsButton } from '@/components/legal/CookieSettingsButton';
import s from './appshell.module.css';

export function AppFooter() {
  return (
    <footer className={s.footer}>
      <div className={s.footerInner}>
        <p className={s.footerNote}>SOYL Academy · Lessons, practice and tests are free.</p>
        <ul className={s.footerLinks}>
          <li>
            <Link href="/">soylai.com</Link>
          </li>
          <li>
            <Link href="/plans">Plans</Link>
          </li>
          <li>
            <Link href="/privacy">Privacy</Link>
          </li>
          <li>
            <Link href="/terms">Terms</Link>
          </li>
          <li>
            <CookieSettingsButton className={s.footerButton} />
          </li>
        </ul>
      </div>
    </footer>
  );
}
