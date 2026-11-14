import { epilogue } from '@/content/story';
import { PRIMARY_CTA } from '@/lib/site';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { ButtonLink } from '@/components/ui/Button';
import { BrushArt } from '@/components/brush/BrushArt';
import { Kinetic } from '@/components/story/Kinetic';
import { Film } from '@/components/story/Film';
import { Marked } from '@/components/brush/marks';

/** Epilogue (ADR-034): the last page. The film, the ask, and a wash that paints itself behind it. */
export function Epilogue() {
  return (
    <section id="epilogue" data-chapter="Epilogue" className="relative overflow-hidden">
      <BrushArt
        art="wash"
        options={{
          blooms: [
            { x: 0.12, y: 0.25, r: 0.22, pigment: 'ochre', opacity: 60 },
            { x: 0.9, y: 0.8, r: 0.26, pigment: 'ultramarine', opacity: 50 },
            { x: 0.55, y: 0.95, r: 0.16, pigment: 'vermilion', opacity: 40 },
          ],
        }}
        seed={5}
        stepMs={120}
        className="absolute inset-0"
      />
      <div className="page relative grid-12 items-center gap-y-12 py-24 md:py-32">
        <div className="col-span-12 lg:col-span-6">
          <h2 className="t-display max-w-[14ch]">
            <Kinetic as="span" text="Every story starts with" />{' '}
            <Marked mark="under" ink="vermilion" weight={4.5}>
              one mission.
            </Marked>
          </h2>
          <p className="t-lead mt-6 max-w-[40ch] text-graphite">{epilogue.line}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-semibold underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
              or write to us
            </a>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="rotate-[1.2deg] bg-white p-2.5 shadow-[0_30px_60px_-30px_rgba(31,28,25,0.55)]">
            <Film variant="poster" />
          </div>
        </div>
      </div>
    </section>
  );
}
