'use client';

/**
 * Shared AI UI (ai-gateway M4 handoff "What web needs" §3, §6; CONTEXT §6; D-014):
 * - `QuoteDialog`: the cost of an action before the student confirms it;
 * - `PaywallDialog`: credits are used up (countdown to the 00:00 IST reset, link to plans) or the action
 *   needs another plan; never blocks lessons, practice or tests;
 * - `AiNotice`: consent-needed, paused (spend breaker) and unavailable states.
 */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { AiQuote } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { formatCountdown } from '@/components/platform/ui/kit/CreditChip';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { creditsText, safePlansPath, type AiBlock } from './problems';
import s from './ai.module.css';

function useNow(intervalMs = 30_000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const first = window.setTimeout(() => setNow(Date.now()), 0);
    const id = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, [intervalMs]);
  return now;
}

/** "Resets in 5h 12m" from resetAt (preferred) or resetInSeconds measured from when it arrived. */
export function ResetCountdown({ resetAt, resetInSeconds }: { resetAt: string | null; resetInSeconds: number | null }) {
  const [arrived] = useState(() => Date.now());
  const now = useNow();
  if (now === null) return <span>at midnight IST</span>;
  const target = resetAt && Number.isFinite(Date.parse(resetAt)) ? Date.parse(resetAt) : resetInSeconds !== null ? arrived + resetInSeconds * 1000 : null;
  return <span data-testid="reset-countdown">{target ? `in ${formatCountdown(target - now)}` : 'at midnight IST'}</span>;
}

export function QuoteDialog({
  open,
  quote,
  what,
  onConfirm,
  onClose,
  busy,
}: {
  open: boolean;
  quote: AiQuote | null;
  /** "this answer", "your written answers", "this slide". */
  what: string;
  onConfirm: () => void;
  onClose: () => void;
  busy?: boolean;
}) {
  const cost = quote ? (quote.perAnswer && quote.answers ? Math.min(quote.credits * quote.answers, quote.maxCredits) : quote.credits) : 0;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Use AI credits?"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} loading={busy} disabled={!quote || !quote.affordable || quote.status === 'paused'} data-testid="quote-confirm">
            Use {creditsText(cost)}
          </Button>
        </>
      }
    >
      {quote && (
        <div className={s.quote} data-testid="quote">
          <p>
            <strong>{quote.label}</strong> for {what} costs <strong>{creditsText(cost)}</strong>
            {quote.perAnswer && quote.answers ? ` (${creditsText(quote.credits)} per answer × ${quote.answers}, at most ${quote.maxCredits})` : ''}.
          </p>
          <p className={s.muted}>
            You have {creditsText(quote.balance)} left today. Credits are refunded if the AI cannot answer.
          </p>
          {quote.status === 'degraded' && <p className={s.muted}>AI is busy today, so answers may be shorter.</p>}
          {quote.status === 'paused' && <AiNotice block={{ kind: 'paused', retryAfterSeconds: quote.resetInSeconds }} />}
          {!quote.affordable && quote.status !== 'paused' && (
            <p className={s.warnText} role="alert">
              Not enough credits. Credits reset <ResetCountdown resetAt={quote.resetAt} resetInSeconds={quote.resetInSeconds} />.{' '}
              <Link href={safePlansPath(quote.plansUrl)}>See plans</Link>
            </p>
          )}
        </div>
      )}
    </Dialog>
  );
}

export function PaywallDialog({ block, onClose }: { block: Extract<AiBlock, { kind: 'paywall' | 'plan' }> | null; onClose: () => void }) {
  const open = block !== null;
  const plan = block?.kind === 'plan';
  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={plan ? 'This needs a paid plan' : 'You have used today’s AI credits'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Not now
          </Button>
          <Link href={block?.plansUrl ?? '/plans'} className={s.linkButton} data-testid="paywall-plans">
            See plans
          </Link>
        </>
      }
    >
      {block && (
        <div className={s.quote} data-testid="paywall">
          {block.kind === 'paywall' ? (
            <>
              <p>
                <Icon name="spark" size={18} /> Your free credits reset <strong><ResetCountdown resetAt={block.resetAt} resetInSeconds={block.resetInSeconds} /></strong> (00:00 IST).
                {block.required !== null && block.balance !== null ? ` This needs ${creditsText(block.required)}; you have ${creditsText(block.balance)}.` : ''}
              </p>
              <p className={s.muted}>Lessons, practice and tests are always free. Plans add more AI credits each day.</p>
            </>
          ) : (
            <p>
              {block.plan === 'pro' || block.plan === 'board_exam_pass'
                ? '“Papers like my school’s” is part of Pro and the Board Exam Pass.'
                : 'This AI feature is part of a paid plan.'}{' '}
              Lessons, practice and tests stay free.
            </p>
          )}
        </div>
      )}
    </Dialog>
  );
}

export function AiNotice({ block, feature = 'AI help' }: { block: AiBlock; feature?: string }) {
  switch (block.kind) {
    case 'consent':
      return (
        <div className={s.notice} role="note" data-testid="ai-consent-needed">
          <Icon name="lock" size={20} />
          <div>
            <p>
              <strong>{feature} needs a parent’s approval.</strong> Ask a parent to approve your account from your profile. Lessons, practice and tests are always open.
            </p>
            <Link href="/me" className={s.textLink}>
              Go to your profile
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
