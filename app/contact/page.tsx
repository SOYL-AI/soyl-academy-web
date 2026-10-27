'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData, InterestEnum, RoleEnum } from '@/lib/validation/contact-schema';
import { Field, describedBy, inputClasses } from '@/components/ui/Field';
import { buttonClasses } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';
import { submitContact } from './actions';

export default function ContactPage() {
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

  return (
    <>
      <section>
        <div className="page grid-12 items-end gap-y-6 pb-10 pt-10 md:pb-14 md:pt-16 lg:pt-20">
          <div className="col-span-12 lg:col-span-7">
            <div className="rise"><Label className="mb-8">Contact</Label></div>
            <h1 className="t-display rise max-w-[14ch]" style={{ '--d': '80ms' } as React.CSSProperties}>Talk to the SOYL <span className="t-accent">team.</span></h1>
            <p className="t-lead rise mt-6 max-w-[48ch]" style={{ '--d': '160ms' } as React.CSSProperties}>
              Questions about SOYL, partnerships or anything else. For a product walkthrough,{' '}
              <Link href="/book-a-demo" className="link">book a demo</Link>.
            </p>
          </div>
          <p className="rise col-span-12 text-muted lg:col-span-4 lg:col-start-9" style={{ '--d': '240ms' } as React.CSSProperties}>
            Or email{' '}
            <a href="mailto:outreach@soyl.cloud" className="link">
              outreach@soyl.cloud
            </a>
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="page grid-12">
          <div className="col-span-12 lg:col-span-8">
            {status === 'success' ? (
              <div role="status" className="module p-6 md:p-10">
                <p className="t-label mb-3 text-success">Message sent</p>
                <h2 className="t-title">Thank you.</h2>
                <p className="mt-3 text-muted">{message}</p>
                <button type="button" onClick={() => setStatus('idle')} className="link mt-5 font-medium">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="module p-5 shadow-[0_30px_60px_-45px_rgba(20,20,20,0.4)] md:p-10">
                {status === 'error' && (
                  <div role="alert" className="t-small mb-6 rounded-[var(--radius-sm)] border-l-2 border-red-pen bg-paper px-3 py-2 text-ink">
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
                      className={cn(inputClasses, 'cursor-pointer')}
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
                      className={cn(inputClasses, 'cursor-pointer')}
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
                      className={cn(inputClasses, 'resize-y')}
                      aria-invalid={!!errors.message}
                      aria-describedby={describedBy('c-message', { error: !!errors.message })}
                      {...register('message')}
                    />
                  </Field>
                </div>

                <div className="mt-8 border-t border-rule pt-6">
                  <button type="submit" disabled={status === 'submitting'} className={buttonClasses('primary', 'lg')}>
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
