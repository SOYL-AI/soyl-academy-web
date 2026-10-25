import { cn } from '@/lib/utils';
import { Label } from './SectionHeader';

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  /** Right-hand column: a product shot, a fact box, a form… */
  aside?: React.ReactNode;
  /** `display` for audience pages, `headline` for quieter pages (legal, journal). */
  size?: 'display' | 'headline';
  className?: string;
}

/** Inner-page opener: left-aligned, asymmetric, sitting on the notebook rules. */
export function PageHero({ label, title, intro, actions, aside, size = 'display', className }: PageHeroProps) {
  return (
    <section className={cn('rule-b', className)}>
      <div className="page grid-12 items-end gap-y-10 py-12 md:py-16 lg:py-20">
        <div className={cn('col-span-12', aside ? 'lg:col-span-7' : 'lg:col-span-9')}>
          <Label className="mb-6">{label}</Label>
          <h1 className={cn(size === 'display' ? 't-display' : 't-headline', 'max-w-[16ch]')}>{title}</h1>
          {intro && <div className="t-lead mt-6 max-w-[50ch] text-ink md:mt-8">{intro}</div>}
          {actions && <div className="mt-8 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
        {aside && <div className="col-span-12 lg:col-span-5">{aside}</div>}
      </div>
    </section>
  );
}
