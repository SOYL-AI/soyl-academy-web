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
import { byStage, classFromPath, resolveStage, stageForClass } from '../shell/stage';
import { useStage } from '../shell/StageProvider';

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

  function asMember(user: Record<string, unknown> = {}) {
    const openGuide = vi.fn();
    h.session = { state: { status: 'member', user: { id: 'u1', displayName: 'Asha', board: 'cbse', classLevel: 10, ...user }, consent: 'granted' }, openLogin: vi.fn() };
    h.credits = { credits: { balance: 25, resetAt: new Date(Date.now() + 3_600_000).toISOString() }, aiAllowed: true, openGuide } as typeof h.credits;
    h.coins = { summary: { balance: 42, checkIn: { checkedInToday: true } } };
    h.progress = {
      progress: { level: 3, levelProgress: 0.4, streak: { current: 6, longest: 9, lastActiveDay: '2026-10-28', atRisk: false, freezeAvailableThisWeek: true } },
      ready: true,
      refresh: () => undefined,
    };
    return openGuide;
  }

  it('member (v3): streak and coins in the top bar; credits in the sidebar (opens the guide); profile link and card', () => {
    const openGuide = asMember();
    shell();
    expect((screen.getByTestId('streak-chip')).getAttribute('data-streak')).toBe('6');
    expect((screen.getByTestId('streak-chip')).textContent).toContain('6-day streak');
    expect((screen.getByTestId('coin-chip')).getAttribute('data-balance')).toBe('42');
    // ADR-032: no credits chip in the top bar outside Ask AI and Plans; the sidebar keeps the way to the guide.
    expect(screen.queryByTestId('credit-chip')).toBeNull();
    const side = screen.getByTestId('sidebar-credits');
    expect(side.getAttribute('data-balance')).toBe('25');
    fireEvent.click(side);
    expect(openGuide).toHaveBeenCalledTimes(1);
    expect((screen.getByTestId('profile-link')).getAttribute('href')).toBe('/me');
    const card = screen.getByTestId('sidebar-profile');
    expect(card.getAttribute('href')).toBe('/me');
    expect(card.textContent).toContain('Asha');
    expect(card.textContent).toContain('Level 3 · Class 10');
    expect(screen.queryByTestId('login-button')).toBeNull();
    expect(screen.getByTestId('class-chip').getAttribute('href')).toBe('/learn/cbse/10');
  });

  it.each(['/ask', '/plans'])('member on %s: the credits chip is in the top bar and opens the guide', (path) => {
    const openGuide = asMember();
    h.pathname = path;
    shell();
    const chip = screen.getByTestId('credit-chip');
    expect(chip.getAttribute('data-balance')).toBe('25');
    fireEvent.click(chip);
    expect(openGuide).toHaveBeenCalledTimes(1);
  });

  it('no credits anywhere without AI allowed (D-014)', () => {
    h.session = { state: { status: 'member', user: { id: 'u1', displayName: null }, consent: 'required' }, openLogin: vi.fn() };
    h.credits = { credits: { balance: 25, resetAt: new Date().toISOString() }, aiAllowed: false };
    h.pathname = '/ask';
    shell();
    expect(screen.queryByTestId('credit-chip')).toBeNull();
    expect(screen.queryByTestId('sidebar-credits')).toBeNull();
  });

  it('sidebar nav: members get Home … Progress, guests the four sections and a log-in card', () => {
    asMember();
    h.pathname = '/me/progress';
    shell();
    const [side, tabs] = [...document.querySelectorAll<HTMLElement>('nav[aria-label="Learning platform"]')];
    expect(within(side!).getAllByRole('link', { hidden: true }).map((a) => a.textContent)).toEqual(['Home', 'Learn', 'Tests', 'Ask AI', 'Leaderboard', 'Progress']);
    expect(within(side!).getByRole('link', { name: 'Progress', hidden: true }).getAttribute('aria-current')).toBe('page');
    // Phones: Progress lives under Home (no sixth tab), and is not "Me".
    expect(within(tabs!).getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBe('page');
    expect(within(tabs!).getByRole('link', { name: 'Me' }).hasAttribute('aria-current')).toBe(false);
    expect(screen.getByTestId('sidebar-profile').hasAttribute('aria-current')).toBe(false);
    cleanup();

    h.session = { state: { status: 'guest' }, openLogin: vi.fn() };
    h.pathname = '/learn';
    shell();
    const side2 = document.querySelector<HTMLElement>('[data-testid="sidebar"] nav')!;
    expect(within(side2).getAllByRole('link', { hidden: true }).map((a) => a.textContent)).toEqual(['Learn', 'Tests', 'Ask AI', 'Leaderboard']);
    fireEvent.click(within(screen.getByTestId('sidebar')).getByRole('button', { name: 'Log in', hidden: true }));
    expect(h.session.openLogin).toHaveBeenCalled();
    expect(screen.queryByTestId('sidebar-profile')).toBeNull();
  });

  it('the profile card is current on /me, /coins and /store', () => {
    asMember();
    for (const path of ['/me', '/coins', '/store']) {
      h.pathname = path;
      shell();
      expect(screen.getByTestId('sidebar-profile').getAttribute('aria-current'), path).toBe('page');
      cleanup();
    }
  });

  it('immersive pages drop the sidebar and the tab bar; the top bar keeps the mark and the soylai.com link', () => {
    h.pathname = '/learn/cbse/10/science/ch01/lesson';
    shell();
    expect([...document.querySelectorAll<HTMLElement>('nav[aria-label="Learning platform"]')]).toHaveLength(0);
    expect(screen.queryByTestId('sidebar')).toBeNull();
    expect(screen.getByTestId('main-site-link').closest('header')).not.toBeNull();
    expect(screen.getByRole('link', { name: 'SOYL Academy, learning home' }).getAttribute('href')).toBe('/learn');
  });

  it('age stage on the shell root: member class first, then the course URL, then middle', () => {
    const stageOf = () => screen.getByTestId('app-shell').getAttribute('data-stage');
    h.pathname = '/learn/cbse/7/science';
    shell();
    expect(stageOf()).toBe('junior'); // guest on a Class 7 page
    cleanup();
    h.pathname = '/tests/series/icse/12/physics';
    shell();
    expect(stageOf()).toBe('senior');
    cleanup();
    h.pathname = '/leaderboard';
    shell();
    expect(stageOf()).toBe('middle');
    cleanup();
    asMember({ classLevel: 8 });
    h.pathname = '/learn/cbse/12/physics';
    shell();
    expect(stageOf()).toBe('junior'); // a Class 8 member keeps their own tone
  });

  it('sections: /coins and /store count as Me; prefixes only', () => {
    const me = { href: '/me', also: ['/coins', '/store'] };
    expect(isCurrentSection('/store', me)).toBe(true);
    expect(isCurrentSection('/me/consent', me)).toBe(true);
    expect(isCurrentSection('/meet', me)).toBe(false);
    expect(PRIMARY_NAV.map((n) => n.label)).toEqual(['Learn', 'Tests', 'Ask AI', 'Leaderboard']);
  });
});

describe('age stages (ADR-032)', () => {
  it('class → stage; out of range and unknown → middle', () => {
    expect([7, 8, 9, 10, 11, 12].map(stageForClass)).toEqual(['junior', 'junior', 'middle', 'middle', 'senior', 'senior']);
    expect(stageForClass(null)).toBe('middle');
    expect(stageForClass(6)).toBe('middle');
    expect(stageForClass(13)).toBe('middle');
    expect(stageForClass(10.5)).toBe('middle');
  });
  it('reads the class from course URLs only', () => {
    expect(classFromPath('/learn/cbse/7')).toBe(7);
    expect(classFromPath('/learn/icse/12/physics/ch03/notes')).toBe(12);
    expect(classFromPath('/tests/series/cbse/9/maths')).toBe(9);
    expect(classFromPath('/learn')).toBeNull();
    expect(classFromPath('/learn/cbse/5')).toBeNull();
    expect(classFromPath('/tests/attempt/10')).toBeNull();
    expect(classFromPath('/me')).toBeNull();
  });
  it('resolveStage: profile, then URL, then default; byStage picks', () => {
    expect(resolveStage({ pathname: '/learn/cbse/11', memberClass: 7 })).toEqual({ stage: 'junior', classLevel: 7, source: 'profile' });
    expect(resolveStage({ pathname: '/learn/cbse/11', memberClass: null })).toEqual({ stage: 'senior', classLevel: 11, source: 'url' });
    expect(resolveStage({ pathname: '/ask' })).toEqual({ stage: 'middle', classLevel: null, source: 'default' });
    expect(byStage('senior', { junior: 1, middle: 2, senior: 3 })).toBe(3);
  });
  it('useStage: the shell provides it; outside the shell it is the default', () => {
    function Probe() {
      const st = useStage();
      return <output data-testid="stage">{`${st.stage}/${st.source}/${st.pick({ junior: 'Nice one!', middle: 'Good work', senior: 'Done' })}`}</output>;
    }
    render(<Probe />);
    expect(screen.getByTestId('stage').textContent).toBe('middle/default/Good work');
    cleanup();
    h.pathname = '/learn/cbse/8/science';
    render(
      <ThemeProvider>
        <AppShell>
          <Probe />
        </AppShell>
      </ThemeProvider>,
    );
    expect(screen.getByTestId('stage').textContent).toBe('junior/url/Nice one!');
  });
});
