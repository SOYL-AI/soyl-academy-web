import { cn } from '@/lib/utils';

// Brush (ADR-033): a paper field with a firm ink rule underneath; the whole box sharpens on focus.
export const inputClasses =
  'block w-full min-h-12 rounded-[6px] border border-ink/15 border-b-2 border-b-ink/55 bg-[#fffdf8] px-3.5 py-2.5 text-base text-ink placeholder:text-graphite/70 transition-[border-color,box-shadow,background-color] duration-200 hover:border-ink/35 hover:border-b-ink focus:border-ink focus:border-b-ink focus:bg-white focus:outline-none focus:ring-4 focus:ring-ultramarine/15 aria-[invalid=true]:border-vermilion aria-[invalid=true]:border-b-vermilion';

interface FieldProps {
  id: string;
  label: string;
  /** `either`: one of a pair is required (e.g. email or phone) — no marker. */
  required?: boolean | 'either';
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Label + control + hint + inline error. The control must carry
 * `id`, `aria-invalid` and `aria-describedby={describedBy(id, …)}`.
 */
export function Field({ id, label, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[0.95rem] font-semibold text-ink">
        {label}
        {required === true && <span aria-hidden="true" className="text-vermilion-ink"> *</span>}
        {!required && <span className="hand text-[1.05rem] font-normal text-graphite"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="t-small mt-1.5 text-graphite">
          {hint}
        </p>
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export function FieldError({ id, message, className }: { id: string; message?: string; className?: string }) {
  if (!message) return null;
  return (
    <p id={id} className={cn('t-small mt-1.5 flex items-start gap-2 font-medium text-vermilion-ink', className)}>
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-vermilion text-[11px] font-bold leading-none text-white"
      >
        !
      </span>
      {message}
    </p>
  );
}

export function describedBy(id: string, opts: { hint?: boolean; error?: boolean }) {
  return [opts.hint && `${id}-hint`, opts.error && `${id}-error`].filter(Boolean).join(' ') || undefined;
}
