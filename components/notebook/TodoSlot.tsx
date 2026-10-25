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
 * supply. Never dressed up to look like the real thing.
 */
export function TodoSlot({ brief, kind = 'Screenshot', ratio, className }: TodoSlotProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${kind.toLowerCase()} to come — ${brief}`}
      className={cn(
        'relative flex flex-col justify-end overflow-hidden border border-dashed border-red-pen/70 bg-paper p-4 md:p-5',
        className
      )}
      style={{
        aspectRatio: ratio,
        backgroundImage:
          'repeating-linear-gradient(135deg, transparent 0 14px, rgba(216, 74, 63, 0.07) 14px 15px)',
      }}
    >
      <p className="t-label mb-1 inline-flex w-fit max-w-full flex-wrap items-center gap-x-1.5 border-l-2 border-red-pen bg-white px-2 py-0.5 text-ink">
        <span className="font-semibold">TODO</span>
        <span aria-hidden="true">·</span>
        <span>{kind}</span>
      </p>
      <p className="t-small max-w-[44ch] text-muted">{brief}</p>
    </div>
  );
}
