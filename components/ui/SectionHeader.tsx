import { cn } from '@/lib/utils';

export type Tone = 'blue' | 'red' | 'yellow';

/** Section colour coding: numbered sections cycle blue → red → yellow. */
export function toneFor(num?: string): Tone {
  const n = num ? parseInt(num, 10) : 1;
  return (['yellow', 'blue', 'red'] as const)[n % 3];
}

interface LabelProps {
  children: React.ReactNode;
  /** Optional section number, e.g. "02". */
  num?: string;
  /** Accent colour; defaults to the section-number cycle. */
  tone?: Tone;
  className?: string;
}

/** Section eyebrow: a colour mark, an optional number, tracked capitals. */
export function Label({ children, num, tone, className }: LabelProps) {
  const t = tone ?? toneFor(num);
  return (
    <p className={cn(`tone-${t} t-eyebrow flex items-center gap-3 text-muted`, className)}>
      <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--tone)]" />
      {num && (
        <>
          <span className="t-num text-[var(--tone-text)]">{num}</span>
          <span aria-hidden="true" className="h-px w-6 bg-current opacity-40" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}

interface SectionHeaderProps {
  label?: string;
  num?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** `headline` for section openers, `title` for quieter sub-sections. */
  size?: 'headline' | 'title';
  /** `split`: heading left, intro right. `stack`: intro under the heading. */
  layout?: 'split' | 'stack';
  id?: string;
  className?: string;
  /** Extra content under the intro (e.g. a link). */
  aside?: React.ReactNode;
}

/**
 * The section opener used across the site. Reveals on scroll.
 */
export function SectionHeader({
  label,
  num,
  title,
  intro,
  size = 'headline',
  layout = 'split',
  id,
  className,
  aside,
}: SectionHeaderProps) {
  const heading = (
    <h2 id={id} className={cn(size === 'headline' ? 't-headline' : 't-title', 'max-w-[18ch]')}>
      {title}
    </h2>
  );

  if (layout === 'stack') {
    return (
      <div className={cn('max-w-3xl', className)} data-reveal>
        {label && <Label num={num} className="mb-6">{label}</Label>}
        {heading}
        {intro && <p className="t-lead mt-6 max-w-[52ch]">{intro}</p>}
        {aside && <div className="mt-6">{aside}</div>}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12 lg:items-end', className)} data-reveal>
      <div className="lg:col-span-7">
        {label && <Label num={num} className="mb-6">{label}</Label>}
        {heading}
      </div>
      {(intro || aside) && (
        <div className="lg:col-span-5 lg:pb-2">
          {intro && <p className="t-lead max-w-[46ch]">{intro}</p>}
          {aside && <div className={cn(intro && 'mt-5')}>{aside}</div>}
        </div>
      )}
    </div>
  );
}
