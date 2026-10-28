import Image from 'next/image';
import { learningStats, schoolLogos, testimonials } from '@/content/proof';

/**
 * Proof strip: pilot schools, numbers, one quote — from content/proof.ts only.
 * Nothing is ever invented and nothing is a placeholder: each part renders only
 * when real, permissioned content exists (today: none, so the strip is absent).
 */
export function ProofStrip() {
  const quote = testimonials[0];
  const stats = learningStats.slice(0, 2);
  if (!quote && stats.length === 0 && schoolLogos.length === 0) return null;

  return (
    <section aria-label="SOYL in schools" className="page pb-6">
      <div className="grid grid-cols-1 gap-6 border-y border-rule py-6 md:grid-cols-12">
        {schoolLogos.length > 0 && (
          <div className="md:col-span-6 lg:col-span-4">
            <p className="t-eyebrow mb-3 text-muted">Piloting SOYL</p>
            <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {schoolLogos.map((s) => (
                <li key={s.name}>
                  <Image src={s.logo} alt={s.name} width={120} height={40} className="h-8 w-auto object-contain" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {stats.map((stat) => (
          <div key={stat.label} className="md:col-span-3 lg:col-span-2">
            <p className="t-num font-serif text-[2.75rem] leading-none">{stat.value}</p>
            <p className="t-small mt-2 text-muted">{stat.label}</p>
          </div>
        ))}

        {quote && (
          <figure className="md:col-span-12 lg:col-span-4">
            <blockquote className="font-serif text-[1.5rem] leading-snug">“{quote.quote}”</blockquote>
            <figcaption className="t-small mt-3 text-muted">
              {quote.name}, {quote.role}, {quote.school}
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
