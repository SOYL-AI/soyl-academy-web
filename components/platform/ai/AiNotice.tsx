'use client';

/**
 * AI notices (split from AiDialogs so pages can show a notice without loading the quote and paywall dialogs):
 * consent-needed, paused (spend breaker), unavailable, busy, during a live test, login, other (D-014, D-039).
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/components/platform/ui/kit/Icon';
import type { AiBlock } from './problems';
import s from './ai.module.css';

/** The consent flow page, returning here afterwards (D-039). */
export function consentFlowHref(pathname: string | null): string {
  return pathname && pathname.startsWith('/') && !pathname.startsWith('/me/consent') ? `/me/consent?next=${encodeURIComponent(pathname)}` : '/me/consent';
}

export function AiNotice({ block, feature = 'AI help' }: { block: AiBlock; feature?: string }) {
  const pathname = usePathname();
  switch (block.kind) {
    case 'consent':
      return (
        <div className={s.notice} role="note" data-testid="ai-consent-needed">
          <Icon name="lock" size={20} />
          <div>
            <p>
              <strong>{feature} needs approval first.</strong> If you are under 18, ask a parent to approve by email; if you are 18 or older, you can approve it
              yourself. Lessons, practice and tests are always open.
            </p>
            <Link href={consentFlowHref(pathname)} className={s.textLink} data-testid="consent-flow-link">
              Ask a parent to approve
            </Link>
          </div>
        </div>
      );
    case 'paused':
      return (
        <div className={s.notice} role="status" data-testid="ai-paused">
          <Icon name="clock" size={20} />
          <p>
            <strong>AI is taking a short break until midnight.</strong> Lessons, practice and tests work as usual.
          </p>
        </div>
      );
    case 'unavailable':
      return (
        <div className={s.notice} role="status" data-testid="ai-unavailable">
          <Icon name="alert" size={20} />
          <p>
            <strong>The AI helper is not available right now.</strong> Please try again later. Your credits were not used.
          </p>
        </div>
      );
    case 'busy':
      return (
        <div className={s.notice} role="status">
          <Icon name="clock" size={20} />
          <p>Lots of students are asking right now. Please wait a moment and try again.</p>
        </div>
      );
    case 'during-test':
      return (
        <div className={s.notice} role="status">
          <Icon name="lock" size={20} />
          <p>AI help is switched off while you are taking a live test.</p>
        </div>
      );
    case 'login':
      return (
        <div className={s.notice} role="status">
          <Icon name="lock" size={20} />
          <p>Please log in to use AI help.</p>
        </div>
      );
    case 'other':
      return (
        <p className={s.warnText} role="alert">
          {block.message}
        </p>
      );
    default:
      return null;
  }
}
