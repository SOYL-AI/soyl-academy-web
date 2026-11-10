import { DiwaliOfferTab } from '@/components/marketing/DiwaliOfferTab';
import { Door } from '@/components/home/Door';
import { DoorStateProvider } from '@/components/home/DoorState';
import { ExamClock } from '@/components/home/ExamClock';
import { HomeFaq } from '@/components/home/HomeFaq';
import { Ledger } from '@/components/home/Ledger';
import { Taste } from '@/components/home/Taste';
import { ThreeDoors } from '@/components/home/ThreeDoors';
import { StructuredData } from '@/components/seo/StructuredData';
import { BOARD_EXAMS_MONTH_LINE } from '@/content/exam-dates';
import { freeLearningFaqs, homeFaqs } from '@/content/faqs';
import { LIST_PRICE, getActiveOffer, getCohortState, getOpenCohort, previewNow, rupees, today } from '@/content/future-builders';
import { boardExamPass, daysToFirstPaper, quickDoubtCredits } from '@/lib/home/numbers';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/seo/schema';
import { PLATFORM_ENABLED } from '@/lib/site';
import { AI_ACTIONS } from '@/platform/shared/config/ai-actions';
import { LEAGUE_TIERS, STREAK } from '@/platform/shared/config/gamification';
import { getPlan } from '@/platform/shared/config/plans';

export const metadata = createMetadata({ path: '/' });

// The offer tab, the camp status and the exam clock depend on today's date; re-check every 5 minutes
// (the tab also hides itself in the browser at the offer's end).
export const revalidate = 300;

/**
 * The homepage, "Ink and wash" (docs/redesign-ink-and-wash.md §3.2): it leads with free learning.
 *
 *   1 door      the promise, "What are you studying?", the ring with a real question
 *   2 ledger    what is free and the one thing that is metered            (platform on)
 *   3 taste     a lesson, a flashcard and a doubt for the chosen class    (platform on)
 *   4 clock     days to the first paper and the pass, or streaks           (platform on)
 *   5 doors     parents, schools, Future Builders
 *   6 FAQ
 *
 * With the platform flag off the page carries no platform link (GEN-4): the door says lessons open soon and
 * screens 2 to 4 are left out. Every section is complete without JS; motion only decorates. Every number is
 * read from config.
 */
export default function HomePage() {
  const now = today();
  const cohortState = getCohortState(now);
  const openCohort = getOpenCohort(now);
  const offer = getActiveOffer(now);
  const preview = previewNow();
  // eslint-disable-next-line react-hooks/purity -- dev preview only: aligns the tab's expiry with COHORT_PREVIEW_DATE
  const offsetMs = preview ? preview.getTime() - Date.now() : undefined;
  const faqs = PLATFORM_ENABLED ? freeLearningFaqs() : homeFaqs;

  return (
    <>
      <StructuredData data={graph(webPageNode({ path: '/' }), breadcrumbNode('/', [{ name: 'Home', path: '/' }]), faqNode('/', faqs))} />

      {/* Future Builders "Diwali offer" side tab: only while registration is open and the offer runs (plan §3.4). */}
      {openCohort && offer.theme === 'diwali' && offer.endsAt && (
        <DiwaliOfferTab offerKey={offer.slug} price={rupees(offer.price)} listPrice={rupees(LIST_PRICE)} endsAt={offer.endsAt} offsetMs={offsetMs} />
      )}

      <DoorStateProvider remember={PLATFORM_ENABLED}>
        <Door />
        {PLATFORM_ENABLED ? (
          <>
            <Ledger />
            <Taste doubtCredits={quickDoubtCredits()} doubtGuide={AI_ACTIONS['quick-doubt'].guide} />
            <ExamClock
              days={{
                'cbse-10': daysToFirstPaper('cbse', 10, now),
                'cbse-12': daysToFirstPaper('cbse', 12, now),
                'icse-10': daysToFirstPaper('icse', 10, now),
                'isc-12': daysToFirstPaper('isc', 12, now),
              }}
              monthLine={BOARD_EXAMS_MONTH_LINE}
              pass={boardExamPass(now)}
              passCredits={getPlan('board_exam_pass').creditsPerDay}
              freezesPerWeek={STREAK.freezesPerWeek}
              leagueFrom={LEAGUE_TIERS[0]!.name}
              leagueTo={LEAGUE_TIERS[LEAGUE_TIERS.length - 1]!.name}
            />
          </>
        ) : null}
      </DoorStateProvider>

      <ThreeDoors cohortState={cohortState} />
      <HomeFaq faqs={faqs} />
    </>
  );
}
