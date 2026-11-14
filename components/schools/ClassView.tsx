/**
 * An example of the heads-of-department class view (spec §09): misconceptions by class over time. Secondary to the
 * teacher's Monday screen. Each cell says what happened to a misconception: open, being fixed, or secure at recheck.
 */
type State = 'open' | 'fixing' | 'secure' | null;

const COLUMNS = ['Power and energy', 'Current is used up', 'Series and parallel'];
const ROWS: { cls: string; cells: State[] }[] = [
  { cls: '8A', cells: ['secure', 'fixing', null] },
  { cls: '8B', cells: ['fixing', 'open', 'secure'] },
  { cls: '8C', cells: ['open', 'secure', 'fixing'] },
];

const LABEL: Record<Exclude<State, null>, { text: string; cls: string }> = {
  open: { text: 'Open', cls: 'bg-vermilion-soft text-vermilion-ink' },
  fixing: { text: 'Fix mission out', cls: 'bg-ochre-soft text-ink' },
  secure: { text: 'Secure at recheck', cls: 'bg-sap-soft text-sap' },
};

export function ClassView() {
  return (
    <figure aria-label="Example class view for a head of department: misconceptions by class" className="leaf overflow-hidden">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-white/60 px-5 py-3.5 md:px-7">
        <p className="text-[0.85rem] font-semibold">Science · Class 8 · this term</p>
        <p className="text-[0.85rem] text-graphite">Example</p>
      </div>
      <div className="overflow-x-auto px-5 pb-6 pt-4 md:px-7" tabIndex={0} role="region" aria-label="Example class view, scrolls sideways">
        <table className="w-full min-w-[30rem] border-collapse text-left text-[0.875rem]">
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
                <th scope="row" className="py-3 pr-3 font-semibold">
                  {r.cls}
                </th>
                {r.cells.map((s, i) => (
                  <td key={COLUMNS[i]} className="py-3 pr-3">
                    {s ? (
                      <span className={`inline-block whitespace-nowrap rounded-md px-2 py-1 text-[0.8rem] font-semibold ${LABEL[s].cls}`}>{LABEL[s].text}</span>
                    ) : (
                      <span className="text-graphite">Not seen</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
