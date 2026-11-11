import { DemoForm } from '@/components/forms/DemoForm';
import { InkPhoto } from '@/components/ink/InkPhoto';
import { PageIntro } from '@/components/ink/PageIntro';
import { StructuredData } from '@/components/seo/StructuredData';
import { photo } from '@/content/credits';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/book-a-demo' });

const WHAT_HAPPENS = [
  { title: 'We get in touch', line: 'By email or phone, to find a time that suits you.' },
  { title: 'We show you SOYL', line: 'The teacher, student and parent views, live.' },
  { title: 'We plan a pilot', line: 'If it fits, a ten-week pilot shaped around your curriculum.' },
];

/**
 * Book a demo, in Ink and wash (plan §3.3, phase 5): the quiet opener, the form (components/forms/DemoForm, its
 * fields, validation and action unchanged) and what happens next beside it, with a real photograph.
 */
export default function BookDemoPage() {
  const teacher = photo('teacher-blackboard');
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/book-a-demo' }), breadcrumbNode('/book-a-demo', topLevelCrumbs('/book-a-demo')))}
      />
      <PageIntro
        size="head"
        title="See SOYL with your own eyes."
        lead="Tell us a little about your school. It takes a minute, and we’ll take it from there."
        className="pb-8 md:pb-10"
      />

      <section aria-label="Book a demo" className="pb-20 md:pb-28">
        <div className="page grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <DemoForm />
          </div>

          <aside aria-labelledby="next-title" className="lg:col-span-4 lg:col-start-9">
            <InkPhoto src={teacher.src} alt={teacher.alt} aspect="4 / 3" position="40% 40%" sizes="(min-width: 1320px) 400px, (min-width: 1024px) 31vw, 92vw" className="mb-8" />
            <h2 id="next-title" className="ink-title">
              What happens next
            </h2>
            <ol className="mt-4 border-t border-rule">
              {WHAT_HAPPENS.map((step, i) => (
                <li key={step.title} className="flex gap-4 border-b border-rule py-4">
                  <span aria-hidden="true" className="w-6 shrink-0 font-serif text-[1.75rem] leading-none text-indigo tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-0.5 text-[0.9375rem] text-graphite">{step.line}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.9375rem] text-graphite">
              Prefer email? Write to{' '}
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="link">
                {SITE_CONTACT_EMAIL}
              </a>
              .
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
