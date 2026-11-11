import { HowItWorks } from '@/components/home/HowItWorks';
import { InkLink } from '@/components/ink/Button';
import { ClosingCta } from '@/components/ink/ClosingCta';
import { Dab } from '@/components/ink/Dab';
import { FaqList } from '@/components/ink/FaqList';
import { PageIntro } from '@/components/ink/PageIntro';
import { Section } from '@/components/ink/Section';
import { Stroke } from '@/components/ink/Stroke';
import { StructuredData } from '@/components/seo/StructuredData';
import { homeFaqs } from '@/content/faqs';
import { howItWorks } from '@/content/home';
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

/**
 * For teachers, in Ink and wash (docs/redesign-ink-and-wash.md §3.3). Job: book a pilot (a demo first).
 *
 *   intro         "Your notes in. Better homework out."   (photo: a teacher at a blackboard, an adult)
 *   how it works  the four steps, beside the question a pupil sees, playable
 *   in charge     what stays the teacher's call
 *   FAQ, then the closing action (Book a demo)
 */
export default function TeachersPage() {
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/teachers' }), breadcrumbNode('/teachers', topLevelCrumbs('/teachers')), faqNode('/teachers', faqs))}
      />

      <PageIntro
        title={
          <>
            <span className="block">Your notes in.</span>
            <span className="block">Better homework out.</span>
          </>
        }
        className="[&_h1]:max-w-[24ch]"
        lead="SOYL turns the notes you already teach from into interactive assignments for Grades 1 to 10. You approve every question. Your pupils work it out for themselves, and you see how each of them got there."
        actions={
          <>
            <InkLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </InkLink>
            <InkLink href="#try" variant="quiet">
              Try it as a pupil
            </InkLink>
          </>
        }
        photo={{ slug: 'teacher-blackboard', position: '30% 50%' }}
      />

      <HowItWorks id="workflow" title={howItWorks.headline} intro={howItWorks.intro} steps={howItWorks.steps} tryTitle="What your pupils see" />

      <Section aria-labelledby="charge-title">
        <h2 id="charge-title" className="ink-head max-w-[16ch]">
          Built around your judgement.
        </h2>
        <Stroke pigment="madder" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
        <ul className="mt-10 grid gap-x-10 md:grid-cols-2">
          {IN_CHARGE.map((item) => (
            <li key={item.title} className="flex gap-4 border-t border-rule py-6 md:py-8">
              <Dab pigment="indigo" className="mt-1 text-[1.5rem]" />
              <div>
                <h3 className="ink-title">{item.title}</h3>
                <p className="mt-2 max-w-[46ch] text-graphite">{item.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <FaqList faqs={faqs} heading="Questions from teachers" />
      <ClosingCta headline="Try it with your next lesson." line="Book a demo and we’ll show you SOYL, from your notes to your class heatmap." />
    </>
  );
}
