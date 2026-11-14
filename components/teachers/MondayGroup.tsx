/**
 * An example of one opened Monday-screen group (spec §09): each pupil's own evidence inline, a label the teacher
 * can confirm, change or reject in one tap, and the copilot's suggested move. Pupils are anonymised ("Pupil A").
 */
const PUPILS = [
  { who: 'Pupil A', evidence: 'Voice clip · 0:14', quote: '“kW and kWh mean the same, one is just longer.”', sure: true },
  { who: 'Pupil B', evidence: 'Photo of working', quote: '“3 kW for 2 hours is 1.5 units”', sure: true },
  { who: 'Pupil C', evidence: 'Build attempt 2', quote: 'Divided by time instead of multiplying.', sure: false },
];

export function MondayGroup() {
  return (
    <figure aria-label="Example of an opened group on the Monday screen" className="leaf overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-white/60 px-5 py-3.5 md:px-7">
        <p className="text-[0.85rem] font-semibold">Needs attention</p>
        <p className="text-[0.85rem] text-graphite">Class 8B · Example</p>
      </div>

      <div className="px-5 pb-6 pt-5 md:px-7">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="t-num rounded-full bg-vermilion-soft px-2.5 py-0.5 text-[0.85rem] font-semibold text-vermilion-ink">9 pupils</span>
          <p className="font-semibold">Mixes up power and energy</p>
        </div>

        <ul className="mt-4 divide-y divide-ink/10 rounded-[10px] border border-ink/15 bg-white">
          {PUPILS.map((p) => (
            <li key={p.who} className="grid gap-2 p-3.5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-4">
              <div>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem]">
                  <span className="font-semibold">{p.who}</span>
                  <span className="rounded border border-ink/12 bg-sheet px-1.5 py-0.5">{p.evidence}</span>
                  {!p.sure && <span className="rounded bg-ochre-soft px-1.5 py-0.5 font-semibold">Needs a look</span>}
                </p>
                <p className="mt-1 text-[0.9rem] text-graphite">{p.quote}</p>
              </div>
              <div className="flex gap-1.5 text-[0.8rem] font-semibold" aria-hidden="true">
                <span className="rounded-md border border-sap/40 bg-sap-soft px-2.5 py-1 text-sap">Confirm</span>
                <span className="rounded-md border border-ink/15 px-2.5 py-1">Change</span>
                <span className="rounded-md border border-ink/15 px-2.5 py-1 text-graphite">Reject</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-md bg-ultramarine-soft/60 p-4">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-ultramarine">Suggested move</p>
          <ul className="mt-2 space-y-1 text-[0.92rem]">
            <li>
              <span className="font-semibold">Re-teach:</span> a 10-minute demo with the circuit simulator.
            </li>
            <li>
              <span className="font-semibold">Check:</span> one question on a kettle’s units.
            </li>
            <li>
              <span className="font-semibold">For parents:</span> an optional two-line note.
            </li>
          </ul>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[0.85rem] font-semibold" aria-hidden="true">
            <span className="rounded-md bg-ink px-3 py-1.5 text-sheet">Approve</span>
            <span className="rounded-md border border-ink/20 bg-white px-3 py-1.5">Edit</span>
            <span className="rounded-md px-3 py-1.5 text-graphite">Skip</span>
          </div>
          <p className="mt-3 text-[0.85rem] text-graphite">Approving sends a ten-minute Fix mission to these nine pupils only.</p>
        </div>
      </div>
    </figure>
  );
}
