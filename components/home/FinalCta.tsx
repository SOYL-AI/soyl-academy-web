import { finalCta } from '@/content/home';
import { PRIMARY_CTA } from '@/lib/site';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { ButtonLink } from '@/components/notebook/Button';

interface FinalCtaProps {
  headline?: string;
  line?: string;
}

/** The closing call to action, shared by the homepage and audience pages. */
export function FinalCta({ headline = finalCta.headline, line = finalCta.line }: FinalCtaProps) {
  return (
    <section className="section-tight">
      <div className="page">
        <div className="grid-12 items-end gap-y-8 border border-ink bg-highlighter px-6 py-12 md:px-12 md:py-16">
          <h2 className="t-display col-span-12 max-w-[12ch] lg:col-span-7">{headline}</h2>
          <div className="col-span-12 lg:col-span-5">
            <p className="max-w-[40ch] text-ink">{line}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
                {PRIMARY_CTA.label}
              </ButtonLink>
              <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-medium text-ink underline underline-offset-4">
                or email {SITE_CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
