import { HowItWorks } from '@/components/home/HowItWorks';
import { ProofStrip } from '@/components/home/ProofStrip';
import { Shift } from '@/components/home/Shift';
import { InkLink } from '@/components/ink/Button';
import { ClosingCta } from '@/components/ink/ClosingCta';
import { FaqList } from '@/components/ink/FaqList';
import { PageIntro } from '@/components/ink/PageIntro';
import { PilotPlan } from '@/components/schools/PilotPlan';
import { StructuredData } from '@/components/seo/StructuredData';
import { schoolsFaqs } from '@/content/faqs';
import { PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, howToNode, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/schools' });

/** The SOYL workflow, as this page has always stated it (also the HowTo structured data below). */
const workflowSteps = [
  { title: 'Teacher design', desc: 'Educators frame the learning objective using SOYL’s challenge structure.' },
  { title: 'Student context', desc: 'Students are presented with the scenario and constraints.' },
  { title: 'Strategy and ideation', desc: 'Students map out their approach before jumping to solutions.' },
  { title: 'Student action', desc: 'Students research, build, write or create their solution, documenting their process.' },
  { title: 'Defence and reflection', desc: 'Students explain why they made their choices and what they learned.' },
  { title: 'Educator review', desc: 'Teachers evaluate the evidence of thinking, guided by SOYL’s class insights.' },
];

/**
 * For schools, in Ink and wash (docs/redesign-ink-and-wash.md §3.3). Job: book a pilot. It carries the
 * school-assignment story that left the homepage:
 *
 *   intro     "Homework was built for a world before AI."   (photo: a classroom from behind, no faces)
 *   shift     one assignment, traditional or SOYL, and the five verbs it is tagged with
 *   workflow  the six steps, beside a SOYL question played as a pupil
 *   pilot     ten weeks in three phases, to scale
 *   FAQ, then the closing action (Book a demo)
 *
 * Proof (ProofStrip) renders only when content/proof.ts has real entries; today it has none.
 */
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

      <PageIntro
        title="Homework was built for a world before AI."
        lead="Traditional assignments no longer reliably show learning. SOYL gives every class from Grades 1 to 10 assignments students have to work out, and gives teachers and leaders evidence of how they did it."
        actions={
          <>
            <InkLink href={PRIMARY_CTA.href} size="lg" arrow>
              Plan a pilot
            </InkLink>
            <InkLink href="#workflow" variant="quiet">
              See the workflow
            </InkLink>
          </>
        }
        photo={{ slug: 'classroom-from-behind', position: '50% 60%' }}
      />

      <ProofStrip />
      <Shift />
      <HowItWorks
        id="workflow"
        title={
          <>
            Six steps, <span className="whitespace-nowrap">teacher-led</span> throughout.
          </>
        }
        intro="The teacher designs the challenge and reviews the evidence. In between, the students do the thinking."
        steps={workflowSteps.map((s) => ({ title: s.title, line: s.desc }))}
        tryTitle="Try a SOYL question as a pupil"
      />
      <PilotPlan />
      <FaqList faqs={schoolsFaqs} heading="Questions from school leaders" />
      <ClosingCta headline="Start with one class." line="Book a demo to see SOYL and plan a ten-week pilot for your school." />
    </>
  );
}
