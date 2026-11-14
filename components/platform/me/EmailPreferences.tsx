'use client';

/**
 * "Email reminders" card on /me (D-055): the student's reminder switch (their own address, masked; phone-only
 * accounts are told why there are none), and the optional "parent email for updates" with its pending/active
 * status, resend, change, remove and the parent reminders switch. GET/PATCH /v1/me/email-preferences,
 * PUT/DELETE /v1/me/parent-email. Students only: the card hides itself for staff (403).
 */
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { isApiError, type EmailPreferences as Prefs } from '@/platform/shared/api-client';
import { REMINDERS } from '@/platform/shared/config/notifications';
import { Button } from '@/components/platform/ui/kit/Button';
import { Card, CardTitle, Skeleton } from '@/components/platform/ui/kit/Display';
import { TextInput } from '@/components/platform/ui/kit/Field';
import { StatusPill } from '@/components/platform/ui/kit/Lists';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { api } from '../lib/api-browser';
import { problemMessage } from '../lib/problems';
import s from './EmailPreferences.module.css';

/** Messages for the D-055 problem codes (the shared problem map does not know them). */
export function emailProblemMessage(err: unknown): string {
  if (isApiError(err)) {
    switch (err.code) {
      case 'reminders_unavailable':
        return 'Reminder emails need an email address, and this account signs in with a phone number.';
      case 'email_link_invalid':
        return 'This link is not complete. Open it straight from the email, or copy the whole link into the address bar.';
      case 'email_link_expired':
        return 'This link has expired or was replaced by a newer email. Ask for a new one to be sent from the SOYL Academy profile page.';
      case 'validation_failed': {
        const message = err.problem?.errors?.[0]?.message;
        return message ?? 'Please check the email address.';
      }
    }
  }
  return problemMessage(err);
}

function formatDay(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(iso));
}

type Load = { kind: 'loading' } | { kind: 'hidden' } | { kind: 'error'; message: string } | { kind: 'ready'; prefs: Prefs };

export function EmailPreferences() {
  const [load, setLoad] = useState<Load>({ kind: 'loading' });

  const fetchPrefs = useCallback(async () => {
    try {
      setLoad({ kind: 'ready', prefs: await api.get('/v1/me/email-preferences') });
    } catch (err) {
      if (isApiError(err) && err.status === 403) setLoad({ kind: 'hidden' });
      else setLoad({ kind: 'error', message: problemMessage(err) });
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch once on mount; state is set after the response
    void fetchPrefs();
  }, [fetchPrefs]);

  if (load.kind === 'hidden') return null;
  return (
    <Card as="section" id="email-reminders" aria-labelledby="email-reminders-title" data-testid="email-reminders">
      <CardTitle as="h2" id="email-reminders-title">
        Email reminders
      </CardTitle>
      <p className={s.intro}>
        If you have not been on SOYL Academy for a couple of days, we can send a short, friendly email with the lesson to pick up. At most one every {REMINDERS.minGapDays} days, and
        never late at night.
      </p>
      {load.kind === 'loading' && (
        <div className={s.block} aria-busy="true" aria-label="Loading your email settings">
          <Skeleton lines={3} />
        </div>
      )}
      {load.kind === 'error' && (
        <div className={s.block}>
          <p className={s.error} role="alert">
            {load.message}
          </p>
          <div className={s.actions}>
            <Button variant="secondary" onClick={() => void fetchPrefs()}>
              Try again
            </Button>
          </div>
        </div>
      )}
      {load.kind === 'ready' && <Settings prefs={load.prefs} onChange={(prefs) => setLoad({ kind: 'ready', prefs })} />}
    </Card>
  );
}

function Settings({ prefs, onChange }: { prefs: Prefs; onChange: (p: Prefs) => void }) {
  const toast = useToast();
  const [saving, setSaving] = useState<'reminders' | 'parentReminders' | null>(null);

  async function toggle(field: 'reminders' | 'parentReminders', value: boolean) {
    setSaving(field);
    try {
      onChange(await api.patch('/v1/me/email-preferences', { body: { [field]: value } }));
      toast.show({ title: value ? 'Reminders on' : 'Reminders off', tone: 'success' });
    } catch (err) {
      toast.show({ title: emailProblemMessage(err), tone: 'danger' });
    } finally {
      setSaving(null);
    }
  }

  return (
    <>
      <div className={s.block}>
        {prefs.remindersAvailable ? (
          <label className={s.check}>
            <input
              type="checkbox"
              checked={prefs.reminders}
              disabled={saving === 'reminders'}
              onChange={(e) => void toggle('reminders', e.currentTarget.checked)}
              data-testid="email-reminders-toggle"
            />
            <span className={s.checkText}>
              <strong>Send me reminder emails</strong>
              <span>To {prefs.studentEmail}. You can also turn them off from any reminder with one click.</span>
            </span>
          </label>
        ) : (
          <p className={s.note} data-testid="email-reminders-unavailable">
            This account signs in with a phone number, so we cannot send you reminder emails. We never send reminders by SMS.
          </p>
        )}
      </div>
      <ParentEmail prefs={prefs} onChange={onChange} saving={saving === 'parentReminders'} onToggle={(v) => void toggle('parentReminders', v)} />
    </>
  );
}

function ParentEmail({ prefs, onChange, saving, onToggle }: { prefs: Prefs; onChange: (p: Prefs) => void; saving: boolean; onToggle: (v: boolean) => void }) {
  const toast = useToast();
  const parent = prefs.parent;
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<'send' | 'resend' | 'remove' | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function send(email: string | null, kind: 'send' | 'resend') {
    setBusy(kind);
    setError(null);
    try {
      const res = email === null ? await api.post('/v1/me/parent-email/resend') : await api.put('/v1/me/parent-email', { body: { email } });
      const { resendAfterSeconds, ...next } = res;
      onChange(next);
      setCooldown(resendAfterSeconds);
      setEditing(false);
      setAddress('');
      if (next.parent.status === 'pending') toast.show({ title: 'Confirmation email sent', tone: 'success' });
    } catch (err) {
      setError(emailProblemMessage(err));
    } finally {
      setBusy(null);
    }
  }

  async function remove() {
    setBusy('remove');
    setError(null);
    try {
      onChange(await api.delete('/v1/me/parent-email'));
      setEditing(false);
      toast.show({ title: 'Parent email removed' });
    } catch (err) {
      setError(emailProblemMessage(err));
    } finally {
      setBusy(null);
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!address.trim()) {
      setError('Enter your parent’s or guardian’s email address.');
      return;
    }
    void send(address, 'send');
  }

  const showForm = parent.status === 'none' || editing;
  return (
    <div className={s.block} data-testid="parent-email" data-status={parent.status}>
      <h3 className={s.subtitle}>Parent email for updates (optional)</h3>
      <p className={s.muted}>
        A parent or guardian can get a short note when you have not opened SOYL Academy for a few days: at most one a week, never a progress report. Nothing is sent to them until
        they confirm.
      </p>
      {parent.status === 'none' && parent.unsubscribedAt && (
        <p className={s.note} data-testid="parent-email-unsubscribed">
          Your parent unsubscribed on {formatDay(parent.unsubscribedAt)}, so we removed their address.
        </p>
      )}

      {parent.status !== 'none' && (
        <div className={s.status}>
          <span>{parent.email}</span>
          {parent.status === 'pending' ? (
            <StatusPill tone="warning" dot>
              Waiting for them to confirm
            </StatusPill>
          ) : (
            <StatusPill tone="success" dot>
              Confirmed
            </StatusPill>
          )}
        </div>
      )}
      {parent.status === 'pending' && (
        <p className={s.muted}>We emailed a confirmation link. It works for {REMINDERS.parentConfirmTtlHours} hours. Ask them to open it and press Confirm.</p>
      )}
      {parent.status === 'active' && (
        <label className={s.check}>
          <input type="checkbox" checked={parent.reminders} disabled={saving} onChange={(e) => onToggle(e.currentTarget.checked)} data-testid="parent-reminders-toggle" />
          <span className={s.checkText}>
            <strong>Send reminders to this address</strong>
            <span>At most one every {REMINDERS.parentMinGapDays} days. They can unsubscribe from any of them.</span>
          </span>
        </label>
      )}

      {showForm ? (
        <form className={s.form} onSubmit={submit} noValidate>
          <TextInput
            label={parent.status === 'none' ? 'Parent or guardian’s email' : 'New email address'}
            type="email"
            inputMode="email"
            autoComplete="off"
            maxLength={254}
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            error={error ?? undefined}
            data-testid="parent-email-input"
          />
          <div className={s.actions}>
            <Button type="submit" loading={busy === 'send'} data-testid="parent-email-send">
              Send confirmation
            </Button>
            {editing && (
              <Button
                variant="ghost"
                onClick={() => {
                  setEditing(false);
                  setError(null);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      ) : (
        <>
          {error && (
            <p className={s.error} role="alert">
              {error}
            </p>
          )}
          <div className={s.actions}>
            {parent.status === 'pending' && (
              <Button variant="secondary" loading={busy === 'resend'} disabled={cooldown > 0} onClick={() => void send(null, 'resend')} data-testid="parent-email-resend">
                {cooldown > 0 ? `Resend in ${cooldown} s` : 'Resend email'}
              </Button>
            )}
            <Button variant="ghost" onClick={() => setEditing(true)} data-testid="parent-email-change">
              Change
            </Button>
            <Button variant="ghost" loading={busy === 'remove'} onClick={() => void remove()} data-testid="parent-email-remove">
              Remove
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
