import { FinalCta } from '@/components/home/FinalCta';
import { ButtonLink } from '@/components/notebook/Button';
import { PageHero } from '@/components/notebook/PageHero';
import { ProductShot } from '@/components/notebook/ProductShot';
import { SectionHeader } from '@/components/notebook/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { homeFaqs } from '@/content/faqs';
import { howItWorks } from '@/content/home';
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
        title="Your notes in. Better homework out."
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
        aside={<ProductShot slot={media.teacherApproves} sizes="(min-width: 1024px) 480px, 92vw" priority />}
      />

      <section className="section">
        <div className="page">
          <SectionHeader label="You stay in charge" title="Built around your judgement." />
          <ul className="mt-10 grid grid-cols-1 gap-px border border-rule bg-rule md:mt-14 md:grid-cols-2">
            {IN_CHARGE.map((item) => (
              <li key={item.title} className="bg-white p-5 md:p-7">
                <h3 className="t-subtitle">{item.title}</h3>
                <p className="mt-2 max-w-[52ch] text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="workflow" className="section rule-t scroll-mt-16">
        <div className="page">
          <SectionHeader label={howItWorks.label} title={howItWorks.headline} intro={howItWorks.intro} />
          <ol className="mt-10 space-y-px border border-rule bg-rule md:mt-14">
            {howItWorks.steps.map((step, i) => (
              <li key={step.title} className="grid-12 items-center gap-y-5 bg-white p-5 md:p-7">
                <div className="col-span-12 flex gap-4 md:col-span-5">
                  <span className="t-num font-serif text-[2.25rem] leading-none text-cobalt">{i + 1}</span>
                  <div>
                    <h3 className="t-subtitle">{step.title}</h3>
                    <p className="mt-1 text-muted">{step.line}</p>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <ProductShot slot={media[step.media]} sizes="(min-width: 768px) 520px, 92vw" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Faq faqs={faqs} heading="Questions from teachers" />
      <FinalCta headline="Try it with your next lesson." line="Book a demo and we’ll show you SOYL, from your notes to your class heatmap." />
    </>
  );
}
