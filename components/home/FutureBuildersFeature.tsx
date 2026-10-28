import { futureBuilders } from '@/content/home';
import { images } from '@/content/images';
import { formatCohortDate, getOpenCohort, getUpcomingCohort, type CohortState } from '@/content/future-builders';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';

/** Future Builders, introduced on the homepage. Status line follows the cohort state. */
export function FutureBuildersFeature({ state }: { state: CohortState }) {
  const open = getOpenCohort();
  const upcoming = getUpcomingCohort();
  const status = open
    ? `${open.name}: registration ${state === 'closing-soon' ? 'closes' : 'open until'} ${formatCohortDate(open.registrationCloses)}.`
    : upcoming
      ? `${upcoming.name}, ${upcoming.window}. Registration opens ${upcoming.registrationOpensLabel}.`
      : 'Dates for the next cohort are being set. The waitlist is open.';

  return (
    <section className="section bg-paper">
      <div className="page grid-12 items-center gap-y-12">
        <div className="relative col-span-12 lg:col-span-7">
          <Photo
            backdrop="blue"
            backdropSide="left"
            image={images.fbPresentation}
            aspect="aspect-[4/3] md:aspect-[3/2]"
            large
            parallax
            sizes="(min-width: 1320px) 700px, (min-width: 1024px) 56vw, 100vw"
          />
          <div className="absolute -bottom-8 right-4 hidden w-[38%] sm:block lg:-right-8" data-reveal style={{ '--d': '200ms' } as React.CSSProperties}>
            <Photo
              image={images.fbIot}
              aspect="aspect-square"
              reveal={false}
              className="border-[6px] border-highlighter shadow-[0_30px_60px_-30px_rgba(20,20,20,0.45)]"
              sizes="(min-width: 1024px) 260px, 38vw"
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9" data-reveal>
          <Label className="mb-6">{futureBuilders.label}</Label>
          <h2 className="t-headline max-w-[12ch]">
            Build a <span className="t-accent">real</span> product.
          </h2>
          <p className="t-lead mt-6">{futureBuilders.line}</p>
          <p className="t-small mt-6 flex items-start gap-2.5 text-ink">
            <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-pen" />
            {status}
          </p>
          <ButtonLink href={futureBuilders.link.href} size="lg" className="mt-8" arrow>
            {futureBuilders.link.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
