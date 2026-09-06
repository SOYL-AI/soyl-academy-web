'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'The SOYL Method', href: '/method' },
  { label: 'What We Teach', href: '/what-we-teach' },
  { label: 'For Schools', href: '/schools' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const toggleMenu = useCallback(() => setIsMobileMenuOpen((p) => !p), []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300',
          isScrolled && 'shadow-[0_1px_0_0_var(--color-border)]'
        )}
      >
        <div className="container-default">
          <nav
            className="flex items-center h-[68px] lg:h-[76px] gap-10"
            aria-label="Primary"
          >
            {/* Wordmark, hard left */}
            <Link
              href="/"
              className="relative z-50 flex items-center gap-2.5 shrink-0"
              aria-label="SOYL Academy home"
            >
              <Image
                src="/images/soyl-logo.png"
                alt=""
                width={26}
                height={26}
                className="w-[22px] h-[22px] lg:w-[25px] lg:h-[25px]"
                priority
              />
              <span className="text-[16.5px] font-semibold tracking-[-0.025em] text-ink">
                SOYL Academy
              </span>
            </Link>

            {/* Nav sits immediately beside the wordmark, not centred in the bar */}
            <ul className="hidden lg:flex items-center gap-7 mr-auto">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(
                      'text-[14.5px] tracking-[-0.012em] transition-colors duration-200',
                      pathname === item.href
                        ? 'text-ink font-medium'
                        : 'text-ink-light hover:text-ink'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Two rectangular buttons, the way Primer closes its bar */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <Link
                href="/students"
                className="inline-flex items-center h-[38px] px-4 text-[14px] font-medium text-ink bg-bone border border-border rounded-sm transition-colors duration-200 hover:bg-paper hover:border-border-dark"
              >
                For Students
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center h-[38px] px-4 bg-ink text-white text-[14px] font-medium rounded-sm transition-colors duration-300 hover:bg-cobalt"
              >
                Bring SOYL to your school
              </Link>
            </div>

            <button
              onClick={toggleMenu}
              className="relative z-50 lg:hidden ml-auto w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={cn(
                  'block w-[18px] h-[1.5px] bg-ink transition-all duration-300 origin-center',
                  isMobileMenuOpen && 'rotate-45 translate-y-[3.25px]'
                )}
              />
              <span
                className={cn(
                  'block w-[18px] h-[1.5px] bg-ink transition-all duration-300 origin-center',
                  isMobileMenuOpen && '-rotate-45 -translate-y-[3.25px]'
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Full-screen mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white lg:hidden flex flex-col justify-between',
          'transition-opacity duration-300',
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="pt-28 px-6" aria-label="Mobile" onClick={closeMenu}>
          <ul className="space-y-1">
            {[...navItems, { label: 'For Students', href: '/students' }].map(
              (item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(
                      'block py-2.5 text-[30px] sm:text-[34px] font-medium tracking-[-0.03em] transition-all duration-500',
                      pathname === item.href ? 'text-cobalt' : 'text-ink',
                      isMobileMenuOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-3'
                    )}
                    style={{
                      transitionDelay: isMobileMenuOpen
                        ? `${100 + i * 45}ms`
                        : '0ms',
                      transitionTimingFunction: 'var(--ease-out-expo)',
                    }}
                    tabIndex={isMobileMenuOpen ? 0 : -1}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div
          onClick={closeMenu}
          className={cn(
            'px-6 pb-12 transition-all duration-500',
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-3'
          )}
          style={{
            transitionDelay: isMobileMenuOpen
              ? `${100 + (navItems.length + 1) * 45}ms`
              : '0ms',
            transitionTimingFunction: 'var(--ease-out-expo)',
          }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-12 px-6 bg-ink text-white text-[15px] font-medium rounded-sm transition-colors hover:bg-cobalt"
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Bring SOYL to your school
          </Link>
        </div>
      </div>
    </>
  );
}
