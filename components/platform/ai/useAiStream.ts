'use client';

/**
 * One AI conversation in the browser: sends an action, streams the reply into `messages`, keeps the
 * conversation id, updates the header balance from `meta`/`done`, and turns pre-stream problems into a
 * `block` (paywall, plan, consent, paused…). The stream is aborted when the component unmounts (F-008:
 * once text has appeared the student is charged; before that, refunded).
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import type { AiActionId, AiActionRequest } from '@/platform/shared/api-client';
import { useCredits } from './CreditsProvider';
import { aiBlockFrom, newIdempotencyKey, type AiBlock } from './problems';
import { streamAiAction, type AiStreamEvent } from './sse';

export type MessageStatus = 'streaming' | 'done' | 'refused' | 'error' | 'stopped';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  status: MessageStatus;
  mode?: 'hint' | 'full' | 'explain';
  language?: 'english' | 'hinglish' | 'hindi';
  refusalKind?: string;
  /** Our own note under the message (refund / charge information). */
  note?: string;
  action?: AiActionId;
}

let seq = 0;
const localId = () => `m${Date.now().toString(36)}${(seq++).toString(36)}`;

const ERROR_TEXT: Record<string, string> = {
  ai_unavailable: 'The AI helper is not available right now.',
  ai_failed: 'The AI could not finish this answer.',
  ai_interrupted: 'The answer was cut off.',
  internal: 'Something went wrong while answering.',
};

export function applyEvent(m: ChatMessage, ev: AiStreamEvent): ChatMessage {
  switch (ev.type) {
    case 'meta':
      return { ...m, mode: ev.data.mode, language: ev.data.language };
    case 'delta':
      return { ...m, text: m.text + (typeof ev.data.text === 'string' ? ev.data.text : '') };
    case 'refusal':
      return { ...m, status: 'refused', text: ev.data.message, refusalKind: ev.data.kind, note: ev.data.creditsRefunded ? 'Your credits were refunded.' : undefined };
    case 'error': {
      const refunded = typeof ev.data.creditsRefunded === 'number' && ev.data.creditsRefunded > 0;
      const base = ERROR_TEXT[ev.data.code] ?? ERROR_TEXT.internal!;
      return { ...m, status: 'error', note: `${base} ${refunded ? 'Your credits were refunded.' : m.text ? 'The part shown was charged.' : ''}`.trim() };
    }
    case 'done':
      return m.status === 'streaming' ? { ...m, status: 'done' } : m;
  }
}

export interface SendOptions {
  /** The student's words shown in the thread (omit for "show full solution" style follow-ups). */
  userText?: string;
  /** Reuse a key when retrying the same question. */
  idempotencyKey?: string;
}

export function useAiStream() {
  const { setBalance } = useCredits();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [block, setBlock] = useState<AiBlock | null>(null);
  const abort = useRef<AbortController | null>(null);
  const conv = useRef<string | null>(null);

  useEffect(() => () => abort.current?.abort(), []);

  const setConversation = useCallback((id: string | null) => {
    conv.current = id;
    setConversationId(id);
  }, []);

  const stop = useCallback(() => abort.current?.abort(), []);

  /** Returns false when the request was refused before streaming (the caller keeps the input). */
  const send = useCallback(
    async (action: AiActionId, body: AiActionRequest, opts: SendOptions = {}): Promise<boolean> => {
      if (abort.current) return false;
      const controller = new AbortController();
      abort.current = controller;
      setBusy(true);
      setBlock(null);
      const userId = localId();
      const aiId = localId();
      setMessages((list) => [
        ...list,
        ...(opts.userText ? [{ id: userId, role: 'user' as const, text: opts.userText, status: 'done' as const, action }] : []),
        { id: aiId, role: 'assistant', text: '', status: 'streaming', action },
      ]);
      const patch = (fn: (m: ChatMessage) => ChatMessage) => setMessages((list) => list.map((m) => (m.id === aiId ? fn(m) : m)));
      let started = false;
      try {
        await streamAiAction(action, { ...body, ...(conv.current ? { conversationId: conv.current } : {}) }, {
          idempotencyKey: opts.idempotencyKey ?? newIdempotencyKey(),
          signal: controller.signal,
          onEvent: (ev) => {
            started = true;
            if (ev.type === 'meta') {
              if (ev.data.conversationId) setConversation(ev.data.conversationId);
              if (typeof ev.data.balance === 'number') setBalance(ev.data.balance);
            }
            if ((ev.type === 'done' || ev.type === 'refusal' || ev.type === 'error') && typeof ev.data.balance === 'number') setBalance(ev.data.balance);
            patch((m) => applyEvent(m, ev));
          },
        });
        patch((m) => (m.status === 'streaming' ? { ...m, status: m.text ? 'done' : 'error', note: m.text ? undefined : 'No answer arrived. Please try again.' } : m));
        return true;
      } catch (err) {
        if ((err as { name?: string })?.name === 'AbortError') {
          patch((m) => ({ ...m, status: 'stopped', note: m.text ? 'Stopped. The part shown was charged.' : 'Stopped before the answer started. Your credits were refunded.' }));
          return true;
        }
        if (started) {
          patch((m) => ({ ...m, status: 'error', note: 'The connection dropped. Please try again.' }));
          return true;
        }
        // Refused before streaming: take the turn back out of the thread and say why.
        setMessages((list) => list.filter((m) => m.id !== aiId && m.id !== userId));
        setBlock(aiBlockFrom(err));
        return false;
      } finally {
        abort.current = null;
        setBusy(false);
      }
    },
    [setBalance, setConversation],
  );

  const reset = useCallback(() => {
    abort.current?.abort();
    setMessages([]);
    setConversation(null);
    setBlock(null);
  }, [setConversation]);

  return { messages, setMessages, conversationId, setConversation, busy, block, setBlock, send, stop, reset };
}
