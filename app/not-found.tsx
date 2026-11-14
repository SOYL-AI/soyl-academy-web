import Link from 'next/link';
import { Marked, Note } from '@/components/brush/marks';
import { PRIMARY_CTA } from '@/lib/site';

const PAGES = [
  { label: 'The homepage', href: '/', line: 'The story of one mission.' },
  { label: 'How missions work', href: '/method', line: 'Spark, Build, Defend, Fix, Reflect.' },
  { label: PRIMARY_CTA.label, href: PRIMARY_CTA.href, line: 'See a mission from both sides.' },
  { label: 'The Journal', href: '/journal', line: 'Notes on learning after AI.' },
];

/**
 * 404 (ADR-034): a page torn out of the story, with its table of contents. Also rendered for learning-platform
 * notFound(), so it stays light: server-only, no painting, no photos, no client code.
 */
export default function NotFound() {
  return (
    <section className="section">
      <div className="page grid-12 items-center gap-y-14">
        <div className="col-span-12 lg:col-span-6">
          <p className="hand rise text-[1.25rem] text-vermilion-ink">Error 404</p>
          <h1 className="t-display rise mt-3 max-w-[13ch]" style={{ '--d': '80ms' } as React.CSSProperties}>
            <Marked mark="strike" ink="vermilion" load delay={600} className="text-graphite">
              This page
            </Marked>{' '}
            isn’t in the{' '}
            <Marked mark="ring" ink="ultramarine" load delay={1100}>
              story
            </Marked>{' '}
            yet.
          </h1>
          <p className="t-lead rise mt-6 max-w-[42ch] text-graphite" style={{ '--d': '160ms' } as React.CSSProperties}>
            It may have moved, or the link may be wrong. Pick up the story somewhere else.
          </p>
        </div>

        {/* The torn-out page: its contents. */}
        <nav aria-label="Where to next" className="rise col-span-12 lg:col-span-5 lg:col-start-8" style={{ '--d': '240ms' } as React.CSSProperties}>
          <div className="ruled relative rotate-[1.5deg] bg-[#fffdf7] px-6 pb-8 pl-14 pt-7 shadow-[0_26px_50px_-30px_rgba(31,28,25,0.55)] md:pl-16">
            {/* Torn top edge. */}
            <svg aria-hidden="true" viewBox="0 0 400 12" preserveAspectRatio="none" className="absolute inset-x-0 -top-[11px] h-3 w-full">
              <path
                d="M0 12 V6 L14 9 L30 3 L46 8 L62 2 L80 7 L96 3 L114 9 L130 4 L148 8 L164 2 L182 7 L198 4 L216 9 L232 3 L250 8 L266 2 L284 7 L300 4 L318 9 L334 3 L352 8 L368 3 L386 8 L400 5 V12 Z"
                fill="#fffdf7"
              />
            </svg>
            <p className="flex items-baseline justify-between">
              <span className="hand text-[1.25rem] text-vermilion-ink">Contents</span>
              <span className="t-num font-serif text-[0.95rem] italic text-graphite">p. 404</span>
            </p>
            <ol className="mt-3">
              {PAGES.map((p, i) => (
                <li key={p.href}>
                  <Link href={p.href} className="group grid grid-cols-[1.8rem_1fr] items-baseline gap-x-2 border-b border-ink/10 py-3">
                    <span className="t-num font-serif text-[0.95rem] italic text-graphite">{i + 1}</span>
                    <span>
                      <span className="font-serif text-[1.35rem] leading-tight tracking-[-0.01em] underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-vermilion">
                        {p.label}
                      </span>
                      <span className="block text-[14px] text-graphite">{p.line}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-[1.05rem]">
              <Note ink="graphite" tilt={-2}>
                every pupil’s story has a few blank pages
              </Note>
            </p>
          </div>
        </nav>
      </div>
    </section>
  );
}
