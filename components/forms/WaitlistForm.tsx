'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Field, describedBy, inputClasses } from '@/components/notebook/Field';
import { buttonClasses } from '@/components/notebook/Button';
import { validateFamily } from './FutureBuildersForm';

type FormFields = { parentName: string; studentName: string; email: string; phone: string; grade: string };

const GRADES = ['7', '8', '9', '10', '11', '12'];

/** Shown instead of the enrol form when registration is closed. Saves to the same sheet as enrolments. */
export function WaitlistForm() {
  const [data, setData] = useState<FormFields>({ parentName: '', studentName: '', email: '', phone: '', grade: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const next = { ...data, [e.target.name]: e.target.value };
    setData(next);
    const name = e.target.name as keyof FormFields;
    if (errors[name]) setErrors((p) => ({ ...p, [name]: validateFamily(next)[name] }));
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof FormFields;
    setErrors((p) => ({ ...p, [name]: validateFamily(data)[name] }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateFamily(data);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`wl-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, mode: 'waitlist' }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div role="status" className="module border-t-2 border-t-success p-6 md:p-8">
        <p className="t-label mb-3 text-success">You’re on the waitlist</p>
        <h3 className="t-title">Thank you, {data.parentName.split(' ')[0]}.</h3>
        <p className="mt-3 text-muted">
          We’ll email {data.email} as soon as dates for the next cohort are set, before registration opens to everyone.
        </p>
      </div>
    );
  }

  const field = (name: keyof FormFields, label: string, type = 'text', autoComplete?: string) => (
    <Field id={`wl-${name}`} label={label} required error={errors[name]}>
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
        aria-describedby={describedBy(`wl-${name}`, { error: !!errors[name] })}
      />
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="module p-5 md:p-8">
      <h3 className="t-title mb-6">Join the waitlist</h3>
      {status === 'error' && (
        <div role="alert" className="t-small mb-6 border-l-2 border-red-pen bg-paper px-3 py-2 text-ink">
          We couldn’t save that just now. Please try again, or message us on WhatsApp.
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {field('parentName', 'Parent’s name', 'text', 'name')}
        {field('studentName', 'Student’s name')}
        {field('email', 'Email', 'email', 'email')}
        {field('phone', 'Phone', 'tel', 'tel')}
        <Field id="wl-grade" label="Student’s grade" required error={errors.grade} className="md:col-span-2">
          <select
            id="wl-grade"
            name="grade"
            value={data.grade}
            onChange={onChange}
            onBlur={onBlur}
            className={cn(inputClasses, 'cursor-pointer')}
            aria-invalid={!!errors.grade}
            aria-describedby={describedBy('wl-grade', { error: !!errors.grade })}
          >
            <option value="">Choose a grade…</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>Grade {g}</option>
            ))}
          </select>
        </Field>
      </div>
      <button type="submit" disabled={status === 'sending'} className={buttonClasses('primary', 'lg', 'mt-8 w-full sm:w-auto')}>
        {status === 'sending' ? 'Saving…' : 'Join the waitlist'}
      </button>
      <p className="t-small mt-4 text-muted">No payment now. We’ll only use these details to tell you about Future Builders.</p>
    </form>
  );
}
