import Link from 'next/link';
import { Arrow } from '@/components/ink/Button';
import { ClosingCta } from '@/components/ink/ClosingCta';
import { Dab, type Pigment } from '@/components/ink/Dab';
import { FaqList } from '@/components/ink/FaqList';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { PageIntro } from '@/components/ink/PageIntro';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { StructuredData } from '@/components/seo/StructuredData';
import { photo } from '@/content/credits';
import { whatWeTeachFaqs } from '@/content/faqs';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, programListNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/what-we-teach' });

const programs: { id: string; category: string; title: string; description: string; tags: string[]; pigment: Pigment }[] = [
  {
    id: 'ai-tech',
    category: 'AI & Technology',
    title: 'Applied Intelligence',
    description: 'Move beyond prompting. Learn to build systems, automate workflows, and use AI as a co-creator rather than a search engine.',
    tags: ['Machine learning basics', 'Prompt engineering', 'Ethical AI', 'Workflow automation'],
    pigment: 'indigo',
  },
  {
    id: 'build-make',
    category: 'Building & Making',
    title: 'Digital Craftsmanship',
    description: 'The distance between an idea and a product has never been shorter. Bring ideas to life through code, design, and prototyping.',
    tags: ['Web development', 'UI/UX design', 'Rapid prototyping', 'Product thinking'],
    pigment: 'turmeric',
  },
  {
    id: 'comm-ideas',
    category: 'Communication & Ideas',
    title: 'The Art of Argument',
    description: 'In an era of deepfakes and algorithmic feeds, clarity of thought and expression is a superpower.',
    tags: ['Debate', 'Editorial writing', 'Data storytelling', 'Media literacy'],
    pigment: 'madder',
  },
  {
    id: 'problem-solving',
    category: 'Problem Solving',
    title: 'Systems Thinking',
    description: 'Complex problems rarely have simple answers. Learn to map systems, identify feedback loops, and design interventions.',
    tags: ['Systems mapping', 'Root cause analysis', 'Design thinking', 'Simulation'],
    pigment: 'leaf',
  },
];

/**
 * What we teach, in Ink and wash (plan §3.3, phase 5): Future Builders, open now (its card keeps the camp's
 * sunflower, as on the homepage), the school workshops that are coming, the questions, and one action.
 */
export default function WhatWeTeachPage() {
  const team = photo('arduino-team');
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

      <PageIntro
        title="Some things are better learned together."
        lead="Join Future Builders online as an individual student, or bring SOYL workshops into your school."
        photo={{ slug: 'electronics-top', position: '50% 55%' }}
        className="[&_h1]:max-w-[19ch]"
      />

      <section aria-labelledby="fb-title" className="pb-16 md:pb-24">
        <div className="page">
          <Link href="/future-builders" className="group grid items-center gap-6 rounded-[var(--radius-md)] bg-[#F3D36B] p-5 text-ink md:grid-cols-12 md:gap-8 md:p-6">
            <div className="md:col-span-5 lg:col-span-4">
              <InkPhoto src={team.src} alt={team.alt} aspect="3 / 2" position="30% 50%" sizes="(min-width: 1320px) 400px, (min-width: 768px) 38vw, 92vw" />
            </div>
            <div className="md:col-span-7 lg:col-span-8 lg:pr-6">
              <p className="text-[0.9375rem] font-medium text-ink/80">Grades 7 to 12</p>
              <h2 id="fb-title" className="ink-head mt-2">
                Future Builders
              </h2>
              <p className="mt-3 max-w-[56ch] text-ink/85">
                A 2-month live online summer camp: software, AI, IoT robotics and entrepreneurship, ending in a Demo Day pitch.
              </p>
              <span className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold">
                See dates and fees
                <Arrow className="transition-transform duration-150 group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <Section ground="paper-2" aria-labelledby="workshops-title">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 id="workshops-title" className="ink-head max-w-[16ch]">
              School workshops and programmes.
            </h2>
            <Stroke pigment="turmeric" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
          </div>
          <div className="lg:col-span-5">
            <p className="ink-lead max-w-[42ch]">Intensive sessions where students negotiate, build and defend ideas in real time.</p>
            <p className="mt-4 inline-flex rounded-[var(--radius-xs)] bg-paper px-2.5 py-1 text-[0.875rem] font-semibold text-ink">Coming soon</p>
          </div>
        </div>

        <ul className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-5">
          {programs.map((p) => (
            <li key={p.id} className="flex flex-col rounded-[var(--radius-md)] bg-paper p-6 md:p-8">
              <p className="flex items-center gap-2.5 text-[0.9375rem] font-medium text-graphite">
                <Dab pigment={p.pigment} className="text-[2rem]" />
                {p.category}
              </p>
              <h3 className="ink-title mt-4">{p.title}</h3>
              <p className="mt-2 flex-1 text-graphite">{p.description}</p>
              <ul aria-label="Topics" className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-[var(--radius-xs)] bg-paper-2 px-2.5 py-1 text-[0.875rem] text-ink">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <FaqList faqs={whatWeTeachFaqs} heading="Questions, answered." />

      <ClosingCta
        headline="Workshops for your school."
        line="We are shaping the first school workshops now. Tell us about your school and we will be in touch when they open."
        action={{ label: 'Register your school', href: '/contact' }}
      />
    </>
  );
}
