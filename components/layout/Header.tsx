'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { APP_URL, MAIN_NAV, PRIMARY_CTA } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { buttonClasses } from '@/components/ui/Button';
import { platformChromeActive } from '@/components/platform/shell/chrome';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Learning-platform pages have their own app shell (ADR-023).
  if (platformChromeActive(pathname)) return null;

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-rule bg-white/90 backdrop-blur-md backdrop-saturate-150">
      <div className="page flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
        <Logo size={30} className="shrink-0 whitespace-nowrap" />

        <nav aria-label="Primary" className="ml-6 hidden lg:block">
          <ul className="flex items-center gap-7">
            {MAIN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={cn(
                    'hover-line py-1 text-[15px] font-medium',
                    isCurrent(item.href) ? 'text-ink' : 'text-muted hover:text-ink'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:gap-5">
          <a href={APP_URL} className="hover-line hidden py-1 text-[15px] font-medium text-ink sm:inline">
            Sign in
          </a>
          <Link
            href={PRIMARY_CTA.href}
            className={buttonClasses('primary', 'md', 'hidden h-9 px-3.5 text-[14px] min-[375px]:inline-flex md:h-11 md:px-5 md:text-[15px]')}
          >
            {PRIMARY_CTA.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="press -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-paper lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <path
                d={open ? 'M5 5l12 12' : 'M3 8h16'}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="transition-[d] duration-300"
              />
              <path
                d={open ? 'M17 5L5 17' : 'M3 14h16'}
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="transition-[d] duration-300"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-rule bg-white md:top-[72px] lg:hidden"
      >
        <nav aria-label="Mobile" className="page flex min-h-full flex-col pb-10 pt-4">
          <ul>
            {MAIN_NAV.map((item, i) => (
              <li key={item.href} className="rise border-b border-rule" style={{ '--d': `${i * 45}ms` } as React.CSSProperties}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className="flex min-h-14 items-center justify-between py-3 font-serif text-[1.75rem] leading-tight"
                >
                  {item.label}
                  {isCurrent(item.href) && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />}
                </Link>
              </li>
            ))}
          </ul>
          <div className="rise mt-8 flex flex-col gap-3" style={{ '--d': `${MAIN_NAV.length * 45}ms` } as React.CSSProperties}>
            <Link href={PRIMARY_CTA.href} className={buttonClasses('primary', 'lg', 'w-full')}>
              {PRIMARY_CTA.label}
            </Link>
            <a href={APP_URL} className={buttonClasses('secondary', 'lg', 'w-full')}>
              Sign in
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
