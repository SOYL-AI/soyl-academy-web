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

const TONE_INK: Record<Tone, string> = {
  blue: 'var(--color-ultramarine)',
  red: 'var(--color-vermilion-ink)',
  yellow: 'var(--color-graphite)',
};
const TONE_DAB: Record<Tone, string> = {
  blue: 'var(--color-ultramarine)',
  red: 'var(--color-vermilion)',
  yellow: 'var(--color-ochre)',
};

/** Section eyebrow (ADR-033): a handwritten note with a watercolour dab and an optional chapter number. */
export function Label({ children, num, tone, className }: LabelProps) {
  const t = tone ?? toneFor(num);
  return (
    <p className={cn('hand flex items-center gap-2.5 text-[1.25rem] md:text-[1.375rem]', className)} style={{ color: TONE_INK[t] }}>
      <span
        aria-hidden="true"
        className="inline-block h-3.5 w-3.5 shrink-0"
        style={{
          background: `radial-gradient(circle at 38% 35%, color-mix(in srgb, ${TONE_DAB[t]} 50%, white) 0 25%, ${TONE_DAB[t]} 72%)`,
          borderRadius: '58% 42% 55% 45% / 47% 58% 42% 53%',
        }}
      />
      {num && <span className="t-num font-serif text-[1.05em] italic">{num}</span>}
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
        {label && <Label num={num} className="mb-5">{label}</Label>}
        {heading}
        {intro && <p className="t-lead mt-6 max-w-[52ch] text-graphite">{intro}</p>}
        {aside && <div className="mt-6">{aside}</div>}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12 lg:items-end', className)} data-reveal>
      <div className="lg:col-span-7">
        {label && <Label num={num} className="mb-5">{label}</Label>}
        {heading}
      </div>
      {(intro || aside) && (
        <div className="lg:col-span-5 lg:pb-2">
          {intro && <p className="t-lead max-w-[46ch] text-graphite">{intro}</p>}
          {aside && <div className={cn(intro && 'mt-5')}>{aside}</div>}
        </div>
      )}
    </div>
  );
}
