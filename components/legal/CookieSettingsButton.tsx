'use client';

import { OPEN_COOKIE_SETTINGS_EVENT } from './consent';

/** Re-opens the cookie preferences panel (footer, privacy page). */
export function CookieSettingsButton({ className, label = 'Cookie preferences' }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
