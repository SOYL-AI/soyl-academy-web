/**
 * An example mission brief (spec §04, step 3): what the teacher reviews before approving. Calm, professional,
 * teacher-side: no guide, no handwriting inside the screen. The buttons are part of the picture, not controls;
 * "See every question" is a real disclosure.
 */
const OUTCOMES = [
  'Pupils can explain the difference between power and energy.',
  'Pupils can work out the units an appliance uses.',
  'Pupils can predict brightness in series and parallel circuits.',
];

const STAGES: [string, string][] = [
  ['Spark', 'Predict what happens to the school’s heater bill.'],
  ['Build', 'Run the circuit simulator, one variable at a time.'],
  ['Defend', 'Explain the surprise to the guide.'],
  ['Fix', 'One new appliance, same idea.'],
  ['Reflect', 'How sure are you? What would you change?'],
];

const MISCONCEPTIONS = ['Power and energy are the same thing', 'Current is used up in a bulb', 'More cells always means brighter'];

const SAMPLES = [
  { stage: 'Spark', text: 'The heater ran twice as long this month. What happens to the bill? Why?' },
  { stage: 'Build', text: 'Change one thing on the bench so the bulb glows brighter. What did you change?' },
  { stage: 'Fix', text: 'A 1.5 kW kettle runs for 20 minutes. Is that more or less than one unit?' },
];

function Tick() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-1 shrink-0 text-sap">
      <path d="M3 8.5l3.2 3L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/10 py-5">
      <p className="flex items-baseline gap-2.5 text-[0.95rem] font-semibold">
        <span className="t-num text-graphite">{n}</span>
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function MissionBrief() {
  return (
    <figure aria-label="Example mission brief" className="leaf overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-white/60 px-5 py-3.5 md:px-7">
        <p className="text-[0.85rem] font-semibold">Mission brief</p>
        <p className="text-[0.85rem] text-graphite">Electricity · Class 8 · Example</p>
      </div>

      <div className="px-5 pb-6 md:px-7">
        <p className="rounded-md bg-ochre-soft/70 px-3 py-2 text-[0.85rem] mt-5">
          <span className="font-semibold">Flagged first:</span> one item the generator is less sure of.
        </p>

        <Step n={1} title="Outcomes covered">
          <ul className="space-y-2">
            {OUTCOMES.map((o) => (
              <li key={o} className="flex gap-2.5 text-[0.95rem]">
                <Tick />
                {o}
              </li>
            ))}
          </ul>
        </Step>

        <Step n={2} title="What pupils will do">
          <dl className="space-y-1.5 text-[0.95rem]">
            {STAGES.map(([s, line]) => (
              <div key={s} className="grid grid-cols-[4.5rem_1fr] gap-2">
                <dt className="font-semibold text-graphite">{s}</dt>
                <dd>{line}</dd>
              </div>
            ))}
          </dl>
        </Step>

        <Step n={3} title="Misconceptions we will listen for">
          <ul className="flex flex-wrap gap-2">
            {MISCONCEPTIONS.map((m) => (
              <li key={m} className="rounded-md border border-ink/12 bg-sheet px-2.5 py-1 text-[0.85rem]">
                {m}
              </li>
            ))}
          </ul>
        </Step>

        <Step n={4} title="Sample items, as pupils see them">
          <ul className="grid gap-2.5 sm:grid-cols-3">
            {SAMPLES.map((s) => (
              <li key={s.stage} className="rounded-[10px] border border-ink/12 bg-white p-3 text-[0.875rem] leading-snug">
                <span className="block text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ultramarine">{s.stage}</span>
                <span className="mt-1 block">{s.text}</span>
              </li>
            ))}
          </ul>
        </Step>

        <details className="group border-t border-ink/10 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[0.95rem] font-semibold [&::-webkit-details-marker]:hidden">
            See every question
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-open:rotate-180">
              <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </summary>
          <p className="mt-3 text-[0.9rem] text-graphite">
            The full pool, grouped by outcome and stage, and searchable. Edit the wording of any item or remove it. It’s the question editor you already know, kept one click away.
          </p>
        </details>

        <div className="flex flex-wrap gap-2 border-t border-ink/10 pt-5 text-[0.875rem] font-semibold" aria-hidden="true">
          <span className="rounded-md bg-ink px-3.5 py-2 text-sheet">Approve mission</span>
          <span className="rounded-md border border-ink/20 bg-white px-3.5 py-2">Edit outcomes</span>
          <span className="rounded-md px-3.5 py-2 text-graphite">Regenerate</span>
        </div>
      </div>
    </figure>
  );
}
