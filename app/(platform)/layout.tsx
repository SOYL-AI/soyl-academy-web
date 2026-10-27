/**
 * Platform layout (ADR-001 §3, §7; D-017). 404 for every platform route while the flag is off (GEN-4).
 * Wraps platform pages in the scoped UI-kit root with Noto Sans Devanagari (self-hosted by next/font,
 * Devanagari subset, swap; WEB-1: no third-party requests). Renders inside the marketing header/footer.
 * Providers: toasts, the session (GET /v1/session) and today's AI credits (GET /v1/credits, M4).
 */
import type { ReactNode } from 'react';
import { notoDevanagari } from '@/components/platform/ui/fonts';
import { PlatformRoot } from '@/components/platform/ui/PlatformRoot';
import { cx } from '@/components/platform/ui/cx';
import { ToastProvider } from '@/components/platform/ui/kit/Toast';
import { SessionProvider } from '@/components/platform/auth/SessionProvider';
import { CreditsProvider } from '@/components/platform/ai/CreditsProvider';
import { PlatformHeader } from '@/components/platform/shell/PlatformHeader';
import { requirePlatform } from '@/components/platform/server/gate';
import s from '@/components/platform/shell/shell.module.css';

export default function PlatformLayout({ children }: { children: ReactNode }) {
  requirePlatform();
  return (
    <PlatformRoot className={cx(notoDevanagari.variable, s.root)}>
      <ToastProvider>
        <SessionProvider>
          <CreditsProvider>
            <PlatformHeader />
            {children}
          </CreditsProvider>
        </SessionProvider>
      </ToastProvider>
    </PlatformRoot>
  );
}
