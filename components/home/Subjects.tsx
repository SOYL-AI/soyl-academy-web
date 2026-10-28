import { subjects } from '@/content/home';
import { media } from '@/content/media';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductShot } from '@/components/ui/ProductShot';
import { ArrowRight } from '@/components/ui/Button';

/** Line drawings for each simulator (decorative). */
const ICONS: Record<string, React.ReactNode> = {
  'Coordinate geometry': (
    <>
      <path d="M8 40h40M28 8v40" />
      <circle cx="40" cy="20" r="3.2" fill="currentColor" stroke="none" />
      <path d="M28 40l12-20" strokeDasharray="2 3" />
    </>
  ),
  Fractions: (
    <>
      <circle cx="28" cy="28" r="18" />
      <path d="M28 10v36M28 28l15.6 9" />
      <path d="M28 28 L28 10 A18 18 0 0 1 43.6 37 Z" fill="currentColor" fillOpacity="0.14" />
    </>
  ),
  'Motion and forces': (
    <>
      <rect x="10" y="24" width="16" height="14" rx="2" />
      <path d="M30 31h18M42 25l6 6-6 6" />
      <path d="M8 42h40" />
    </>
  ),
  'Electric circuits': (
    <>
      <path d="M10 18h12M34 18h12v24H10V18" />
      <path d="M22 12v12M27 15v6" />
      <circle cx="28" cy="42" r="5" fill="white" />
      <path d="M25 39l6 6M31 39l-6 6" />
    </>
  ),
  Reactions: (
    <>
      <path d="M22 8v14L10 44a3 3 0 0 0 3 4h30a3 3 0 0 0 3-4L34 22V8" />
      <path d="M19 8h18M14 36h28" />
      <circle cx="24" cy="41" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="32" cy="38" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Colour coding per subject. */
const SUBJECT_TONE: Record<string, string> = { Maths: 'tone-blue', Physics: 'tone-red', Chemistry: 'tone-yellow' };

export function Subjects() {
  return (
    <section className="section">
      <div className="page">
        <SectionHeader
          label={subjects.label}
          num="04"
          title={subjects.headline}
          intro={subjects.intro}
          aside={
            <a href="#try-it" className="arrow-link">
              Try the coordinate grid <ArrowRight />
            </a>
          }
        />

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 md:gap-4 lg:grid-cols-5">
          {media.simulators.map((sim, i) => (
            <li
              key={sim.title}
              data-reveal
              style={{ '--d': `${i * 70}ms` } as React.CSSProperties}
              className="last:col-span-2 sm:last:col-span-1"
            >
              <div
                className={`${SUBJECT_TONE[sim.subject] ?? 'tone-blue'} lift flex h-full flex-col gap-8 rounded-[var(--radius-md)] border border-rule bg-white p-5 hover:border-[var(--tone)] hover:shadow-[0_24px_48px_-32px_rgba(20,20,20,0.4)] md:p-6`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--tone-soft)]">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 56 56"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-[var(--tone-text)]"
                >
                  {ICONS[sim.title]}
                </svg>
                </span>
                <ProductShot slot={sim} sizes="(min-width: 1024px) 220px, 45vw" />
                <div className="mt-auto">
                  <p className="t-eyebrow text-muted">{sim.subject}</p>
                  <h3 className="mt-1.5 font-serif text-[1.5rem] leading-tight">{sim.title}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
