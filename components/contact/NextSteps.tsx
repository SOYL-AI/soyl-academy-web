import { Dab, type Ink } from '@/components/brush/marks';

/**
 * "What happens next" as a short drawn path (ADR-034): a pencil line runs down through numbered watercolour dabs and
 * traces itself when it scrolls into view. Server component; decorative line, real list.
 */
export function NextSteps({ steps, heading = 'What happens next' }: { steps: { title: string; line: string }[]; heading?: string }) {
  const inks: Ink[] = ['ultramarine', 'vermilion', 'ochre', 'sap'];
  return (
    <div>
      <h2 className="hand mb-5 text-[1.4rem] text-vermilion-ink">{heading}</h2>
      <div className="relative" data-reveal="fade">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 20 300"
          preserveAspectRatio="none"
          className="ink absolute left-[11px] top-3 h-[calc(100%-2.5rem)] w-5 text-ink/45"
          fill="none"
        >
          <path d="M10 2 C 4 40, 16 70, 9 110 S 4 180, 11 220 S 15 270, 9 298" pathLength={1} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
        <ol className="relative space-y-7">
          {steps.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[2.6rem_1fr] gap-x-3">
              <span className="relative grid h-8 w-8 place-items-center">
                <Dab ink={inks[i % inks.length]} className="absolute inset-0 h-8 w-8 opacity-70" />
                <span className="t-num relative font-serif text-[1.15rem] italic leading-none text-ink">{i + 1}</span>
              </span>
              <div className="pt-0.5">
                <p className="font-semibold text-ink">{s.title}</p>
                <p className="t-small mt-1 text-graphite">{s.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
