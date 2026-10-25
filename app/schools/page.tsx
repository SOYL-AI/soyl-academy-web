import { FinalCta } from '@/components/home/FinalCta';
import { ButtonLink } from '@/components/notebook/Button';
import { PageHero } from '@/components/notebook/PageHero';
import { ProductShot } from '@/components/notebook/ProductShot';
import { Label, SectionHeader } from '@/components/notebook/SectionHeader';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { schoolsFaqs } from '@/content/faqs';
import { media } from '@/content/media';
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
        title="Change what homework means."
        intro="Traditional assignments no longer reliably show learning. SOYL gives every classroom assignments students have to work out, and gives teachers and leaders evidence of how they did it."
        actions={
          <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
            Plan a pilot
          </ButtonLink>
        }
        aside={<ProductShot slot={media.schools} kind="Photo" sizes="(min-width: 1024px) 480px, 92vw" priority />}
      />

      <section className="section">
        <div className="page grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <Label className="mb-5">The problem</Label>
            <h2 className="t-headline max-w-[14ch]">The output is no longer the proof.</h2>
          </div>
          <div className="col-span-12 space-y-5 lg:col-span-5 lg:col-start-8">
            <p className="t-lead text-ink">
              When AI can produce a B+ essay or solve an equation in seconds, the finished work alone proves nothing.
            </p>
            <p className="text-muted">
              The answer isn’t to ban technology. It’s to change the assignment, so that students apply, explain and defend what they know, and teachers can see the thinking behind every answer.
            </p>
          </div>
        </div>
      </section>

      <section id="workflow" className="section rule-t scroll-mt-16">
        <div className="page">
          <SectionHeader label="The SOYL workflow" title="Six steps, teacher-led throughout." />
          <ol className="mt-10 grid grid-cols-1 gap-px border border-rule bg-rule sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
            {workflowSteps.map((step, i) => (
              <li key={step.title} className="bg-white p-5 md:p-6">
                <span className="t-label t-num text-muted">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-subtitle mt-3">{step.title}</h3>
                <p className="mt-2 text-muted">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pilot: the cobalt-deep block on this page */}
      <section className="section-tight">
        <div className="page">
          <div className="on-dark grid-12 gap-y-10 bg-cobalt-deep px-6 py-12 text-white md:px-12 md:py-16">
            <div className="col-span-12 lg:col-span-5">
              <p className="t-label mb-5 flex items-center gap-2.5 text-white">
                <span aria-hidden="true" className="h-px w-5 bg-highlighter" />
                What a pilot looks like
              </p>
              <h2 className="t-headline">Ten weeks. Your curriculum.</h2>
              <p className="mt-5 max-w-[42ch] text-white">
                SOYL works alongside your existing standards, whether Common Core, IB, IGCSE or local frameworks. It changes how learning is assessed, not what is taught.
              </p>
            </div>
            <ol className="col-span-12 border-t border-white/30 lg:col-span-6 lg:col-start-7">
              {PILOT.map((p) => (
                <li key={p.phase} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-white/30 py-5">
                  <span className="t-label t-num text-white">{p.weeks}</span>
                  <div>
                    <h3 className="t-subtitle">{p.phase}</h3>
                    <p className="mt-1 text-white">{p.line}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Faq faqs={schoolsFaqs} heading="Questions from school leaders" />
      <FinalCta headline="Start with one class." line="Book a demo to see SOYL and plan a ten-week pilot for your school." />
    </>
  );
}
