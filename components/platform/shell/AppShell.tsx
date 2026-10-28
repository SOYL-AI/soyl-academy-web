'use client';

/**
 * The learning platform's own app shell (ADR-023; replaces the marketing header/footer on platform pages):
 * - the way back to the main site (owner, 2026-10-28): "‹ soylai.com" in the top bar from 768 px; below that a
 *   slim row above the top bar (the phone top bar is full for members), never sticky, also for guests;
 * - top bar: SOYL mark → /learn (the academy home), primary nav (≥ 1024 px; members: Home first), streak,
 *   SOYL Coins, today's AI credits (consented members, D-014), theme picker, profile / log in;
 * - phones and tablets (< 1024 px): a bottom tab bar, hidden on immersive pages (lesson, flashcards, test player);
 * - a quiet app footer (server-rendered, passed in) with the way back to the main site and the legal links.
 */
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { CreditChip } from '@/components/platform/ui/kit/CreditChip';
import { Avatar } from '@/components/platform/ui/kit/Display';
import { Icon, type IconName } from '@/components/platform/ui/kit/Icon';
import { useCredits } from '../ai/CreditsProvider';
import { useSession } from '../auth/SessionProvider';
import { CoinChip } from '../coins/CoinChip';
import { useLearnerProgress } from '../learn/ProgressProvider';
import { isFocusRoute } from './chrome';
import { ThemeToggle } from './ThemeToggle';
import s from './appshell.module.css';

interface NavItem {
  href: string;
  label: string;
  short: string;
  icon: IconName;
  /** Other prefixes that count as this section. */
  also?: string[];
  /** Prefixes under `href` that belong to another section. */
  except?: string[];
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: '/learn', label: 'Learn', short: 'Learn', icon: 'book' },
  { href: '/tests', label: 'Tests', short: 'Tests', icon: 'clock' },
  { href: '/ask', label: 'Ask AI', short: 'Ask AI', icon: 'chat' },
  { href: '/leaderboard', label: 'Leaderboard', short: 'Ranks', icon: 'trophy' },
];
/** The student dashboard (D-043): first for members. */
export const HOME_NAV: NavItem = { href: '/me/dashboard', label: 'Home', short: 'Home', icon: 'home' };
const ME_TAB: NavItem = { href: '/me', label: 'Profile', short: 'Me', icon: 'user', also: ['/coins', '/store'], except: [HOME_NAV.href] };

const under = (pathname: string, h: string) => pathname === h || pathname.startsWith(`${h}/`);

export function isCurrentSection(pathname: string, item: Pick<NavItem, 'href' | 'also' | 'except'>): boolean {
  if (item.except?.some((h) => under(pathname, h))) return false;
  return [item.href, ...(item.also ?? [])].some((h) => under(pathname, h));
}

/**
 * Top bar: members get Home (the dashboard) first. Mobile tab bar: always five tabs; for members Home takes the
 * place of Ranks (the dashboard carries the weekly-league teaser, so Home stays lit on /leaderboard).
 */
export function navFor(member: boolean, place: 'top' | 'tabs'): readonly NavItem[] {
  if (place === 'top') return member ? [HOME_NAV, ...PRIMARY_NAV] : PRIMARY_NAV;
  if (!member) return [...PRIMARY_NAV, ME_TAB];
  return [{ ...HOME_NAV, also: ['/leaderboard'] }, ...PRIMARY_NAV.filter((n) => n.href !== '/leaderboard'), ME_TAB];
}

export function AppShell({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const pathname = usePathname() ?? '';
  const focus = isFocusRoute(pathname);
  return (
    <div className={s.shell} data-focus={focus || undefined}>
      <a href="#platform-content" className={s.skip}>
        Skip to page content
      </a>
      {!focus && <MainSiteLink variant="row" />}
      <TopBar pathname={pathname} />
      <div id="platform-content" className={s.content} tabIndex={-1}>
        {children}
      </div>
      {footer}
      {!focus && <TabBar pathname={pathname} />}
    </div>
  );
}

/**
 * Back to the marketing site (owner, 2026-10-28: "once I click on learn there should be an option to go back to the
 * marketing website"). A normal navigation to `/`: the marketing header and footer come back and the platform theme
 * leaves `<html>` (ThemeProvider). Accessible name "Back to soylai.com, the SOYL main website" (it contains the
 * visible text, WCAG 2.5.3).
 */
export function MainSiteLink({ variant }: { variant: 'bar' | 'row' }) {
  const link = (
    <Link href="/" className={variant === 'bar' ? s.siteLink : s.siteRowLink} data-testid={variant === 'bar' ? 'main-site-link' : 'main-site-row-link'}>
      <Icon name="chevronLeft" size={16} />
      {/* Phones show "Back to soylai.com"; the top bar shows "soylai.com" (same accessible name). */}
      <span>
        <span className={variant === 'bar' ? 'p-visually-hidden' : undefined}>Back to</span> soylai.com
        <span className="p-visually-hidden">, the SOYL main website</span>
      </span>
    </Link>
  );
  return variant === 'bar' ? link : <div className={s.siteRow}>{link}</div>;
}

function TopBar({ pathname }: { pathname: string }) {
  const { state, openLogin } = useSession();
  const { credits, aiAllowed } = useCredits();
  const name = state.status === 'member' ? state.user.displayName?.trim() || 'Student' : '';
  return (
    <header className={s.top}>
      <div className={s.stripe} aria-hidden="true" />
      <div className={s.topInner}>
        <Link href="/learn" className={s.brand} aria-label="SOYL Academy, learning home">
          <Image src="/brand/soyl-mark-128.png" alt="" width={30} height={30} className={s.mark} priority />
          <span className={s.brandName} aria-hidden="true">SOYL Academy</span>
        </Link>
        <MainSiteLink variant="bar" />
        <nav aria-label="Learning platform" className={s.primary}>
          <ul>
            {navFor(state.status === 'member', 'top').map((n) => {
              const on = isCurrentSection(pathname, n);
              return (
                <li key={n.href}>
                  <Link href={n.href} className={cx(s.navLink, on && s.navOn)} aria-current={on ? 'page' : undefined}>
                    <Icon name={n.icon} size={18} />
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={s.actions} data-session={state.status}>
          {state.status === 'member' && <StreakChip />}
          {state.status === 'member' && <CoinChip className={s.coinChip} />}
          {state.status === 'member' && aiAllowed && credits && (
            <Link href="/me#credits" className={s.creditLink} data-testid="credit-chip" data-balance={credits.balance}>
              <CreditChip balance={credits.balance} resetAt={credits.resetAt} />
            </Link>
          )}
          <ThemeToggle />
          {state.status === 'loading' && <span className={s.placeholder} aria-hidden="true" />}
          {state.status === 'guest' && (
            <Button size="sm" onClick={() => openLogin()} data-testid="login-button">
              Log in
            </Button>
          )}
          {state.status === 'member' && (
            <Link href="/me" className={s.profile} data-testid="profile-link">
              <Avatar name={name} size={32} decorative />
              <span className={s.profileName}>{name}</span>
              <span className="p-visually-hidden">, your profile</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

/** Daily streak (GET /v1/me/progress → totals.streak); dimmed when today's activity is still missing. */
export function StreakChip() {
  const { progress } = useLearnerProgress();
  const streak = progress?.streak;
  if (!streak) return null;
  const n = streak.current;
  return (
    <Link href="/me#activity" className={cx(s.streak, (n === 0 || streak.atRisk) && s.streakCold)} data-testid="streak-chip" data-streak={n}>
      <Icon name="flame" size={18} className={s.flame} />
      <span aria-hidden="true">{n}</span>
      <span className="p-visually-hidden">
        {n}-day streak{streak.atRisk ? ', learn something today to keep it' : ''}
      </span>
    </Link>
  );
}

function TabBar({ pathname }: { pathname: string }) {
  const { state } = useSession();
  const items = navFor(state.status === 'member', 'tabs');
  return (
    <nav aria-label="Learning platform" className={s.tabs}>
      <ul>
        {items.map((n) => {
          const on = isCurrentSection(pathname, n);
          return (
            <li key={n.href}>
              <Link href={n.href} className={cx(s.tab, on && s.tabOn)} aria-current={on ? 'page' : undefined}>
                <Icon name={n.icon} size={22} />
                <span>{n.short}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
