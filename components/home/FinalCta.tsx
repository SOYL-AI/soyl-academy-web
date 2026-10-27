import { finalCta } from '@/content/home';
import { PRIMARY_CTA } from '@/lib/site';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { ButtonLink } from '@/components/ui/Button';
import { Drawn } from '@/components/motion/Text';

interface FinalCtaProps {
  headline?: string;
  line?: string;
}

/**
 * The closing call to action, shared by the homepage and inner pages.
 * The last two words of the headline get the drawn pen underline.
 */
export function FinalCta({ headline = finalCta.headline, line = finalCta.line }: FinalCtaProps) {
  const words = headline.split(' ');
  const tail = words.slice(-2).join(' ');
  const head = words.slice(0, -2).join(' ');

  return (
    <section className="bg-paper">
      <div className="page section grid-12 items-end gap-y-10">
        <h2 className="t-display col-span-12 max-w-[13ch] lg:col-span-8" data-reveal>
          {head}{' '}
          <span className="t-accent">
            <Drawn>{tail}</Drawn>
          </span>
        </h2>
        <div className="col-span-12 lg:col-span-4" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
          <p className="t-lead max-w-[40ch] text-ink">{line}</p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="hover-line font-medium text-ink">
              or email {SITE_CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
