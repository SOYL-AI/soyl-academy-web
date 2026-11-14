import { hour } from '@/content/home';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Note } from '@/components/brush/marks';
import { HourExplorer } from './HourExplorer';

/** The pupil's hour (ADR-033): Spark, Build, Defend, Fix, Reflect, by subject. */
export function PupilsHour() {
  return (
    <section className="section bg-sheet-deep" id="the-hour" aria-labelledby="the-hour-heading">
      <div className="page">
        <SectionHeader id="the-hour-heading" label={hour.label} num="02" title={hour.headline} intro={hour.intro} />
        <div className="mt-12 md:mt-16" data-reveal>
          <HourExplorer />
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-ink/15 pt-7 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[60ch] text-graphite">{hour.footnote}</p>
          <p className="shrink-0 text-[1.2rem]">
            <span className="text-graphite">The guide: </span>
            <Note ink="ultramarine" tilt={-2}>
              {hour.guide}
            </Note>
          </p>
        </div>
      </div>
    </section>
  );
}
