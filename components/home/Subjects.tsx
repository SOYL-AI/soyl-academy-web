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

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-14 md:grid-cols-3 lg:grid-cols-5">
          {media.simulators.map((sim) => (
            <li key={sim.title} className="last:col-span-2 md:last:col-span-1">
              <ProductShot slot={sim} sizes="(min-width: 1024px) 220px, (min-width: 768px) 30vw, 45vw" />
              <p className="t-label mt-3 text-muted">{sim.subject}</p>
              <h3 className="font-semibold">{sim.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
