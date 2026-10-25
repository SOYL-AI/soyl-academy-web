import { ButtonLink } from '@/components/notebook/Button';
import { Label } from '@/components/notebook/SectionHeader';
import { PRIMARY_CTA } from '@/lib/site';

export default function NotFound() {
  return (
    <section className="section">
      <div className="page grid-12">
        <div className="ruled margin-line col-span-12 border border-rule p-6 pl-14 md:col-span-8 md:p-10 md:pl-20">
          <Label className="mb-5">Error 404</Label>
          <h1 className="t-headline">
            <span className="line-through decoration-red-pen decoration-2">This page</span> isn’t here.
          </h1>
          <p className="t-lead mt-5 max-w-[44ch]">
            It may have moved, or the link may be wrong. Try the homepage, or book a demo if that’s what you came for.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
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
