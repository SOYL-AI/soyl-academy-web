'use client';

/**
 * The learning platform's app shell, design language v3 (ADR-032; first shell ADR-023):
 * - ≥ 1024 px: a left sidebar (icon rail 1024–1279 px, full 248 px from 1280 px) with the SOYL mark, the primary
 *   navigation, today's AI credits (opens the credit guide), the way back to soylai.com and the student's card
 *   (avatar, name, level; links to the profile). Guests get a "save your progress" card instead.
 * - A slim top bar: the SOYL mark (below 1024 px, where there is no sidebar), the page context on wide screens (the
 *   member's class and today's date), then only the streak and SOYL Coins chips, the theme picker and the profile
 *   (or Log in). The AI credits chip shows in the top bar only where credits matter on the page: Ask AI, Plans, the lesson (Explain) and a test result (AI evaluation).
 * - < 1024 px: the bottom tab bar, and the way back to soylai.com as a slim row above the top bar.
 * - Immersive routes (lesson, flashcards, test player, live mock): no sidebar and no tab bar; the top bar keeps the
 *   mark, the soylai.com link (from 768 px) and the chips.
 * - The age stage (stage.ts): `data-stage` on the shell root plus useStage() for pages.
 * - A quiet app footer (server-rendered, passed in) with the way back to the main site and the legal links.
 */
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { CreditChip } from '@/components/platform/ui/kit/CreditChip';
import { AnimalAvatar } from '@/components/platform/ui/kit/AnimalAvatar';
import { Icon, type IconName } from '@/components/platform/ui/kit/Icon';
import { useCredits } from '../ai/CreditsProvider';
import { useSession } from '../auth/SessionProvider';
import { CoinChip } from '../coins/CoinChip';
import { CelebrationHost } from '../celebrate/CelebrationHost';
import { useLearnerProgress } from '../learn/ProgressProvider';
import { useMyAvatar } from '../me/MyAvatarProvider';
import { isFocusRoute } from './chrome';
import { resolveStage } from './stage';
import { StageProvider } from './StageProvider';
import { ThemeToggle } from './ThemeToggle';
import s from './appshell.module.css';

export interface NavItem {
  href: string;
  label: string;
  short: string;
  icon: IconName;
  /** Other prefixes that count as this section. */
  also?: string[];
  /** Prefixes under `href` that belong to another section. */
  except?: string[];
  /** false: never prefetch (a route that may not exist yet: a prefetched 404 RSC request can stay open and keeps the
   *  page from going network-idle). */
  prefetch?: false;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { href: '/learn', label: 'Learn', short: 'Learn', icon: 'book' },
  { href: '/tests', label: 'Tests', short: 'Tests', icon: 'clock' },
  { href: '/ask', label: 'Ask AI', short: 'Ask AI', icon: 'chat' },
  { href: '/leaderboard', label: 'Leaderboard', short: 'Ranks', icon: 'trophy' },
];
/** The student's "today" page (D-043): first for members. */
export const HOME_NAV: NavItem = { href: '/me/dashboard', label: 'Home', short: 'Home', icon: 'home' };
/** The analytics moved off Home (ADR-032): mastery, test scores, focus areas and activity at /me/progress. */
export const PROGRESS_NAV: NavItem = { href: '/me/progress', label: 'Progress', short: 'Progress', icon: 'chart' };
export const ME_TAB: NavItem = { href: '/me', label: 'Profile', short: 'Me', icon: 'user', also: ['/coins', '/store'], except: [HOME_NAV.href, PROGRESS_NAV.href] };

/** Pages where AI credits are the subject: the top bar shows the credits chip there (ADR-032). */
export const CREDIT_CHIP_ROUTES: readonly string[] = ['/ask', '/plans'];

/**
 * Where the top bar shows today's AI credits (ADR-032): where credits are the subject (Ask AI, Plans) and where a
 * student spends them on the page (the lesson's "Explain this slide", a test result's AI evaluation). Elsewhere the
 * sidebar (≥ 1024 px) and the Home credits card carry them.
 */
export function showsCreditChip(pathname: string): boolean {
  if (CREDIT_CHIP_ROUTES.some((h) => under(pathname, h))) return true;
  return /^\/learn\/[^/]+\/[^/]+\/[^/]+\/[^/]+\/lesson(\/|$)/.test(pathname) || /^\/tests\/result\//.test(pathname);
}

const under = (pathname: string, h: string) => pathname === h || pathname.startsWith(`${h}/`);

export function isCurrentSection(pathname: string, item: Pick<NavItem, 'href' | 'also' | 'except'>): boolean {
  if (item.except?.some((h) => under(pathname, h))) return false;
  return [item.href, ...(item.also ?? [])].some((h) => under(pathname, h));
}

/**
 * - `side`: the sidebar (≥ 1024 px). Members: Home, Learn, Tests, Ask AI, Leaderboard, Progress (the profile is the
 *   student card at the bottom). Guests: Learn, Tests, Ask AI, Leaderboard.
 * - `top`: the same without Progress (kept for older callers and tests).
 * - `tabs`: the phone tab bar, always five: for members Home takes the place of Ranks (Home stays lit on
 *   /leaderboard and /me/progress, whose teasers live on Home).
 */
export function navFor(member: boolean, place: 'side' | 'top' | 'tabs'): readonly NavItem[] {
  if (place === 'side') return member ? [HOME_NAV, ...PRIMARY_NAV, PROGRESS_NAV] : PRIMARY_NAV;
  if (place === 'top') return member ? [HOME_NAV, ...PRIMARY_NAV] : PRIMARY_NAV;
  if (!member) return [...PRIMARY_NAV, ME_TAB];
  return [{ ...HOME_NAV, also: ['/leaderboard', PROGRESS_NAV.href] }, ...PRIMARY_NAV.filter((n) => n.href !== '/leaderboard'), ME_TAB];
}

export function AppShell({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const pathname = usePathname() ?? '';
  const focus = isFocusRoute(pathname);
  const { state } = useSession();
  const stage = resolveStage({ pathname, memberClass: state.status === 'member' ? state.user.classLevel : null });
  return (
    <StageProvider stage={stage.stage} classLevel={stage.classLevel} source={stage.source}>
      <div className={s.shell} data-focus={focus || undefined} data-stage={stage.stage} data-testid="app-shell">
        <a href="#platform-content" className={s.skip}>
          Skip to page content
        </a>
        {!focus && <Sidebar pathname={pathname} />}
        <div className={s.column}>
          {!focus && <MainSiteLink variant="row" />}
          <TopBar pathname={pathname} focus={focus} />
          <div id="platform-content" className={s.content} tabIndex={-1}>
            {children}
          </div>
          {footer}
        </div>
        {!focus && <TabBar pathname={pathname} />}
        <CelebrationHost />
      </div>
    </StageProvider>
  );
}

export const MAIN_SITE_LABEL = 'Back to soylai.com, the SOYL main website';

/**
 * Back to the marketing site (owner, 2026-10-28: "once I click on learn there should be an option to go back to the
 * marketing website"). A normal navigation to `/`: the marketing header and footer come back and the platform theme
 * leaves `<html>` (ThemeProvider). `bar`: in the sidebar (or the top bar on immersive pages); `row`: phones.
 */
export function MainSiteLink({ variant }: { variant: 'bar' | 'row' }) {
  const link = (
    <Link
      href="/"
      className={variant === 'bar' ? s.siteLink : s.siteRowLink}
      aria-label={MAIN_SITE_LABEL}
      data-testid={variant === 'bar' ? 'main-site-link' : 'main-site-row-link'}
    >
      <Icon name="chevronLeft" size={16} />
      {/* The label contains the visible text (WCAG 2.5.3): phones show "Back to soylai.com", elsewhere "soylai.com". */}
      <span>{variant === 'bar' ? 'soylai.com' : 'Back to soylai.com'}</span>
    </Link>
  );
  return variant === 'bar' ? link : <div className={s.siteRow}>{link}</div>;
}

function Brand({ className }: { className?: string }) {
  return (
    <Link href="/learn" className={cx(s.brand, className)} aria-label="SOYL Academy, learning home">
      <Image src="/brand/soyl-mark-128.png" alt="" width={32} height={32} className={s.mark} priority />
      <span className={s.brandName} aria-hidden="true">
        SOYL Academy
      </span>
    </Link>
  );
}

/* ── Sidebar (≥ 1024 px) ───────────────────────────────────────────────────── */

function Sidebar({ pathname }: { pathname: string }) {
  const { state, openLogin } = useSession();
  const member = state.status === 'member';
  return (
    <div className={s.sidebar} data-testid="sidebar">
      <div className={s.sideInner}>
        <Brand className={s.sideBrand} />
        <nav aria-label="Learning platform" className={s.sideNav}>
          <ul>
            {navFor(member, 'side').map((n) => {
              const on = isCurrentSection(pathname, n);
              return (
                <li key={n.href}>
                  <Link href={n.href} prefetch={n.prefetch} className={cx(s.sideLink, on && s.sideOn)} aria-current={on ? 'page' : undefined}>
                    <Icon name={n.icon} size={22} />
                    <span className={s.sideLabel}>{n.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className={s.sideBottom}>
          {member && <SidebarCredits />}
          {state.status === 'guest' && (
            <div className={s.guestCard}>
              <p className={s.guestTitle}>Keep your progress</p>
              <p className={s.guestText}>Log in free to save streaks, scores and your place in the league.</p>
              <Button size="sm" block onClick={() => openLogin()}>
                Log in
              </Button>
            </div>
          )}
          <MainSiteLink variant="bar" />
          {member && <SidebarProfile pathname={pathname} />}
        </div>
      </div>
    </div>
  );
}

/** Today's AI credits in the sidebar (members): opens "What can I do with my credits?" (D-044). */
function SidebarCredits() {
  const { credits, aiAllowed, openGuide } = useCredits();
  if (!aiAllowed || !credits) return null;
  return (
    <button type="button" className={s.creditsCard} onClick={() => openGuide?.()} aria-haspopup="dialog" data-testid="sidebar-credits" data-balance={credits.balance}>
      <span className={s.creditsIcon} aria-hidden="true">
        <Icon name="spark" size={18} />
      </span>
      <span className={s.creditsText}>
        <b>{credits.balance}</b>
        <span className={s.creditsWord}> AI credits today</span>
      </span>
      <span className="p-visually-hidden">. What can I do with my credits?</span>
    </button>
  );
}

function SidebarProfile({ pathname }: { pathname: string }) {
  const { state } = useSession();
  const mine = useMyAvatar();
  const { progress } = useLearnerProgress();
  if (state.status !== 'member') return null;
  const name = state.user.displayName?.trim() || 'Student';
  const on = isCurrentSection(pathname, ME_TAB);
  const level = progress?.level;
  const cls = state.user.classLevel ? `Class ${state.user.classLevel}` : null;
  const line = [level ? `Level ${level}` : null, cls].filter(Boolean).join(' · ') || 'Your profile';
  const lp = progress?.levelProgress;
  return (
    <Link href="/me" className={cx(s.profileCard, on && s.profileOn)} aria-current={on ? 'page' : undefined} data-testid="sidebar-profile">
      <AnimalAvatar avatar={mine?.avatar} size={40} decorative />
      <span className={s.profileText}>
        <b>{name}</b>
        <span>{line}</span>
        {typeof lp === 'number' && (
          <span className={s.levelTrack} aria-hidden="true">
            <span style={{ width: `${Math.round(Math.max(0, Math.min(1, lp)) * 100)}%` }} />
          </span>
        )}
      </span>
      <span className="p-visually-hidden">, your profile</span>
    </Link>
  );
}

/* ── Top bar ───────────────────────────────────────────────────────────────── */

function TopBar({ pathname, focus }: { pathname: string; focus: boolean }) {
  const { state, openLogin } = useSession();
  const { credits, aiAllowed, openGuide } = useCredits();
  const mine = useMyAvatar();
  const member = state.status === 'member';
  const showCredits = member && aiAllowed && !!credits && showsCreditChip(pathname);
  return (
    <header className={s.top}>
      <div className={s.stripe} aria-hidden="true" />
      <div className={s.topInner}>
        <Brand className={focus ? s.topBrandFocus : s.topBrand} />
        {focus && <MainSiteLink variant="bar" />}
        {!focus && <TopContext />}
        <div className={s.actions} data-session={state.status}>
          {member && <StreakChip />}
          {member && <CoinChip className={s.coinChip} />}
          {showCredits && credits && (
            <button type="button" className={s.creditLink} data-testid="credit-chip" data-balance={credits.balance} aria-haspopup="dialog" onClick={() => openGuide?.()}>
              <CreditChip balance={credits.balance} resetAt={credits.resetAt} bonusToday={credits.bonusToday ?? 0} />
              <span className="p-visually-hidden">. What can I do with my credits?</span>
            </button>
          )}
          <ThemeToggle />
          {state.status === 'loading' && <span className={s.placeholder} aria-hidden="true" />}
          {state.status === 'guest' && (
            <Button
              size="sm"
              onClick={() => {
                // D-045 interest counter (only after analytics consent); loaded on click, not with every page.
                void import('../lib/interest').then((m) => m.trackInterest('signup_prompt_click', 'header'));
                openLogin();
              }}
              data-testid="login-button"
            >
              Log in
            </Button>
          )}
          {member && (
            <Link href="/me" className={s.profile} data-testid="profile-link">
              <AnimalAvatar avatar={mine?.avatar} size={36} decorative />
              <span className="p-visually-hidden">{state.user.displayName?.trim() || 'Student'}, your profile</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

/** Wide screens: the member's class (a link to its subjects) and today's date. The date renders after mount, so
 *  static pages never carry a stale day. */
function TopContext() {
  const { state } = useSession();
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the date is only known in the browser (static pages)
    setToday(new Intl.DateTimeFormat('en-IN', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Kolkata' }).format(new Date()));
  }, []);
  const user = state.status === 'member' ? state.user : null;
  return (
    <div className={s.context}>
      {user?.board && user.classLevel && (
        <Link href={`/learn/${user.board}/${user.classLevel}`} className={s.classChip} data-testid="class-chip">
          <Icon name="book" size={16} />
          {user.board.toUpperCase()} · Class {user.classLevel}
        </Link>
      )}
      {today && (
        <span className={s.today} data-testid="today">
          <Icon name="calendar" size={16} />
          {today}
        </span>
      )}
    </div>
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

/* ── Tab bar (< 1024 px) ───────────────────────────────────────────────────── */

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
                <span className={s.tabIcon}>
                  <Icon name={n.icon} size={22} />
                </span>
                <span>{n.short}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
