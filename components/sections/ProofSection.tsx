import Image from 'next/image';
import {
  learningStats,
  schoolLogos,
  studentProjects,
  testimonials,
} from '@/content/proof';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

/**
 * Section 9 — social proof.
 *
 * Architecture only. Driven entirely by `content/proof.ts`; each block renders
 * only if it has real entries, and the whole section renders nothing while
 * every list is empty. Nothing is faked and no placeholder ever ships.
 */
export function ProofSection() {
  const hasAny =
    testimonials.length + schoolLogos.length + studentProjects.length + learningStats.length > 0;
  if (!hasAny) return null;

  return (
    <section className="w-full bg-brand-cream section-padding">
      <div className="container-default space-y-20 md:space-y-28">
        {learningStats.length > 0 && (
          <ScrollReveal>
            <dl className="grid grid-cols-2 gap-y-10 border-y border-brand-black/15 py-10 md:grid-cols-4">
              {learningStats.map((s) => (
                <div key={s.label} className="md:border-r md:border-brand-black/15 md:px-6 md:first:pl-0 md:last:border-r-0">
                  <dd className="text-display text-brand-black">{s.value}</dd>
                  <dt className="text-small mt-2 text-brand-black/70">{s.label}</dt>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        )}

        {testimonials.length > 0 && (
          <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <li key={t.name + t.school}>
                <ScrollReveal delay={i * 0.08}>
                  <figure>
                    <blockquote className="text-subhead mb-6 text-brand-black">“{t.quote}”</blockquote>
                    <figcaption className="flex items-center gap-4">
                      {t.photo && (
                        <Image
                          src={t.photo.src}
                          alt={t.photo.alt}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}
                      <span className="text-small text-brand-black/70">
                        <span className="block font-semibold text-brand-black">{t.name}</span>
                        {t.role}, {t.school}
                      </span>
                    </figcaption>
                  </figure>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        )}

        {studentProjects.length > 0 && (
          <ul className="grid gap-5 md:grid-cols-3">
            {studentProjects.map((p, i) => (
              <li key={p.title}>
                <ScrollReveal delay={i * 0.08}>
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-paper">
                    <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <p className="text-eyebrow mb-2 text-cobalt">{p.subject}</p>
                  <h3 className="text-subhead mb-2 text-brand-black">{p.title}</h3>
                  <p className="text-body text-brand-black/70">{p.summary}</p>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        )}

        {schoolLogos.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-80">
            {schoolLogos.map((s) => (
              <li key={s.name}>
                <Image src={s.logo} alt={s.name} width={140} height={48} className="h-10 w-auto object-contain" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
