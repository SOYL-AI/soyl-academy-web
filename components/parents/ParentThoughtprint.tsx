import { BrushArt } from '@/components/brush/BrushArt';

/**
 * The parent's view of a Thoughtprint (spec §10): "You can now", the best moment, a simpler line for what was found
 * and fixed, and the teacher's comment. No mark anywhere. An example, labelled as one.
 */
export function ParentThoughtprint() {
  return (
    <article aria-label="Example Thoughtprint, as a parent sees it" className="leaf tape relative px-6 pb-8 pt-9 md:px-8">
      <div className="flex items-start justify-between gap-4">
        <p className="t-eyebrow text-graphite">Example · Class 8 · Electricity</p>
        <BrushArt art="thoughtprint" options={{ ridges: 11, blooms: false, weight: 0.8 }} seed={31} bg="#fffdf8" className="-mr-2 -mt-4 h-20 w-20 shrink-0" />
      </div>
      <p className="hand -mt-2 text-[1.3rem] text-ultramarine">Your child can now</p>
      <p className="mt-1 max-w-[24ch] font-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.1] tracking-[-0.015em]">
        Explain why a 2 kW heater running for 3 hours uses 6 units.
      </p>
      <dl className="mt-7 divide-y divide-ink/10 border-t border-ink/10">
        <div className="py-4">
          <dt className="text-[0.85rem] font-semibold text-graphite">Best moment</dt>
          <dd className="mt-1">Worked out on paper why the bill doubled, then explained it out loud.</dd>
        </div>
        <div className="py-4">
          <dt className="text-[0.85rem] font-semibold text-graphite">What we found and fixed</dt>
          <dd className="mt-1 font-medium text-sap">Mixed up two ideas at the start. Sorted by the end.</dd>
        </div>
        <div className="py-4">
          <dt className="text-[0.85rem] font-semibold text-graphite">Your teacher says</dt>
          <dd className="mt-1">“Great persistence on the simulator. Ask them to explain your electricity bill.”</dd>
        </div>
      </dl>
    </article>
  );
}
