/** Shared cookie-consent storage and events. Same key/shape as before the redesign. */

export const CONSENT_STORAGE_KEY = 'soyl_cookie_consent_v1';
export const OPEN_COOKIE_SETTINGS_EVENT = 'soyl:open-cookie-settings';
export const CONSENT_CHANGED_EVENT = 'soyl:consent-changed';

/**
 * Inline <head> script: marks <html data-consent> before first paint when a
 * choice is already stored, so returning visitors never see the cookie bar flash.
 */
export const CONSENT_BOOT_SCRIPT = `try{if(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}))document.documentElement.dataset.consent='1'}catch(e){}`;

export interface CookiePreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export function readConsent(): CookiePreferences | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePreferences) : null;
  } catch {
    return null;
  }
}

export function writeConsent(prefs: Omit<CookiePreferences, 'necessary' | 'timestamp'>) {
  const value: CookiePreferences = { necessary: true, ...prefs, timestamp: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value }));
}
