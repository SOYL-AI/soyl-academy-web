'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'The SOYL Method', href: '/method' },
  { label: 'What We Teach', href: '/what-we-teach' },
  { label: 'For Schools', href: '/schools' },
  { label: 'For Students', href: '/students' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
];

/**
 * The grid motif in the wordmark lockup.
 *
 * Primer sits a small coloured grid beside its wordmark; ours doubles as the
 * notebook-grid device from the brand language. Filled cells use the three
 * accents so the mark carries brand colour without the rest of the bar doing so.
 */
const GRID_CELLS = [
  null,
  'bg-highlighter',
  null,
  'bg-teacher-red',
  'bg-cobalt',
  'bg-cobalt',
];

function GridMotif() {
  return (
    <div
      className="grid grid-cols-3 grid-rows-2 w-[54px] shrink-0 self-stretch"
      aria-hidden="true"
    >
      {GRID_CELLS.map((fill, i) => (
        <span
          key={i}
          className={cn(
            'border-r border-b border-ink/15 last:border-r-0',
            i > 2 && 'border-b-0',
            i % 3 === 2 && 'border-r-0',
            fill
          )}
        />
      ))}
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const boxRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  // Escape closes; so does a click anywhere outside the box.
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) close();
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointerDown);
    };
  }, [isOpen, close]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="container-default">
        <div className="flex items-start justify-between gap-4 pt-4 md:pt-5">
          {/* Bordered nav object, top-left */}
          <div
            ref={boxRef}
            className="pointer-events-auto w-[min(26rem,calc(100vw-2.5rem))] border border-ink bg-white"
          >
            <div className="flex items-stretch h-[56px] md:h-[60px]">
              <Link
                href="/"
                onClick={close}
                className="flex items-center px-4 md:px-5 mr-auto"
                aria-label="SOYL Academy home"
              >
                <span className="text-[19px] md:text-[21px] font-semibold tracking-[-0.035em] text-ink">
                  SOYL Academy
                </span>
              </Link>

              <div className="border-l border-ink self-stretch" />
              <GridMotif />

              <button
                onClick={toggle}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
                className="border-l border-ink w-[56px] md:w-[60px] shrink-0 flex flex-col items-center justify-center gap-[6px] transition-colors hover:bg-bone"
              >
                <span
                  className={cn(
                    'block w-[20px] h-[1.5px] bg-ink transition-transform duration-300 origin-center',
                    isOpen && 'rotate-45 translate-y-[3.75px]'
                  )}
                />
                <span
                  className={cn(
                    'block w-[20px] h-[1.5px] bg-ink transition-transform duration-300 origin-center',
                    isOpen && '-rotate-45 -translate-y-[3.75px]'
                  )}
                />
              </button>
            </div>

            {/* Panel drops out of the same box */}
            <div
              className={cn(
                'grid transition-[grid-template-rows] duration-[400ms] ease-[var(--ease-out-expo)]',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              )}
            >
              <div className="overflow-hidden">
                <nav
                  className="border-t border-ink px-4 md:px-5 pt-2 pb-5"
                  aria-label="Primary"
                >
                  <ul>
                    {navItems.map((item) => (
                      <li key={item.href} className="border-b border-ink/15">
                        <Link
                          href={item.href}
                          onClick={close}
                          tabIndex={isOpen ? 0 : -1}
                          aria-current={
                            pathname === item.href ? 'page' : undefined
                          }
                          className={cn(
                            'block py-3.5 text-[17px] tracking-[-0.015em] transition-colors',
                            pathname === item.href
                              ? 'text-cobalt font-medium'
                              : 'text-ink hover:text-cobalt'
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* Both CTAs repeat here, as Primer's panel does */}
                  <div className="flex flex-col gap-2.5 pt-6">
                    <Link
                      href="/contact"
                      onClick={close}
                      tabIndex={isOpen ? 0 : -1}
                      className="inline-flex items-center justify-center h-12 px-5 rounded-full bg-ink text-white text-[15px] font-medium transition-colors hover:bg-cobalt"
                    >
                      Bring SOYL to your school
                    </Link>
                    <Link
                      href="/students"
                      onClick={close}
                      tabIndex={isOpen ? 0 : -1}
                      className="inline-flex items-center justify-center h-12 px-5 rounded-full border border-ink text-ink text-[15px] font-medium transition-colors hover:bg-bone"
                    >
                      For Students
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          {/* CTAs float free at the right, as Primer's do */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2.5 shrink-0">
            <Link
              href="/students"
              className="inline-flex items-center h-[44px] px-5 rounded-full bg-white border border-ink text-ink text-[15px] font-medium transition-colors hover:bg-bone"
            >
              For Students
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center h-[44px] px-6 rounded-full bg-ink text-white text-[15px] font-medium transition-colors hover:bg-cobalt"
            >
              Bring SOYL to your school
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
