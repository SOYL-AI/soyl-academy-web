import './method.css';
import { Dab } from '@/components/brush/marks';
import { brief, hero } from '@/content/method';

/**
 * The mission brief Ms Rao approves (ADR-034): a sheet with the outcomes, the scene and what the mission listens
 * for. When it scrolls in, her signature writes itself and the "Approved" stamp lands. An illustrative example.
 */
export function BriefSheet() {
  return (
    <article aria-label="Example mission brief" className="leaf tape relative px-6 pb-7 pt-8 md:px-9 md:pb-9 md:pt-10" data-reveal="fade">
      <div className="flex items-start justify-between gap-4">
        <p className="t-eyebrow text-graphite">Mission brief · Example</p>
        <p className="hand text-[1rem] text-graphite">Class 8B · Electricity</p>
      </div>

      <p className="mt-5 font-serif text-[clamp(1.5rem,2.4vw,1.95rem)] leading-[1.15] tracking-[-0.015em]">{hero.ticket.scene}</p>

      <p className="mt-6 text-[14px] font-semibold text-ink">By the end, pupils can</p>
      <ul className="mt-2 space-y-2">
        {brief.outcomes.map((o, i) => (
          <li key={o} className="flex items-start gap-3 leading-snug">
            <Dab ink={(['ultramarine', 'vermilion', 'ochre'] as const)[i]} className="mt-1.5" />
            {o}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[14px] font-semibold text-ink">Listens for</p>
      <p className="mt-1 text-graphite">{brief.listensFor}</p>

      <div className="mt-8 flex items-end justify-between gap-6 border-t border-ink/15 pt-5">
        <div>
          <p className="text-[13px] text-graphite">Approved by</p>
          <svg viewBox="0 0 220 60" fill="none" aria-hidden="true" focusable="false" className="sign -ml-1 mt-1 h-12 w-44 text-ultramarine">
            <path
              d="M8 40 C 14 18, 26 12, 28 30 C 30 46, 20 50, 22 38 C 26 22, 44 22, 46 38 C 48 50, 58 30, 66 28 C 74 26, 70 44, 80 40 C 92 36, 96 18, 104 22 C 112 26, 104 44, 116 42 C 128 40, 134 28, 146 30 C 160 32, 166 44, 182 36 C 194 30, 204 30, 214 34"
              pathLength={1}
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="sr-only">Signed by {brief.approvedBy}</p>
        </div>
        <span className="stamp inline-flex rotate-[-8deg] items-center rounded-[6px] border-[3px] border-sap px-3 py-1.5 font-semibold uppercase tracking-[0.12em] text-sap">
          Approved
        </span>
      </div>
    </article>
  );
}
