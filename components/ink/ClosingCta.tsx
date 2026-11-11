import { PRIMARY_CTA } from '@/lib/site';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { InkLink } from './Button';
import { Section } from './Section';
import { Stroke } from './Stroke';

interface ClosingCtaProps {
  headline: string;
  line?: string;
  /** The one action. Default: book a demo. */
  action?: { label: string; href: string };
  /** Offer the email address as a second way in. Default true. */
  email?: boolean;
}

/**
 * The closing call to action of an inner marketing page in Ink and wash (replaces components/home/FinalCta, which
 * the Future Builders pages keep): a heading with one drawn stroke, a line, one action, and the email address.
 */
export function ClosingCta({ headline, line, action = PRIMARY_CTA, email = true }: ClosingCtaProps) {
  return (
    <Section ground="paper-2" aria-labelledby="closing-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="closing-title" className="ink-head max-w-[16ch]">
            {headline}
          </h2>
          <Stroke pigment="madder" width="5em" className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
        </div>
        <div className="lg:col-span-5">
          {line ? <p className="ink-lead max-w-[40ch] text-ink">{line}</p> : null}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <InkLink href={action.href} size="lg" arrow>
              {action.label}
            </InkLink>
            {email ? (
              <InkLink href={`mailto:${SITE_CONTACT_EMAIL}`} variant="quiet">
                or email {SITE_CONTACT_EMAIL}
              </InkLink>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
