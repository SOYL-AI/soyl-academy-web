'use client';

/**
 * The platform bar under the marketing header (ADR-001: platform pages render inside the marketing
 * header/footer): Learn home link, AI credit chip (placeholder until /v1/credits in M4; shown only when
 * consent is granted, D-014), and log in / profile.
 */
import Link from 'next/link';
import { Button } from '@/components/platform/ui/kit/Button';
import { CreditChip } from '@/components/platform/ui/kit/CreditChip';
import { Avatar } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import s from './shell.module.css';

export function PlatformHeader({ freeDailyCredits }: { freeDailyCredits: number }) {
  const { state, openLogin } = useSession();
  const name = state.status === 'member' ? state.user.displayName?.trim() || 'Student' : '';

  return (
    <div className={s.bar}>
      <nav aria-label="Learning platform" className={s.barInner}>
        <Link href="/learn" className={s.home}>
          <Icon name="book" size={20} />
          <span>Learn</span>
        </Link>
        <div className={s.actions} data-session={state.status}>
          {state.status === 'loading' && <span className={s.placeholder} aria-hidden="true" />}
          {state.status === 'guest' && (
            <Button size="sm" onClick={() => openLogin()} data-testid="login-button">
              Log in
            </Button>
          )}
          {state.status === 'member' && (
            <>
              {state.consent === 'granted' && <CreditChip balance={freeDailyCredits} className={s.credits} />}
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
