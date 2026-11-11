import type { Metadata } from 'next';
import { InkLink } from '@/components/ink/Button';
import { Ring } from '@/components/ink/Ring';
import { PRIMARY_CTA } from '@/lib/site';

// The root not-found supports metadata (Next 16 docs, not-found.md "Metadata"); it used to inherit the home title.
// Next adds `noindex` to every 404 itself.
export const metadata: Metadata = { title: 'Page not found' };

/**
 * The 404 page, in Ink and wash (phase 5). Platform pages that call notFound() render it too, so it stays generic.
 * The page's one ring is left unfinished (two thirds, the rest a faint outline) with the status inside it.
 */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="page grid items-center gap-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h1 id="not-found-title" className="ink-hero max-w-[12ch]">
            This page isn’t here.
          </h1>
          <p className="ink-lead mt-6 max-w-[44ch]">
            It may have moved, or the link may be wrong. Try the homepage, or book a demo if that’s what you came for.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <InkLink href="/" size="lg" arrow>
              Go to the homepage
            </InkLink>
            <InkLink href={PRIMARY_CTA.href} variant="secondary" size="lg">
              {PRIMARY_CTA.label}
            </InkLink>
          </div>
        </div>
        <div className="order-first lg:order-none lg:col-span-6">
          <Ring
            progress={2}
            ghost
            draw="load"
            layers={{ wash: false, sun: false, rays: false }}
            sizes="(min-width: 1024px) 460px, 260px"
            className="mx-auto max-w-[260px] lg:max-w-[460px]"
          >
            <p className="font-serif text-[clamp(2.4rem,6vw,4.25rem)] leading-none tracking-[-0.02em] tabular-nums">
              <span className="sr-only">Error </span>404
            </p>
          </Ring>
        </div>
      </div>
    </section>
  );
}
