import Link from 'next/link';
import { ArrowRight, ButtonLink } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { ProductShot } from '@/components/ui/ProductShot';
import { Label, SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { StructuredData } from '@/components/seo/StructuredData';
import { images } from '@/content/images';
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
        tone="yellow"
        label="For parents"
        title={
          <>
            See how your child learns, not just the <span className="t-accent">mark.</span>
          </>
        }
        intro="When your child’s school uses SOYL, homework becomes something they work out for themselves, with hints that guide but never give the answer away. You can follow their progress and their teacher’s feedback."
        actions={
          <a href={APP_URL} className="arrow-link">
            Child already on SOYL? See their homework <ArrowRight />
          </a>
        }
        image={images.studentThinking}
      />

      <section className="section">
        <div className="page">
          <SectionHeader label="What you’ll see" num="01" title="A clear view of the work." />
          <ProductShot slot={media.parents} sizes="(min-width: 1024px) 800px, 100vw" className="mt-12" />
          <ul className="mt-12 grid grid-cols-1 gap-x-8 md:mt-16 md:grid-cols-3">
            {SEE.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
                className="border-t border-rule-strong py-7"
              >
                <span className="t-num font-serif text-[2.5rem] leading-none text-cobalt">{i + 1}</span>
                <h3 className="t-subtitle mt-5">{item.title}</h3>
                <p className="mt-2 text-muted">{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="page grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-6" data-reveal>
            <Label num="02" className="mb-6">Is your child’s school on SOYL?</Label>
            <h2 className="t-headline max-w-[14ch]">Tell their school about it.</h2>
            <p className="t-lead mt-6 max-w-[44ch]">
              SOYL is used by schools, for Grades 1–10. If you think it would help your child’s class, share this page with their teacher or principal, or book a demo on their behalf.
            </p>
            <div className="mt-8">
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                {PRIMARY_CTA.label}
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:col-start-8" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <Link href="/future-builders" className="group block overflow-hidden rounded-[var(--radius-lg)] bg-white">
              <Photo image={images.fbPresentation} aspect="aspect-[3/2]" zoom reveal={false} className="rounded-none" sizes="(min-width: 1024px) 480px, 100vw" />
              <div className="p-6 md:p-7">
                <p className="t-eyebrow text-muted">Grades 7–12</p>
                <h3 className="t-title mt-2">Future Builders</h3>
                <p className="mt-2 text-muted">
                  A separate, paid weekend cohort where students build a working product across software, AI, IoT robotics and entrepreneurship.
                </p>
                <span className="arrow-link mt-5">
                  About Future Builders <ArrowRight />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
