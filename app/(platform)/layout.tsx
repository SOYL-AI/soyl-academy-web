/**
 * Platform layout (ADR-001 §3, §7; D-017; ADR-023). 404 for every platform route while the flag is off (GEN-4).
 * Wraps platform pages in the scoped UI-kit root with Noto Sans Devanagari (self-hosted by next/font,
 * Devanagari subset, swap; WEB-1: no third-party requests). Since ADR-023 the platform has its own app shell:
 * the marketing header and footer step aside on platform paths, the theme (Light / Dark / System) is applied
 * before first paint by a constant inline script, and the cookie bar stays (legal).
 * Providers: theme, toasts, the session (GET /v1/session), today's AI credits (GET /v1/credits, M4), SOYL Coins
 * (GET /v1/coins, ADR-021), the learner's progress (GET /v1/me/progress or this device) and the student's own avatar
 * (GET /v1/me, for the top bar).
 */
import type { ReactNode } from 'react';
import { notoDevanagari } from '@/components/platform/ui/fonts';
import { PlatformRoot } from '@/components/platform/ui/PlatformRoot';
import { cx } from '@/components/platform/ui/cx';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';
import { SessionProvider } from '@/components/platform/auth/SessionProvider';
import { CreditsProvider } from '@/components/platform/ai/CreditsProvider';
import { CoinsProvider } from '@/components/platform/coins/CoinsProvider';
import { ProgressProvider } from '@/components/platform/learn/ProgressProvider';
import { MyAvatarProvider } from '@/components/platform/me/MyAvatarProvider';
import { AppShell } from '@/components/platform/shell/AppShell';
import { AppFooter } from '@/components/platform/shell/AppFooter';
import { ThemeBootScript } from '@/components/platform/shell/ThemeBootScript';
import { ThemeProvider } from '@/components/platform/shell/ThemeProvider';
import { PLATFORM_ROOT_ID } from '@/components/platform/shell/theme';
import { requirePlatform } from '@/components/platform/server/gate';
import s from '@/components/platform/shell/shell.module.css';
import '@/components/platform/shell/platform-global.css';

export default function PlatformLayout({ children }: { children: ReactNode }) {
  requirePlatform();
  return (
    // suppressHydrationWarning: the theme boot script sets data-theme on this element before React hydrates.
    <PlatformRoot id={PLATFORM_ROOT_ID} className={cx(notoDevanagari.variable, s.root)} suppressHydrationWarning>
      <ThemeBootScript />
      <ThemeProvider>
        <ToastProvider>
          <SessionProvider>
            <CreditsProvider>
              <CoinsProvider>
                <ProgressProvider>
                  <MyAvatarProvider>
                    <AppShell footer={<AppFooter />}>{children}</AppShell>
                  </MyAvatarProvider>
                </ProgressProvider>
              </CoinsProvider>
            </CreditsProvider>
          </SessionProvider>
        </ToastProvider>
      </ThemeProvider>
    </PlatformRoot>
  );
}
