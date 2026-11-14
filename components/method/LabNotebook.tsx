import { Note } from '@/components/brush/marks';

const READINGS = [
  { v: '1.5', i: '0.10', bulb: 'dim' },
  { v: '3.0', i: '0.20', bulb: 'brighter' },
  { v: '4.5', i: '0.30', bulb: 'brightest' },
];

/**
 * An example page of the simulator's lab notebook (ADR-033, spec §05): aim, prediction, readings with the changed
 * variable highlighted, a graph of the pupil's own readings, and a conclusion. Static illustration, labelled as one.
 */
export function LabNotebook() {
  return (
    <figure
      className="leaf tape relative px-6 pb-7 pt-8 md:px-8"
      style={{
        '--tape': 'var(--color-sap)',
        backgroundImage:
          'linear-gradient(rgba(43,72,200,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(43,72,200,0.07) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      } as React.CSSProperties}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p className="hand text-[1.35rem] text-sap">Lab notebook</p>
        <p className="t-eyebrow text-graphite">Example</p>
      </div>

      <dl className="mt-4 space-y-3">
        <div>
          <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-graphite">Aim</dt>
          <dd className="font-serif text-[1.3rem] leading-snug">Does a higher voltage make the bulb brighter?</dd>
        </div>
        <div>
          <dt className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-graphite">Prediction</dt>
          <dd className="hand text-[1.2rem]">Brighter, but the current stays the same.</dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <table className="w-full max-w-[20rem] border-collapse text-left text-[0.95rem]">
          <caption className="sr-only">Readings: voltage changed, current and bulb recorded</caption>
          <thead>
            <tr className="border-b-2 border-ink/70">
              <th scope="col" className="py-1.5 pr-3 font-semibold">
                <span className="swipe">Voltage (V)</span>
              </th>
              <th scope="col" className="py-1.5 pr-3 font-semibold">Current (A)</th>
              <th scope="col" className="py-1.5 font-semibold">Bulb</th>
            </tr>
          </thead>
          <tbody className="t-num">
            {READINGS.map((r) => (
              <tr key={r.v} className="border-b border-ink/10">
                <td className="py-1.5 pr-3">{r.v}</td>
                <td className="py-1.5 pr-3">{r.i}</td>
                <td className="hand py-1 text-[1.05rem]">{r.bulb}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* The pupil's own readings, plotted. */}
        <svg viewBox="0 0 150 110" className="h-auto w-[150px]" aria-hidden="true" focusable="false">
          <path d="M16 8 C 15.6 40, 16.4 70, 16 96 C 50 95.6, 100 96.4, 144 96" stroke="var(--color-ink)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M18 92 C 50 72, 90 46, 136 20" stroke="var(--color-ultramarine)" strokeWidth="2" fill="none" strokeLinecap="round" />
          {[
            [52, 70],
            [88, 46],
            [124, 23],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3.4" fill="var(--color-vermilion)" />
          ))}
          <text x="146" y="108" textAnchor="end" fontSize="10" fill="var(--color-graphite)">V</text>
          <text x="4" y="12" fontSize="10" fill="var(--color-graphite)">A</text>
        </svg>
      </div>

      <figcaption className="mt-5 border-t border-ink/15 pt-4">
        <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-graphite">Conclusion</span>
        <span className="mt-1 block text-[1.2rem]">
          <Note ink="vermilion-ink" tilt={-1.5}>
            The current went up too. My prediction was off.
          </Note>
        </span>
      </figcaption>
    </figure>
  );
}
