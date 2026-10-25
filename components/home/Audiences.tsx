import Link from 'next/link';
import { audiences } from '@/content/home';
import { media } from '@/content/media';
import { SectionHeader } from '@/components/notebook/SectionHeader';
import { ProductShot } from '@/components/notebook/ProductShot';
import { ArrowRight } from '@/components/notebook/Button';

export function Audiences() {
  return (
    <section className="section rule-t">
      <div className="page">
        <SectionHeader label={audiences.label} num="05" title={audiences.headline} />

        <ul className="mt-10 grid grid-cols-1 gap-px border border-rule bg-rule md:mt-14 md:grid-cols-3">
          {audiences.items.map((item) => (
            <li key={item.id} className="flex flex-col bg-white p-5 md:p-6">
              <ProductShot
                slot={media[item.media]}
                kind={item.kind}
                sizes="(min-width: 1240px) 370px, (min-width: 768px) 30vw, 92vw"
              />
              <h3 className="t-title mt-6">{item.title}</h3>
              <p className="mt-2 text-muted">{item.line}</p>
              <Link href={item.link.href} className="arrow-link mt-auto pt-5">
                {item.link.label} <ArrowRight />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
