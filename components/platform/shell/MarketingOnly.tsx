'use client';

/**
 * Renders its children everywhere except on platform pages, which have their own app shell (ADR-023). Used by
 * the marketing Footer (a server component) so its markup is unchanged on marketing pages: this wrapper adds
 * no element of its own.
 */
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { platformChromeActive } from './chrome';

export function MarketingOnly({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (platformChromeActive(pathname)) return null;
  return <>{children}</>;
}
