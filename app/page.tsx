import { Hero } from '@/components/sections/Hero';
import { ProblemSequence } from '@/components/sections/ProblemSequence';
import { AssignmentTransform } from '@/components/sections/AssignmentTransform';
import { MethodSequence } from '@/components/sections/MethodSequence';
import { ProductFlow } from '@/components/sections/ProductFlow';
import { SubjectExperiences } from '@/components/sections/SubjectExperiences';
import { AudienceEntryPoints } from '@/components/sections/AudienceEntryPoints';
import { PhilosophyManifesto } from '@/components/sections/PhilosophyManifesto';
import { ProofSection } from '@/components/sections/ProofSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { homeFaqs } from '@/content/faqs';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/' });

/**
 * Homepage — one idea per section, shown more than told.
 * See docs/homepage-redesign.md for the story, copy budget and motion plan.
 */
export default function HomePage() {
  const structuredData = graph(
    webPageNode({ path: '/' }),
    breadcrumbNode('/', [{ name: 'Home', path: '/' }]),
    faqNode('/', homeFaqs)
  );

  return (
    <>
      <StructuredData data={structuredData} />

      {/* 01 — Hero: headline + a card that turns worksheet into challenge */}
      <Hero />

      {/* 02 — Problem: Prompt → AI → Answer → Submit → A+ (scroll-driven) */}
      <ProblemSequence />

      {/* 03 — The SOYL version: the same assignment, rebuilt */}
      <AssignmentTransform />

      {/* 04 — Method: Understand → Apply → Create → Defend → Reflect */}
      <MethodSequence />

      {/* 05 — Product: notes → outcome → draft → adapt → student → evidence */}
      <ProductFlow />

      {/* 06 — Subjects: assignments are more than a text box */}
      <SubjectExperiences />

      {/* 07 — Three doors: teachers / students / schools */}
      <AudienceEntryPoints />

      {/* 08 — Philosophy: the manifesto moment */}
      <PhilosophyManifesto />

      {/* 09 — Proof: renders nothing until content/proof.ts has real entries */}
      <ProofSection />

      {/* Answer-first FAQ. Kept: it mirrors the FAQPage JSON-LD above. */}
      <Faq faqs={homeFaqs} variant="section" heading="Common questions about SOYL Academy" />

      {/* 10 — Close */}
      <FinalCta />
    </>
  );
}
