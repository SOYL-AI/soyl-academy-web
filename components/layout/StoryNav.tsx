'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { InkPath } from '@/components/brush/marks';

/**
 * The marketing header's behaviour (ADR-034, after ADR-025): a small client island. Everything visual inside the
 * menus (pages, copy, photo cards, sign-in and call-to-action links) is rendered on the server
 * (components/layout/Header.tsx + NavParts.tsx) and passed in as React nodes. The island holds state, focus and
 * pointer / keyboard handling. It is loaded through `NavGate`, so learning-platform pages never download it.
 *
 * Desktop (≥ 1024 px): each group is a disclosure button (aria-expanded / aria-controls, not ARIA menu roles) that
 * opens a sheet of paper under the bar, on hover after a short intent delay or on click / Enter / Space. Keyboard
 * opening moves focus to the first page; Escape closes and returns focus to the button; arrow keys move between
 * buttons and pages. A panel closes on navigation, link click, outside click and when focus leaves. Below 1024 px a
 * "Menu" button opens a full-height sheet with accordion groups, scroll lock and a focus trap. Motion is CSS only and
 * stops under prefers-reduced-motion.
 */

export interface HeaderGroup {
  id: string;
  label: string;
  /** Item URLs, to mark the current group. */
  hrefs: string[];
}

export interface StoryNavProps {
  groups: HeaderGroup[];
  logo: ReactNode;
  /** Sign-in link + primary call to action, right of the bar. */
  actions: ReactNode;
  /** Desktop panel content per group id. */
  panels: Record<string, ReactNode>;
  /** Mobile accordion content per group id. */
  sheetPanels: Record<string, ReactNode>;
  /** Pinned to the bottom of the mobile sheet. */
  sheetFooter: ReactNode;
}

const OPEN_DELAY_MS = 160;
const CLOSE_DELAY_MS = 180;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const visible = (el: HTMLElement) => el.getClientRects().length > 0;

function Chevron({ className }: { className: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false" className={className}>
      <path d="M5.5 9.5 C 8 11.5, 10 13.6, 12 15.6 C 14 13.4, 16.2 11.2, 18.6 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The bottom edge of an open panel: torn paper. */
function TornEdge() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 14" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 -bottom-[13px] h-[14px] w-full">
      <path
        d="M0 0 H1200 V5 L1180 9 L1150 4 L1122 10 L1090 5 L1060 11 L1022 6 L990 10 L955 4 L922 9 L890 6 L852 12 L818 5 L784 9 L750 4 L716 10 L680 6 L648 11 L612 5 L578 9 L540 4 L506 10 L470 6 L436 12 L400 5 L366 9 L330 4 L296 10 L260 6 L226 11 L190 5 L156 9 L120 4 L86 10 L52 6 L24 11 L0 6 Z"
        fill="var(--color-sheet)"
      />
    </svg>
  );
}

export function StoryNav({ groups, logo, actions, panels, sheetPanels, sheetFooter }: StoryNavProps) {
  const pathname = usePathname() ?? '/';
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRef = useRef<string | null>(null);
  const openedBy = useRef<'hover' | 'click' | 'key'>('click');
  const focusOnOpen = useRef<'first' | 'last' | null>(null);

  // Close everything on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenId(null);
    setMobileOpen(false);
  }

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  useEffect(() => clearTimer, []);

  useEffect(() => {
    // Only touch React state when the answer flips: a same-value setState on every scroll frame still costs a
    // render pass's worth of work on slower phones.
    let last: boolean | null = null;
    const onScroll = () => {
      const now = window.scrollY > 8;
      if (now !== last) {
        last = now;
        setScrolled(now);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The current page's item gets aria-current (items are server-rendered, so the island marks them).
  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>('a[data-menu-item]').forEach((a) => {
      if (a.getAttribute('href') === pathname) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }, [pathname, openId, expanded]);

  const panelLinks = (id: string) =>
    Array.from(document.querySelectorAll<HTMLElement>(`#nav-panel-${id} a[href]`)).filter(visible);

  const close = useCallback((returnFocus: boolean) => {
    clearTimer();
    const current = openRef.current;
    if (current && returnFocus) document.getElementById(`nav-trigger-${current}`)?.focus();
    setOpenId(null);
  }, []);

  // Desktop panel: move focus in after a keyboard open; Escape and outside clicks close it.
  useEffect(() => {
    openRef.current = openId;
    if (!openId) return;
    if (focusOnOpen.current) {
      const links = panelLinks(openId);
      (focusOnOpen.current === 'first' ? links[0] : links[links.length - 1])?.focus();
      focusOnOpen.current = null;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close(Boolean(navRef.current?.contains(document.activeElement)));
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openId, close]);

  // Mobile sheet: scroll lock, focus in, focus trap, Escape; closes if the window grows to desktop width.
  useEffect(() => {
    if (!mobileOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    const focusables = () =>
      [toggleRef.current, ...Array.from(sheetRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])].filter(
        (el): el is HTMLElement => Boolean(el) && visible(el as HTMLElement)
      );
    focusables()[1]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;
      const active = document.activeElement as HTMLElement | null;
      const inside = Boolean(active && list.includes(active));
      if (e.shiftKey && (active === first || !inside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !inside)) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onResize = () => desktop.matches && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      root.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [mobileOpen]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const closeAll = () => {
    clearTimer();
    setOpenId(null);
    setMobileOpen(false);
  };
  // Following any link inside a panel or the sheet closes it, even when the URL does not change.
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as Element).closest('a[href]')) closeAll();
  };

  const openFromKeyboard = (id: string, where: 'first' | 'last') => {
    clearTimer();
    openedBy.current = 'key';
    if (openId === id) {
      const links = panelLinks(id);
      (where === 'first' ? links[0] : links[links.length - 1])?.focus();
      return;
    }
    focusOnOpen.current = where;
    setOpenId(id);
  };

  const onTriggerClick = (id: string, e: React.MouseEvent) => {
    clearTimer();
    // Enter / Space on a button fire a click with detail 0.
    if (e.detail === 0) {
      if (openId === id) close(true);
      else openFromKeyboard(id, 'first');
      return;
    }
    // A pointer click on a panel that hovering just opened keeps it open (no flicker).
    if (openId === id && openedBy.current === 'hover') {
      openedBy.current = 'click';
      return;
    }
    openedBy.current = 'click';
    setOpenId(openId === id ? null : id);
  };

  const onTriggerKeyDown = (index: number, e: React.KeyboardEvent) => {
    const id = groups[index]!.id;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      openFromKeyboard(id, e.key === 'ArrowDown' ? 'first' : 'last');
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = groups[(index + (e.key === 'ArrowRight' ? 1 : groups.length - 1)) % groups.length]!;
      if (openId) setOpenId(null);
      document.getElementById(`nav-trigger-${next.id}`)?.focus();
    }
  };

  const onPanelKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
    const links = panelLinks(id);
    const at = links.indexOf(document.activeElement as HTMLElement);
    if (at === -1) return;
    e.preventDefault();
    const target =
      e.key === 'Home' ? 0 : e.key === 'End' ? links.length - 1 : (at + (e.key === 'ArrowDown' ? 1 : links.length - 1)) % links.length;
    links[target]?.focus();
  };

  const onPointerEnter = (id: string, e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    if (openId === id) return;
    const open = () => {
      openedBy.current = 'hover';
      setOpenId(id);
    };
    if (openId) open();
    else timer.current = setTimeout(open, OPEN_DELAY_MS);
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    if (openedBy.current === 'hover') timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY_MS);
  };

  const onNavBlur = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (openId && next && !navRef.current?.contains(next)) close(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="nav-bar sticky top-0 z-40"
        data-scrolled={scrolled || openId ? 'true' : 'false'}
      >
        <div className="page flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
          {logo}

          <nav ref={navRef} aria-label="Primary" className="ml-6 hidden lg:block" onBlur={onNavBlur}>
            <ul className="flex items-center gap-1">
              {groups.map((group, index) => {
                const open = openId === group.id;
                const current = group.hrefs.some(isCurrent);
                return (
                  <li key={group.id} onPointerEnter={(e) => onPointerEnter(group.id, e)} onPointerLeave={onPointerLeave}>
                    <button
                      type="button"
                      id={`nav-trigger-${group.id}`}
                      aria-expanded={open}
                      aria-controls={`nav-panel-${group.id}`}
                      onClick={(e) => onTriggerClick(group.id, e)}
                      onKeyDown={(e) => onTriggerKeyDown(index, e)}
                      data-current={current ? 'true' : undefined}
                      className="menu-trigger nav-link relative inline-flex h-11 items-center gap-1.5 rounded-full px-3.5 text-[15px] font-medium text-ink transition-colors duration-200 aria-expanded:bg-sheet-deep"
                    >
                      {group.label}
                      <Chevron className="menu-chevron -mr-1 text-graphite" />
                      <InkPath
                        mark="under"
                        ink={current ? 'vermilion' : 'ultramarine'}
                        weight={2.5}
                        className="absolute bottom-1 left-3 h-2 w-[calc(100%-1.75rem)]"
                      />
                    </button>
                    <div
                      id={`nav-panel-${group.id}`}
                      hidden={!open}
                      onKeyDown={(e) => onPanelKeyDown(group.id, e)}
                      onClick={closeOnLink}
                      className="menu-panel absolute inset-x-0 top-full bg-sheet"
                    >
                      {panels[group.id]}
                      <TornEdge />
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-4">
            {actions}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => {
                setOpenId(null);
                setMobileOpen((v) => !v);
              }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="press -mr-1.5 inline-flex h-11 items-center gap-2 rounded-full px-2.5 text-ink hover:bg-sheet-deep lg:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
                {mobileOpen ? (
                  <>
                    <path d="M5 5.5 C 9 9, 14 14.5, 19 18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18.5 5 C 14.5 9.5, 9.5 14, 5.5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <path d="M3.5 8 C 8 7.2, 14 8.6, 20.5 7.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M3.5 15.4 C 9 14.8, 13 16, 17 15.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </>
                )}
              </svg>
              <span className="hand text-[1.15rem] leading-none">{mobileOpen ? 'Close' : 'Menu'}</span>
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

      {/* Desktop: the page behind an open panel is washed out; a click there closes it. */}
      {openId && (
        <div
          aria-hidden="true"
          data-menu-backdrop=""
          onClick={() => close(false)}
          className="fixed inset-x-0 bottom-0 top-[72px] z-30 hidden bg-ink/15 backdrop-blur-[2px] transition-opacity duration-200 starting:opacity-0 lg:block"
        />
      )}

      <div
        id="mobile-menu"
        ref={sheetRef}
        hidden={!mobileOpen}
        onClick={closeOnLink}
        className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col bg-sheet md:top-[72px] lg:hidden"
      >
        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="page pb-6 pt-3">
            <ul>
              {groups.map((group, i) => {
                const isOpen = expanded === group.id;
                return (
                  <li key={group.id} className="menu-item border-b border-ink/15" style={{ '--i': i } as React.CSSProperties}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`mobile-group-${group.id}`}
                      onClick={() => setExpanded(isOpen ? null : group.id)}
                      className="menu-trigger flex min-h-16 w-full items-center justify-between gap-4 py-3 text-left font-serif text-[1.75rem] leading-tight tracking-[-0.015em]"
                    >
                      <span className="flex items-center gap-2.5">
                        {group.label}
                        {group.hrefs.some(isCurrent) && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-vermilion" />}
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/20 text-ink">
                        <Chevron className="menu-chevron h-4 w-4" />
                      </span>
                    </button>
                    <div id={`mobile-group-${group.id}`} hidden={!isOpen} className="pb-4">
                      {sheetPanels[group.id]}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div className="border-t border-ink/15 bg-sheet pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          <div className="page flex gap-3">{sheetFooter}</div>
        </div>
      </div>
    </>
  );
}
