import { cn } from '@/lib/utils';

export const inputClasses =
  'block w-full min-h-12 rounded-[var(--radius-xs)] border border-control bg-white px-3.5 py-2.5 text-base text-ink placeholder:text-muted transition-colors duration-150 hover:border-ink focus:border-cobalt focus:outline-none focus:ring-2 focus:ring-cobalt/30 aria-[invalid=true]:border-red-pen';

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
      <label htmlFor={id} className="t-label mb-1.5 block text-ink">
        {label}
        {required === true && <span aria-hidden="true" className="text-muted"> *</span>}
        {!required && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="t-small mt-1.5 text-muted">
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
    <p id={id} className={cn('t-small mt-1.5 flex items-start gap-2 text-ink', className)}>
      <span
        aria-hidden="true"
        className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-pen text-[11px] font-bold leading-none text-white"
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
