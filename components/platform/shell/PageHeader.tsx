/**
 * Page title block + breadcrumbs (server component; zero client JS). Also emits BreadcrumbList JSON-LD
 * for public pages (ARCHITECTURE §3.2 SEO) through the site's existing StructuredData component.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbNode } from '@/lib/seo/schema';
import s from './shell.module.css';

export interface Crumb {
  name: string;
  path: string;
}

export function PageHeader({
  crumbs,
  title,
  lead,
  lang,
  structuredData = true,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: ReactNode;
  lang?: string;
  structuredData?: boolean;
  children?: ReactNode;
}) {
  const current = crumbs[crumbs.length - 1];
  return (
    <header>
      {structuredData && current && <StructuredData data={{ '@context': 'https://schema.org', ...breadcrumbNode(current.path, crumbs) }} />}
      {crumbs.length > 1 && (
        <nav aria-label="Breadcrumb" className={s.crumbs}>
          <ol>
            {crumbs.map((c, i) =>
              i === crumbs.length - 1 ? (
                <li key={c.path}>
                  <span aria-current="page">{c.name}</span>
                </li>
              ) : (
                <li key={c.path}>
                  <Link href={c.path} className={s.crumbLink}>
                    {c.name}
                  </Link>
                </li>
              ),
            )}
          </ol>
        </nav>
      )}
      <h1 className={s.title} lang={lang}>
        {title}
      </h1>
      {lead && <p className={s.lead}>{lead}</p>}
      {children}
    </header>
  );
}
