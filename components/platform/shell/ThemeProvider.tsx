'use client';

/**
 * Theme state for platform pages (ADR-023). The boot script already painted the right theme; this provider
 * keeps it in sync: it reads the cookie, follows the OS setting for "System", writes the cookie when the
 * student picks a theme, and applies the resolved theme before paint on client-side navigations (where the
 * boot script does not run). It removes the <html> attribute when the platform unmounts, so a marketing page
 * reached by client navigation is exactly as before.
 */
import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { HTML_THEME_ATTR, PLATFORM_ROOT_ID, readThemeCookie, resolveTheme, themeCookie, type ResolvedTheme, type ThemePref } from './theme';

export interface ThemeApi {
  pref: ThemePref;
  resolved: ResolvedTheme;
  setPref: (pref: ThemePref) => void;
}

const ThemeCtx = createContext<ThemeApi | null>(null);

export function useTheme(): ThemeApi {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}

const DARK_QUERY = '(prefers-color-scheme: dark)';

function systemPrefersDark(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // null until mounted: never apply a guess over what the boot script painted.
  const [pref, setPrefState] = useState<ThemePref | null>(null);
  const [systemDark, setSystemDark] = useState(false);

  useLayoutEffect(() => {
    // Reading document.cookie / matchMedia is only possible after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial read of the stored preference
    setPrefState(readThemeCookie(document.cookie));
    setSystemDark(systemPrefersDark());
    if (typeof window.matchMedia !== 'function') return;
    const mq = window.matchMedia(DARK_QUERY);
    const onChange = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolved: ResolvedTheme = resolveTheme(pref ?? 'system', systemDark);

  useLayoutEffect(() => {
    if (pref === null) return;
    const root = document.getElementById(PLATFORM_ROOT_ID);
    root?.setAttribute('data-theme', resolved);
    root?.setAttribute('data-theme-pref', pref);
    document.documentElement.setAttribute(HTML_THEME_ATTR, resolved);
  }, [pref, resolved]);

  useLayoutEffect(() => () => document.documentElement.removeAttribute(HTML_THEME_ATTR), []);

  const setPref = useCallback((next: ThemePref) => {
    document.cookie = themeCookie(next, window.location.protocol === 'https:');
    setPrefState(next);
  }, []);

  const value = useMemo<ThemeApi>(() => ({ pref: pref ?? 'system', resolved, setPref }), [pref, resolved, setPref]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
