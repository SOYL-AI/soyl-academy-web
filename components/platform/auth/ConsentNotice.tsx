'use client';

/**
 * Parental approval state (D-052, API-11). Until consent is `granted` only buying a paid plan (and merch
 * delivery) is off; learning, practice, tests, AI help and leaderboards stay open (CONSENT_REQUIRED). POST /v1/me/consent/start starts an external consent flow (mock locally, OA-08). With the
 * built-in provider (D-039) /me shows ConsentFlow instead; this card stays for external providers.
 */
import { useState } from 'react';
import type { ConsentState } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, Card, CardTitle } from '@/components/platform/ui/kit/Display';
import { api } from '../lib/api-browser';
import { problemMessage } from '../lib/problems';
import s from '../me/me.module.css';

const TEXT: Record<ConsentState, { badge: string; tone: 'success' | 'warning' | 'neutral'; body: string }> = {
  granted: { badge: 'Approved', tone: 'success', body: 'A parent has approved your account. You can buy a paid plan whenever they are on sale.' },
  pending: { badge: 'Waiting for a parent', tone: 'warning', body: 'We have asked a parent to approve your account. You can buy a paid plan once they do.' },
  required: { badge: 'Not yet', tone: 'neutral', body: 'A parent approves your account only if you want to buy a paid plan. Lessons, practice, tests, AI help and leaderboards are open now.' },
  revoked: { badge: 'Approval withdrawn', tone: 'neutral', body: 'A parent withdrew approval, so paid plans cannot be bought. Lessons, practice, tests, AI help and leaderboards stay open.' },
};

/** Inline note for a feature that needs approval (D-039: the flow lives on /me/consent). */
export function ConsentGateNote({ feature }: { feature: string }) {
  return (
    <p className={s.muted} role="note">
      {feature} needs approval first. <a href="/me/consent">Ask a parent to approve</a> (or approve it yourself if you are 18 or older). Lessons, practice, tests and AI help are always open.
    </p>
  );
}

/** Only https or same-site redirect targets from the consent provider are followed. */
function safeConsentRedirect(raw: string | null): string | null {
  if (!raw) return null;
  try {
    const u = new URL(raw, window.location.origin);
    if (u.origin === window.location.origin || u.protocol === 'https:') return u.toString();
  } catch {
    // ignore
  }
  return null;
}

export function ConsentNotice({ consent, onChanged }: { consent: ConsentState; onChanged: () => void | Promise<void> }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const t = TEXT[consent];

  async function start() {
    setBusy(true);
    setError(null);
    try {
      const res = await api.post('/v1/me/consent/start');
      const target = safeConsentRedirect(res.redirectUrl);
      if (target && res.status !== 'granted') {
        window.location.assign(target);
        return;
      }
      await onChanged();
    } catch (err) {
      setError(problemMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card as="section" aria-labelledby="consent-title" data-testid="consent-notice" data-consent={consent}>
      <CardTitle as="h2" id="consent-title">
        Parent approval <Badge tone={t.tone}>{t.badge}</Badge>
      </CardTitle>
      <p className={s.muted}>{t.body}</p>
      {error && (
        <p className={s.formError} role="alert">
          {error}
        </p>
      )}
      {consent !== 'granted' && (
        <Button variant="secondary" loading={busy} onClick={() => void start()}>
          {consent === 'pending' ? 'Check again or resend' : 'Ask a parent to approve'}
        </Button>
      )}
    </Card>
  );
}
