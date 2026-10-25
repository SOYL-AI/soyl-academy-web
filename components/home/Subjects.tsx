import { subjects } from '@/content/home';
import { media } from '@/content/media';
import { SectionHeader } from '@/components/notebook/SectionHeader';
import { ProductShot } from '@/components/notebook/ProductShot';

export function Subjects() {
  return (
    <section className="section rule-t">
      <div className="page">
        <SectionHeader
          label={subjects.label}
          num="04"
          title={subjects.headline}
          intro={subjects.intro}
          aside={
            <a href="#try-it" className="arrow-link">
              Try the coordinate grid at the top of the page ↑
            </a>
          }
        />

        {/* Boxed cells: they read as a set with or without screenshots in them. */}
        <ul className="mt-10 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-5 md:mt-14">
          {media.simulators.map((sim) => (
            <li key={sim.title} className="flex flex-col gap-4 bg-white p-4 last:col-span-2 sm:last:col-span-1 md:p-5">
              <ProductShot slot={sim} sizes="(min-width: 1024px) 220px, (min-width: 640px) 18vw, 45vw" />
              <div className="mt-auto">
                <p className="t-label text-muted">{sim.subject}</p>
                <h3 className="font-semibold">{sim.title}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
