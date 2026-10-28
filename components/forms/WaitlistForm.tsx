'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Field, describedBy, inputClasses } from '@/components/ui/Field';
import { buttonClasses } from '@/components/ui/Button';
import { CALLBACK_PROMISE, whatsappLink } from '@/content/future-builders';
import { trackEvent } from '@/lib/analytics/track';
import { useTalkMode } from './use-talk-mode';

type Mode = 'waitlist' | 'callback';
type FormFields = { parentName: string; email: string; phone: string; grade: string };
type Errors = Partial<Record<keyof FormFields, string>>;

const GRADES = ['7', '8', '9', '10', '11', '12'];
const FIELD_ORDER: (keyof FormFields)[] = ['parentName', 'grade', 'email', 'phone'];
const WHATSAPP_URL = whatsappLink('Hi, I have a question about the next Future Builders cohort.');

/**
 * Only what each request needs: no student name while there is nothing to enrol in.
 * Waitlist / notify → we email (phone optional). Call → we phone (email optional).
 */
function validate(f: FormFields, mode: Mode): Errors {
  const e: Errors = {};
  const email = f.email.trim();
  const phone = f.phone.trim();
  if (f.parentName.trim().length < 2) e.parentName = 'Please enter your name.';
  if (!f.grade) e.grade = 'Please choose a grade.';
  if ((mode === 'waitlist' || email) && !/^\S+@\S+\.\S+$/.test(email)) e.email = 'Please enter a valid email address.';
  if ((mode === 'callback' || phone) && !/^[+()\-\s\d]{8,20}$/.test(phone)) e.phone = 'Please enter a valid phone number.';
  return e;
}

interface WaitlistFormProps {
  /** An announced cohort whose registration hasn't opened: the form becomes "notify me when it opens". */
  notify?: { cohortName: string; opensLabel: string };
  /** Tag stored with the request in the sheet, e.g. `fb_summer_2027`. */
  source?: string;
  /** Cohort state, for the (consent-gated, anonymous) conversion event. */
  state?: string;
}

/**
 * Shown instead of the enrol form when registration is not open: join the
 * waitlist (or, once the next cohort is announced, ask to be notified when its
 * registration opens), or ask for a call. Both save to the same Google Sheet as
 * enrolments (via /api/enroll), with mode `waitlist` or `callback` and a source tag.
 */
export function WaitlistForm({ notify, source, state = 'waitlist' }: WaitlistFormProps) {
  const [mode, setMode] = useState<Mode>('waitlist');
  const [data, setData] = useState<FormFields>({ parentName: '', email: '', phone: '', grade: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const doneRef = useRef<HTMLDivElement>(null);

  useTalkMode(useCallback(() => setMode('callback'), []));

  useEffect(() => {
    if (status === 'done') doneRef.current?.focus();
  }, [status]);

  const listLabel = notify ? 'Notify me' : 'Join the waitlist';

  const switchMode = (next: Mode) => {
    setMode(next);
    // Requirements differ per mode, so re-check only the fields already showing an error.
    setErrors((prev) => {
      const v = validate(data, next);
      return Object.fromEntries(Object.keys(prev).map((k) => [k, v[k as keyof FormFields]])) as Errors;
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const next = { ...data, [e.target.name]: e.target.value };
    setData(next);
    const name = e.target.name as keyof FormFields;
    if (errors[name]) setErrors((p) => ({ ...p, [name]: validate(next, mode)[name] }));
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof FormFields;
    setErrors((p) => ({ ...p, [name]: validate(data, mode)[name] }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(data, mode);
    setErrors(found);
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      document.getElementById(`wl-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentName: data.parentName.trim(),
          email: data.email.trim(),
          phone: data.phone.trim(),
          grade: data.grade,
          mode,
          source,
        }),
      });
      if (res.ok) {
        trackEvent(mode === 'waitlist' ? 'fb_waitlist_submit' : 'fb_callback_request', { state });
        setStatus('done');
      } else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    const first = data.parentName.trim().split(' ')[0];
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="module border-success/40 p-6 outline-none md:p-8">
        <p className="t-label mb-3 text-success">
          {mode === 'callback' ? 'Call requested' : notify ? 'You’re on the list' : 'You’re on the waitlist'}
        </p>
        <h3 className="t-title">Thank you, {first}.</h3>
        {mode === 'callback' ? (
          <p className="mt-3 text-muted">
            We’ll call you at {data.phone.trim()} {CALLBACK_PROMISE}. Can’t wait?{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">
              Message us on WhatsApp
            </a>
            .
          </p>
        ) : (
          <p className="mt-3 text-muted">
            {notify
              ? `We’ll email ${data.email.trim()} when registration for the ${notify.cohortName} opens (${notify.opensLabel}), with the dates, the timetable and the fee.`
              : `We’ll email ${data.email.trim()} as soon as dates for the next cohort are set, before registration opens to everyone.`}
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            switchMode(mode === 'waitlist' ? 'callback' : 'waitlist');
          }}
          className="link mt-4 font-medium"
        >
          {mode === 'waitlist' ? 'Would a call help too? Request one' : notify ? 'Get notified when registration opens too' : 'Join the waitlist as well'}
        </button>
      </div>
    );
  }

  const field = (name: keyof FormFields, label: string, required: boolean, type = 'text', autoComplete?: string, hint?: string) => (
    <Field id={`wl-${name}`} label={label} required={required} hint={hint} error={errors[name]}>
      <input
        id={`wl-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={data[name]}
        onChange={onChange}
        onBlur={onBlur}
        className={inputClasses}
        aria-invalid={!!errors[name]}
        aria-required={required || undefined}
        aria-describedby={describedBy(`wl-${name}`, { hint: !!hint && !errors[name], error: !!errors[name] })}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="module p-5 shadow-[0_30px_60px_-45px_rgba(20,20,20,0.4)] md:p-10">
      <h3 className="t-title">{mode === 'callback' ? 'Talk to us first' : notify ? 'Notify me when registration opens' : 'Join the waitlist'}</h3>
      <p className="mt-2 text-muted">
        {mode === 'callback'
          ? 'A short call with our team: ask about the curriculum, the timings, or whether it suits your child.'
          : notify
            ? `Registration for the ${notify.cohortName} opens ${notify.opensLabel}. We’ll email you the day it does.`
            : 'Hear the next cohort’s dates and fee before registration opens to everyone.'}
      </p>

      <div role="group" aria-label="What would you like to do?" className="mb-6 mt-6 grid grid-cols-2 rounded-full border border-rule bg-paper p-1">
        {(['waitlist', 'callback'] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => switchMode(m)}
            className={cn('press h-10 rounded-full text-[15px] font-semibold', mode === m ? 'bg-ink text-white' : 'text-ink hover:text-cobalt')}
          >
            {m === 'callback' ? 'Request a call' : listLabel}
          </button>
        ))}
      </div>

      {status === 'error' && (
        <div role="alert" className="t-small mb-6 border-l-2 border-red-pen bg-paper px-3 py-2 text-ink">
          We couldn’t save that just now. Please try again, or{' '}
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">
            message us on WhatsApp
          </a>
          .
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {field('parentName', 'Parent’s name', true, 'text', 'name')}
        <Field id="wl-grade" label="Child’s grade" required error={errors.grade}>
          <select
            id="wl-grade"
            name="grade"
            value={data.grade}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(inputClasses, 'cursor-pointer')}
            aria-invalid={!!errors.grade}
            aria-required
            aria-describedby={describedBy('wl-grade', { error: !!errors.grade })}
          >
            <option value="">Choose a grade…</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                Grade {g}
              </option>
            ))}
          </select>
        </Field>
        {mode === 'waitlist' ? (
          <>
            {field('email', 'Email', true, 'email', 'email')}
            {field('phone', 'Phone', false, 'tel', 'tel', notify ? 'For a WhatsApp message when registration opens.' : 'For a WhatsApp message when dates are out.')}
          </>
        ) : (
          <>
            {field('phone', 'Phone', true, 'tel', 'tel')}
            {field('email', 'Email', false, 'email', 'email')}
          </>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
        <button type="submit" disabled={status === 'sending'} className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
          {status === 'sending' ? 'Sending…' : mode === 'callback' ? 'Request a call' : listLabel}
        </button>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="arrow-link" data-track="whatsapp" data-track-at="form">
          Or WhatsApp us
        </a>
      </div>
      <p className="t-small mt-4 text-muted">
        {mode === 'waitlist'
          ? 'Free, with no payment and no commitment. We use these details only to tell you about Future Builders.'
          : `We call back ${CALLBACK_PROMISE}. We use these details only to talk to you about Future Builders.`}
      </p>
    </form>
  );
}
