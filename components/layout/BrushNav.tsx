'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { platformChromeActive } from '@/components/platform/shell/chrome';
import { InkPath } from '@/components/brush/marks';
import type { IndexChapter, NavLink } from '@/lib/site';

/**
 * The marketing header (ADR-033, replacing ADR-025's mega menus): a strip of paper with five links that get a
 * hand-drawn underline, and an "Index" button that opens the whole site as a book's table of contents, spreading
 * from the button like ink. Renders nothing on learning-platform pages (ADR-023).
 *
 * The index is a modal dialog: the page behind becomes inert, focus moves into it and is trapped, Escape closes it and returns focus to the
 * button, the page behind does not scroll, and it closes on navigation. Motion is CSS only and turns off under
 * prefers-reduced-motion. Without JS the index button does nothing; every link is also in the footer.
 */
export interface BrushNavProps {
  logo: ReactNode;
  links: NavLink[];
  chapters: IndexChapter[];
  signIn: { label: string; href: string; external: boolean };
  cta: NavLink;
  email: string;
  social: { label: string; href: string }[];
}

// The index's painting loads only when the index first opens: the header is on every route, including the
// learning platform's, so it must stay small.
const BrushArt = dynamic(() => import('@/components/brush/BrushArt').then((m) => m.BrushArt), { ssr: false });

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SignIn({ signIn, className }: { signIn: BrushNavProps['signIn']; className: string }) {
  return signIn.external ? (
    <a href={signIn.href} className={className}>
      {signIn.label}
    </a>
  ) : (
    <Link href={signIn.href} className={className}>
      {signIn.label}
    </Link>
  );
}

function IndexIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className="shrink-0">
      {open ? (
        <>
          <path d="M5 5.5 C 9 9, 14 14.5, 19 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18.5 5 C 14.5 9.5, 9.5 14, 5.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M3.5 7 C 8 6.2, 14 7.6, 20.5 6.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3.5 12.2 C 9 11.6, 13 12.8, 17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3.5 17.4 C 8 16.8, 15 18, 20.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export function BrushNav({ logo, links, chapters, signIn, cta, email, social }: BrushNavProps) {
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [origin, setOrigin] = useState({ x: '100%', y: '0px' });

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  const toggle = () => {
    if (open) return close();
    const r = buttonRef.current?.getBoundingClientRect();
    if (r) setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
    setEverOpened(true);
    setOpen(true);
  };

  // A link inside the index closes it, even when it points at the page already open.
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest('a[href]')) setOpen(false);
    };
    sheet.addEventListener('click', onClick);
    return () => sheet.removeEventListener('click', onClick);
  }, []);

  // While open: lock scroll, trap focus, Escape closes.
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    const first = sheet?.querySelector<HTMLElement>('[data-autofocus]') ?? sheet?.querySelector<HTMLElement>(FOCUSABLE);
    const t = window.setTimeout(() => first?.focus({ preventScroll: true }), 60);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !sheet) return;
      const items = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.getClientRects().length > 0);
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    // The page behind a modal is out of reach for pointer, keyboard and assistive technology alike.
    const behind = Array.from(document.querySelectorAll<HTMLElement>('#main-content, body > footer, footer[role="contentinfo"], .cookie-bar')).filter((el) => !el.inert);
    behind.forEach((el) => (el.inert = true));
    return () => {
      window.clearTimeout(t);
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = prevOverflow;
      behind.forEach((el) => (el.inert = false));
    };
  }, [open, close]);

  if (platformChromeActive(pathname)) return null;

  // Number the index entries straight through the chapters, like a book's contents.
  const numbered = chapters.reduce<{ chapter: IndexChapter; start: number }[]>((acc, chapter) => {
    const prev = acc[acc.length - 1];
    acc.push({ chapter, start: prev ? prev.start + prev.chapter.items.length : 1 });
    return acc;
  }, []);

  return (
    <>
      <header className="nav-bar sticky top-0 z-50" data-scrolled={scrolled ? 'true' : 'false'}>
        <div className="page flex h-16 items-center gap-4 md:h-[72px]">
          <div className="mr-auto flex items-center lg:mr-0">{logo}</div>

          <nav aria-label="Primary" className="mx-auto hidden lg:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {links.map((l) => {
                const current = isCurrent(pathname, l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={current ? 'page' : undefined}
                      className="nav-link relative inline-flex h-11 items-center px-3 text-[15px] font-medium text-ink transition-colors hover:text-ink"
                    >
                      {l.label}
                      <InkPath
                        mark="under"
                        ink={current ? 'vermilion' : 'ultramarine'}
                        weight={2.5}
                        className="absolute bottom-1.5 left-2 right-2 h-2 w-[calc(100%-1rem)]"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <SignIn signIn={signIn} className="nav-link hidden px-2 py-2 text-[15px] font-medium text-ink hover:text-ultramarine xl:inline-flex" />
            <Link
              href={cta.href}
              className="press btn-brush hidden h-10 items-center bg-ink px-4 text-[14px] font-semibold text-sheet hover:bg-ultramarine min-[400px]:inline-flex md:h-11 md:px-5 md:text-[15px]"
            >
              {cta.label}
            </Link>
            <button
              ref={buttonRef}
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="site-index"
              className="press inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-[15px] font-semibold text-ink hover:bg-sheet-deep md:h-11 md:px-3"
            >
              <IndexIcon open={open} />
              <span className="hand text-[1.15rem] leading-none">{open ? 'Close' : 'Index'}</span>
            </button>
          </div>
        </div>
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 6"
          preserveAspectRatio="none"
          className="nav-edge pointer-events-none absolute inset-x-0 -bottom-[3px] h-[6px] w-full text-ink/35"
        >
          <path d="M0 3 C 200 1, 380 5, 600 3 S 1000 1, 1200 3.5" pathLength={1} stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </header>

      <div
        ref={sheetRef}
        id="site-index"
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
        inert={!open}
        data-open={open ? 'true' : 'false'}
        className="index-sheet fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-sheet"
        style={{ '--ox': origin.x, '--oy': origin.y } as React.CSSProperties}
      >
        <div className="page flex h-16 items-center justify-between md:h-[72px]">
          {logo}
          <button
            type="button"
            onClick={() => close()}
            className="press inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-ink hover:bg-sheet-deep md:h-11 md:px-3"
          >
            <IndexIcon open />
            <span className="hand text-[1.15rem] leading-none">Close</span>
          </button>
        </div>

        <div className="page grid-12 gap-y-10 pb-16 pt-4 md:pt-8">
          <div className="col-span-12 hidden lg:col-span-5 lg:block">
            <div className="sticky top-6">
              <div className="relative aspect-square w-full max-w-[460px]">
                {everOpened && <BrushArt art="thoughtprint" options={{}} seed="visit" stepMs={40} eager className="absolute inset-0" />}
              </div>
              <p className="hand mt-2 max-w-[22ch] text-[1.6rem] leading-snug text-graphite">
                <span className="text-ultramarine">S</span>tory <span className="text-vermilion-ink">o</span>f{' '}
                <span className="text-ultramarine">Y</span>our <span className="text-vermilion-ink">L</span>ife. Every pupil writes their own.
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <p className="t-eyebrow mb-6 text-graphite">Contents</p>
            {numbered.map(({ chapter, start }) => (
              <section key={chapter.heading} className="mb-10 last:mb-0">
                <h2 className="hand mb-1 text-[1.4rem] text-vermilion-ink">{chapter.heading}</h2>
                <ul>
                  {chapter.items.map((item, k) => {
                    const n = start + k;
                    const current = isCurrent(pathname, item.href);
                    return (
                      <li key={item.href} className="index-item" style={{ '--i': n } as React.CSSProperties}>
                        <Link
                          href={item.href}
                          {...(n === 1 ? { 'data-autofocus': true } : {})}
                          aria-current={current ? 'page' : undefined}
                          className="index-row group grid grid-cols-[2.25rem_1fr_auto] items-baseline gap-x-3 border-b border-ink/15 py-3.5 md:grid-cols-[3rem_1fr_auto] md:py-4"
                        >
                          <span className="t-num font-serif text-[1.05rem] italic text-graphite">{String(n).padStart(2, '0')}</span>
                          <span>
                            <span className="relative inline-block font-serif text-[1.65rem] leading-tight tracking-[-0.015em] md:text-[2.1rem]">
                              {item.label}
                              <InkPath mark="under" ink={current ? 'vermilion' : 'ochre'} weight={4} className="absolute -bottom-1 left-0 h-2.5 w-full" />
                            </span>
                            <span className="mt-1 block text-[0.95rem] leading-snug text-graphite">{item.description}</span>
                          </span>
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="index-arrow self-center text-ink">
                            <path d="M3 12.5 C 9 11.5, 14 12.8, 20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M14.5 6.5 L 20.5 12 L 14.5 17.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t-2 border-ink pt-8">
              <Link href={cta.href} className="press btn-brush inline-flex h-[52px] items-center bg-ink px-7 font-semibold text-sheet hover:bg-ultramarine">
                {cta.label}
              </Link>
              <SignIn signIn={signIn} className="font-semibold text-ink underline decoration-pencil decoration-2 underline-offset-4 hover:text-ultramarine" />
              <span className="flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] text-graphite">
                <a href={`mailto:${email}`} className="hover:text-ink">
                  {email}
                </a>
                {social.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                    {s.label}
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
