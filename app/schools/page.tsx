import { FinalCta } from '@/components/home/FinalCta';
import { ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Label, SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { schoolsFaqs } from '@/content/faqs';
import { images } from '@/content/images';
import { PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, howToNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/schools' });

const workflowSteps = [
  { title: 'Teacher design', desc: 'Educators frame the learning objective using SOYL’s challenge structure.' },
  { title: 'Student context', desc: 'Students are presented with the scenario and constraints.' },
  { title: 'Strategy and ideation', desc: 'Students map out their approach before jumping to solutions.' },
  { title: 'Student action', desc: 'Students research, build, write or create their solution, documenting their process.' },
  { title: 'Defence and reflection', desc: 'Students explain why they made their choices and what they learned.' },
  { title: 'Educator review', desc: 'Teachers evaluate the evidence of thinking, guided by SOYL’s class insights.' },
];

const PILOT = [
  { phase: 'Introduce', weeks: 'Weeks 1–2', line: 'Training for a core group of early-adopter teachers. Map 2–3 key units to SOYL.' },
  { phase: 'Implement', weeks: 'Weeks 3–8', line: 'Teachers run SOYL assignments, with ongoing support based on how students respond.' },
  { phase: 'Evaluate', weeks: 'Weeks 9–10', line: 'Review student work, teacher feedback and depth of learning; plan a wider rollout.' },
];

export default function SchoolsPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/schools' }),
          breadcrumbNode('/schools', topLevelCrumbs('/schools')),
          howToNode(
            'The SOYL Academy assignment workflow',
            'How a teacher designs, assigns and evaluates an outcome-based SOYL challenge in six steps.',
            workflowSteps
          ),
          faqNode('/schools', schoolsFaqs)
        )}
      />

      <PageHero
        label="For schools"
        title={
          <>
            Change what homework <span className="t-accent">means.</span>
          </>
        }
        intro="Traditional assignments no longer reliably show learning. SOYL gives every classroom assignments students have to work out, and gives teachers and leaders evidence of how they did it."
        actions={
          <>
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              Plan a pilot
            </ButtonLink>
            <ButtonLink href="#workflow" variant="secondary" size="lg">
              See the workflow
            </ButtonLink>
          </>
        }
        image={images.classroomWide}
        imageLayout="wide"
      />

      <section className="section">
        <div className="page grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-6" data-reveal>
            <Label num="01" className="mb-6">The problem</Label>
            <h2 className="t-headline max-w-[14ch]">The output is no longer the proof.</h2>
          </div>
          <div className="col-span-12 space-y-5 lg:col-span-5 lg:col-start-8 lg:pt-14" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <p className="t-lead text-ink">
              When AI can produce a B+ essay or solve an equation in seconds, the finished work alone proves nothing.
            </p>
            <p className="text-muted">
              The answer isn’t to ban technology. It’s to change the assignment, so that students apply, explain and defend what they know, and teachers can see the thinking behind every answer.
            </p>
          </div>
        </div>
      </section>

      <section id="workflow" className="section scroll-mt-16 bg-paper">
        <div className="page">
          <SectionHeader label="The SOYL workflow" num="02" title="Six steps, teacher-led throughout." />
          <ol className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {workflowSteps.map((step, i) => (
              <li
                key={step.title}
                data-reveal
                style={{ '--d': `${(i % 3) * 80}ms` } as React.CSSProperties}
                className="border-t border-rule-strong pb-10 pt-6"
              >
                <span className="t-num font-serif text-[3rem] leading-none text-cobalt">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-subtitle mt-5">{step.title}</h3>
                <p className="mt-2 max-w-[36ch] text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="page grid-12 items-center gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <Photo
              image={images.teacherMentoring}
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              large
              parallax
              sizes="(min-width: 1320px) 480px, (min-width: 1024px) 40vw, 100vw"
            />
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div data-reveal>
              <Label num="03" className="mb-6">What a pilot looks like</Label>
              <h2 className="t-headline">
                Ten weeks. <span className="t-accent">Your</span> curriculum.
              </h2>
              <p className="t-lead mt-6 max-w-[46ch]">
                SOYL works alongside your existing standards, whether Common Core, IB, IGCSE or local frameworks. It changes how learning is assessed, not what is taught.
              </p>
            </div>
            <ol className="mt-10 border-t border-ink">
              {PILOT.map((p, i) => (
                <li
                  key={p.phase}
                  data-reveal
                  style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                  className="grid grid-cols-1 gap-2 border-b border-rule py-6 sm:grid-cols-[8rem_1fr] sm:gap-6"
                >
                  <span className="t-label t-num text-muted">{p.weeks}</span>
                  <div>
                    <h3 className="font-serif text-[1.75rem] leading-none">{p.phase}</h3>
                    <p className="mt-2 text-muted">{p.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Faq faqs={schoolsFaqs} heading="Questions from school leaders" className="pt-0" />
      <FinalCta headline="Start with one class." line="Book a demo to see SOYL and plan a ten-week pilot for your school." />
    </>
  );
}
