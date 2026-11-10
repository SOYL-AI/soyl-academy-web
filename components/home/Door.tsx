import { InkLink } from '@/components/ink/Button';
import { PLATFORM_ENABLED, PRIMARY_CTA } from '@/lib/site';
import { DoorPicker } from './DoorPicker';
import { RingQuestion } from './RingQuestion';

/**
 * Screen 1 of the homepage, the door (plan §3.2): the promise, one question ("What are you studying?") and the
 * painted ring with a real question inside it.
 *
 * Two states (GEN-4, D-019): with the platform on, the board and class chips open that class on /learn. With
 * it off there is no platform link anywhere on the page: the picker is replaced by one line and the action is
 * the demo booking.
 */
export function Door() {
  return (
    <section aria-labelledby="door-title" className="pb-14 pt-10 md:pb-20 md:pt-14 lg:pt-16">
      <div className="page grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6">
          <h1 id="door-title" className="ink-hero max-w-[14ch]">
            The whole syllabus, free.
          </h1>
          <p className="ink-lead mt-5 max-w-[34ch]">Classes 7 to 12. CBSE, ICSE and ISC. You only ever pay for AI.</p>
          {PLATFORM_ENABLED ? (
            <>
              <p className="ink-ask mt-9">What are you studying?</p>
              <DoorPicker />
            </>
          ) : (
            <>
              <p className="ink-ask mt-9">Free lessons for Classes 7 to 12 open soon.</p>
              <div className="mt-6">
                <InkLink href={PRIMARY_CTA.href} size="lg" arrow>
                  {PRIMARY_CTA.label}
                </InkLink>
              </div>
            </>
          )}
        </div>
        <div className="lg:col-span-6">
          <RingQuestion sizes="(min-width: 1024px) 540px, 92vw" />
        </div>
      </div>
    </section>
  );
}
