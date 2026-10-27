import Link from 'next/link';
import { MiniSimulator } from '@/components/home/MiniSimulator';
import { ArrowRight } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Label } from '@/components/ui/SectionHeader';
import { TodoSlot } from '@/components/ui/TodoSlot';
import { Photo } from '@/components/media/Photo';
import { Faq } from '@/components/seo/Faq';
import { StructuredData } from '@/components/seo/StructuredData';
import { studentsFaqs } from '@/content/faqs';
import { images } from '@/content/images';
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
        title={
          <>
            Learn beyond the <span className="t-accent">answer.</span>
          </>
        }
        intro="School isn’t only about finding an answer someone else already found. It’s about learning how to think when the answer isn’t obvious. In SOYL you get as many tries as you need, and hints that help you get there yourself."
        image={images.studentsBuilding}
      />

      <section className="section bg-paper">
        <div className="page grid-12 items-start gap-y-12">
          <div className="col-span-12 lg:col-span-5" data-reveal>
            <Label num="01" className="mb-6">Try one</Label>
            <h2 className="t-headline max-w-[12ch]">
              Mistakes are part of the <span className="t-accent">work.</span>
            </h2>
            <p className="t-lead mt-6 max-w-[40ch]">
              Every try is kept, and nobody minds how many it takes. When you get there, SOYL tells you how: “You worked it out · 3 tries · 1 hint.”
            </p>
            {SHOW_CONTENT_TODOS && (
              // Pip, the SOYL mascot, appears only on the students page.
              <TodoSlot
                kind="Illustration"
                brief="Pip, the SOYL mascot (illustration from the product’s brand folder), cheering a student on."
                ratio="4 / 3"
                className="mt-10 max-w-sm"
              />
            )}
          </div>
          <div className="col-span-12 lg:col-span-7" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <MiniSimulator />
          </div>
        </div>
      </section>

      <section className="section overflow-hidden">
        <div className="page">
          <ul className="flex flex-wrap items-baseline gap-x-6 gap-y-1 md:gap-x-10" aria-label="What you do in a SOYL assignment">
            {VERBS.map((v, i) => (
              <li
                key={v}
                data-reveal
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                className={i % 2 ? 't-display t-accent text-muted' : 't-display'}
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="page">
          <div className="on-dark grid-12 items-center gap-y-10 overflow-hidden rounded-[var(--radius-lg)] bg-ink text-white">
            <div className="col-span-12 px-6 pt-10 md:px-12 md:pt-14 lg:col-span-6 lg:py-16 lg:pr-0" data-reveal>
              <p className="t-eyebrow mb-6 text-white/70">About AI</p>
              <h2 className="t-headline max-w-[16ch]">
                Use AI to think better, not to <span className="t-accent text-highlighter">skip</span> thinking.
              </h2>
              <p className="mt-6 max-w-[48ch] text-white/80">
                You have powerful AI tools, and you’re allowed to use them. But in a SOYL assignment you can’t just paste an answer: you explain your process, defend your choices and show the ideas are yours.
              </p>
            </div>
            <div className="col-span-12 h-full min-h-[18rem] lg:col-span-5 lg:col-start-8">
              <Photo
                image={images.studentsPresenting}
                aspect="h-full min-h-[18rem]"
                className="rounded-none"
                sizes="(min-width: 1320px) 520px, (min-width: 1024px) 40vw, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="page">
          <Link
            href="/future-builders"
            className="group grid-12 items-center gap-y-6 rounded-[var(--radius-lg)] border border-rule p-5 transition-colors duration-300 hover:border-ink/40 md:p-6"
            data-reveal
          >
            <div className="col-span-12 md:col-span-4">
              <Photo image={images.fbIot} aspect="aspect-[3/2]" zoom reveal={false} sizes="(min-width: 768px) 360px, 100vw" />
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <p className="t-eyebrow text-muted">Grades 7–12</p>
              <h2 className="t-title mt-3">Want to build something real? Try Future Builders.</h2>
              <p className="mt-3 max-w-[52ch] text-muted">
                A weekend cohort in software, AI, IoT robotics and entrepreneurship. You build a working product and pitch it.
              </p>
              <span className="arrow-link mt-5">
                About Future Builders <ArrowRight />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <Faq faqs={studentsFaqs} heading="Questions from students" />
    </>
  );
}
