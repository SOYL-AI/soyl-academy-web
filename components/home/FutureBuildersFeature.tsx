import { futureBuilders } from '@/content/home';
import { images } from '@/content/images';
import { LIST_PRICE, formatCohortDate, getActiveOffer, getOpenCohort, getUpcomingCohort, rupees, today, type CohortState } from '@/content/future-builders';
import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { Dab } from '@/components/brush/marks';

/** Future Builders, introduced on the homepage. Status line follows the camp state and the offer. */
export function FutureBuildersFeature({ state }: { state: CohortState }) {
  const now = today();
  const open = getOpenCohort(now);
  const upcoming = getUpcomingCohort(now);
  const offer = getActiveOffer(now);
  const fee = offer.theme === 'festive' ? `${offer.name}: ${rupees(offer.price)} (list ${rupees(LIST_PRICE)}) until ${offer.endsLabel}.` : `Fee ${rupees(offer.price)} (list ${rupees(LIST_PRICE)}).`;
  const status = open
    ? `${open.name}, ${open.months}: registration ${state === 'closing-soon' ? 'closes' : 'open until'} ${formatCohortDate(open.registrationCloses, true)}. ${fee}`
    : upcoming
      ? `${upcoming.name}, ${upcoming.months}. Registration opens ${upcoming.registrationOpensLabel}.`
      : 'Dates for the next camp are being set. The waitlist is open.';

  return (
    <section className="section bg-sheet-deep">
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
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9" data-reveal>
          <Label className="mb-6">{futureBuilders.label}</Label>
          <h2 className="t-headline max-w-[12ch]">
            Build a <span className="t-accent">real</span> product.
          </h2>
          <p className="t-lead mt-6 text-graphite">{futureBuilders.line}</p>
          <p className="t-small mt-6 flex items-start gap-2.5 text-ink">
            <Dab ink="vermilion" className="mt-1.5" />
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
