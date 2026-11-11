import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import s from './ink-field.module.css';

/**
 * Form fields in Ink and wash (DESIGN.md §2, §7): a visible label above every control, soft 7 px corners, 48 px
 * tall, an edge with 3.9:1 contrast on paper, an indigo focus edge, and errors in madder with a drawn mark.
 * Used by the demo and contact forms. The Future Builders forms keep components/ui/Field.tsx and their look.
 *
 * The control itself carries `id`, `aria-invalid` and `aria-describedby={describedBy(id, ...)}`, as with the old
 * Field, so a form moves over by swapping the import and the class name.
 */
export const inkInputClasses = s.input;
export const inkSelectClasses = cn(s.input, s.select);
/** A checkbox drawn as an ink chip: `<label className={inkChoiceClasses}><input className="sr-only" /><span /></label>`. */
export const inkChoiceClasses = s.choice;

interface InkFieldProps {
  id: string;
  label: string;
  /** `either`: one of a pair is required (email or phone): no marker. */
  required?: boolean | 'either';
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** Label, control, hint and the inline error. */
export function InkField({ id, label, required, hint, error, className, children }: InkFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.9375rem] font-medium leading-[1.4] text-ink">
        {label}
        <RequiredMark required={required} />
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.875rem] leading-[1.5] text-muted">
          {hint}
        </p>
      ) : null}
      <InkFieldError id={`${id}-error`} message={error} />
    </div>
  );
}

/** " *" for a required field (hidden from assistive technology: the control is marked required or validated),
 *  " (optional)" for an optional one, nothing for one of a pair. */
export function RequiredMark({ required }: { required?: boolean | 'either' }) {
  if (required === 'either') return null;
  if (required) {
    return (
      <span aria-hidden="true" className="text-muted">
        {' '}
        *
      </span>
    );
  }
  return <span className="font-normal text-muted"> (optional)</span>;
}

/** An error under a control, in madder, with a small drawn mark so it never rests on colour alone. */
export function InkFieldError({ id, message, className }: { id: string; message?: string; className?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={cn('mt-1.5 flex items-start gap-2 text-[0.875rem] leading-[1.5] text-madder', className)}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="mt-[0.1em] shrink-0">
        <circle cx="8" cy="8" r="7" fill="currentColor" />
        <path d="M8 4.5v4.2" stroke="#FBFAF7" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="11.3" r="0.95" fill="#FBFAF7" />
      </svg>
      {message}
    </p>
  );
}

export function describedBy(id: string, opts: { hint?: boolean; error?: boolean }) {
  return [opts.hint && `${id}-hint`, opts.error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}
