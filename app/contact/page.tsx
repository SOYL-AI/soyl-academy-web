'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData, InterestEnum, RoleEnum } from '@/lib/validation/contact-schema';
import { Field, describedBy, inputClasses } from '@/components/ui/Field';
import { buttonClasses } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Marked } from '@/components/brush/marks';
import { Postcard } from '@/components/contact/Postcard';
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
        <div className="page pb-8 pt-8 md:pb-12 md:pt-12">
          <p className="hand rise text-[1.25rem] text-vermilion-ink">Contact</p>
          <h1 className="t-headline rise mt-2 max-w-[14ch]" style={{ '--d': '60ms' } as React.CSSProperties}>
            Talk to the SOYL{' '}
            <Marked mark="under" ink="vermilion" load delay={650} weight={4.5}>
              team.
            </Marked>
          </h1>
          <p className="t-lead rise mt-4 max-w-[48ch] text-graphite" style={{ '--d': '140ms' } as React.CSSProperties}>
            Questions, partnerships or anything else. To see a mission,{' '}
            <Link href="/book-a-demo" className="link">book a demo</Link>.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="page grid-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 lg:col-span-7">
            {status === 'success' ? (
              <div role="status" className="leaf tape p-6 md:p-10" style={{ '--tape': 'var(--color-sap)' } as React.CSSProperties}>
                <p className="hand mb-3 text-[1.25rem] text-sap">Message sent</p>
                <h2 className="t-title">Thank you.</h2>
                <p className="mt-3 text-graphite">{message}</p>
                <button type="button" onClick={() => setStatus('idle')} className="link mt-5 font-medium">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="leaf tape p-5 pt-8 md:p-10">
                {status === 'error' && (
                  <div role="alert" className="t-small mb-6 rounded-md border-l-4 border-vermilion bg-vermilion-soft/60 px-3 py-2 text-ink">
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

                <div className="mt-8 border-t border-ink/15 pt-6">
                  <button type="submit" disabled={status === 'submitting'} className={buttonClasses('primary', 'lg')}>
                    {status === 'submitting' ? 'Sending…' : 'Send message'}
                  </button>
                </div>
              </form>
            )}
          </div>
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="lg:sticky lg:top-28">
              <Postcard email="outreach@soyl.cloud" className="mx-auto max-w-[400px] rotate-[-1.5deg] lg:mx-0" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
