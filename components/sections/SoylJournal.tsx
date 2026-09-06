import Link from 'next/link';
import Image from 'next/image';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { articles } from '@/content/journal';

const [featured, ...rest] = articles;
const secondary = rest.slice(0, 3);

export function SoylJournal() {
  return (
    <section className="w-full bg-bone section-padding">
      <div className="container-default">
        <ScrollReveal>
          <div className="flex flex-wrap items-baseline justify-between gap-6 border-b border-ink/15 pb-8 mb-14 md:mb-20">
            <p className="text-eyebrow text-ink">The SOYL Journal</p>
            <p className="font-editorial text-[clamp(1.25rem,2vw,1.75rem)] text-ink-light max-w-[46ch]">
              Ideas about learning, technology and the school that&rsquo;s coming
              next.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
          {/* Lead story */}
          <ScrollReveal delay={0.05} className="lg:col-span-7">
            <Link href={`/journal/${featured.slug}`} className="group block">
              <div className="relative aspect-[3/2] w-full mb-8 overflow-hidden rounded-md bg-paper">
                <Image
                  src={featured.image ?? '/images/students_debating.jpg'}
                  alt="Students arguing a point across a table, notes and a book open between them"
                  fill
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
              </div>
              <p className="text-eyebrow text-ink-lighter mb-4">
                {featured.category}
              </p>
              <h3 className="text-headline text-ink mb-5 transition-colors duration-300 group-hover:text-cobalt">
                {featured.title}
              </h3>
              <p className="font-editorial text-[clamp(1.25rem,1.8vw,1.625rem)] text-ink-light max-w-[46ch]">
                {featured.excerpt}
              </p>
            </Link>
          </ScrollReveal>

          {/* Running order */}
          <div className="lg:col-span-5 border-t border-ink/15">
            {secondary.map((article, index) => (
              <ScrollReveal key={article.slug} delay={0.1 + index * 0.06}>
                <Link
                  href={`/journal/${article.slug}`}
                  className="group block border-b border-ink/15 py-8"
                >
                  <p className="text-eyebrow text-ink-lighter mb-3">
                    {article.category}
                  </p>
                  <h3 className="text-subhead text-ink mb-3 transition-colors duration-300 group-hover:text-cobalt">
                    {article.title}
                  </h3>
                  <p className="font-editorial text-lg text-ink-light max-w-[42ch]">
                    {article.excerpt}
                  </p>
                </Link>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.3}>
              <Link
                href="/journal"
                className="group inline-flex items-center gap-2 mt-10 text-body font-medium text-ink border-b border-ink pb-1 transition-colors duration-300 hover:text-cobalt hover:border-cobalt"
              >
                Read the Journal
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M2.5 6h7M6.5 3l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
