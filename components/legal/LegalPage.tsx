import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow, inkButtonClasses } from '@/components/ink/Button';
import { Stroke } from '@/components/ink/Stroke';
import { cn } from '@/lib/utils';
import s from './legal.module.css';

/**
 * The shape of a legal page in Ink and wash (plan §3.3: "Restyle with the shared components. Text unchanged on
 * legal pages."). The policy text stays in each page file, word for word; these components only lay it out:
 * a quiet opener (the page's label, the heading with one drawn stroke, the date line), a readable column of
 * numbered sections, boxes of facts, and the links to the other policies.
 */
export function LegalPage({
  label,
  title,
  updated,
  links,
  children,
}: {
  label: string;
  title: string;
  updated: string;
  /** The other policies, after "Back to SOYL Academy Home". */
  links: { href: string; label: string }[];
  children: ReactNode;
}) {
  return (
    <div className="pb-20 pt-10 md:pb-28 md:pt-14 lg:pt-16">
      <div className="page grid lg:grid-cols-12">
        <div className="max-w-[46rem] lg:col-span-8 lg:col-start-3">
          <header className="mb-10 md:mb-12">
            <p className="text-[0.9375rem] font-medium text-muted">{label}</p>
            <h1 className="ink-head mt-3 max-w-[18ch]">{title}</h1>
            <Stroke pigment="indigo" width="5em" reveal={false} className="text-[clamp(1.9rem,4.2vw,3.2rem)]" />
            <p className="mt-5 text-[0.875rem] leading-[1.55] text-muted">{updated}</p>
          </header>

          <div className={s.body}>{children}</div>

          <nav aria-label="Policies" className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
            <Link href="/" className={inkButtonClasses('quiet', 'md', 'gap-2 font-medium')}>
              <Arrow className="rotate-180" />
              Back to SOYL Academy Home
            </Link>
            <div className="flex flex-wrap gap-x-6">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className={inkButtonClasses('quiet', 'md', 'gap-1.5 font-medium text-graphite')}>
                  {l.label}
                  <Arrow />
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

/** One numbered section of a policy. `highlight` puts it on the paper band (the refund guarantee). */
export function LegalSection({ id, highlight, className, children }: { id?: string; highlight?: boolean; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={cn(s.section, highlight && s.highlight, className)}>
      {children}
    </section>
  );
}

/** A box of facts inside a section. */
export function LegalNote({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(s.note, className)}>{children}</div>;
}

/** The secondary line inside a note (was `t-small text-muted`). */
export const legalQuiet = s.quiet;
