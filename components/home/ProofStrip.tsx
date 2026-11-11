import Image from 'next/image';
import { learningStats, schoolLogos, testimonials } from '@/content/proof';

/**
 * Proof (/schools): pilot schools, numbers, one quote, from content/proof.ts only. Nothing is ever invented and
 * nothing is a placeholder: each part renders only when real, permissioned content exists (today none does, so
 * the strip is absent; plan §3.2, "returns when proof is real").
 */
export function ProofStrip() {
  const quote = testimonials[0];
  const stats = learningStats.slice(0, 2);
  if (!quote && stats.length === 0 && schoolLogos.length === 0) return null;

  return (
    <section aria-label="SOYL in schools" className="page pb-6">
      <div className="grid grid-cols-1 gap-6 border-y border-rule py-6 md:grid-cols-12">
        {schoolLogos.length > 0 ? (
          <div className="md:col-span-6 lg:col-span-4">
            <p className="text-[0.9375rem] font-medium text-graphite">Piloting SOYL</p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-3">
              {schoolLogos.map((s) => (
                <li key={s.name}>
                  <Image src={s.logo} alt={s.name} width={120} height={40} className="h-8 w-auto object-contain" />
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {stats.map((stat) => (
          <div key={stat.label} className="md:col-span-3 lg:col-span-2">
            <p className="font-serif text-[2.75rem] leading-none tabular-nums">{stat.value}</p>
            <p className="mt-2 text-[0.9375rem] text-graphite">{stat.label}</p>
          </div>
        ))}

        {quote ? (
          <figure className="md:col-span-12 lg:col-span-4">
            <blockquote className="font-serif text-[1.45rem] leading-snug">“{quote.quote}”</blockquote>
            <figcaption className="mt-3 text-[0.9375rem] text-graphite">
              {quote.name}, {quote.role}, {quote.school}
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
