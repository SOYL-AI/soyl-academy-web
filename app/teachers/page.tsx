import { FinalCta } from '@/components/home/FinalCta';
import { MiniSimulator } from '@/components/home/MiniSimulator';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShot } from '@/components/ui/ProductShot';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { homeFaqs } from '@/content/faqs';
import { howItWorks } from '@/content/home';
import { images } from '@/content/images';
import { media } from '@/content/media';
import { PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/teachers' });

const IN_CHARGE = [
  { title: 'AI drafts, you decide', line: 'Every question is a draft until you approve it. Edit the wording, change the difficulty, or throw it out.' },
  { title: 'Hints that teach', line: 'Students get step-by-step nudges, never the answer, so the work they hand in is their own.' },
  { title: 'The process, not just the score', line: 'See how many tries each pupil needed, which hints they used, and where the class got stuck.' },
  { title: 'Simulators where they help', line: 'Maths, physics and chemistry questions can use interactive simulators instead of a text box.' },
];

const faqs = homeFaqs.filter((f) =>
  ['Who writes the questions, the AI or the teacher?', 'Do the hints just give students the answer?', 'Does SOYL Academy replace teachers?'].includes(f.question)
);

export default function TeachersPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/teachers' }),
          breadcrumbNode('/teachers', topLevelCrumbs('/teachers')),
          faqNode('/teachers', faqs)
        )}
      />

      <PageHero
        label="For teachers"
        title={
          <>
            Your notes in. Better homework <span className="t-accent">out.</span>
          </>
        }
        intro="SOYL turns the notes you already teach from into interactive assignments for Grades 1–10. You approve every question. Your pupils work it out for themselves. You see how each of them got there."
        actions={
          <>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <ButtonLink href="#workflow" variant="secondary" size="lg">
              See the workflow
            </ButtonLink>
          </>
        }
        image={images.teacherMentoring}
        imageLayout="wide"
      />

      <section className="section">
        <div className="page">
          <SectionHeader label="You stay in charge" num="01" title="Built around your judgement." />
          <ul className="mt-12 grid grid-cols-1 gap-x-10 md:mt-16 md:grid-cols-2">
            {IN_CHARGE.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ '--d': `${(i % 2) * 90}ms` } as React.CSSProperties}
                className="border-t border-rule-strong py-7 md:py-9"
              >
                <h3 className="t-title">{item.title}</h3>
                <p className="mt-3 max-w-[48ch] text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="workflow" className="section scroll-mt-16 bg-paper">
        <div className="page">
          <SectionHeader label={howItWorks.label} num="02" title={howItWorks.headline} intro={howItWorks.intro} />
          <div className="grid-12 mt-12 gap-y-12 md:mt-16">
            <ol className="col-span-12 lg:col-span-5">
              {howItWorks.steps.map((step, i) => (
                <li
                  key={step.title}
                  data-reveal
                  style={{ '--d': `${i * 80}ms` } as React.CSSProperties}
                  className="grid grid-cols-[3.25rem_1fr] gap-x-4 border-t border-rule-strong py-6 first:border-t-0 first:pt-0 md:py-7"
                >
                  <span className="t-num font-serif text-[2.75rem] leading-[0.9] text-cobalt">{i + 1}</span>
                  <div>
                    <h3 className="t-subtitle">{step.title}</h3>
                    <p className="mt-1.5 text-muted">{step.line}</p>
                    <ProductShot slot={media[step.media]} sizes="(min-width: 1024px) 420px, 90vw" className="mt-5" />
                  </div>
                </li>
              ))}
            </ol>
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 lg:pl-4" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              <p className="t-eyebrow mb-4 text-muted">What your pupils see</p>
              <MiniSimulator />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="page grid grid-cols-1 gap-4 md:grid-cols-2">
          <Photo image={images.studentsBuilding} aspect="aspect-[4/3]" large sizes="(min-width: 1320px) 600px, (min-width: 768px) 48vw, 100vw" />
          <Photo image={images.studentsPresenting} aspect="aspect-[4/3]" large delay={120} sizes="(min-width: 1320px) 600px, (min-width: 768px) 48vw, 100vw" />
        </div>
      </section>

      <Faq faqs={faqs} heading="Questions from teachers" />
      <FinalCta headline="Try it with your next lesson." line="Book a demo and we’ll show you SOYL, from your notes to your class heatmap." />
    </>
  );
}
