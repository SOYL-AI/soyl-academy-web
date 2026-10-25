import Link from 'next/link';
import { ArrowRight, ButtonLink } from '@/components/notebook/Button';
import { PageHero } from '@/components/notebook/PageHero';
import { SectionHeader } from '@/components/notebook/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { whatWeTeachFaqs } from '@/content/faqs';
import { PRIMARY_CTA } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, programListNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/what-we-teach' });

const programs = [
  {
    id: 'ai-tech',
    category: 'AI & Technology',
    title: 'Applied Intelligence',
    description: 'Move beyond prompting. Learn to build systems, automate workflows, and use AI as a co-creator rather than a search engine.',
    tags: ['Machine learning basics', 'Prompt engineering', 'Ethical AI', 'Workflow automation'],
  },
  {
    id: 'build-make',
    category: 'Building & Making',
    title: 'Digital Craftsmanship',
    description: 'The distance between an idea and a product has never been shorter. Bring ideas to life through code, design, and prototyping.',
    tags: ['Web development', 'UI/UX design', 'Rapid prototyping', 'Product thinking'],
  },
  {
    id: 'comm-ideas',
    category: 'Communication & Ideas',
    title: 'The Art of Argument',
    description: 'In an era of deepfakes and algorithmic feeds, clarity of thought and expression is a superpower.',
    tags: ['Debate', 'Editorial writing', 'Data storytelling', 'Media literacy'],
  },
  {
    id: 'problem-solving',
    category: 'Problem Solving',
    title: 'Systems Thinking',
    description: 'Complex problems rarely have simple answers. Learn to map systems, identify feedback loops, and design interventions.',
    tags: ['Systems mapping', 'Root cause analysis', 'Design thinking', 'Simulation'],
  },
];

export default function WhatWeTeachPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/what-we-teach', mainEntityId: `${absoluteUrl('/what-we-teach')}#programs` }),
          breadcrumbNode('/what-we-teach', topLevelCrumbs('/what-we-teach')),
          programListNode(programs),
          faqNode('/what-we-teach', whatWeTeachFaqs)
        )}
      />

      <PageHero
        label="What we teach"
        title={
          <>
            Some things are better learned <span className="mark">together</span>.
          </>
        }
        intro="Join Future Builders online as an individual student, or bring SOYL workshops into your school."
      />

      <section className="section-tight">
        <div className="page">
          <div className="module grid-12 items-center gap-y-5 border-t-2 border-t-cobalt p-6 md:p-8">
            <div className="col-span-12 md:col-span-8">
              <p className="t-label text-muted">Running now · Grades 7–12</p>
              <h2 className="t-title mt-2">Future Builders</h2>
              <p className="mt-2 max-w-[56ch] text-muted">
                A 12-weekend live online cohort: software, AI, IoT robotics and entrepreneurship, ending in a Demo Day pitch.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <Link href="/future-builders" className="arrow-link">
                See dates and fees <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section rule-t">
        <div className="page">
          <SectionHeader label="Coming soon" title="School workshops and programmes." intro="Intensive sessions where students negotiate, build and defend ideas in real time." />
          <ul className="mt-10 grid grid-cols-1 gap-px border border-rule bg-rule md:mt-14 md:grid-cols-2">
            {programs.map((p) => (
              <li key={p.id} className="flex flex-col bg-white p-5 md:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="t-label text-muted">{p.category}</p>
                  <p className="t-label bg-paper px-2 py-0.5 text-ink">Coming soon</p>
                </div>
                <h3 className="t-title mt-3">{p.title}</h3>
                <p className="mt-2 text-muted">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
                  {p.tags.map((t) => (
                    <li key={t} className="t-label border border-rule px-2.5 py-1 text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href={PRIMARY_CTA.href} variant="secondary">
              Ask about workshops for your school
            </ButtonLink>
          </div>
        </div>
      </section>

      <Faq faqs={whatWeTeachFaqs} heading="Questions about our programmes" />
    </>
  );
}
