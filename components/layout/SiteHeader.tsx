'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { APP_URL, PLATFORM_ENABLED, PLATFORM_LOGIN_HREF, PRIMARY_CTA } from '@/lib/site';
import { Logo } from '@/components/ui/Logo';
import { buttonClasses } from '@/components/ui/Button';
import { platformChromeActive } from '@/components/platform/shell/chrome';
import { FeatureCard, MenuItemLink, type ResolvedNavGroup } from './MenuParts';
import { NavIcon } from './NavIcon';

/**
 * The marketing top bar with mega menus (ADR-025): a small client island.
 *
 * Desktop (≥ 1024 px): each group is a disclosure button (aria-expanded / aria-controls, not ARIA menu roles)
 * that opens a full-width panel under the bar, on hover with a short intent delay or on click / Enter / Space.
 * Keyboard opening moves focus to the first link; Escape closes and returns focus to the button; arrow keys
 * move between buttons and links. The panel closes on route change, outside click, and when focus leaves.
 * Below 1024 px a menu button opens a full-height sheet with accordion groups, scroll lock and a focus trap.
 * Motion is CSS only; globals.css turns it off under prefers-reduced-motion.
 */

const OPEN_DELAY_MS = 90;
const CLOSE_DELAY_MS = 180;
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const visible = (el: HTMLElement) => el.getClientRects().length > 0;

export function SiteHeader({ groups }: { groups: ResolvedNavGroup[] }) {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
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

  const trigger = (id: string) => document.getElementById(`nav-trigger-${id}`);
  const panelLinks = (id: string) =>
    Array.from(document.querySelectorAll<HTMLElement>(`#nav-panel-${id} a[href]`)).filter(visible);

  const openRef = useRef<string | null>(null);
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
      if (e.key !== 'Escape') return;
      close(Boolean(navRef.current?.contains(document.activeElement)));
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
      const active = document.activeElement;
      const inside = list.includes(active as HTMLElement);
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

  // Learning-platform pages have their own app shell (ADR-023): no marketing header there.
  if (platformChromeActive(pathname)) return null;

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
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      openFromKeyboard(id, 'first');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      openFromKeyboard(id, 'last');
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const next = groups[(index + (e.key === 'ArrowRight' ? 1 : groups.length - 1)) % groups.length]!;
      if (openId) setOpenId(null);
      trigger(next.id)?.focus();
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
    if (openId) {
      openedBy.current = 'hover';
      setOpenId(id);
      return;
    }
    timer.current = setTimeout(() => {
      openedBy.current = 'hover';
      setOpenId(id);
    }, OPEN_DELAY_MS);
  };

  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    clearTimer();
    if (openedBy.current !== 'hover') return;
    timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY_MS);
  };

  const onNavBlur = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null;
    if (openId && next && !navRef.current?.contains(next)) close(false);
  };

  const closeAll = () => {
    clearTimer();
    setOpenId(null);
    setMobileOpen(false);
  };

  const signIn = PLATFORM_ENABLED
    ? { label: 'Log in', href: PLATFORM_LOGIN_HREF, external: false }
    : { label: 'Sign in', href: APP_URL, external: true };
  const learn = groups.find((g) => g.id === 'learn');

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-40 border-b border-rule bg-white/90 backdrop-blur-md backdrop-saturate-150"
      >
        <div className="page flex h-16 items-center gap-3 md:h-[72px] md:gap-6">
          <Logo size={30} className="shrink-0 whitespace-nowrap" />

          <nav ref={navRef} aria-label="Primary" className="ml-4 hidden lg:block" onBlur={onNavBlur}>
            <ul className="flex items-center gap-1">
              {groups.map((group, index) => {
                const open = openId === group.id;
                const current = group.items.some((item) => isCurrent(item.href));
                return (
                  <li
                    key={group.id}
                    onPointerEnter={(e) => onPointerEnter(group.id, e)}
                    onPointerLeave={onPointerLeave}
                  >
                    <button
                      type="button"
                      id={`nav-trigger-${group.id}`}
                      aria-expanded={open}
                      aria-controls={`nav-panel-${group.id}`}
                      onClick={(e) => onTriggerClick(group.id, e)}
                      onKeyDown={(e) => onTriggerKeyDown(index, e)}
                      className={cn(
                        'group/trig relative inline-flex h-10 items-center gap-1 rounded-full px-3.5 text-[15px] font-medium transition-colors duration-200',
                        open ? 'bg-paper text-ink' : current ? 'text-ink hover:bg-paper/70' : 'text-muted hover:bg-paper/70 hover:text-ink'
                      )}
                    >
                      {group.label}
                      <NavIcon
                        name="chevron"
                        size={16}
                        className="-mr-1 transition-transform duration-300 group-aria-expanded/trig:rotate-180"
                      />
                      {current && (
                        <span aria-hidden="true" className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-red-pen" />
                      )}
                    </button>

                    <div
                      id={`nav-panel-${group.id}`}
                      hidden={!open}
                      onKeyDown={(e) => onPanelKeyDown(group.id, e)}
                      className="absolute inset-x-0 top-full border-b border-rule bg-white shadow-[0_28px_48px_-28px_rgba(20,20,20,0.28)] transition-[opacity,translate] duration-200 ease-out starting:-translate-y-1 starting:opacity-0"
                    >
                      <div className="page grid grid-cols-12 gap-8 pb-9 pt-7">
                        <div className="col-span-8 flex flex-col">
                          <p className="t-eyebrow px-3 text-muted">{group.heading}</p>
                          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
                            {group.items.map((item, i) => (
                              <li key={item.href}>
                                <MenuItemLink item={item} index={i} current={pathname === item.href} onNavigate={closeAll} />
                              </li>
                            ))}
                          </ul>
                          {group.id === 'programs' && PLATFORM_ENABLED && (
                            <p className="mt-auto border-t border-rule-soft px-3 pt-4 text-[14px] text-muted">
                              Already a SOYL school?{' '}
                              <a href={APP_URL} className="hover-line font-medium text-ink">
                                Sign in to the teacher app
                              </a>
                            </p>
                          )}
                        </div>
                        <div className="col-span-4">
                          <FeatureCard feature={group.feature} onNavigate={closeAll} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-5">
            {signIn.external ? (
              <a href={signIn.href} className="hover-line hidden py-1 text-[15px] font-medium text-ink sm:inline">
                {signIn.label}
              </a>
            ) : (
              <Link href={signIn.href} className="hover-line hidden py-1 text-[15px] font-medium text-ink sm:inline">
                {signIn.label}
              </Link>
            )}
            <Link
              href={PRIMARY_CTA.href}
              className={buttonClasses('primary', 'md', 'hidden h-9 px-3.5 text-[14px] min-[375px]:inline-flex md:h-11 md:px-5 md:text-[15px]')}
            >
              {PRIMARY_CTA.label}
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => {
                setOpenId(null);
                setMobileOpen((v) => !v);
              }}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="press -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-paper lg:hidden"
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                <path
                  d={mobileOpen ? 'M5 5l12 12' : 'M3 8h16'}
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className="transition-[d] duration-300"
                />
                <path
                  d={mobileOpen ? 'M17 5L5 17' : 'M3 14h16'}
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

      {/* Desktop: the page behind an open panel is dimmed; a click there closes it. */}
      {openId && (
        <div
          aria-hidden="true"
          data-menu-backdrop=""
          onClick={() => close(false)}
          className="fixed inset-x-0 bottom-0 top-[72px] z-30 hidden bg-ink/20 backdrop-blur-[2px] transition-opacity duration-200 starting:opacity-0 lg:block"
        />
      )}

      <div
        id="mobile-menu"
        ref={sheetRef}
        hidden={!mobileOpen}
        className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col border-t border-rule bg-white md:top-[72px] lg:hidden"
      >
        <nav aria-label="Mobile" className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="page pb-6 pt-4">
            {learn && (
              <div className="rise mb-4" style={{ '--d': '0ms' } as React.CSSProperties}>
                <FeatureCard feature={learn.feature} onNavigate={closeAll} compact />
              </div>
            )}
            <ul>
              {groups.map((group, i) => {
                const isOpen = expanded === group.id;
                const current = group.items.some((item) => isCurrent(item.href));
                return (
                  <li
                    key={group.id}
                    className="rise border-b border-rule"
                    style={{ '--d': `${(i + 1) * 45}ms` } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`mobile-group-${group.id}`}
                      onClick={() => setExpanded(isOpen ? null : group.id)}
                      className="group/acc flex min-h-16 w-full items-center justify-between gap-4 py-3 text-left font-serif text-[1.75rem] leading-tight"
                    >
                      <span className="flex items-center gap-2.5">
                        {group.label}
                        {current && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-red-pen" />}
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-rule text-ink transition-colors group-aria-expanded/acc:bg-paper">
                        <NavIcon
                          name="chevron"
                          size={18}
                          className="transition-transform duration-300 group-aria-expanded/acc:rotate-180"
                        />
                      </span>
                    </button>
                    <div id={`mobile-group-${group.id}`} hidden={!isOpen} className="pb-4">
                      <ul className="-mx-3 grid gap-0.5">
                        {group.items.map((item, j) => (
                          <li key={item.href}>
                            <MenuItemLink item={item} index={j} current={pathname === item.href} onNavigate={closeAll} />
                          </li>
                        ))}
                      </ul>
                      {group.id === 'programs' && PLATFORM_ENABLED && (
                        <p className="mt-3 text-[14px] text-muted">
                          Already a SOYL school?{' '}
                          <a href={APP_URL} className="link">
                            Sign in to the teacher app
                          </a>
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div className="border-t border-rule bg-white pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
          <div className="page flex gap-3">
            {signIn.external ? (
              <a href={signIn.href} className={buttonClasses('secondary', 'lg', 'flex-1 px-4')}>
                {signIn.label}
              </a>
            ) : (
              <Link href={signIn.href} onClick={closeAll} className={buttonClasses('secondary', 'lg', 'flex-1 px-4')}>
                {signIn.label}
              </Link>
            )}
            <Link href={PRIMARY_CTA.href} onClick={closeAll} className={buttonClasses('primary', 'lg', 'flex-[1.4] px-4')}>
              {PRIMARY_CTA.label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
