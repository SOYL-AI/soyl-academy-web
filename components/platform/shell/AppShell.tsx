'use client';

/**
 * The learning platform's own app shell (ADR-023; replaces the marketing header/footer on platform pages):
 * - top bar: SOYL mark → /learn, primary nav (desktop), streak, SOYL Coins, today's AI credits (consented
 *   members, D-014), theme picker, profile / log in;
 * - mobile (< 768 px): a bottom tab bar, hidden on immersive pages (lesson, flashcards, test player);
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
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: '/learn', label: 'Learn', short: 'Learn', icon: 'book' },
  { href: '/tests', label: 'Tests', short: 'Tests', icon: 'clock' },
  { href: '/ask', label: 'Ask AI', short: 'Ask AI', icon: 'chat' },
  { href: '/leaderboard', label: 'Leaderboard', short: 'Ranks', icon: 'trophy' },
];
const ME_TAB: NavItem = { href: '/me', label: 'Profile', short: 'Me', icon: 'user', also: ['/coins', '/store', '/plans'] };

export function isCurrentSection(pathname: string, item: Pick<NavItem, 'href' | 'also'>): boolean {
  return [item.href, ...(item.also ?? [])].some((h) => pathname === h || pathname.startsWith(`${h}/`));
}

export function AppShell({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const pathname = usePathname() ?? '';
  const focus = isFocusRoute(pathname);
  return (
    <div className={s.shell} data-focus={focus || undefined}>
      <a href="#platform-content" className={s.skip}>
        Skip to page content
      </a>
      <TopBar pathname={pathname} />
      <div id="platform-content" className={s.content} tabIndex={-1}>
        {children}
      </div>
      {footer}
      {!focus && <TabBar pathname={pathname} />}
    </div>
  );
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
        <nav aria-label="Learning platform" className={s.primary}>
          <ul>
            {PRIMARY_NAV.map((n) => {
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
  const items = [...PRIMARY_NAV, ME_TAB];
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
