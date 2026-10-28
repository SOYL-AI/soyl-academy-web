import { shift } from '@/content/home';
import { images } from '@/content/images';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Photo } from '@/components/media/Photo';
import { Drawn } from '@/components/motion/Text';
import { AssignmentToggle } from './AssignmentToggle';

export function Shift() {
  return (
    <section className="section">
      <div className="page">
        <SectionHeader label={shift.label} num="01" title={shift.headline} intro={shift.intro} />

        <div className="grid-12 mt-12 gap-y-10 md:mt-16">
          <div className="col-span-12 lg:col-span-5">
            <Photo
              backdrop="red"
              backdropSide="left"
              image={images.traditionalClassroom}
              aspect="aspect-[4/3] lg:aspect-[4/5]"
              parallax
              sizes="(min-width: 1320px) 480px, (min-width: 1024px) 38vw, 100vw"
            />
          </div>
          <div className="col-span-12 flex flex-col justify-between gap-10 lg:col-span-7 lg:pl-6">
            <div data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
              <AssignmentToggle />
            </div>
            <p className="font-serif text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.1] tracking-[-0.015em]" data-reveal>
              Same subject.{' '}
              <span className="t-accent">
                <Drawn>Very different learning.</Drawn>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
