'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'soyl_cookie_consent_v1';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(true);

  // Check saved preferences on mount & listen for re-open trigger
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Delay slightly (1.5s) so page paints first and doesn't flash immediately
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(saved);
        const timer = setTimeout(() => {
          setAnalyticsAllowed(parsed.analytics ?? true);
          setMarketingAllowed(parsed.marketing ?? true);
        }, 0);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access fallback
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for open event from footer or privacy page
  useEffect(() => {
    const handleOpen = () => {
      setShowPreferences(true);
      setIsOpen(true);
    };

    window.addEventListener('soyl:open-cookie-settings', handleOpen);
    return () => window.removeEventListener('soyl:open-cookie-settings', handleOpen);
  }, []);

  const savePreferences = useCallback((prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore
    }
    setIsOpen(false);
    setShowPreferences(false);
  }, []);

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleRejectNonEssential = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    savePreferences({
      necessary: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <aside
          role="region"
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-5 left-5 z-40 max-w-[420px] w-[calc(100vw-2.5rem)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="bg-white border-2 border-brand-black rounded-2xl shadow-[8px_8px_0_0_#141414] p-5 sm:p-6 overflow-hidden"
          >
            {/* Top header */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <h3 className="font-bold text-base text-brand-black tracking-tight">
                  Privacy & Cookie Preferences
                </h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-yellow px-2 py-0.5 rounded border border-brand-black">
                DPDP & GDPR
              </span>
            </div>

            {/* Content summary */}
            {!showPreferences ? (
              <>
                <p className="text-xs sm:text-[13px] text-brand-black/75 leading-relaxed font-medium mb-4">
                  We use essential cookies to maintain site security and manage your cohort registration. With your consent, we also use privacy-friendly analytics and preferences to tailor your learning experience.
                </p>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 h-11 bg-brand-black hover:bg-brand-blue text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl border-2 border-brand-black shadow-[2px_2px_0_0_#141414] transition-all"
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      onClick={handleRejectNonEssential}
                      className="flex-1 h-11 bg-brand-cream hover:bg-white text-brand-black text-xs font-bold uppercase tracking-wider rounded-xl border-2 border-brand-black shadow-[2px_2px_0_0_#141414] transition-all"
                    >
                      Necessary Only
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setShowPreferences(true)}
                      className="text-brand-blue hover:text-brand-black underline underline-offset-2 transition-colors"
                    >
                      Customize Settings
                    </button>
                    <Link
                      href="/privacy"
                      className="text-brand-black/60 hover:text-brand-black underline underline-offset-2 transition-colors"
                    >
                      Privacy Policy →
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              /* Preferences Toggles View */
              <div className="space-y-3.5">
                <p className="text-xs text-brand-black/70 font-medium">
                  Select which categories of cookies you consent to:
                </p>

                {/* Necessary (Always Active) */}
                <div className="p-3 bg-brand-cream border border-brand-black/20 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-brand-black">Strictly Necessary</p>
                    <p className="text-[11px] text-brand-black/60">Core security, checkout & sessions</p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-black/10 px-2 py-0.5 rounded text-brand-black/70">
                    Always Active
                  </span>
                </div>

                {/* Analytics & Performance */}
                <label className="p-3 bg-white border border-brand-black/20 rounded-xl flex items-center justify-between cursor-pointer hover:border-brand-black transition-colors">
                  <div>
                    <p className="text-xs font-bold text-brand-black">Analytics & Insights</p>
                    <p className="text-[11px] text-brand-black/60">Anonymous performance metrics</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={analyticsAllowed}
                    onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                    className="w-4 h-4 accent-brand-black cursor-pointer"
                  />
                </label>

                {/* Marketing & Tailoring */}
                <label className="p-3 bg-white border border-brand-black/20 rounded-xl flex items-center justify-between cursor-pointer hover:border-brand-black transition-colors">
                  <div>
                    <p className="text-xs font-bold text-brand-black">Preferences & Cohort Offers</p>
                    <p className="text-[11px] text-brand-black/60">Discounts and coupon auto-fill</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={marketingAllowed}
                    onChange={(e) => setMarketingAllowed(e.target.checked)}
                    className="w-4 h-4 accent-brand-black cursor-pointer"
                  />
                </label>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleSaveCustom}
                    className="flex-1 h-10 bg-brand-black hover:bg-brand-blue text-brand-cream text-xs font-bold uppercase tracking-wider rounded-xl border-2 border-brand-black shadow-[2px_2px_0_0_#141414] transition-all"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPreferences(false)}
                    className="px-4 h-10 bg-brand-cream hover:bg-white text-brand-black text-xs font-bold uppercase tracking-wider rounded-xl border-2 border-brand-black transition-all"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
}
