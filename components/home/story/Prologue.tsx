import './home-story.css';
import Image from 'next/image';
import { prologue } from '@/content/story';
import { images } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { ButtonLink } from '@/components/ui/Button';
import { BrushArt } from '@/components/brush/BrushArt';
import { Arrow, Dab, Marked, Note } from '@/components/brush/marks';
import { Kinetic } from '@/components/story/Kinetic';
import { Film } from '@/components/story/Film';

/**
 * Prologue (ADR-034): the promise in two lines, and the first picture of the story: Ira, Class 8, on a Tuesday
 * night. The headline words rise in on load (plain text for screen readers); the photo is a taped print dropped on
 * a watercolour wash that paints itself.
 */
export function Prologue() {
  const photo = images.lateNightStudy;
  return (
    <section id="prologue" data-chapter="Prologue" className="relative overflow-hidden">
      <div className="page grid-12 items-center gap-y-10 pb-14 pt-8 md:pt-12 lg:min-h-[calc(100svh-72px)] lg:pb-16 lg:pt-6">
        <div className="col-span-12 lg:col-span-6">
          <p className="rise mb-6 flex items-center gap-2.5 md:mb-8">
            <Dab ink="vermilion" />
            <span className="hand text-[1.3rem] leading-none text-vermilion-ink">{prologue.eyebrow}</span>
          </p>
          <h1 className="t-display max-w-[15ch] text-[clamp(2.75rem,6.2vw,5.6rem)]">
            <Kinetic as="span" load text={prologue.lines[0]} className="block" />
            <span className="mt-1 block text-graphite">
              <Kinetic as="span" load delay={330} text="Homework only kept the" />{' '}
              <span className="kinetic-load inline-block" style={{ '--kd': '620ms' } as React.CSSProperties}>
                <span className="kw" style={{ '--wi': 0 } as React.CSSProperties}>
                  <Marked mark="ring" ink="vermilion" load delay={1500}>
                    score.
                  </Marked>
                </span>
              </span>
            </span>
          </h1>
          {/* Static on purpose: on phones this paragraph can be the LCP element. */}
          <p className="t-lead mt-7 max-w-[42ch] text-graphite md:mt-9">{prologue.support}</p>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-10" style={{ '--d': '700ms' } as React.CSSProperties}>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <Film />
          </div>
          <p className="mt-8 text-[13px] text-graphite">{prologue.disclaimer}</p>
        </div>

        <div className="relative col-span-12 lg:col-span-6">
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[640px]">
            <BrushArt
              art="wash"
              options={{
                blooms: [
                  { x: 0.22, y: 0.3, r: 0.28, pigment: 'ochre', opacity: 70 },
                  { x: 0.8, y: 0.72, r: 0.3, pigment: 'ultramarine', opacity: 55 },
                  { x: 0.62, y: 0.16, r: 0.14, pigment: 'vermilion', opacity: 50 },
                ],
              }}
              seed="visit"
              eager
              stepMs={140}
              className="absolute inset-0"
            />
            <div className="prologue-print absolute inset-[9%_7%_11%_9%] rotate-[-2.2deg] bg-white p-2.5 pb-11 shadow-[0_30px_60px_-30px_rgba(31,28,25,0.55)] md:p-3 md:pb-14">
              <span aria-hidden="true" className="tape absolute -top-3 left-[18%] z-10 h-6 w-24 rotate-[-6deg]" />
              <span aria-hidden="true" className="tape tape-r absolute -top-2 right-[14%] z-10 h-6 w-20 rotate-[5deg]" />
              <div className="relative h-full w-full overflow-hidden bg-ink">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1024px) 560px, 90vw"
                  className="object-cover"
                  style={{ objectPosition: photo.focus }}
                />
              </div>
              <Note ink="graphite" tilt={-1.5} className="absolute bottom-2.5 left-4 text-[1.15rem] md:bottom-3.5 md:text-[1.35rem]">
                {prologue.note}
              </Note>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#tuesday"
        className="prologue-cue group mx-auto mb-6 hidden w-max flex-col items-center gap-1 text-ink lg:flex"
      >
        <span className="hand text-[1.2rem]">{prologue.cue}</span>
        <Arrow to="down-right" ink="ink" className="h-9 w-12 rotate-[30deg]" />
      </a>
    </section>
  );
}
