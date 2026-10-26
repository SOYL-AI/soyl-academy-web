'use client';

/**
 * One OTP sign-in flow (phone or email): enter identifier → send code → enter code → signed in.
 * AUTH-5 resend cooldown from the server's `resendAfterSeconds` (30 s, 60 s, 120 s); AUTH-3 lockout
 * messages; WEB-12: `autocomplete="one-time-code"`, numeric keypad, identifiers only in POST bodies.
 */
import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import type { SignInResponse } from '@/platform/shared/api-client';
import { isApiError } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { OTPInput } from '@/components/platform/ui/kit/Field';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { api } from '../lib/api-browser';
import { emailError, maskedPhone, phoneError, toE164India } from '../lib/phone';
import { problemMessage } from '../lib/problems';
import s from './auth.module.css';

export type OtpChannel = 'phone' | 'email';

export interface OtpFormProps {
  channel: OtpChannel;
  returnTo: string;
  onSignedIn: (res: SignInResponse, returnTo: string) => void | Promise<void>;
  /** Lets the sheet suggest another method (phone OTP paused → email/Google). */
  onSuggestOther?: (channel: OtpChannel) => void;
}

function useCountdown(until: number | null): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (until === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [until]);
  return until === null ? 0 : Math.max(0, Math.ceil((until - now) / 1000));
}

export function OtpForm({ channel, returnTo, onSignedIn, onSuggestOther }: OtpFormProps) {
  const [step, setStep] = useState<'identify' | 'code'>('identify');
  const [raw, setRaw] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState<'send' | 'verify' | null>(null);
  const [resendUntil, setResendUntil] = useState<number | null>(null);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const resendIn = useCountdown(resendUntil);
  const lockedFor = useCountdown(lockedUntil);
  const inputId = useId();
  const errorId = useId();
  const statusRef = useRef<HTMLParagraphElement>(null);

  const label = channel === 'phone' ? 'Mobile number' : 'Email address';

  async function send(target: string) {
    setBusy('send');
    setFormError(null);
    try {
      const res =
        channel === 'phone'
          ? await api.post('/v1/auth/phone/send-otp', { body: { phoneNumber: target } })
          : await api.post('/v1/auth/email/send-otp', { body: { email: target } });
      setIdentifier(target);
      setStep('code');
      setCode('');
      setResendUntil(Date.now() + Math.max(0, res.resendAfterSeconds) * 1000);
      window.setTimeout(() => statusRef.current?.focus(), 0);
    } catch (err) {
      if (isApiError(err) && err.retryAfterSeconds) {
        if (err.code === 'otp_locked') setLockedUntil(Date.now() + err.retryAfterSeconds * 1000);
        else setResendUntil(Date.now() + err.retryAfterSeconds * 1000);
      }
      if (isApiError(err, 'phone_otp_paused')) onSuggestOther?.('email');
      if (isApiError(err, 'validation_failed') && step === 'identify') setFieldError(problemMessage(err, channel));
      else setFormError(problemMessage(err, channel));
    } finally {
      setBusy(null);
    }
  }

  function onIdentify(e: FormEvent) {
    e.preventDefault();
    if (channel === 'phone') {
      const err = phoneError(raw);
      setFieldError(err);
      const e164 = toE164India(raw);
      if (!err && e164) void send(e164);
    } else {
      const err = emailError(raw);
      setFieldError(err);
      if (!err) void send(raw.trim());
    }
  }

  async function verify(value: string) {
    if (value.length !== 6 || busy) return;
    setBusy('verify');
    setFormError(null);
    try {
      const res =
        channel === 'phone'
          ? await api.post('/v1/auth/phone/verify', { body: { phoneNumber: identifier, code: value, returnTo } })
          : await api.post('/v1/auth/email/verify', { body: { email: identifier, code: value, returnTo } });
      await onSignedIn(res, returnTo);
    } catch (err) {
      setCode('');
      if (isApiError(err, 'otp_locked') && err.retryAfterSeconds) setLockedUntil(Date.now() + err.retryAfterSeconds * 1000);
      setFormError(problemMessage(err, channel));
    } finally {
      setBusy(null);
    }
  }

  if (step === 'identify') {
    return (
      <form className={s.form} onSubmit={onIdentify} noValidate>
        <div className={s.field}>
          <label htmlFor={inputId} className={s.label}>
            {label}
          </label>
          <div className={s.inputRow}>
            {channel === 'phone' && (
              <span className={s.prefix} aria-hidden="true">
                +91
              </span>
            )}
            <input
              id={inputId}
              className={s.input}
              name={channel === 'phone' ? 'tel-national' : 'email'}
              type={channel === 'phone' ? 'tel' : 'email'}
              inputMode={channel === 'phone' ? 'tel' : 'email'}
              autoComplete={channel === 'phone' ? 'tel-national' : 'email'}
              placeholder={channel === 'phone' ? '98765 43210' : 'name@example.com'}
              aria-label={channel === 'phone' ? 'Mobile number, 10 digits after +91' : undefined}
              aria-invalid={fieldError ? true : undefined}
              aria-describedby={fieldError ? errorId : undefined}
              maxLength={channel === 'phone' ? 16 : 254}
              value={raw}
              onChange={(e) => {
                setRaw(e.target.value);
                if (fieldError) setFieldError(null);
              }}
              disabled={busy !== null || lockedFor > 0}
            />
          </div>
          {fieldError && (
            <p id={errorId} className={s.error}>
              <Icon name="alert" size={16} />
              <span>{fieldError}</span>
            </p>
          )}
        </div>
        {formError && (
          <p className={s.formError} role="alert">
            {formError}
          </p>
        )}
        <Button type="submit" block loading={busy === 'send'} disabled={lockedFor > 0}>
          {lockedFor > 0 ? `Try again in ${Math.ceil(lockedFor / 60)} min` : 'Send code'}
        </Button>
      </form>
    );
  }

  const shown = channel === 'phone' ? maskedPhone(identifier) : identifier;
  return (
    <form
      className={s.form}
      onSubmit={(e) => {
        e.preventDefault();
        void verify(code);
      }}
      noValidate
    >
      <p className={s.sentTo} ref={statusRef} tabIndex={-1}>
        We sent a 6-digit code to <strong>{shown}</strong>.{' '}
        <button
          type="button"
          className={s.linkButton}
          onClick={() => {
            setStep('identify');
            setFormError(null);
            setCode('');
          }}
        >
          Change
        </button>
      </p>
      <OTPInput
        label="Code"
        value={code}
        onChange={(v) => {
          setCode(v);
          if (formError) setFormError(null);
        }}
        onComplete={(v) => void verify(v)}
        disabled={busy === 'verify' || lockedFor > 0}
        error={formError ?? undefined}
        hint={channel === 'phone' ? 'Check your SMS messages.' : 'Check your inbox (and the spam folder).'}
      />
      <Button type="submit" block loading={busy === 'verify'} disabled={code.length !== 6 || lockedFor > 0}>
        Verify and continue
      </Button>
      <div className={s.resend}>
        {lockedFor > 0 ? (
          <span>Locked for your safety. Try again in about {Math.ceil(lockedFor / 60)} min.</span>
        ) : resendIn > 0 ? (
          <span aria-live="off">Resend code in {resendIn} s</span>
        ) : (
          <button type="button" className={s.linkButton} disabled={busy !== null} onClick={() => void send(identifier)}>
            Resend code
          </button>
        )}
      </div>
    </form>
  );
}
