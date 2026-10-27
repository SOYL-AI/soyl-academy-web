import type { EditorialImage } from '@/content/images';
import { Photo } from '@/components/media/Photo';
import { cn } from '@/lib/utils';
import { Label } from './SectionHeader';

interface PageHeroProps {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  actions?: React.ReactNode;
  /** Right-hand column: a fact box, a form… (takes precedence over an aside image). */
  aside?: React.ReactNode;
  /** Editorial photograph. */
  image?: EditorialImage;
  /** `aside`: portrait photo beside the text. `wide`: a full-width photo under it. */
  imageLayout?: 'aside' | 'wide';
  /** `display` for audience pages, `headline` for quieter pages (legal, journal). */
  size?: 'display' | 'headline';
  className?: string;
}

/**
 * Inner-page opener: eyebrow, serif headline, intro and actions rise in on
 * load (CSS only); the photograph settles from a slight zoom.
 */
export function PageHero({
  label,
  title,
  intro,
  actions,
  aside,
  image,
  imageLayout = 'aside',
  size = 'display',
  className,
}: PageHeroProps) {
  const sideImage = !aside && image && imageLayout === 'aside';
  const right = aside ?? (sideImage ? (
    <Photo
      image={image}
      priority
      settle
      large
      aspect="aspect-[4/3] lg:aspect-[4/5]"
      sizes="(min-width: 1320px) 520px, (min-width: 1024px) 40vw, 100vw"
    />
  ) : null);

  return (
    <section className={cn('overflow-hidden', className)}>
      <div className="page grid-12 items-center gap-y-10 pb-14 pt-10 md:pb-20 md:pt-16 lg:pt-20">
        <div className={cn('col-span-12', right ? 'lg:col-span-7 lg:pr-6' : 'lg:col-span-10')}>
          <div className="rise">
            <Label className="mb-6 md:mb-8">{label}</Label>
          </div>
          <h1
            className={cn(size === 'display' ? 't-display' : 't-headline', 'rise max-w-[15ch]')}
            style={{ '--d': '80ms' } as React.CSSProperties}
          >
            {title}
          </h1>
          {intro && (
            <div className="t-lead mt-6 max-w-[52ch] md:mt-8">
              {intro}
            </div>
          )}
          {actions && (
            <div className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-10" style={{ '--d': '260ms' } as React.CSSProperties}>
              {actions}
            </div>
          )}
        </div>
        {right && (
          <div className="rise col-span-12 lg:col-span-5" style={{ '--d': '120ms' } as React.CSSProperties}>
            {right}
          </div>
        )}
      </div>

      {image && imageLayout === 'wide' && !sideImage && (
        <div className="page pb-6">
          <Photo
            image={image}
            priority
            settle
            large
            parallax
            aspect="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            sizes="(min-width: 1320px) 1210px, 100vw"
          />
        </div>
      )}
    </section>
  );
}
