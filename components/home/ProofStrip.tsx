import Image from 'next/image';
import { learningStats, schoolLogos, testimonials } from '@/content/proof';
import { SHOW_CONTENT_TODOS } from '@/lib/site';
import { TodoSlot } from '@/components/notebook/TodoSlot';

/**
 * Proof strip: pilot schools, numbers, one quote — from content/proof.ts only.
 * Empty slots show labelled TODO placeholders; nothing is ever invented.
 */
export function ProofStrip() {
  const quote = testimonials[0];
  const stats = learningStats.slice(0, 2);
  const nothingReal = !quote && stats.length === 0 && schoolLogos.length === 0;
  if (nothingReal && !SHOW_CONTENT_TODOS) return null;

  return (
    <section aria-label="SOYL in schools" className="rule-b bg-white">
      <div className="page">
        <div className="grid grid-cols-1 gap-px border-x border-rule bg-rule md:grid-cols-12">
          {/* Pilot schools */}
          <div className="bg-white p-5 md:col-span-6 lg:col-span-4">
            <p className="t-label mb-3 text-muted">Piloting SOYL</p>
            {schoolLogos.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {schoolLogos.map((s) => (
                  <li key={s.name}>
                    <Image src={s.logo} alt={s.name} width={120} height={40} className="h-8 w-auto object-contain" />
                  </li>
                ))}
              </ul>
            ) : (
              <TodoSlot kind="Logo" brief="Pilot school names or logos, with each school’s permission." className="min-h-24" />
            )}
          </div>

          {/* Two numbers */}
          {[0, 1].map((i) => {
            const stat = stats[i];
            return (
              <div key={i} className="bg-white p-5 md:col-span-3 lg:col-span-2">
                {stat ? (
                  <>
                    <p className="t-num font-serif text-[2.5rem] leading-none">{stat.value}</p>
                    <p className="t-small mt-2 text-muted">{stat.label}</p>
                  </>
                ) : (
                  <TodoSlot
                    kind="Number"
                    brief={i === 0 ? 'Pupils or classes in the pilot (sourced).' : 'Assignments completed (sourced).'}
                    className="h-full min-h-24"
                  />
                )}
              </div>
            );
          })}

          {/* One quote */}
          <figure className="bg-white p-5 md:col-span-12 lg:col-span-4">
            {quote ? (
              <>
                <blockquote className="font-serif text-[1.5rem] leading-snug">“{quote.quote}”</blockquote>
                <figcaption className="t-small mt-3 text-muted">
                  {quote.name}, {quote.role}, {quote.school}
                </figcaption>
              </>
            ) : (
              <TodoSlot
                kind="Quote"
                brief="One real quote from a pilot teacher or principal, with name, role and school (permission on file)."
                className="h-full min-h-24"
              />
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
