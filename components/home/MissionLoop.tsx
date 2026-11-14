import { loop } from '@/content/home';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BrushArt } from '@/components/brush/BrushArt';

const BY_INK: Record<string, string> = {
  Teacher: 'text-ultramarine',
  Pupil: 'text-sap',
  SOYL: 'text-vermilion-ink',
};

/**
 * The mission loop (ADR-033): six steps around a hand-painted circle on wide screens, a numbered list on phones.
 * The labels are HTML laid over the painting at the same angles the recipe uses.
 */
export function MissionLoop() {
  const n = loop.steps.length;
  return (
    <section className="section" id="loop">
      <div className="page">
        <SectionHeader
          label={loop.label}
          num="05"
          title={loop.headline}
          aside={
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {Object.entries(BY_INK).map(([who, cls]) => (
                <li key={who} className={`hand text-[1.2rem] ${cls}`}>
                  {who}
                </li>
              ))}
            </ul>
          }
        />
        <div className="mt-10 md:mt-6" data-reveal>
          {/* Phones: a plain ordered list. */}
          <ol className="space-y-3 md:hidden">
            {loop.steps.map((s, i) => (
              <li key={s.title} className="flex items-baseline gap-4 border-b border-ink/10 pb-3">
                <span className="t-num font-serif text-[1.3rem] italic text-graphite">{i + 1}</span>
                <span className="font-serif text-[1.45rem] leading-tight">{s.title}</span>
                <span className={`hand ml-auto text-[1.05rem] ${BY_INK[s.by]}`}>{s.by}</span>
              </li>
            ))}
          </ol>

          {/* Wider screens: the painted loop. */}
          <div className="relative mx-auto hidden aspect-[16/10] w-full max-w-[980px] md:block">
            <BrushArt art="loop" options={{ nodes: n, pigments: ['ultramarine', 'sap', 'vermilion', 'ultramarine', 'sap', 'vermilion'] }} seed={9} stepMs={60} className="absolute inset-0" />
            <ol className="absolute inset-0">
              {loop.steps.map((s, i) => {
                const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
                const x = 50 + Math.cos(a) * 38;
                const y = 50 + Math.sin(a) * 36;
                return (
                  <li
                    key={s.title}
                    className="absolute w-[11.5rem] -translate-x-1/2 -translate-y-1/2 text-center"
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <span className="t-num font-serif text-[1rem] italic text-graphite">{i + 1}</span>
                    <span className="block font-serif text-[1.35rem] leading-[1.1] tracking-[-0.01em] [text-shadow:0_0_12px_var(--color-sheet),0_0_4px_var(--color-sheet)]">{s.title}</span>
                    <span className={`hand text-[1rem] ${BY_INK[s.by]}`}>{s.by}</span>
                  </li>
                );
              })}
            </ol>
            <p aria-hidden="true" className="hand absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-3 text-[1.6rem] text-graphite">
              {loop.centre}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
