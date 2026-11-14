import { ButtonLink } from '@/components/ui/Button';
import { Label } from '@/components/ui/SectionHeader';
import { Arrow, Marked, Note } from '@/components/brush/marks';
import { PRIMARY_CTA } from '@/lib/site';

/** 404 (ADR-033). Also rendered for learning-platform notFound(); kept light: no painting, plain links. */
export default function NotFound() {
  return (
    <section className="section">
      <div className="page grid-12 items-end gap-y-10">
        <div className="col-span-12 md:col-span-9">
          <div className="rise">
            <Label tone="red" className="mb-6 md:mb-8">
              Error 404
            </Label>
          </div>
          <h1 className="t-display rise max-w-[14ch]" style={{ '--d': '80ms' } as React.CSSProperties}>
            <Marked mark="strike" ink="vermilion" load delay={600} className="text-graphite">
              This page
            </Marked>{' '}
            isn’t in the{' '}
            <Marked mark="ring" ink="ultramarine" load delay={1100}>
              Story
            </Marked>{' '}
            yet.
          </h1>
          <p className="t-lead mt-7 max-w-[44ch] text-graphite">
            It may have moved, or the link may be wrong. Start from the homepage, or see how a mission works.
          </p>
          <div className="rise mt-10 flex flex-wrap gap-3" style={{ '--d': '240ms' } as React.CSSProperties}>
            <ButtonLink href="/" size="lg" arrow>
              Go to the homepage
            </ButtonLink>
            <ButtonLink href="/method" variant="secondary" size="lg">
              How missions work
            </ButtonLink>
          </div>
        </div>
        <p className="col-span-12 hidden text-[1.25rem] md:col-span-3 md:block">
          <Arrow to="down-left" ink="graphite" load delay={1600} className="mb-2 h-14 w-20" />
          <Note ink="graphite" tilt={-3}>
            Or{' '}
            <a href={PRIMARY_CTA.href} className="underline decoration-2 underline-offset-4 hover:text-ink">
              book a demo
            </a>
            , if that’s what you came for.
          </Note>
        </p>
      </div>
    </section>
  );
}
