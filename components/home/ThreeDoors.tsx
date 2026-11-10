import Link from 'next/link';
import { Arrow } from '@/components/ink/Button';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { photo } from '@/content/credits';
import { futureBuilders } from '@/content/home';
import { LIST_PRICE, formatCohortDate, getActiveOffer, getOpenCohort, getUpcomingCohort, rupees, today, type CohortState } from '@/content/future-builders';
import { cn } from '@/lib/utils';

/**
 * Screen 5, three doors (plan §3.2): the payer, the school, and the summer camp. Each card is one link.
 * Photographs are real (Pexels, content/credits.ts) and printed as duotones; the Future Builders card keeps its
 * own sunflower colour and its existing copy and camp status (content/future-builders.ts).
 */
function Door({
  href,
  photoSlug,
  label,
  title,
  line,
  cta,
  className,
  sizes,
}: {
  href: string;
  photoSlug: string;
  label: string;
  title: string;
  line: string;
  cta: string;
  className?: string;
  sizes: string;
}) {
  const p = photo(photoSlug);
  return (
    <Link href={href} className={cn('group flex h-full flex-col rounded-[var(--radius-md)] p-5 md:p-6', className)}>
      <InkPhoto src={p.src} alt={p.alt} aspect="3 / 2" sizes={sizes} />
      <p className="ink-label mt-5">{label}</p>
      <p className="ink-title mt-2 max-w-[18ch]">{title}</p>
      <p className="mt-3 flex-1 text-graphite">{line}</p>
      <span className="mt-5 inline-flex items-center gap-2 font-semibold text-indigo">
        {cta}
        <Arrow className="transition-transform duration-150 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function campStatus(state: CohortState): string {
  const now = today();
  const open = getOpenCohort(now);
  const upcoming = getUpcomingCohort(now);
  const offer = getActiveOffer(now);
  const fee =
    offer.theme === 'diwali'
      ? `${offer.name}: ${rupees(offer.price)} (list ${rupees(LIST_PRICE)}) until ${offer.endsLabel}.`
      : `Fee ${rupees(offer.price)} (list ${rupees(LIST_PRICE)}).`;
  if (open) return `${open.name}, ${open.months}: registration ${state === 'closing-soon' ? 'closes' : 'open until'} ${formatCohortDate(open.registrationCloses, true)}. ${fee}`;
  if (upcoming) return `${upcoming.name}, ${upcoming.months}. Registration opens ${upcoming.registrationOpensLabel}.`;
  return 'Dates for the next camp are being set. The waitlist is open.';
}

export function ThreeDoors({ cohortState }: { cohortState: CohortState }) {
  const sizes = '(min-width: 1320px) 380px, (min-width: 768px) 30vw, 92vw';
  return (
    <section aria-labelledby="doors-title" className="section">
      <div className="page">
        <h2 id="doors-title" className="ink-head max-w-[18ch]">
          For the people around a student.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Door
            href="/parents"
            photoSlug="parents-reading"
            label="For parents"
            title="See what your child did this week."
            line="What they studied and practised, and where they got stuck. The weekly report comes with Pro and the Board Exam Pass."
            cta="For parents"
            className="border border-rule bg-paper-2"
            sizes={sizes}
          />
          <Door
            href="/schools"
            photoSlug="classroom-from-behind"
            label="For schools"
            title="Homework was built for a world before AI."
            line="Interactive assignments from a teacher's own notes, with hints that never give the answer, for Grades 1 to 10."
            cta="For schools"
            className="border border-rule bg-paper-2"
            sizes={sizes}
          />
          <Link href={futureBuilders.link.href} className="group flex h-full flex-col rounded-[var(--radius-md)] bg-[#F3D36B] p-5 text-ink md:p-6">
            <InkPhoto src={photo('hands-breadboard').src} alt={photo('hands-breadboard').alt} aspect="3 / 2" sizes={sizes} />
            <p className="mt-5 text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-ink/75">{futureBuilders.label}</p>
            <p className="ink-title mt-2">{futureBuilders.headline}</p>
            <p className="mt-3 text-ink/85">{futureBuilders.line}</p>
            <p className="mt-3 flex-1 text-[0.9375rem] font-medium text-ink">{campStatus(cohortState)}</p>
            <span className="mt-5 inline-flex items-center gap-2 font-semibold">
              {futureBuilders.link.label}
              <Arrow className="transition-transform duration-150 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
