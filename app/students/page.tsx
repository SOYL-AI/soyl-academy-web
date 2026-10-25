import Link from 'next/link';
import { MiniSimulator } from '@/components/home/MiniSimulator';
import { ArrowRight } from '@/components/notebook/Button';
import { PageHero } from '@/components/notebook/PageHero';
import { Label, SectionHeader } from '@/components/notebook/SectionHeader';
import { TodoSlot } from '@/components/notebook/TodoSlot';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { studentsFaqs } from '@/content/faqs';
import { SHOW_CONTENT_TODOS } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, faqNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/students' });

const VERBS = ['Solve.', 'Build.', 'Argue.', 'Explain.', 'Reflect.'];

export default function StudentsPage() {
  return (
    <>
      <StructuredData
        data={graph(
          webPageNode({ path: '/students' }),
          breadcrumbNode('/students', topLevelCrumbs('/students')),
          faqNode('/students', studentsFaqs)
        )}
      />

      <PageHero
        label="For students"
        title="Learn beyond the answer."
        intro="School isn’t only about finding an answer someone else already found. It’s about learning how to think when the answer isn’t obvious. In SOYL you get as many tries as you need, and hints that help you get there yourself."
        aside={
          // Pip, the SOYL mascot, appears only on the students page.
          SHOW_CONTENT_TODOS ? (
            <TodoSlot kind="Illustration" brief="Pip, the SOYL mascot (illustration from the product’s brand folder), cheering a student on." ratio="4 / 3" />
          ) : undefined
        }
      />

      <section className="section">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <SectionHeader label="Try one" title="Mistakes are part of the work." size="title" />
            <p className="mt-5 max-w-[40ch] text-muted">
              Every try is kept, and nobody minds how many it takes. When you get there, SOYL tells you how: “You worked it out · 3 tries · 1 hint.”
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <MiniSimulator />
          </div>
        </div>
      </section>

      <section className="section-tight rule-t">
        <div className="page">
          <ul className="flex flex-wrap gap-x-8 gap-y-2" aria-label="What you do in a SOYL assignment">
            {VERBS.map((v, i) => (
              <li key={v} className={i === 1 ? 't-display mark' : 't-display'}>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="page">
          <div className="bleed on-dark grid-12 gap-y-6 bg-cobalt px-6 py-12 text-white md:px-12 md:py-16">
            <p className="t-label col-span-12 flex items-center gap-2.5 self-start text-white md:col-span-3 md:mt-3">
              <span aria-hidden="true" className="h-px w-5 bg-highlighter" />
              About AI
            </p>
            <div className="col-span-12 md:col-span-9">
              <h2 className="t-headline max-w-[20ch]">Use AI to think better, not to skip thinking.</h2>
              <p className="mt-5 max-w-[58ch] text-white">
                You have powerful AI tools, and you’re allowed to use them. But in a SOYL assignment you can’t just paste an answer: you explain your process, defend your choices and show the ideas are yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="page">
          <div className="module grid-12 items-center gap-y-4 p-6 md:p-8">
            <div className="col-span-12 md:col-span-8">
              <Label className="mb-3">Grades 7–12</Label>
              <h2 className="t-title">Want to build something real? Try Future Builders.</h2>
              <p className="mt-2 text-muted">A weekend cohort in software, AI, IoT robotics and entrepreneurship. You build a working product and pitch it.</p>
            </div>
            <div className="col-span-12 md:col-span-4 md:text-right">
              <Link href="/future-builders" className="arrow-link">
                About Future Builders <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Faq faqs={studentsFaqs} heading="Questions from students" />
    </>
  );
}
