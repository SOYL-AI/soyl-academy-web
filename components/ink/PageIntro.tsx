import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { photo as photoFor } from '@/content/credits';
import { InkPhoto } from './InkPhoto';
import { Stroke, type StrokePigment } from './Stroke';

interface PageIntroProps {
  /** The page's one h1. Sentence case, two lines or fewer at 390, 768 and 1440. */
  title: ReactNode;
  /** One or two sentences under it. */
  lead?: ReactNode;
  /** Actions: one InkLink, at most a quiet second one. */
  actions?: ReactNode;
  /** A real photograph from content/credits.ts, printed as a duotone beside the text. */
  photo?: { slug: string; position?: string };
  /** Anything else for the right-hand column instead of a photograph (a fact box, a form). Wins over `photo`. */
  aside?: ReactNode;
  /** `hero` for audience pages, `head` for quieter pages (legal, journal, contact). */
  size?: 'hero' | 'head';
  /** The one drawn stroke under the heading. Default indigo; `none` for none. */
  stroke?: StrokePigment | 'none';
  className?: string;
}

/**
 * The opener of an inner marketing page in Ink and wash (replaces components/ui/PageHero, which the Future
 * Builders pages keep). No eyebrow label, no fade-up: the heading, a stroke under it, a lead, the actions, and
 * a real photograph printed in the panel wash.
 */
export function PageIntro({ title, lead, actions, photo, aside, size = 'hero', stroke = 'indigo', className }: PageIntroProps) {
  const p = !aside && photo ? photoFor(photo.slug) : null;
  const right = aside ?? (p ? <InkPhoto src={p.src} alt={p.alt} aspect="4 / 5" position={photo?.position} priority sizes="(min-width: 1320px) 480px, (min-width: 1024px) 38vw, 92vw" /> : null);
  return (
    <section className={cn('pb-12 pt-10 md:pb-16 md:pt-14 lg:pt-16', className)}>
      <div className="page grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className={cn(right ? 'lg:col-span-7' : 'lg:col-span-9')}>
          {/* Inner pages open a step below the homepage (4.2rem at most, not 5rem): the text shares the row with a
              photograph, and at 5rem most headlines broke a word away from its sentence. */}
          <h1 className={cn(size === 'hero' ? 'ink-hero text-[clamp(2.6rem,5.2vw,4.2rem)]' : 'ink-head', 'max-w-[16ch]')}>{title}</h1>
          {stroke !== 'none' ? (
            <Stroke pigment={stroke} width="5em" reveal={false} className={size === 'hero' ? 'text-[clamp(2.6rem,5.2vw,4.2rem)]' : 'text-[clamp(1.9rem,4.2vw,3.2rem)]'} />
          ) : null}
          {lead ? <div className="ink-lead mt-6 max-w-[52ch]">{lead}</div> : null}
          {actions ? <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">{actions}</div> : null}
        </div>
        {right ? <div className="lg:col-span-5">{right}</div> : null}
      </div>
    </section>
  );
}
