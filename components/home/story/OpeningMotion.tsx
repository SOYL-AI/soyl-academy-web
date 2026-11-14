'use client';

import { useEffect, useRef } from 'react';

/**
 * The opening's motion (ADR-034): turns the scene's scroll progress (a `sceneprogress` event, Scene progress="event")
 * and the mouse into a handful of numbers, and writes each one only on the few elements that use it:
 *
 *   --op-copy   .op-copy, .op-cue            the words leave            p 0.03–0.15
 *   --op-riseE  .op-book-area, .op-plane,    the book lifts (eased)     p 0.05–0.30
 *            .op-prop
 *   --op-open   .op-book                    the book slides as it opens p 0.27–0.43
 *   --op-f      each .op-leaf (data-leaf)   cover, leaves one to three p 0.27–0.43, 0.46–0.57, 0.60–0.71, 0.74–0.85
 *   --op-dive   .op-world, .op-night        the camera falls in        p 0.87–1.00
 *   --op-mx/--op-my .op-plane, .op-cover-title  the mouse, −0.5 … 0.5, eased (fine pointer, motion allowed only)
 *
 * and the shade of each turning leaf (opacity of its .op-shade). opening.css registers these properties as
 * non-inherited numbers, so a change re-styles only that element, never the pages' text and paintings inside it.
 * That keeps a scroll frame to a few elements' worth of style work (it was the whole scene, ~250 elements).
 *
 * Under prefers-reduced-motion the book does not move with the scroll: each step of the scene shows the next spread.
 */

type Phase = { copy: number; riseE: number; open: number; f1: number; f2: number; f3: number; dive: number };

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const span = (p: number, from: number, length: number) => clamp((p - from) / length);

export function openingPhase(p: number, step: number, reduced: boolean): Phase {
  if (reduced) {
    const on = step >= 1 ? 1 : 0;
    return { copy: on, riseE: on, open: on, f1: step >= 2 ? 1 : 0, f2: step >= 3 ? 1 : 0, f3: step >= 4 ? 1 : 0, dive: 0 };
  }
  const rise = span(p, 0.05, 0.25);
  return {
    copy: span(p, 0.03, 0.12),
    riseE: rise * rise * (3 - 2 * rise),
    open: span(p, 0.27, 0.16),
    f1: span(p, 0.46, 0.11),
    f2: span(p, 0.6, 0.11),
    f3: span(p, 0.74, 0.11),
    dive: span(p, 0.87, 0.13),
  };
}

export function OpeningMotion() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scene = ref.current?.closest<HTMLElement>('.scene');
    if (!scene) return;
    const all = (selector: string) => Array.from(scene.querySelectorAll<HTMLElement>(selector));
    const copy = all('.op-copy, .op-cue');
    const rise = all('.op-book-area, .op-plane, .op-prop');
    const open = all('.op-book');
    const dive = all('.op-world, .op-night');
    const tilt = all('.op-plane, .op-cover-title');
    const leaves = all('.op-leaf').map((el) => ({
      el,
      key: (el.dataset.leaf || 'open') as keyof Phase,
      shades: Array.from(el.querySelectorAll<HTMLElement>(':scope > .op-face > .op-shade')),
    }));

    // Write a value only when it changed (4 decimals), so a still frame costs nothing.
    const last = new Map<HTMLElement, Record<string, string>>();
    const put = (el: HTMLElement, name: string, value: number) => {
      const text = value.toFixed(4);
      let seen = last.get(el);
      if (!seen) last.set(el, (seen = {}));
      if (seen[name] === text) return;
      seen[name] = text;
      if (name === 'opacity') el.style.opacity = text;
      else el.style.setProperty(name, text);
    };

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let p = 0;

    const apply = () => {
      const ph = openingPhase(p, Number(scene.dataset.step || 0), reducedQuery.matches);
      for (const el of copy) put(el, '--op-copy', ph.copy);
      for (const el of rise) put(el, '--op-riseE', ph.riseE);
      for (const el of open) put(el, '--op-open', ph.open);
      for (const el of dive) put(el, '--op-dive', ph.dive);
      for (const { el, key, shades } of leaves) {
        const f = ph[key];
        put(el, '--op-f', f);
        // A leaf darkens as it stands on edge (a turned or unturned leaf has no shade).
        const shade = Math.sin(f * Math.PI) * 0.9;
        for (const s of shades) put(s, 'opacity', shade);
      }
    };

    const onProgress = (e: Event) => {
      p = (e as CustomEvent<number>).detail;
      apply();
    };
    scene.addEventListener('sceneprogress', onProgress);
    reducedQuery.addEventListener('change', apply);
    apply();

    // The mouse: the book and the cover's foil lean towards the pointer. Mouse only (touch scrolls).
    let raf = 0;
    let onScreen = false;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const step = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      for (const el of tilt) {
        put(el, '--op-mx', cx);
        put(el, '--op-my', cy);
      }
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.0015 ? requestAnimationFrame(step) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const onMove = (e: PointerEvent) => {
      if (!onScreen || e.pointerType !== 'mouse' || reducedQuery.matches) return;
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      kick();
    };
    // Off screen, the book's idle bob and the cue's nudge pause (data-off), so the pages below pay nothing for them.
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([entry]) => {
            onScreen = Boolean(entry?.isIntersecting);
            if (onScreen) delete scene.dataset.off;
            else scene.dataset.off = '';
            if (!onScreen && finePointer) {
              tx = 0;
              ty = 0;
              kick();
            }
          })
        : null;
    io?.observe(scene);
    if (finePointer) window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      scene.removeEventListener('sceneprogress', onProgress);
      reducedQuery.removeEventListener('change', apply);
      io?.disconnect();
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <span ref={ref} hidden />;
}
