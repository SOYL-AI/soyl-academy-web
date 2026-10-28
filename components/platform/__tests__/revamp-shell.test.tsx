/**
 * ADR-023: platform app shell and the Light / Dark / System theme.
 */
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const h = vi.hoisted(() => ({
  pathname: '/learn',
  session: { state: { status: 'guest' } as unknown, openLogin: vi.fn() },
  credits: { credits: null as unknown, aiAllowed: false },
  coins: { summary: null as unknown },
  progress: { progress: null as unknown, ready: true, refresh: () => undefined },
}));
vi.mock('next/navigation', () => ({ usePathname: () => h.pathname, useRouter: () => ({ push: vi.fn(), replace: vi.fn() }) }));
vi.mock('../auth/SessionProvider', () => ({ useSession: () => h.session }));
vi.mock('../ai/CreditsProvider', () => ({ useCredits: () => h.credits }));
vi.mock('../coins/CoinsProvider', () => ({ useCoins: () => h.coins, useOptionalCoins: () => h.coins }));
vi.mock('../learn/ProgressProvider', () => ({ useLearnerProgress: () => h.progress }));

import { parseThemePref, readThemeCookie, resolveTheme, themeCookie, THEME_BOOT_SCRIPT, PLATFORM_ROOT_ID } from '../shell/theme';
import { ThemeProvider, useTheme } from '../shell/ThemeProvider';
import { ThemeOptions, ThemeToggle } from '../shell/ThemeToggle';
import { isFocusRoute, platformChromeActive } from '../shell/chrome';
import { AppShell, isCurrentSection, PRIMARY_NAV } from '../shell/AppShell';
import { MarketingOnly } from '../shell/MarketingOnly';

let darkQuery = false;
const listeners = new Set<(e: { matches: boolean }) => void>();
function installMatchMedia() {
  window.matchMedia = ((q: string) => ({
    matches: q.includes('dark') ? darkQuery : false,
    media: q,
    addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => listeners.add(fn),
    removeEventListener: (_: string, fn: (e: { matches: boolean }) => void) => listeners.delete(fn),
  })) as unknown as typeof window.matchMedia;
}
function clearThemeCookie() {
  document.cookie = 'soyl_theme=; Max-Age=0; Path=/';
}

beforeEach(() => {
  darkQuery = false;
  listeners.clear();
  installMatchMedia();
  clearThemeCookie();
  document.documentElement.removeAttribute('data-platform-theme');
  h.pathname = '/learn';
  h.session = { state: { status: 'guest' }, openLogin: vi.fn() };
  h.credits = { credits: null, aiAllowed: false };
  h.coins = { summary: null };
  h.progress = { progress: null, ready: true, refresh: () => undefined };
});
afterEach(() => cleanup());

describe('theme preference (pure)', () => {
  it('parses and reads the cookie, defaulting to system', () => {
    expect(parseThemePref('dark')).toBe('dark');
    expect(parseThemePref('blue')).toBe('system');
    expect(parseThemePref(undefined)).toBe('system');
    expect(readThemeCookie('a=1; soyl_theme=light; b=2')).toBe('light');
    expect(readThemeCookie('xsoyl_theme=dark')).toBe('system');
    expect(readThemeCookie('')).toBe('system');
  });
  it('resolves system from the OS setting', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme('dark', false)).toBe('dark');
  });
  it('writes a one-year, site-wide, SameSite=Lax cookie (Secure on https)', () => {
    expect(themeCookie('dark', true)).toBe('soyl_theme=dark; Path=/; Max-Age=31536000; SameSite=Lax; Secure');
    expect(themeCookie('light', false)).not.toContain('Secure');
  });
});

describe('theme boot script (runs before paint)', () => {
  function runBoot() {
    const root = document.createElement('div');
    root.id = PLATFORM_ROOT_ID;
    document.body.appendChild(root);
    // The exact text the layout prints (its hash is in the CSP).
    new Function(THEME_BOOT_SCRIPT)();
    return root;
  }
  afterEach(() => document.getElementById(PLATFORM_ROOT_ID)?.remove());

  it('applies the stored theme to the platform root and <html>', () => {
    document.cookie = 'soyl_theme=dark; Path=/';
    const root = runBoot();
    expect(root.getAttribute('data-theme')).toBe('dark');
    expect(root.getAttribute('data-theme-pref')).toBe('dark');
    expect(document.documentElement.getAttribute('data-platform-theme')).toBe('dark');
  });
  it('System follows the OS', () => {
    darkQuery = true;
    expect(runBoot().getAttribute('data-theme')).toBe('dark');
    document.getElementById(PLATFORM_ROOT_ID)?.remove();
    darkQuery = false;
    expect(runBoot().getAttribute('data-theme')).toBe('light');
  });
  it('agrees with readThemeCookie + resolveTheme for every preference', () => {
    for (const pref of ['light', 'dark', 'system', 'bogus'] as const) {
      for (const os of [true, false]) {
        document.cookie = `soyl_theme=${pref}; Path=/`;
        darkQuery = os;
        const root = runBoot();
        expect(root.getAttribute('data-theme')).toBe(resolveTheme(readThemeCookie(document.cookie), os));
        root.remove();
      }
    }
  });
});

function Probe() {
  const t = useTheme();
  return <output data-testid="probe">{`${t.pref}/${t.resolved}`}</output>;
}

describe('ThemeProvider + ThemeToggle', () => {
  function mount() {
    const root = document.createElement('div');
    root.id = PLATFORM_ROOT_ID;
    document.body.appendChild(root);
    return render(
      <ThemeProvider>
        <Probe />
        <ThemeToggle />
      </ThemeProvider>,
      { container: root },
    );
  }
  afterEach(() => document.getElementById(PLATFORM_ROOT_ID)?.remove());

  it('reads the cookie on mount and applies it', () => {
    document.cookie = 'soyl_theme=dark; Path=/';
    mount();
    expect(screen.getByTestId('probe').textContent).toBe('dark/dark');
    expect(document.getElementById(PLATFORM_ROOT_ID)?.getAttribute('data-theme')).toBe('dark');
  });

  it('picking a theme persists it in the cookie and applies it at once', () => {
    mount();
    const toggle = screen.getByTestId('theme-toggle');
    expect((toggle).getAttribute('aria-expanded')).toBe('false');
    fireEvent.click(toggle);
    expect((toggle).getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(document.cookie).toContain('soyl_theme=dark');
    expect(screen.getByTestId('probe').textContent).toBe('dark/dark');
    expect(document.documentElement.getAttribute('data-platform-theme')).toBe('dark');
    fireEvent.click(screen.getByRole('radio', { name: 'Light' }));
    expect(document.cookie).toContain('soyl_theme=light');
    expect(document.getElementById(PLATFORM_ROOT_ID)?.getAttribute('data-theme')).toBe('light');
  });

  it('System follows OS changes live', () => {
    mount();
    expect(screen.getByTestId('probe').textContent).toBe('system/light');
    act(() => listeners.forEach((fn) => fn({ matches: true })));
    expect(screen.getByTestId('probe').textContent).toBe('system/dark');
  });

  it('Escape closes the picker and returns focus to the button', () => {
    mount();
    const toggle = screen.getByTestId('theme-toggle');
    fireEvent.click(toggle);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect((toggle).getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('removes the <html> attribute when the platform unmounts (marketing pages stay untouched)', () => {
    const r = mount();
    expect(document.documentElement.hasAttribute('data-platform-theme')).toBe(true);
    r.unmount();
    expect(document.documentElement.hasAttribute('data-platform-theme')).toBe(false);
  });

  it('ThemeOptions is a labelled radio group with all three choices', () => {
    render(
      <ThemeProvider>
        <ThemeOptions legend="Appearance" />
      </ThemeProvider>,
    );
    const group = screen.getByRole('group', { name: 'Appearance' });
    expect(within(group).getAllByRole('radio').map((r) => (r as HTMLInputElement).value)).toEqual(['light', 'dark', 'system']);
    expect((within(group).getByRole('radio', { name: 'System' }) as HTMLInputElement).checked).toBe(true);
  });
});

describe('marketing chrome gating', () => {
  it('only platform paths with the flag on', () => {
    expect(platformChromeActive('/learn/cbse/10', true)).toBe(true);
    expect(platformChromeActive('/me', true)).toBe(true);
    expect(platformChromeActive('/learn', false)).toBe(false);
    expect(platformChromeActive('/', true)).toBe(false);
    expect(platformChromeActive('/learning', true)).toBe(false);
    expect(platformChromeActive('/about', true)).toBe(false);
    expect(platformChromeActive(null, true)).toBe(false);
  });
  it('MarketingOnly renders children on marketing pages only', () => {
    vi.stubEnv('NEXT_PUBLIC_PLATFORM_ENABLED', 'true');
    h.pathname = '/about';
    const { rerender } = render(
      <MarketingOnly>
        <p>footer</p>
      </MarketingOnly>,
    );
    expect(screen.getByText('footer')).toBeTruthy();
    h.pathname = '/learn';
    rerender(
      <MarketingOnly>
        <p>footer</p>
      </MarketingOnly>,
    );
    expect(screen.queryByText('footer')).toBeNull();
    vi.unstubAllEnvs();
  });
  it('immersive routes hide the tab bar', () => {
    expect(isFocusRoute('/learn/cbse/10/science/ch01/lesson')).toBe(true);
    expect(isFocusRoute('/learn/cbse/10/science/ch01/lesson/2')).toBe(true);
    expect(isFocusRoute('/learn/cbse/10/science/ch01/flashcards')).toBe(true);
    expect(isFocusRoute('/tests/attempt/abc')).toBe(true);
    expect(isFocusRoute('/learn/cbse/10/science/ch01/practice')).toBe(false);
    expect(isFocusRoute('/learn/cbse/10/science/ch01')).toBe(false);
    expect(isFocusRoute('/tests')).toBe(false);
  });
});

describe('AppShell', () => {
  function shell() {
    return render(
      <ThemeProvider>
        <AppShell footer={<footer>legal</footer>}>
          <p>page</p>
        </AppShell>
      </ThemeProvider>,
    );
  }

  it('guest: brand link home, primary nav with the current section, log in, tab bar', () => {
    h.pathname = '/tests/series/cbse/10/science';
    shell();
    expect((screen.getByRole('link', { name: 'SOYL Academy, learning home' })).getAttribute('href')).toBe('/learn');
    const navs = [...document.querySelectorAll<HTMLElement>('nav[aria-label="Learning platform"]')];
    expect(navs).toHaveLength(2); // desktop bar + mobile tabs (CSS shows one at a time)
    expect((within(navs[0]!).getByRole('link', { name: 'Tests', hidden: true })).getAttribute('aria-current')).toBe('page');
    expect((within(navs[0]!).getByRole('link', { name: 'Learn', hidden: true })).hasAttribute('aria-current')).toBe(false);
    expect((within(navs[1]!).getByRole('link', { name: 'Me' })).getAttribute('href')).toBe('/me');
    expect(screen.getByTestId('login-button')).toBeTruthy();
    expect(screen.queryByTestId('profile-link')).toBeNull();
    expect(screen.getByText('legal')).toBeTruthy();
    expect((screen.getByRole('link', { name: 'Skip to page content' })).getAttribute('href')).toBe('#platform-content');
  });

  it('member: streak, coins, credits (consented) and profile link', () => {
    h.session = { state: { status: 'member', user: { id: 'u1', displayName: 'Asha' }, consent: 'granted' }, openLogin: vi.fn() };
    h.credits = { credits: { balance: 25, resetAt: new Date(Date.now() + 3_600_000).toISOString() }, aiAllowed: true };
    h.coins = { summary: { balance: 42, checkIn: { checkedInToday: true } } };
    h.progress = { progress: { streak: { current: 6, longest: 9, lastActiveDay: '2026-10-28', atRisk: false, freezeAvailableThisWeek: true } }, ready: true, refresh: () => undefined };
    shell();
    expect((screen.getByTestId('streak-chip')).getAttribute('data-streak')).toBe('6');
    expect((screen.getByTestId('streak-chip')).textContent).toContain('6-day streak');
    expect((screen.getByTestId('coin-chip')).getAttribute('data-balance')).toBe('42');
    expect((screen.getByTestId('credit-chip')).getAttribute('data-balance')).toBe('25');
    expect((screen.getByTestId('profile-link')).getAttribute('href')).toBe('/me');
    expect(screen.queryByTestId('login-button')).toBeNull();
  });

  it('no credits chip without AI consent (D-014)', () => {
    h.session = { state: { status: 'member', user: { id: 'u1', displayName: null }, consent: 'required' }, openLogin: vi.fn() };
    h.credits = { credits: { balance: 25, resetAt: new Date().toISOString() }, aiAllowed: false };
    shell();
    expect(screen.queryByTestId('credit-chip')).toBeNull();
  });

  it('immersive pages drop the tab bar', () => {
    h.pathname = '/learn/cbse/10/science/ch01/lesson';
    shell();
    expect([...document.querySelectorAll<HTMLElement>('nav[aria-label="Learning platform"]')]).toHaveLength(1);
  });

  it('sections: /coins and /store count as Me; prefixes only', () => {
    const me = { href: '/me', also: ['/coins', '/store'] };
    expect(isCurrentSection('/store', me)).toBe(true);
    expect(isCurrentSection('/me/consent', me)).toBe(true);
    expect(isCurrentSection('/meet', me)).toBe(false);
    expect(PRIMARY_NAV.map((n) => n.label)).toEqual(['Learn', 'Tests', 'Ask AI', 'Leaderboard']);
  });
});
