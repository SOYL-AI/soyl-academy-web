import { Hero } from '@/components/home/Hero';
import { ProofStrip } from '@/components/home/ProofStrip';
import { Shift } from '@/components/home/Shift';
import { MethodModule } from '@/components/home/MethodModule';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Belief } from '@/components/home/Belief';
import { Subjects } from '@/components/home/Subjects';
import { Audiences } from '@/components/home/Audiences';
import { FutureBuildersFeature } from '@/components/home/FutureBuildersFeature';
import { JournalTeaser } from '@/components/home/JournalTeaser';
import { FinalCta } from '@/components/home/FinalCta';
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
 * Homepage: promise → the shift → the method → how it works → belief →
 * subjects → who it's for → Future Builders → journal → FAQ → close.
 * Every section is fully visible without JS; motion only decorates.
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

      <Hero />
      <ProofStrip />
      <Shift />
      <MethodModule />
      <HowItWorks />
      <Belief />
      <Subjects />
      <Audiences />
      <FutureBuildersFeature state={cohortState} />
      <JournalTeaser />
      <Faq faqs={homeFaqs} heading="Common questions about SOYL Academy" num="07" />
      <FinalCta />
    </>
  );
}
