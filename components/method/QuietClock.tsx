import { timeline } from '@/content/method';
import { InkPath, Note } from '@/components/brush/marks';

const MAX = 60;

/**
 * The engine's quiet clock (spec §06), drawn for teachers and parents. Pupils never see it: a hand-drawn line with
 * marks at 0, 40, 45, 55 and 60 minutes on wide screens; a plain list on phones.
 */
export function QuietClock() {
  return (
    <div>
      {/* Phones and tablets */}
      <ol className="space-y-3 border-l-2 border-dotted border-ink/30 pl-5 lg:hidden">
        {timeline.map((t) => (
          <li key={t.at} className="relative">
            <span aria-hidden="true" className="absolute -left-[1.6rem] top-2 h-2.5 w-2.5 rounded-full bg-ink" />
            <span className="t-num font-serif text-[1.35rem] italic">{t.at}</span>
            <span className="text-[0.85rem] text-graphite"> min</span>
            <span className="block leading-snug">{t.label}</span>
          </li>
        ))}
      </ol>

      {/* Wide screens: the line. */}
      <div className="relative hidden h-44 lg:block">
        <InkPath mark="under" ink="ink" weight={2.5} className="absolute inset-x-0 top-10 h-3 w-full" />
        <ol>
          {timeline.map((t, i) => {
            const left = (t.at / MAX) * 100;
            const edge = t.at === 0 ? 'translate-x-0 text-left' : t.at === MAX ? '-translate-x-full text-right' : '-translate-x-1/2 text-center';
            const low = i % 2 === 1;
            return (
              <li key={t.at} className={`absolute top-0 w-[11rem] ${edge}`} style={{ left: `${left}%` }}>
                <span className="t-num block font-serif text-[1.5rem] italic leading-none">
                  {t.at}
                  <span className="text-[0.85rem] not-italic text-graphite"> min</span>
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute top-8 h-5 w-[2px] bg-ink ${t.at === 0 ? 'left-0' : t.at === MAX ? 'right-0' : 'left-1/2'}`}
                />
                <span className={`block text-[0.95rem] leading-snug ${low ? 'mt-[5.25rem]' : 'mt-9'}`}>{t.label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="mt-6 text-[1.25rem] lg:mt-2">
        <Note ink="vermilion-ink" tilt={-2}>
          Pupils never see this clock.
        </Note>
      </p>
    </div>
  );
}
