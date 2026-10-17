'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

import {
  BASE_PRICE,
  DATES_LINE,
  EARLY_BIRD_CODE as COUPON_CODE,
  REGISTRATION_CLOSES,
  SCHEDULE,
} from '@/content/future-builders';
import { RegistrationCountdown } from '@/components/marketing/FutureBuildersUrgency';
import { findCoupon } from '@/lib/future-builders/pricing';

const STORAGE_KEY = 'soyl_fb_promo_closed';
const EARLY_BIRD_DISCOUNT = findCoupon(COUPON_CODE)?.discount ?? 0;
const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export function FutureBuildersPromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Ignore if sessionStorage is not accessible
    }
  }, []);

  const handleClaim = useCallback(() => {
    handleClose();
    router.push(`/future-builders?coupon=${COUPON_CODE}#enroll`);
  }, [handleClose, router]);

  const handleCopyCode = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, []);

  useEffect(() => {
    // Do not show on the future-builders page itself
    if (pathname === '/future-builders') {
      return;
    }

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const forceOpen = searchParams.get('promo') === 'true' || searchParams.get('test_popup') === 'true';
      const hasDismissed = sessionStorage.getItem(STORAGE_KEY);

      if (!hasDismissed || forceOpen) {
        // Small delay so the page settles cleanly before modal appears
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 bg-brand-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-[560px] bg-brand-cream border-2 md:border-3 border-brand-black rounded-2xl shadow-[8px_8px_0_0_#141414] md:shadow-[12px_12px_0_0_#141414] overflow-hidden"
          >
            {/* Top Yellow Ribbon */}
            <div className="bg-brand-yellow px-4 py-2.5 border-b-2 border-brand-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
                <span className="text-[11px] md:text-xs font-bold tracking-widest uppercase text-brand-black">
                  Registration closes {REGISTRATION_CLOSES}
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close promotion"
                className="text-brand-black hover:bg-brand-black/10 rounded p-1 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 md:p-8">
              {/* Header Visual & Tag */}
              <div className="flex items-start gap-4 mb-5">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl border-2 border-brand-black overflow-hidden shadow-[3px_3px_0_0_#141414] bg-brand-black/10">
                  <Image
                    src="/images/future-builders/iot_wiring.jpg"
                    alt="Future Builders Workshop"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-block bg-brand-blue text-brand-cream text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-brand-black mb-1.5">
                    Grades 7 to 12 • Oct Cohort
                  </div>
                  <h2
                    id="promo-modal-title"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-black leading-tight"
                  >
                    Future Builders Programme
                  </h2>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-brand-black/80 leading-relaxed mb-6 font-medium">
                12 weekends. 75 contact hours. One working prototype. Learn Software, AI, IoT Robotics, and
                Entrepreneurship — includes an ESP32-C3 hardware kit shipped to your home!
              </p>
              <p className="text-xs sm:text-sm font-bold text-brand-black mb-6 -mt-3">
                {DATES_LINE}
                <br />
                Live {SCHEDULE.short}
              </p>

              {/* Discount Ticket Card */}
              <div className="relative bg-white border-2 border-brand-black rounded-xl p-4 sm:p-5 mb-6 shadow-[4px_4px_0_0_#141414]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-red">
                      Exclusive 10% Early Bird Voucher
                    </span>
                    <p className="text-lg sm:text-xl font-bold text-brand-black">
                      Save {inr(EARLY_BIRD_DISCOUNT)} on Enrollment
                    </p>
                  </div>
                  <div className="text-xs font-bold text-brand-black/60 bg-brand-cream px-2.5 py-1 rounded border border-brand-black/20 self-start sm:self-center">
                    {inr(BASE_PRICE - EARLY_BIRD_DISCOUNT)} <span className="line-through text-brand-black/40">{inr(BASE_PRICE)}</span>
                  </div>
                </div>

                {/* Coupon Code Pill + Copy Button */}
                <div className="flex items-center justify-between gap-2 bg-brand-cream p-2.5 rounded-lg border border-brand-black/30">
                  <div className="flex items-center gap-2 pl-1 min-w-0">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-black/60">
                      Code:
                    </span>
                    <code className="text-base sm:text-lg font-black tracking-wider text-brand-blue font-mono">
                      {COUPON_CODE}
                    </code>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="shrink-0 px-3 py-1.5 bg-brand-yellow hover:bg-brand-yellow/80 active:translate-y-0.5 border border-brand-black rounded text-xs font-bold uppercase tracking-wider text-brand-black transition-all flex items-center gap-1.5 shadow-[1px_1px_0_0_#141414]"
                  >
                    {copied ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-brand-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Urgency Badge */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-brand-black/70">
                  <RegistrationCountdown className="text-brand-red" />
                </div>

                {/* Guarantee reassurance */}
                <div className="mt-2.5 pt-2 border-t border-brand-black/10 flex items-center gap-1.5 text-[11px] font-bold text-brand-black/70">
                  <span>🛡️</span>
                  <span>100% Session 1 Money-Back Guarantee included</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleClaim}
                  className="group w-full h-14 bg-brand-black hover:bg-brand-blue active:scale-[0.99] text-brand-cream text-base font-bold rounded-xl border-2 border-brand-black shadow-[4px_4px_0_0_#141414] transition-all flex items-center justify-center gap-3"
                >
                  <span>Claim 10% Off & Register</span>
                  <span className="w-7 h-7 rounded-full bg-brand-cream/15 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>

                <div className="flex items-center justify-between px-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      router.push('/future-builders');
                    }}
                    className="text-xs font-bold text-brand-black/70 hover:text-brand-blue underline underline-offset-4 transition-colors"
                  >
                    Read full cohort curriculum →
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-xs font-bold text-brand-black/40 hover:text-brand-black transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
