'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { APP_URL, MAIN_NAV, PRIMARY_CTA } from '@/lib/site';
import { Logo } from '@/components/notebook/Logo';
import { buttonClasses } from '@/components/notebook/Button';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div className="page flex h-16 items-center gap-6">
        <Logo size={30} />

        <nav aria-label="Primary" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={cn(
                    'relative inline-flex h-16 items-center px-3 text-[15px] font-medium transition-colors duration-150',
                    isCurrent(item.href) ? 'text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  {item.label}
                  {isCurrent(item.href) && (
                    <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-0.5 bg-red-pen" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <a
            href={APP_URL}
            className="hidden text-[15px] font-medium text-ink underline-offset-4 hover:text-cobalt hover:underline sm:inline"
          >
            Sign in
          </a>
          <Link href={PRIMARY_CTA.href} className={buttonClasses('primary', 'md', 'h-10 px-4')}>
            {PRIMARY_CTA.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="press -mr-2 inline-flex h-11 w-11 items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              {open ? (
                <path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 7h16M3 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-rule bg-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="page pb-6 pt-2">
          <ul>
            {MAIN_NAV.map((item) => (
              <li key={item.href} className="border-b border-rule">
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className="flex min-h-12 items-center justify-between py-3 text-lg font-medium"
                >
                  {item.label}
                  {isCurrent(item.href) && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />}
                </Link>
              </li>
            ))}
            <li>
              <a href={APP_URL} className="flex min-h-12 items-center py-3 text-lg font-medium">
                Sign in
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
