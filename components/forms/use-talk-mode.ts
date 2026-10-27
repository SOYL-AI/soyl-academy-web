'use client';

import { useEffect } from 'react';

/**
 * "Talk to us" links on the Future Builders page point at `#talk` (an anchor
 * just above the form). Following one switches the form to its call-request
 * mode, whether the visitor arrives with the hash or clicks a link on the page.
 */
export function useTalkMode(onTalk: () => void) {
  useEffect(() => {
    const check = () => {
      if (window.location.hash === '#talk') onTalk();
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest('a[href]');
      if (link && link.getAttribute('href')?.endsWith('#talk')) onTalk();
    };
    // Deferred so the state update never runs during the effect itself.
    const timer = setTimeout(check, 0);
    window.addEventListener('hashchange', check);
    document.addEventListener('click', onClick);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', check);
      document.removeEventListener('click', onClick);
    };
  }, [onTalk]);
}
