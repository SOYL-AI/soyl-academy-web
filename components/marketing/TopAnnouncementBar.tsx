'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

import {
  CLASSES_START_DATE,
  EARLY_BIRD_CODE as COUPON_CODE,
  REGISTRATION_CLOSES,
  seatsLabel,
} from '@/content/future-builders';

const STORAGE_KEY = 'soyl_top_announcement_closed';

export function TopAnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const isDismissed = sessionStorage.getItem(STORAGE_KEY);
      if (!isDismissed) {
        const timer = setTimeout(() => setIsVisible(true), 0);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => setIsVisible(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Cohort Announcement"
          className="pointer-events-auto w-full bg-brand-yellow text-brand-black border-b-2 border-brand-black overflow-hidden select-none z-50"
        >
          <div className="container-default">
            <div className="flex items-center justify-between min-h-[36px] py-1.5 gap-2 text-xs sm:text-[13px] font-bold">
              {/* Main announcement text */}
              <div className="flex-1 flex items-center justify-center text-center overflow-hidden">
                <Link
                  href={`/future-builders?coupon=${COUPON_CODE}#enroll`}
                  className="inline-flex items-center flex-wrap justify-center gap-x-2 gap-y-0.5 hover:underline decoration-brand-black underline-offset-2 transition-all leading-tight"
                >
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span className="inline-block animate-pulse">⚡</span>
                    <span>Future Builders (Grades 7–12) · Classes from {CLASSES_START_DATE} · Registration closes {REGISTRATION_CLOSES}</span>
                  </span>
                  <span className="hidden md:inline text-brand-black/40">•</span>
                  <span className="shrink-0 text-brand-red">{seatsLabel}</span>
                  <span className="hidden md:inline text-brand-black/40">•</span>
                  <span className="shrink-0 bg-brand-black text-brand-cream px-1.5 py-0.5 rounded text-[11px] uppercase tracking-wider font-mono">
                    10% Off: {COUPON_CODE}
                  </span>
                  <span className="hidden md:inline text-brand-black/40">•</span>
                  <span className="inline-flex items-center gap-1 text-brand-blue font-extrabold hover:text-brand-black shrink-0">
                    <span>Claim Spot</span>
                    <span>→</span>
                  </span>
                </Link>
              </div>

              {/* Dismiss button */}
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss banner"
                className="shrink-0 p-1 text-brand-black/70 hover:text-brand-black hover:bg-brand-black/10 rounded transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
