'use client';

/**
 * Login prompt (CONTEXT §5: "a friendly modal that explains the benefit; after login the student returns
 * exactly where they were"). Bottom sheet on phones, dialog on wider screens (UI kit). Google, phone OTP
 * and email OTP (ARCHITECTURE §5). Loaded lazily by SessionProvider, so pages pay nothing until it opens.
 * Only the methods the API has enabled are shown (GET /v1/auth/methods, public and cacheable); if that call
 * fails, all three stay visible (the API refuses a disabled method anyway).
 */
import { useEffect, useState, useSyncExternalStore } from 'react';
import type { AuthMethods, SignInResponse } from '@/platform/shared/api-client';
import { api } from '../lib/api-browser';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { Tabs } from '@/components/platform/ui/kit/Tabs';
import { googleStartUrl } from '../lib/return-to';
import { OtpForm, type OtpChannel } from './OtpForm';
import s from './auth.module.css';

export interface LoginSheetProps {
  open: boolean;
  reason?: string;
  initialError?: string;
  returnTo: string;
  onClose: () => void;
  onSignedIn: (res: SignInResponse, returnTo: string) => void | Promise<void>;
}

const NARROW = '(max-width: 639px)';

function useNarrow(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(NARROW);
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    },
    () => window.matchMedia(NARROW).matches,
    () => true,
  );
}

export const LOGIN_BENEFITS = [
  'Keep your progress on every device',
  'Take chapter tests and mock papers, free',
  'Earn XP and keep your streak',
  'Get free AI help every day',
] as const;

type Method = AuthMethods['methods'][number];
const ALL_METHODS: Method[] = ['phone', 'email', 'google'];

/** Enabled methods in display order; null until known. */
function useAuthMethods(): Method[] | null {
  const [methods, setMethods] = useState<Method[] | null>(null);
  useEffect(() => {
    let alive = true;
    api
      .get('/v1/auth/methods')
      .then((res) => alive && setMethods(res.methods.filter((m) => ALL_METHODS.includes(m))))
      .catch(() => alive && setMethods(ALL_METHODS));
    return () => {
      alive = false;
    };
  }, []);
  return methods;
}

export function LoginSheet({ open, reason, initialError, returnTo, onClose, onSignedIn }: LoginSheetProps) {
  const narrow = useNarrow();
  const enabled = useAuthMethods() ?? ALL_METHODS;
  const otpMethods = enabled.filter((m): m is OtpChannel => m === 'phone' || m === 'email');
  const google = enabled.includes('google');
  const [chosen, setMethod] = useState<OtpChannel>('phone');
  const method: OtpChannel = otpMethods.includes(chosen) ? chosen : (otpMethods[0] ?? 'phone');
  const [error, setError] = useState<string | undefined>(initialError);
  const [leaving, setLeaving] = useState(false);
  const otpForm = (channel: OtpChannel) =>
    channel === 'phone' ? (
      <OtpForm
        channel="phone"
        returnTo={returnTo}
        onSignedIn={onSignedIn}
        onSuggestOther={() => setError(otherMethodsHint(otpMethods.includes('email'), google))}
      />
    ) : (
      <OtpForm channel="email" returnTo={returnTo} onSignedIn={onSignedIn} />
    );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      variant={narrow ? 'sheet' : 'modal'}
      title="Log in to SOYL Academy"
      description={reason ?? 'Learning is free. Logging in saves your progress and unlocks free tests.'}
      dismissOnBackdrop={false}
      className={s.sheet}
    >
      <ul className={s.benefits}>
        {LOGIN_BENEFITS.map((b) => (
          <li key={b}>
            <Icon name="check" size={18} />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {error && (
        <p className={s.formError} role="alert">
          {error}
        </p>
      )}

      {google && (
        <Button
          variant="secondary"
          block
          loading={leaving}
          onClick={() => {
            setLeaving(true);
            window.location.assign(googleStartUrl(returnTo));
          }}
        >
          <GoogleMark /> Continue with Google
        </Button>
      )}

      {google && otpMethods.length > 0 && (
        <p className={s.divider}>
          <span>or get a one-time code</span>
        </p>
      )}

      {otpMethods.length > 1 ? (
        <Tabs
          label="Sign-in method"
          value={method}
          onChange={(id) => {
            setMethod(id as OtpChannel);
            setError(undefined);
          }}
          tabs={otpMethods.map((m) => ({ id: m, label: m === 'phone' ? 'Phone' : 'Email', content: otpForm(m) }))}
        />
      ) : (
        otpMethods.length === 1 && otpForm(otpMethods[0]!)
      )}
      {otpMethods.length === 0 && !google && (
        <p className={s.formError} role="alert">
          Sign-in is not available right now. Please try again later.
        </p>
      )}

      <p className={s.legal}>
        By continuing you agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy policy</a>. Under 18? A parent will be asked to approve AI and leaderboard features.
      </p>
    </Dialog>
  );
}

/** What to suggest when SMS codes are paused: only methods that are enabled. */
export function otherMethodsHint(email: boolean, google: boolean): string {
  const other = email && google ? 'email or Google' : email ? 'email' : google ? 'Google' : '';
  return other ? `SMS codes are paused for a short while. Use ${other} instead.` : 'SMS codes are paused for a short while. Please try again soon.';
}

/** Google "G" drawn inline (no remote image, WEB-1). */
function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
