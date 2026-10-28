'use client';

/**
 * Focus mode (lesson player, flashcards): the view is pinned between the app top bar and the bottom of the
 * screen, so the student never scrolls the page, only (when a slide is genuinely long) the slide card. The
 * app shell stays as it is (ADR-023: the top bar remains; the tab bar is hidden on focus routes): `useFocusTop`
 * measures where the page content starts (the bottom of the top bar) and pins the view there.
 *
 * Also: `usePopover` (a disclosure popover: Escape and outside clicks close it, focus returns to its button)
 * and the small icons the strip needs that the kit's set does not have.
 */
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

/**
 * Returns a ref for a zero-height anchor rendered in the page flow and the style for the pinned view: `--focus-top`
 * is where the anchor sits in the document (below the sticky app top bar). The CSS default (60 px, the shell's
 * top bar) matches the server render, so nothing moves on hydration.
 */
export function useFocusTop(): { anchorRef: RefObject<HTMLDivElement | null>; style: CSSProperties | undefined } {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);
  useLayoutEffect(() => {
    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const y = Math.max(0, Math.round(el.getBoundingClientRect().top + window.scrollY));
      setTop((t) => (t === y ? t : y));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  return { anchorRef, style: top === null ? undefined : ({ '--focus-top': `${top}px` } as CSSProperties) };
}

/** A disclosure popover (button + panel). The panel stays mounted while closed (`hidden`), so links in it are in the HTML. */
export function usePopover() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node | null;
      if (t && (panelRef.current?.contains(t) || buttonRef.current?.contains(t))) return;
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      // A dialog opened from the panel (report a mistake) handles its own Escape.
      if (e.key !== 'Escape' || document.querySelector('dialog[open]')) return;
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);
  const close = useCallback((refocus = false) => {
    setOpen(false);
    if (refocus) buttonRef.current?.focus();
  }, []);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  return {
    open,
    close,
    toggle,
    buttonProps: { ref: buttonRef, 'aria-expanded': open, 'aria-controls': id, onClick: toggle } as const,
    panelProps: { ref: panelRef, id, hidden: !open } as const,
  };
}

/**
 * Whether an element scrolls (its content is taller than its box) and whether more is below the fold. Re-measured
 * on scroll, on resize of the element or its children, and whenever `key` changes (a new card or slide).
 */
export function useOverflow(ref: RefObject<HTMLElement | null>, key: unknown): { scrolls: boolean; more: boolean } {
  const [state, setState] = useState({ scrolls: false, more: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const scrolls = el.scrollHeight > el.clientHeight + 1;
      const more = scrolls && el.scrollHeight - el.scrollTop - el.clientHeight > 8;
      setState((o) => (o.scrolls === scrolls && o.more === more ? o : { scrolls, more }));
    };
    check();
    el.addEventListener('scroll', check, { passive: true });
    const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(check) : null;
    ro?.observe(el);
    for (const child of Array.from(el.children)) ro?.observe(child);
    return () => {
      el.removeEventListener('scroll', check);
      ro?.disconnect();
    };
  }, [ref, key]);
  return state;
}

/** Three dots ("more options"); same stroke style as the kit icons. */
export function DotsIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor">
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}
