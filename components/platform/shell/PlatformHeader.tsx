'use client';

/**
 * The platform bar under the marketing header (ADR-001: platform pages render inside the marketing
 * header/footer): Learn, Tests and Ask links, today's AI credits (GET /v1/credits, ai-gateway M4; shown
 * only when a parent approved AI, D-014; links to the credits history on /me), SOYL Coins (members; links to
 * /coins, ADR-020), and log in / profile.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/platform/ui/kit/Button';
import { CreditChip } from '@/components/platform/ui/kit/CreditChip';
import { Avatar } from '@/components/platform/ui/kit/Display';
import { Icon, type IconName } from '@/components/platform/ui/kit/Icon';
import { cx } from '@/components/platform/ui/cx';
import { useCredits } from '../ai/CreditsProvider';
import { CoinChip } from '../coins/CoinChip';
import { useSession } from '../auth/SessionProvider';
import s from './shell.module.css';

const NAV: { href: string; label: string; icon: IconName }[] = [
  { href: '/learn', label: 'Learn', icon: 'book' },
  { href: '/tests', label: 'Tests', icon: 'clock' },
  { href: '/ask', label: 'Ask AI', icon: 'chat' },
];

export function PlatformHeader() {
  const { state, openLogin } = useSession();
  const { credits, aiAllowed } = useCredits();
  const pathname = usePathname() ?? '';
  const name = state.status === 'member' ? state.user.displayName?.trim() || 'Student' : '';

  return (
    <div className={s.bar}>
      <nav aria-label="Learning platform" className={s.barInner}>
        <ul className={s.navList}>
          {NAV.map((n) => {
            const current = pathname === n.href || pathname.startsWith(`${n.href}/`);
            return (
              <li key={n.href}>
                <Link href={n.href} className={cx(s.home, current && s.navOn)} aria-current={current ? 'page' : undefined}>
                  <Icon name={n.icon} size={20} />
                  <span className={s.navLabel}>{n.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className={s.actions} data-session={state.status}>
          {state.status === 'loading' && <span className={s.placeholder} aria-hidden="true" />}
          {state.status === 'guest' && (
            <Button size="sm" onClick={() => openLogin()} data-testid="login-button">
              Log in
            </Button>
          )}
          {state.status === 'member' && (
            <>
              {aiAllowed && credits && (
                <Link href="/me#credits" className={s.creditLink} data-testid="credit-chip" data-balance={credits.balance}>
                  <CreditChip balance={credits.balance} resetAt={credits.resetAt} className={s.credits} />
                </Link>
              )}
              <CoinChip />
              <Link href="/me" className={s.profile} data-testid="profile-link">
                <Avatar name={name} size={32} decorative />
                <span className={s.profileName}>{name}</span>
                <span className="p-visually-hidden">, your profile</span>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
