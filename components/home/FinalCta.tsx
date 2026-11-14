import { finalCta } from '@/content/home';
import { PRIMARY_CTA } from '@/lib/site';
import { SITE_CONTACT_EMAIL } from '@/lib/seo/config';
import { ButtonLink } from '@/components/ui/Button';
import { BrushArt } from '@/components/brush/BrushArt';
import { Marked } from '@/components/brush/marks';

interface FinalCtaProps {
  headline?: string;
  line?: string;
}

/**
 * The closing call to action, shared by the homepage and inner pages (ADR-033): watercolour washes bleed in
 * from the corners behind the headline; the last word gets a hand-drawn underline.
 */
export function FinalCta({ headline = finalCta.headline, line = finalCta.line }: FinalCtaProps) {
  const words = headline.split(' ');
  const tail = words.slice(-1).join(' ');
  const head = words.slice(0, -1).join(' ');

  return (
    <section className="relative isolate overflow-hidden">
      <BrushArt
        art="wash"
        options={{
          blooms: [
            { x: 0.04, y: 0.12, r: 0.62, pigment: 'ochre', opacity: 70 },
            { x: 0.98, y: 0.9, r: 0.7, pigment: 'ultramarine', opacity: 42 },
            { x: 0.82, y: 0.06, r: 0.22, pigment: 'vermilion', opacity: 50 },
          ],
        }}
        seed={3}
        stepMs={90}
        className="absolute inset-0 -z-10"
      />
      <div className="page section grid-12 items-end gap-y-10">
        <h2 className="t-display col-span-12 max-w-[13ch] lg:col-span-8" data-reveal>
          {head}{' '}
          <Marked mark="under" ink="vermilion" weight={5}>
            {tail}
          </Marked>
        </h2>
        <div className="col-span-12 lg:col-span-4" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
          <p className="t-lead max-w-[40ch] text-ink">{line}</p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <ButtonLink href={PRIMARY_CTA.href} size="lg" arrow>
              {PRIMARY_CTA.label}
            </ButtonLink>
            <a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-medium text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine">
              or write to {SITE_CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
