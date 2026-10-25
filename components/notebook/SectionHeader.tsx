import { cn } from '@/lib/utils';

interface LabelProps {
  children: React.ReactNode;
  /** Optional section number, e.g. "02". */
  num?: string;
  className?: string;
}

/** Small section label: a red-pen tick, an optional number, sentence-case text. */
export function Label({ children, num, className }: LabelProps) {
  return (
    <p className={cn('t-label flex items-center gap-2.5 text-muted', className)}>
      <span aria-hidden="true" className="h-px w-5 bg-red-pen" />
      {num && <span className="t-num text-ink">{num}</span>}
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
  id?: string;
  className?: string;
  /** Extra content placed in the right-hand column (e.g. a link). */
  aside?: React.ReactNode;
}

/**
 * The asymmetric section opener used across the site: heading on the left
 * (7 columns), intro or a link in the right-hand 5 columns. Not centred.
 */
export function SectionHeader({ label, num, title, intro, size = 'headline', id, className, aside }: SectionHeaderProps) {
  const Heading = 'h2';
  return (
    <div className={cn('grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-12 md:items-end', className)}>
      <div className="md:col-span-7">
        {label && <Label num={num} className="mb-5">{label}</Label>}
        <Heading id={id} className={size === 'headline' ? 't-headline' : 't-title'}>
          {title}
        </Heading>
      </div>
      {(intro || aside) && (
        <div className="md:col-span-5 md:pb-1.5">
          {intro && <p className="t-lead max-w-[46ch]">{intro}</p>}
          {aside && <div className={cn(intro && 'mt-5')}>{aside}</div>}
        </div>
      )}
    </div>
  );
}
