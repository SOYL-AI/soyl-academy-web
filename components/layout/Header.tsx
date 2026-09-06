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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleMenu = useCallback(() => setIsMobileMenuOpen(p => !p), []);

  return (
    <>
      {/* ── Primer-inspired Header ── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent',
          isMobileMenuOpen && 'bg-white'
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-8 lg:px-10">
          <nav className="flex items-center justify-between h-[60px] lg:h-[68px]" aria-label="Primary">

            {/* Logo — Left */}
            <Link href="/" className="relative z-50 flex items-center gap-2 shrink-0" aria-label="SOYL Academy home">
              <Image src="/images/soyl-logo.png" alt="" width={28} height={28} className="w-6 h-6 lg:w-7 lg:h-7" priority />
              <span className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                SOYL Academy
              </span>
            </Link>

            {/* Nav Links — Center */}
            <div className="hidden lg:flex items-center gap-7 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-[13.5px] font-medium tracking-[-0.005em] transition-colors duration-200',
                    pathname === item.href
                      ? 'text-[var(--color-ink)]'
                      : 'text-[var(--color-ink-light)] hover:text-[var(--color-ink)]'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right — CTA + For Students */}
            <div className="hidden lg:flex items-center gap-5 shrink-0">
              <Link
                href="/students"
                className="text-[13.5px] font-medium text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
              >
                For Students
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-ink)] text-white text-[13px] font-medium rounded-sm hover:bg-[var(--color-cobalt)] transition-colors duration-300"
              >
                Bring SOYL to your school
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="ml-0.5">
                  <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={toggleMenu}
              className="relative z-50 lg:hidden w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={cn(
                'block w-[18px] h-[1.5px] bg-[var(--color-ink)] transition-all duration-300 origin-center',
                isMobileMenuOpen && 'rotate-45 translate-y-[3.25px]'
              )} />
              <span className={cn(
                'block w-[18px] h-[1.5px] bg-[var(--color-ink)] transition-all duration-300 origin-center',
                isMobileMenuOpen && '-rotate-45 -translate-y-[3.25px]'
              )} />
            </button>
          </nav>
        </div>
      </header>

      {/* ── Full-screen Mobile Menu ── */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-white lg:hidden flex flex-col justify-between',
          'transition-opacity duration-400',
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="pt-28 px-8" aria-label="Mobile" onClick={closeMenu}>
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block py-2.5 text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] transition-all duration-500',
                    pathname === item.href
                      ? 'text-[var(--color-cobalt)]'
                      : 'text-[var(--color-ink)]',
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                  )}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${100 + i * 50}ms` : '0ms',
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/students"
                className={cn(
                  'block py-2.5 text-[28px] sm:text-[32px] font-semibold tracking-[-0.02em] text-[var(--color-ink-light)] transition-all duration-500',
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                )}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${100 + navItems.length * 50}ms` : '0ms',
                  transitionTimingFunction: 'var(--ease-out-expo)',
                }}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                For Students
              </Link>
            </li>
          </ul>
        </nav>

        <div
          onClick={closeMenu}
          className={cn(
            'px-8 pb-12 transition-all duration-500',
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          )}
          style={{
            transitionDelay: isMobileMenuOpen ? `${100 + (navItems.length + 1) * 50}ms` : '0ms',
            transitionTimingFunction: 'var(--ease-out-expo)',
          }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--color-ink)] text-white text-[15px] font-medium rounded-sm hover:bg-[var(--color-cobalt)] transition-colors"
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            Bring SOYL to your school
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
