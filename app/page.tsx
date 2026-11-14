import { Prologue } from '@/components/home/story/Prologue';
import { Tuesday } from '@/components/home/story/Tuesday';
import { Wednesday } from '@/components/home/story/Wednesday';
import { TheHour } from '@/components/home/story/TheHour';
import { ThoughtprintChapter } from '@/components/home/story/ThoughtprintChapter';
import { Monday } from '@/components/home/story/Monday';
import { Recheck } from '@/components/home/story/Recheck';
import { StoryChapter } from '@/components/home/story/StoryChapter';
import { HouseRules } from '@/components/home/story/HouseRules';
import { FourWays } from '@/components/home/story/FourWays';
import { Epilogue } from '@/components/home/story/Epilogue';
import { FutureBuildersFeature } from '@/components/home/FutureBuildersFeature';
import { ChapterRail } from '@/components/story/ChapterRail';
import { OfferTab } from '@/components/marketing/OfferTab';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { homeFaqs } from '@/content/faqs';
import { LIST_PRICE, getActiveOffer, getCohortState, getOpenCohort, previewNow, rupees, today } from '@/content/future-builders';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/' });

// The Future Builders offer tab and feature depend on today's date; re-check every 5 minutes
// (the tab also hides itself in the browser at the offer's end).
export const revalidate = 300;

/**
 * Homepage (ADR-034): the story of one mission, in chapters. Prologue → Tuesday night (the old way) → Wednesday (a
 * mission) → the hour (five stages) → the Thoughtprint → Monday (groups, not marks) → seven days later → the Story
 * (Story of Your Life) → house rules → four readers → Future Builders → FAQ → epilogue. Ira and Ms Rao are an
 * illustrative story; the page says so. Native scroll; pinned scenes are short and the chapter rail skips them.
 */
export default function HomePage() {
  const now = today();
  const cohortState = getCohortState(now);
  const openCohort = getOpenCohort(now);
  const offer = getActiveOffer(now);
  const preview = previewNow();
  // eslint-disable-next-line react-hooks/purity -- dev preview only: aligns the tab's expiry with COHORT_PREVIEW_DATE
  const offsetMs = preview ? preview.getTime() - Date.now() : undefined;

  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/' }),
          breadcrumbNode('/', [{ name: 'Home', path: '/' }]),
          faqNode('/', homeFaqs)
        )}
      />

      {/* Future Builders offer side tab (now the Children’s Day offer): only while registration is open and the offer runs. */}
      {openCohort && offer.theme === 'festive' && offer.endsAt && (
        <OfferTab offerKey={offer.campaign ?? offer.slug} label={offer.label ?? offer.name} price={rupees(offer.price)} listPrice={rupees(LIST_PRICE)} endsAt={offer.endsAt} offsetMs={offsetMs} />
      )}

      <ChapterRail label="Chapters of the story" />
      <Prologue />
      <Tuesday />
      <Wednesday />
      <TheHour />
      <ThoughtprintChapter />
      <Monday />
      <Recheck />
      <StoryChapter />
      <HouseRules />
      <FourWays />
      <FutureBuildersFeature state={cohortState} />
      <Faq faqs={homeFaqs} heading="Common questions about SOYL missions" />
      <Epilogue />
    </>
  );
}
