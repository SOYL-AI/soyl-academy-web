import Image from 'next/image';
import { learningStats, schoolLogos, testimonials } from '@/content/proof';
import { SHOW_CONTENT_TODOS } from '@/lib/site';
import { TodoSlot } from '@/components/ui/TodoSlot';

/**
 * Proof strip: pilot schools, numbers, one quote — from content/proof.ts only.
 * Nothing is ever invented. On the live site it renders only what is real (today:
 * nothing); in development and preview deploys empty slots show TODO frames.
 */
export function ProofStrip() {
  const quote = testimonials[0];
  const stats = learningStats.slice(0, 2);
  const nothingReal = !quote && stats.length === 0 && schoolLogos.length === 0;
  if (nothingReal && !SHOW_CONTENT_TODOS) return null;

  return (
    <section aria-label="SOYL in schools" className="page pb-6">
      <div className="grid grid-cols-1 gap-3 border-y border-rule py-6 md:grid-cols-12 md:gap-4">
        {(schoolLogos.length > 0 || SHOW_CONTENT_TODOS) && (
          <div className="md:col-span-6 lg:col-span-4">
            <p className="t-eyebrow mb-3 text-muted">Piloting SOYL</p>
            {schoolLogos.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {schoolLogos.map((s) => (
                  <li key={s.name}>
                    <Image src={s.logo} alt={s.name} width={120} height={40} className="h-8 w-auto object-contain" />
                  </li>
                ))}
              </ul>
            ) : (
              <TodoSlot kind="Logo" brief="Pilot school names or logos, with each school’s permission." className="min-h-20" />
            )}
          </div>
        )}

        {[0, 1].map((i) => {
          const stat = stats[i];
          if (!stat && !SHOW_CONTENT_TODOS) return null;
          return (
            <div key={i} className="md:col-span-3 lg:col-span-2">
              {stat ? (
                <>
                  <p className="t-num font-serif text-[2.75rem] leading-none">{stat.value}</p>
                  <p className="t-small mt-2 text-muted">{stat.label}</p>
                </>
              ) : (
                <TodoSlot
                  kind="Number"
                  brief={i === 0 ? 'Pupils or classes in the pilot (sourced).' : 'Assignments completed (sourced).'}
                  className="h-full min-h-20"
                />
              )}
            </div>
          );
        })}

        {(quote || SHOW_CONTENT_TODOS) && (
          <figure className="md:col-span-12 lg:col-span-4">
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
                className="h-full min-h-20"
              />
            )}
          </figure>
        )}
      </div>
    </section>
  );
}
