import { Hero } from '@/components/sections/Hero';
import { Interruption } from '@/components/sections/Interruption';
import { OldAssignment } from '@/components/sections/OldAssignment';
import { Transformation } from '@/components/sections/Transformation';
import { SoylMethod } from '@/components/sections/SoylMethod';
import { ForTeachers } from '@/components/sections/ForTeachers';
import { StudentExperience } from '@/components/sections/StudentExperience';
import { AiManifesto } from '@/components/sections/AiManifesto';
import { BuiltAroundTeachers } from '@/components/sections/BuiltAroundTeachers';
import { TwoPaths } from '@/components/sections/TwoPaths';
import { WhatWeTeach } from '@/components/sections/WhatWeTeach';
import { SoylJournal } from '@/components/sections/SoylJournal';
import { EducationManifesto } from '@/components/sections/EducationManifesto';
import { FinalCta } from '@/components/sections/FinalCta';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { homeFaqs } from '@/content/faqs';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/' });

export default function HomePage() {
  const structuredData = graph(
    webPageNode({ path: '/' }),
    breadcrumbNode('/', [{ name: 'Home', path: '/' }]),
    faqNode('/', homeFaqs)
  );
  return (
    <>
      <StructuredData data={structuredData} />

      {/* 01 — QUIET: Editorial hero */}
      <Hero />

      {/* 02 — LOUD: Typographic interruption */}
      <Interruption />

      {/* 03 — QUIET: Traditional assignment artifact */}
      <OldAssignment />

      {/* 04 — INTERACTIVE: Assignment transformation */}
      <Transformation />

      {/* 05 — LOUD: The SOYL Method */}
      <SoylMethod />

      {/* 06 — HUMAN: For teachers */}
      <ForTeachers />

      {/* 07 — EDITORIAL: Student experience */}
      <StudentExperience />

      {/* 08 — LOUD: AI manifesto (peak moment) */}
      <AiManifesto />

      {/* 09 — QUIET: Built around teachers */}
      <BuiltAroundTeachers />

      {/* 10 — EDITORIAL: Two paths */}
      <TwoPaths />

      {/* 11 — EDITORIAL: What we teach */}
      <WhatWeTeach />

      {/* 12 — EDITORIAL: Journal preview */}
      <SoylJournal />

      {/* 12b — QUIET: FAQ (answer-first; mirrors FAQPage JSON-LD) */}
      <Faq faqs={homeFaqs} variant="section" heading="Common questions about SOYL Academy" />

      {/* 13 — LOUD: Education manifesto (climax) */}
      <EducationManifesto />

      {/* 14 — QUIET: Final CTA */}
      <FinalCta />
    </>
  );
}
