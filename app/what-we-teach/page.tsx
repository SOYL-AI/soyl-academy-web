import Link from 'next/link';
import { PageHero } from '@/components/ui/PageHero';
import { ComingSoon } from '@/components/ui/ComingSoon';
import { Photo } from '@/components/media/Photo';
import { images } from '@/content/images';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { Dab, InkPath, type Ink } from '@/components/brush/marks';
import { whatWeTeachFaqs } from '@/content/faqs';
import { PRIMARY_CTA } from '@/lib/site';
import { absoluteUrl } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, programListNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/what-we-teach' });

const programs: { id: string; category: string; title: string; description: string; tags: string[]; ink: Ink }[] = [
  {
    id: 'ai-tech',
    category: 'AI & Technology',
    title: 'Applied Intelligence',
    description: 'Build with AI, automate the dull parts, and treat it as a co-creator, not a search engine.',
    tags: ['Machine learning basics', 'Prompt engineering', 'Ethical AI', 'Workflow automation'],
    ink: 'ultramarine',
  },
  {
    id: 'build-make',
    category: 'Building & Making',
    title: 'Digital Craftsmanship',
    description: 'Turn ideas into things that work, through code, design and prototypes.',
    tags: ['Web development', 'UI/UX design', 'Rapid prototyping', 'Product thinking'],
    ink: 'vermilion',
  },
  {
    id: 'comm-ideas',
    category: 'Communication & Ideas',
    title: 'The Art of Argument',
    description: 'Say clearly what you think, and defend it, in a world of deepfakes and feeds.',
    tags: ['Debate', 'Editorial writing', 'Data storytelling', 'Media literacy'],
    ink: 'ochre',
  },
  {
    id: 'problem-solving',
    category: 'Problem Solving',
    title: 'Systems Thinking',
    description: 'Map how a problem works before you try to fix it.',
    tags: ['Systems mapping', 'Root cause analysis', 'Design thinking', 'Simulation'],
    ink: 'sap',
  },
];

/** What we teach (ADR-033): Future Builders, open now, then the four programme areas as notebook pages. */
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
        tone="yellow"
        label="What we teach"
        title={
          <>
            Some things are better learned <span className="t-accent">together.</span>
          </>
        }
        intro="Future Builders online for individual students now; workshops for schools next."
        image={images.studentsDebating}
      />

      <section className="section-tight">
        <div className="page">
          <Link href="/future-builders" className="leaf group grid-12 items-center gap-y-6 p-5 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:p-7" data-reveal>
            <div className="col-span-12 md:col-span-4">
              <Photo image={images.fbSoftware} aspect="aspect-[3/2]" reveal={false} sizes="(min-width: 768px) 380px, 100vw" />
            </div>
            <div className="col-span-12 md:col-span-5 md:pl-4">
              <p className="hand text-[1.25rem] text-sap">Open now · Grades 7–12</p>
              <h2 className="t-title mt-1">Future Builders</h2>
              <p className="mt-2 max-w-[48ch] text-graphite">A live online summer camp: software, AI, IoT and entrepreneurship, ending in a Demo Day pitch.</p>
            </div>
            <div className="col-span-12 md:col-span-3 md:text-right">
              <span className="relative inline-flex items-center gap-2 font-semibold">
                See dates and fees
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                  <path d="M3 12.5 C 9 11.5, 14 12.8, 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M14.5 6.5 L 20.5 12 L 14.5 17.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <InkPath mark="under" ink="sap" weight={3} className="ink-hover absolute -bottom-1 left-0 h-2 w-full" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="section bg-sheet-deep" id="programs">
        <div className="page">
          <SectionHeader label="Coming soon" title="Workshops and programmes for schools." intro="Intensive sessions where students negotiate, build and defend ideas in real time." />
          <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
            {programs.map((p, i) => (
              <li
                key={p.id}
                data-reveal
                style={{ '--d': `${(i % 2) * 90}ms` } as React.CSSProperties}
                className={`leaf flex flex-col p-6 md:p-8 ${i % 2 ? 'tilt-r' : 'tilt-l'}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="hand flex items-center gap-2 text-[1.2rem] text-graphite">
                    <Dab ink={p.ink} />
                    {p.category}
                  </p>
                  <p className="swipe text-[0.85rem] font-semibold">Coming soon</p>
                </div>
                <h3 className="t-title mt-4">{p.title}</h3>
                <p className="mt-2 text-graphite">{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
                  {p.tags.map((t) => (
                    <li key={t} className="sketch-soft px-3 py-1 text-[0.875rem] text-ink">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <ComingSoon
            className="mt-10"
            title={
              <>
                Workshops for your <span className="t-accent">school.</span>
              </>
            }
            line="Tell us about your school and we’ll be in touch when the first workshops open."
            primary={{ label: 'Register your school', href: '/contact' }}
            secondary={{ label: PRIMARY_CTA.label, href: PRIMARY_CTA.href }}
          />
        </div>
      </section>

      <Faq faqs={whatWeTeachFaqs} heading="Questions about our programmes" />
    </>
  );
}
