'use client';

import { useEffect, useState } from 'react';

export function FutureBuildersMobileEnroll() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enrollment = document.getElementById('enroll');
    if (!enrollment) return;

    const update = () => {
      const consentOpen = document.querySelector('[aria-label="Cookie and Privacy Consent"]');
      setVisible(!consentOpen && enrollment.getBoundingClientRect().top > window.innerHeight);
    };

    // Hide before the registration section enters view and while consent is open.
    const intersection = new IntersectionObserver(update);
    intersection.observe(enrollment);
    const mutations = new MutationObserver(update);
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('resize', update);
    update();

    return () => {
      intersection.disconnect();
      mutations.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!visible) return null;

  return (
    <a href="#enroll" className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-4 right-24 z-30 flex min-h-14 items-center justify-center rounded-xl border-2 border-brand-black bg-brand-yellow px-3 py-3 text-sm font-bold text-brand-black shadow-[4px_4px_0_0_#141414] hover:bg-brand-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue md:hidden">
      Enroll now — ₹5,499
    </a>
  );
}
