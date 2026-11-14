import Link from 'next/link';
import { audiences } from '@/content/home';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Dab, InkPath, type Ink } from '@/components/brush/marks';

/** Who it's for (ADR-033): four short cards, each a link. */
export function Audiences() {
  return (
    <section className="section-tight">
      <div className="page">
        <SectionHeader label={audiences.label} num="06" title={audiences.headline} size="title" layout="stack" />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {audiences.items.map((a, i) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className={`leaf group flex h-full flex-col justify-between gap-8 p-6 transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 ${i % 2 ? 'hover:rotate-[0.8deg]' : 'hover:-rotate-[0.8deg]'}`}
              >
                <span>
                  <Dab ink={a.ink as Ink} className="h-4 w-4" />
                  <span className="mt-4 block font-serif text-[1.9rem] leading-none tracking-[-0.015em]">{a.title}</span>
                  <span className="mt-3 block leading-snug text-graphite">{a.line}</span>
                </span>
                <span className="relative inline-flex w-fit items-center gap-2 font-semibold">
                  For {a.title.toLowerCase()}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    <path d="M3 12.5 C 9 11.5, 14 12.8, 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M14.5 6.5 L 20.5 12 L 14.5 17.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <InkPath mark="under" ink={a.ink as Ink} weight={3} className="ink-hover absolute -bottom-1 left-0 h-2 w-full" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
