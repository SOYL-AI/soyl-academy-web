import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { PRIMARY_CTA } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="section">
      <div className="page grid-12">
        <div className="col-span-12 md:col-span-9">
          <div className="rise"><Label className="mb-8">Error 404</Label></div>
          <h1 className="t-display rise" style={{ '--d': '80ms' } as React.CSSProperties}>
            <span className="line-through decoration-red-pen decoration-[3px]">This page</span> isn’t <span className="t-accent">here.</span>
          </h1>
          <p className="t-lead mt-6 max-w-[44ch]">
            It may have moved, or the link may be wrong. Try the homepage, or book a demo if that’s what you came for.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ '--d': '240ms' } as React.CSSProperties}>
            <ButtonLink href="/" size="lg">
              Go to the homepage
            </ButtonLink>
            <ButtonLink href={PRIMARY_CTA.href} variant="secondary" size="lg">
              {PRIMARY_CTA.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
