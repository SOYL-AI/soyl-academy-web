import Link from 'next/link';
import { ArrowRight, ButtonLink } from '@/components/notebook/Button';
import { PageHero } from '@/components/notebook/PageHero';
import { ProductShot } from '@/components/notebook/ProductShot';
import { Label, SectionHeader } from '@/components/notebook/SectionHeader';
import { StructuredData } from '@/components/seo/StructuredData';
import { media } from '@/content/media';
import { APP_URL, PRIMARY_CTA } from '@/lib/site';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbNode, graph, topLevelCrumbs, webPageNode } from '@/lib/seo/schema';

export const metadata = createMetadata({ path: '/parents' });

const SEE = [
  { title: 'Progress, assignment by assignment', line: 'What your child has finished, what’s due, and how it went.' },
  { title: 'Their teacher’s feedback', line: 'Comments from the teacher, in one place, alongside the work.' },
  { title: 'Effort, not just a mark', line: '“You worked it out · 3 tries · 1 hint.” SOYL celebrates persistence, so you can too.' },
];

export default function ParentsPage() {
  return (
    <>
      <StructuredData
        data={graph(webPageNode({ path: '/parents' }), breadcrumbNode('/parents', topLevelCrumbs('/parents')))}
      />

      <PageHero
        label="For parents"
        title="See how your child learns, not just the mark."
        intro="When your child’s school uses SOYL, homework becomes something they work out for themselves, with hints that guide but never give the answer away. You can follow their progress and their teacher’s feedback."
        actions={
          <a href={APP_URL} className="arrow-link">
            Child already on SOYL? See their homework <ArrowRight />
          </a>
        }
        aside={<ProductShot slot={media.parents} sizes="(min-width: 1024px) 480px, 92vw" priority />}
      />

      <section className="section">
        <div className="page">
          <SectionHeader label="What you’ll see" title="A clear view of the work." />
          <ul className="mt-10 grid grid-cols-1 gap-px border border-rule bg-rule md:mt-14 md:grid-cols-3">
            {SEE.map((item) => (
              <li key={item.title} className="bg-white p-5 md:p-7">
                <h3 className="t-subtitle">{item.title}</h3>
                <p className="mt-2 text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section rule-t">
        <div className="page grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-6">
            <Label className="mb-5">Is your child’s school on SOYL?</Label>
            <h2 className="t-headline">Tell their school about it.</h2>
            <p className="t-lead mt-5 max-w-[44ch]">
              SOYL is used by schools, for Grades 1–10. If you think it would help your child’s class, share this page with their teacher or principal, or book a demo on their behalf.
            </p>
            <div className="mt-8">
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                {PRIMARY_CTA.label}
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <div className="module border-t-2 border-t-cobalt p-6">
              <p className="t-label text-muted">Grades 7–12</p>
              <h3 className="t-title mt-2">Future Builders</h3>
              <p className="mt-2 text-muted">
                A separate, paid weekend cohort where students build a working product across software, AI, IoT robotics and entrepreneurship.
              </p>
              <Link href="/future-builders" className="arrow-link mt-5">
                About Future Builders <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
