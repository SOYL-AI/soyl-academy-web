'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { submitDemoRequest } from '@/app/book-a-demo/actions';
import {
  DEMO_ROLES,
  GRADES,
  validateDemo,
  type DemoErrors,
  type DemoFormData,
  type Grade,
} from '@/lib/validation/demo-fields';
import { Field, FieldError, describedBy, inputClasses } from '@/components/notebook/Field';
import { buttonClasses } from '@/components/notebook/Button';
import { cn } from '@/lib/utils';

type TextKey = 'name' | 'school' | 'email' | 'phone' | 'city';
const FIELD_ORDER: (keyof DemoFormData)[] = ['name', 'role', 'school', 'email', 'phone', 'city', 'grades'];

const EMPTY: DemoFormData = { name: '', school: '', role: '', email: '', phone: '', city: '', grades: [], honeypot: '' };

/** Book-a-demo form: validates inline on blur and on submit; no form library, so the page stays light. */
export function DemoForm() {
  const [data, setData] = useState<DemoFormData>(EMPTY);
  const [errors, setErrors] = useState<DemoErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof DemoFormData, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const thanksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'done') thanksRef.current?.focus();
  }, [status]);

  const update = (next: DemoFormData, key: keyof DemoFormData) => {
    setData(next);
    // Once a field has been visited, keep its message in sync as the user types.
    if (!touched[key]) return;
    const v = validateDemo(next);
    // Email and phone are an either/or pair, so they update together.
    const pair = key === 'email' || key === 'phone' ? { email: v.email, phone: v.phone } : {};
    setErrors((prev) => ({ ...prev, [key]: v[key], ...pair }));
  };

  const blur = (key: keyof DemoFormData) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((prev) => ({ ...prev, [key]: validateDemo(data)[key] }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateDemo(data);
    setErrors(found);
    setTouched(Object.fromEntries(FIELD_ORDER.map((k) => [k, true])));
    const first = FIELD_ORDER.find((k) => found[k]);
    if (first) {
      document.getElementById(first === 'grades' ? 'demo-grade-1' : `demo-${first}`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await submitDemoRequest(data);
      if (res.success) setStatus('done');
      else {
        setServerMessage(res.message);
        setStatus('error');
      }
    } catch {
      setServerMessage('Something went wrong. Please try again, or email outreach@soyl.cloud.');
      setStatus('error');
    }
  };

  if (status === 'done') {
    const first = data.name.trim().split(' ')[0];
    return (
      <div ref={thanksRef} tabIndex={-1} className="module border-t-2 border-t-success p-6 outline-none md:p-8" role="status">
        <p className="t-label mb-3 flex items-center gap-2 text-success">
          <span aria-hidden="true" className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-[12px] text-white">✓</span>
          Request received
        </p>
        <h2 className="t-title">Thank you{first ? `, ${first}` : ''}.</h2>
        <p className="mt-3 max-w-[46ch] text-muted">
          The SOYL team will get back to you to find a time that suits your school. In the meantime:
        </p>
        <ul className="mt-5 space-y-2">
          <li>
            <Link href="/#try-it" className="link">Try a SOYL question yourself</Link>
          </li>
          <li>
            <Link href="/method" className="link">Read about the SOYL Method</Link>
          </li>
        </ul>
      </div>
    );
  }

  const text = (key: TextKey, label: string, opts: { type?: string; autoComplete?: string; inputMode?: 'email' | 'tel'; required?: boolean | 'either'; hint?: string; span?: boolean; placeholder?: string } = {}) => (
    <Field
      id={`demo-${key}`}
      label={label}
      required={opts.required ?? true}
      hint={opts.hint}
      error={errors[key]}
      className={opts.span ? 'md:col-span-2' : undefined}
    >
      <input
        id={`demo-${key}`}
        name={key}
        type={opts.type ?? 'text'}
        autoComplete={opts.autoComplete}
        inputMode={opts.inputMode}
        placeholder={opts.placeholder}
        value={data[key]}
        onChange={(e) => update({ ...data, [key]: e.target.value }, key)}
        onBlur={() => blur(key)}
        className={inputClasses}
        aria-invalid={!!errors[key]}
        aria-describedby={describedBy(`demo-${key}`, { hint: !!opts.hint && !errors[key], error: !!errors[key] })}
      />
    </Field>
  );

  const toggleGrade = (g: Grade) => {
    const grades = data.grades.includes(g) ? data.grades.filter((x) => x !== g) : [...data.grades, g];
    setData({ ...data, grades });
    setTouched((t) => ({ ...t, grades: true }));
    setErrors((prev) => ({ ...prev, grades: validateDemo({ ...data, grades }).grades }));
  };

  return (
    <form onSubmit={onSubmit} noValidate className="module p-5 md:p-8">
      {status === 'error' && (
        <div role="alert" className="t-small mb-6 border-l-2 border-red-pen bg-paper px-3 py-2 text-ink">
          {serverMessage}
        </div>
      )}

      <div className="hidden" aria-hidden="true">
        <label htmlFor="demo-website">Leave this empty</label>
        <input
          id="demo-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.honeypot}
          onChange={(e) => setData({ ...data, honeypot: e.target.value })}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {text('name', 'Your name', { autoComplete: 'name' })}

        <Field id="demo-role" label="Your role" required error={errors.role}>
          <select
            id="demo-role"
            name="role"
            value={data.role}
            onChange={(e) => update({ ...data, role: e.target.value as DemoFormData['role'] }, 'role')}
            onBlur={() => blur('role')}
            className={cn(inputClasses, 'cursor-pointer')}
            aria-invalid={!!errors.role}
            aria-describedby={describedBy('demo-role', { error: !!errors.role })}
          >
            <option value="" disabled>
              Choose…
            </option>
            {DEMO_ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>

        {text('school', 'School', { autoComplete: 'organization', span: true })}
        {text('email', 'Email', { type: 'email', autoComplete: 'email', inputMode: 'email', required: 'either', hint: 'Email or phone, whichever you prefer.' })}
        {text('phone', 'Phone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', required: 'either', placeholder: '+91' })}
        {text('city', 'City', { autoComplete: 'address-level2', span: true })}

        <fieldset className="md:col-span-2" aria-describedby={describedBy('demo-grades', { error: !!errors.grades })}>
          <legend className="t-label mb-2 text-ink">
            Grades you’re interested in <span aria-hidden="true" className="text-muted">*</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {GRADES.map((g) => (
              <label key={g} className="relative cursor-pointer">
                <input
                  id={`demo-grade-${g}`}
                  type="checkbox"
                  checked={data.grades.includes(g)}
                  onChange={() => toggleGrade(g)}
                  className="peer sr-only"
                />
                <span className="press t-num inline-flex h-11 min-w-11 items-center justify-center border border-control bg-white px-3 text-[15px] font-medium peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-cobalt">
                  <span className="sr-only">Grade </span>
                  {g}
                </span>
              </label>
            ))}
          </div>
          <FieldError id="demo-grades-error" message={errors.grades} />
        </fieldset>
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="t-small max-w-[40ch] text-muted">
          We use these details only to arrange your demo. See our{' '}
          <Link href="/privacy" className="link">privacy policy</Link>.
        </p>
        <button type="submit" disabled={status === 'sending'} className={buttonClasses('primary', 'lg')}>
          {status === 'sending' ? 'Sending…' : 'Book a demo'}
        </button>
      </div>
    </form>
  );
}
