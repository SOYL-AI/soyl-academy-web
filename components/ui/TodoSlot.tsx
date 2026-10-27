import { cn } from '@/lib/utils';

interface TodoSlotProps {
  /** What belongs here, written for the SOYL team. */
  brief: string;
  kind?: 'Screenshot' | 'Photo' | 'Illustration' | 'Quote' | 'Number' | 'Logo';
  /** CSS aspect-ratio, e.g. "16 / 10". Omit to fill the parent. */
  ratio?: string;
  className?: string;
}

/**
 * A clearly labelled placeholder for real content the SOYL team still has to
 * supply. Shown only in development and preview deploys (SHOW_CONTENT_TODOS);
 * never dressed up to look like the real thing.
 */
export function TodoSlot({ brief, kind = 'Screenshot', ratio, className }: TodoSlotProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${kind.toLowerCase()} to come — ${brief}`}
      className={cn(
        'flex flex-col justify-end gap-1 rounded-[var(--radius-md)] border border-dashed border-rule-strong bg-paper/60 p-4 md:p-5',
        className
      )}
      style={{ aspectRatio: ratio }}
    >
      <p className="t-label inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-2.5 py-0.5 text-ink">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-red-pen" />
        To come · {kind}
      </p>
      <p className="t-small max-w-[44ch] text-muted">{brief}</p>
    </div>
  );
}
