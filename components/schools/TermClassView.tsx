import './schools.css';

/**
 * The heads-of-department class view across a term (/schools, spec §09): misconceptions by class at week 3, 6 and
 * 10. Lives inside a Scene with three steps; each cell holds all three weeks (data-only) and shows the current one.
 * Screen readers read every week in order. On phones each class is a small card instead of a table. An example.
 */
type State = 'open' | 'fixing' | 'secure' | null;

const WEEKS = ['Week 3', 'Week 6', 'Week 10'];
const COLUMNS = ['Power and energy', 'Current is used up', 'Series and parallel'];
/** Per class, per misconception: its state at weeks 3, 6 and 10. */
const ROWS: { cls: string; cells: [State, State, State][] }[] = [
  { cls: '8A', cells: [['open', 'fixing', 'secure'], ['open', 'secure', 'secure'], [null, 'open', 'fixing']] },
  { cls: '8B', cells: [['open', 'fixing', 'secure'], [null, 'open', 'fixing'], [null, null, 'secure']] },
  { cls: '8C', cells: [['open', 'open', 'fixing'], ['open', 'fixing', 'secure'], [null, null, 'secure']] },
];

const LABEL: Record<Exclude<State, null>, { text: string; cls: string }> = {
  open: { text: 'Open', cls: 'bg-vermilion-soft text-vermilion-ink' },
  fixing: { text: 'Fix mission out', cls: 'bg-ochre-soft text-ink' },
  secure: { text: 'Secure at recheck', cls: 'bg-sap-soft text-sap' },
};

function Cell({ weeks }: { weeks: [State, State, State] }) {
  return (
    <span className="cv-cell">
      {weeks.map((s, w) => (
        <span key={w} data-only={String(w)} className="self-center">
          <span className="sr-only">{WEEKS[w]}: </span>
          {s ? (
            <span className={`inline-block whitespace-nowrap rounded-md px-1.5 py-0.5 text-[0.75rem] font-semibold md:px-2 md:py-1 md:text-[0.8rem] ${LABEL[s].cls}`}>{LABEL[s].text}</span>
          ) : (
            <span className="text-[0.85rem] text-graphite">Not seen yet</span>
          )}
        </span>
      ))}
    </span>
  );
}

export function TermClassView() {
  return (
    <figure aria-label="Example class view for a head of department: misconceptions by class across a term" className="leaf h-full overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-white/60 px-4 py-3 md:px-7 md:py-3.5">
        <p className="text-[0.85rem] font-semibold">Science · Class 8 · this term</p>
        <p className="text-[0.85rem] text-graphite">Example</p>
      </div>

      {/* Tablets and up: a table */}
      <div className="hidden px-7 pb-6 pt-4 md:block">
        <table className="w-full border-collapse text-left text-[0.875rem]">
          <thead>
            <tr>
              <th scope="col" className="py-2 pr-3 font-semibold text-graphite">
                Class
              </th>
              {COLUMNS.map((c) => (
                <th key={c} scope="col" className="py-2 pr-3 font-semibold text-graphite">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.cls} className="border-t border-ink/10">
                <th scope="row" className="py-4 pr-3 font-serif text-[1.25rem] font-normal">
                  {r.cls}
                </th>
                {r.cells.map((weeks, i) => (
                  <td key={COLUMNS[i]} className="py-4 pr-3">
                    <Cell weeks={weeks} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phones: a card per class */}
      <ul className="divide-y divide-ink/10 px-4 pb-3 md:hidden">
        {ROWS.map((r) => (
          <li key={r.cls} className="py-2">
            <p className="font-serif text-[1.15rem] leading-none">{r.cls}</p>
            <dl className="mt-1 space-y-0.5">
              {r.cells.map((weeks, i) => (
                <div key={COLUMNS[i]} className="grid grid-cols-[1fr_auto] items-center gap-2">
                  <dt className="text-[0.8rem] text-graphite">{COLUMNS[i]}</dt>
                  <dd>
                    <Cell weeks={weeks} />
                  </dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </figure>
  );
}
