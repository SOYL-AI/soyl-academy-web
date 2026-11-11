'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitContact } from '@/app/contact/actions';
import { contactSchema, ContactFormData, InterestEnum, RoleEnum } from '@/lib/validation/contact-schema';
import { InkField as Field, describedBy, inkInputClasses as inputClasses, inkSelectClasses } from '@/components/forms/InkField';
import { InkButton } from '@/components/ink/Button';
import { Dab } from '@/components/ink/Dab';

/**
 * The contact form (moved out of app/contact/page.tsx in phase 5 so the page can be a server component).
 * Fields, names, ids, the zod validation and the server action are exactly as they were; only the look is Ink and
 * wash (components/forms/InkField).
 */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema), mode: 'onTouched' });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting');
    try {
      const result = await submitContact(data);
      setStatus(result.success ? 'success' : 'error');
      setMessage(result.message);
      if (result.success) reset();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  const text = (name: 'name' | 'email' | 'school' | 'city' | 'studentCount', label: string, opts: { type?: string; required?: boolean; autoComplete?: string; span?: boolean } = {}) => (
    <Field id={`c-${name}`} label={label} required={opts.required ?? true} error={errors[name]?.message} className={opts.span ? 'md:col-span-2' : undefined}>
      <input
        id={`c-${name}`}
        type={opts.type ?? 'text'}
        autoComplete={opts.autoComplete}
        className={inputClasses}
        aria-invalid={!!errors[name]}
        aria-describedby={describedBy(`c-${name}`, { error: !!errors[name] })}
        {...register(name)}
      />
    </Field>
  );

  if (status === 'success') {
    return (
      <div role="status" className="rounded-[var(--radius-md)] bg-paper-2 p-6 md:p-8">
        <p className="flex items-center gap-2.5 font-semibold text-leaf">
          <Dab pigment="leaf" className="text-[1.4rem]" />
          Message sent
        </p>
        <h2 className="ink-head mt-3">Thank you.</h2>
        <p className="mt-4 max-w-[46ch] text-graphite">{message}</p>
        <InkButton variant="quiet" onClick={() => setStatus('idle')} className="mt-4">
          Send another message
        </InkButton>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="rounded-[var(--radius-md)] bg-paper-2 p-5 md:p-8">
      {status === 'error' && (
        <div role="alert" className="mb-6 rounded-[var(--radius-sm)] border border-madder/40 bg-paper px-4 py-3 text-[0.9375rem] text-madder">
          {message}
        </div>
      )}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="botField">Leave this empty</label>
        <input type="text" id="botField" tabIndex={-1} autoComplete="off" {...register('honeypot')} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {text('name', 'Name', { autoComplete: 'name' })}
        {text('email', 'Email', { type: 'email', autoComplete: 'email' })}
        {text('school', 'School or organisation', { autoComplete: 'organization', span: true })}

        <Field id="c-role" label="Role" required error={errors.role?.message}>
          <select
            id="c-role"
            defaultValue=""
            className={inkSelectClasses}
            aria-invalid={!!errors.role}
            aria-describedby={describedBy('c-role', { error: !!errors.role })}
            {...register('role')}
          >
            <option value="" disabled>Choose…</option>
            {RoleEnum.options.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        {text('city', 'City', { autoComplete: 'address-level2' })}
        {text('studentCount', 'Number of students', { required: false })}

        <Field id="c-interest" label="Interested in" required error={errors.interest?.message}>
          <select
            id="c-interest"
            defaultValue=""
            className={inkSelectClasses}
            aria-invalid={!!errors.interest}
            aria-describedby={describedBy('c-interest', { error: !!errors.interest })}
            {...register('interest')}
          >
            <option value="" disabled>Choose…</option>
            {InterestEnum.options.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </Field>

        <Field id="c-message" label="Message" required error={errors.message?.message} className="md:col-span-2">
          <textarea
            id="c-message"
            rows={5}
            className={inputClasses}
            aria-invalid={!!errors.message}
            aria-describedby={describedBy('c-message', { error: !!errors.message })}
            {...register('message')}
          />
        </Field>
      </div>

      <div className="mt-8 border-t border-rule pt-6">
        <InkButton type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </InkButton>
      </div>
    </form>
  );
}
