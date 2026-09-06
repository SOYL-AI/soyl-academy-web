'use client';

import * as React from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    // Assume no preference on the server so markup matches the common case,
    // then reconcile on hydration.
    () => false
  );
}

/**
 * Keeps ScrollTrigger in step with Lenis' smoothed scroll position.
 *
 * This has to live *inside* ReactLenis and read the instance through
 * `useLenis`, not through a ref on the provider. ReactLenis creates its Lenis
 * instance in an effect and publishes it via state, so a ref held by the parent
 * is still empty when the parent's own effect runs.
 */
function ScrollTriggerBridge() {
  const lenis = useLenis();

  React.useEffect(() => {
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);
    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const isReducedMotion = usePrefersReducedMotion();

  if (isReducedMotion) {
    return <>{children}</>;
  }

  // Lenis drives its own rAF loop. Handing that job to gsap.ticker buys tighter
  // sync but makes scrolling itself depend on our effect running — and if that
  // effect is ever skipped, Lenis swallows wheel events while nothing advances
  // the scroll, so the page cannot move at all. Keeping autoRaf on means the
  // worst case is slightly looser ScrollTrigger sync instead of a dead page.
  return (
    <ReactLenis root>
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
