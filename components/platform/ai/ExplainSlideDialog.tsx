'use client';

import { useEffect, useState } from 'react';
import type { AiQuote } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { AiNotice, PaywallDialog, ResetCountdown } from './AiDialogs';
import { aiBlockFrom, creditsText, type AiBlock } from './problems';
import { Message } from './Message';
import { useAiStream } from './useAiStream';
import s from './ai.module.css';

export function ExplainSlideDialog({ open, onClose, chapterId, part, slideId, slideNumber }: { open: boolean; onClose: () => void; chapterId: string; part: number; slideId: string; slideNumber: number }) {
  const { state } = useSession();
  const chat = useAiStream();
  const [quote, setQuote] = useState<AiQuote | null>(null);
  const [problem, setProblem] = useState<AiBlock | null>(null);
  const consent = state.status === 'member' && state.consent === 'granted';

  // A different slide is a fresh explanation.
  const { reset } = chat;
  useEffect(() => {
    reset();
  }, [slideId, reset]);

  useEffect(() => {
    if (!open || !consent) return;
    let alive = true;
    api
      .get('/v1/ai/quote/{action}', { params: { action: 'explain-slide' } })
      .then((q) => alive && setQuote(q))
      .catch((err) => alive && setProblem(aiBlockFrom(err)));
    return () => {
      alive = false;
    };
  }, [open, consent]);

  const explain = () => {
    setProblem(null);
    void chat.send('explain-slide', { chapterId, slide: { part, slideId } });
  };

  const block = problem ?? chat.block;
  const answer = chat.messages.find((m) => m.role === 'assistant');

  return (
    <>
      <Dialog open={open} onClose={onClose} title={`Explain slide ${slideNumber}`} description="The AI explains this slide in simpler words.">
        <div className={s.explain} data-testid="explain-dialog">
          {!consent ? (
            <AiNotice block={{ kind: 'consent' }} />
          ) : answer ? (
            <ol className={s.thread}>
              <Message m={answer} />
            </ol>
          ) : quote ? (
            quote.status === 'paused' ? (
              <AiNotice block={{ kind: 'paused', retryAfterSeconds: quote.resetInSeconds }} />
            ) : quote.affordable ? (
              <>
                <p className={s.muted}>
                  This costs {creditsText(quote.credits)}. You have {creditsText(quote.balance)} left today.
                </p>
                <Button onClick={explain} icon="spark" data-testid="explain-confirm">
                  Explain for {creditsText(quote.credits)}
                </Button>
              </>
            ) : (
              <p className={s.warnText}>
                You have used today’s AI credits. They reset <ResetCountdown resetAt={quote.resetAt} resetInSeconds={quote.resetInSeconds} />.
              </p>
            )
          ) : block === null ? (
            <p className={s.muted}>Checking the cost…</p>
          ) : null}
          {block && block.kind !== 'paywall' && block.kind !== 'plan' && <AiNotice block={block} />}
          {chat.busy && (
            <Button variant="secondary" size="sm" icon="stop" onClick={chat.stop}>
              Stop
            </Button>
          )}
        </div>
      </Dialog>
      <PaywallDialog block={block && (block.kind === 'paywall' || block.kind === 'plan') ? block : null} onClose={() => setProblem(null)} />
    </>
  );
}
