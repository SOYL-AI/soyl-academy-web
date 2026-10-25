import { shift } from '@/content/home';
import { SectionHeader } from '@/components/notebook/SectionHeader';
import { AssignmentToggle } from './AssignmentToggle';

export function Shift() {
  return (
    <section className="section">
      <div className="page">
        <SectionHeader label={shift.label} num="01" title={shift.headline} intro={shift.intro} />
        <div className="grid-12 mt-10 gap-y-8 md:mt-14">
          <div className="col-span-12 lg:col-span-8">
            <AssignmentToggle />
          </div>
          <aside className="col-span-12 lg:col-span-3 lg:col-start-10 lg:self-end">
            <p className="font-serif text-[1.75rem] leading-tight">
              Same subject.
              <br />
              <span className="pen-underline">Very different learning.</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
