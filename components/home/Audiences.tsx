import Link from 'next/link';
import { audiences } from '@/content/home';
import { images } from '@/content/images';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ArrowRight } from '@/components/ui/Button';
import { Photo } from '@/components/media/Photo';

/** Three doors: one line each, the detail lives on the destination page. */
export function Audiences() {
  return (
    <section className="section pt-0">
      <div className="page">
        <SectionHeader label={audiences.label} num="05" title={audiences.headline} />

        <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:mt-16 md:grid-cols-3">
          {audiences.items.map((item, i) => (
            <li key={item.id} data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <Link href={item.link.href} className="group block rounded-[var(--radius-md)] focus-visible:outline-offset-4">
                <Photo
                  image={images[item.image]}
                  aspect="aspect-[4/3] md:aspect-[4/5]"
                  zoom
                  reveal={false}
                  sizes="(min-width: 1320px) 390px, (min-width: 768px) 31vw, 100vw"
                />
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="t-title">{item.title}</h3>
                    <p className="mt-2 max-w-[34ch] text-muted">{item.line}</p>
                    <span className="arrow-link mt-4">
                      {item.link.label} <ArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
