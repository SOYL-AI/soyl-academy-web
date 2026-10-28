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
import { FutureBuildersBanner } from '@/components/marketing/FutureBuildersBanner';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { homeFaqs } from '@/content/faqs';
import { formatCohortDate, getCohortState, getOpenCohort } from '@/content/future-builders';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/' });

// The Future Builders banner and feature depend on today's date; re-check hourly.
export const revalidate = 3600;

/**
 * Homepage: promise → the shift → the method → how it works → belief →
 * subjects → who it's for → Future Builders → journal → FAQ → close.
 * Every section is fully visible without JS; motion only decorates.
 */
export default function HomePage() {
  const cohortState = getCohortState();
  const openCohort = getOpenCohort();

  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/' }),
          breadcrumbNode('/', [{ name: 'Home', path: '/' }]),
          faqNode('/', homeFaqs)
        )}
      />

      {openCohort && (
        <FutureBuildersBanner
          cohortKey={openCohort.registrationCloses}
          message={`Live online cohort for Grades 7–12. Registration ${cohortState === 'closing-soon' ? 'closes' : 'open until'} ${formatCohortDate(openCohort.registrationCloses)}.`}
        />
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
