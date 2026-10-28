'use client';

/**
 * /ask — the AI tutor (ARCHITECTURE §3.1, §10; ai-gateway M4 handoff "What web needs"; CONTEXT §6):
 * - the cost of every question is quoted before it is sent; the balance stays in the header chip;
 * - replies stream in (SSE over fetch, Idempotency-Key, AbortController "Stop");
 * - hint first, then "Show full solution" or "Check my working" in the same conversation;
 * - the reply's language follows the student (English, Hinglish; Hindi for Hindi subjects) — the server
 *   decides, we only mark Hindi text with lang="hi";
 * - photo doubts: the photo is re-encoded in the browser (≤ 2048 px, ≤ 4 MB, EXIF removed) and uploaded
 *   straight to storage before the question is sent;
 * - conversation history (30 days); paywall, plan, consent-needed, paused and unavailable states.
 * AI text renders through the reviewed Markdown renderer with images off (WEB-7).
 */
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { isApiError, type AiActionId, type AiConversation, type AiQuote } from '@/platform/shared/api-client';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, EmptyState } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { trackInterest } from '../lib/interest';
import { AiNotice, PaywallDialog, QuoteDialog } from './AiDialogs';
import { useCredits } from './CreditsProvider';
import { aiBlockFrom, aiMessage, creditsText, type AiBlock } from './problems';
import { prepareFile, uploadForAi, UploadRejected } from './upload';
import { Message } from './Message';
import { useAiStream } from './useAiStream';
import s from './ai.module.css';

type AskMode = 'quick-doubt' | 'hard-doubt' | 'photo-doubt';

const MODES: { id: AskMode; label: string; blurb: string }[] = [
  { id: 'quick-doubt', label: 'Quick doubt', blurb: 'A short explanation' },
  { id: 'hard-doubt', label: 'Step by step', blurb: 'Worked solution, step by step' },
  { id: 'photo-doubt', label: 'Photo of a question', blurb: 'Snap the question from your book' },
];

const DEFAULT_PRICE: Record<AskMode, number> = { 'quick-doubt': 1, 'hard-doubt': 6, 'photo-doubt': 10 };

interface Pending {
  action: AiActionId;
  body: { message?: string; attempt?: string; reveal?: boolean; uploadId?: string };
  userText?: string;
  what: string;
}

export function AskClient() {
  const { state, openLogin } = useSession();
  if (state.status === 'loading') return <p className={s.muted}>Loading…</p>;
  if (state.status === 'guest') {
    return (
      <EmptyState
        title="Log in to ask the AI tutor"
        headingLevel="h2"
        icon="chat"
        action={<Button onClick={() => openLogin({ reason: 'Log in to ask the AI tutor. You get 25 free AI credits every day.' })}>Log in</Button>}
      >
        Ask any doubt from your syllabus and get a hint first, then the full solution. 25 free credits every day.
      </EmptyState>
    );
  }
  if (state.consent !== 'granted') return <AiNotice block={{ kind: 'consent' }} feature="The AI tutor" />;
  return <Tutor />;
}

function Tutor() {
  const { credits } = useCredits();
  const chat = useAiStream();
  const [mode, setMode] = useState<AskMode>('quick-doubt');
  const [text, setText] = useState('');
  const [attemptText, setAttemptText] = useState('');
  const [photo, setPhoto] = useState<{ file: File; preview: string } | null>(null);
  const [uploadStage, setUploadStage] = useState<'idle' | 'preparing' | 'uploading' | 'checking'>('idle');
  const [pending, setPending] = useState<Pending | null>(null);
  const [quote, setQuote] = useState<AiQuote | null>(null);
  const [quoteBusy, setQuoteBusy] = useState(false);
  const [problem, setProblem] = useState<AiBlock | null>(null);
  const [history, setHistory] = useState<AiConversation[] | null>(null);
  const textId = useId();
  const attemptId = useId();
  const endRef = useRef<HTMLDivElement>(null);

  const price = (a: AskMode) => credits?.prices.find((p) => p.action === a)?.credits ?? DEFAULT_PRICE[a];
  const block = problem ?? chat.block;

  useEffect(() => {
    if (photo) return () => URL.revokeObjectURL(photo.preview);
    return undefined;
  }, [photo]);

  const loadHistory = useCallback(async () => {
    try {
      const res = await api.get('/v1/ai/conversations', { query: { limit: 20 } });
      setHistory(res.conversations);
    } catch {
      setHistory([]);
    }
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- history list on mount
    void loadHistory();
  }, [loadHistory]);

  // D-045 interest counter (aggregate; only after analytics consent).
  useEffect(() => trackInterest('ask_ai_open'), []);

  useEffect(() => {
    endRef.current?.scrollIntoView?.({ block: 'nearest' });
  }, [chat.messages.length]);

  /** Step 1: quote the cost (CONTEXT §6), then wait for the student's confirmation. */
  const ask = async (p: Pending) => {
    setProblem(null);
    chat.setBlock(null);
    setQuoteBusy(true);
    try {
      const q = await api.get('/v1/ai/quote/{action}', { params: { action: p.action } });
      if (q.status === 'paused') {
        setProblem({ kind: 'paused', retryAfterSeconds: q.resetInSeconds });
        return;
      }
      if (!q.allowedForPlan) {
        setProblem({ kind: 'plan', plan: null, plansUrl: '/plans' });
        return;
      }
      if (!q.affordable) {
        setProblem({ kind: 'paywall', balance: q.balance, required: q.credits, resetAt: q.resetAt, resetInSeconds: q.resetInSeconds, plansUrl: '/plans' });
        return;
      }
      setQuote(q);
      setPending(p);
    } catch (err) {
      setProblem(aiBlockFrom(err));
    } finally {
      setQuoteBusy(false);
    }
  };

  /** Step 2: confirmed → (photo upload) → stream. */
  const confirm = async () => {
    const p = pending;
    setPending(null);
    setQuote(null);
    if (!p) return;
    let body = p.body;
    if (p.action === 'photo-doubt' && !body.uploadId) {
      if (!photo) return;
      try {
        setUploadStage('preparing');
        const prepared = await prepareFile(photo.file);
        const up = await uploadForAi({ kind: 'photo_doubt', blob: prepared.blob, contentType: prepared.contentType, onStage: setUploadStage });
        body = { ...body, uploadId: up.id };
        lastUpload.current = up.id;
      } catch (err) {
        setUploadStage('idle');
        setProblem(err instanceof UploadRejected ? { kind: 'other', message: err.message } : isApiError(err) ? aiBlockFrom(err) : { kind: 'other', message: 'We could not read that photo. Try another one.' });
        return;
      }
      setUploadStage('idle');
    }
    const ok = await chat.send(p.action, body, { userText: p.userText });
    if (ok) {
      if (p.userText === text.trim() || p.action === 'photo-doubt') setText('');
      if (p.body.attempt) setAttemptText('');
      if (p.action === 'photo-doubt') setPhoto(null);
      void loadHistory();
    }
  };

  const lastUpload = useRef<string | null>(null);
  const lastAi = [...chat.messages].reverse().find((m) => m.role === 'assistant');
  const lastAction = (lastAi?.action ?? mode) as AiActionId;
  const canFollowUp = !!lastAi && lastAi.status === 'done' && lastAi.mode === 'hint' && !chat.busy && chat.conversationId;

  const submit = () => {
    const message = text.trim();
    if (mode === 'photo-doubt') {
      if (!photo) {
        setProblem({ kind: 'other', message: 'Add a photo of the question first.' });
        return;
      }
      void ask({ action: 'photo-doubt', body: message ? { message } : {}, userText: message || 'Photo of my question', what: 'this photo' });
      return;
    }
    if (!message) {
      setProblem({ kind: 'other', message: 'Type your question first.' });
      return;
    }
    void ask({ action: mode, body: { message }, userText: message, what: 'this question' });
  };

  const revealBody = (extra: Pending['body']): Pending['body'] => (lastAction === 'photo-doubt' && lastUpload.current ? { ...extra, uploadId: lastUpload.current } : extra);

  const openConversation = async (c: AiConversation) => {
    try {
      const res = await api.get('/v1/ai/conversations/{id}', { params: { id: c.id } });
      chat.reset();
      chat.setConversation(res.conversation.id);
      chat.setMessages(res.messages.map((m) => ({ id: m.id, role: m.role, text: m.content, status: 'done' as const })));
    } catch (err) {
      setProblem({ kind: 'other', message: aiMessage(err) });
    }
  };

  return (
    <div className={s.ask} data-testid="ask">
      {chat.messages.length > 0 && (
        <ol className={s.thread} aria-label="Conversation" aria-live="polite" data-testid="thread">
          {chat.messages.map((m) => (
            <Message key={m.id} m={m} />
          ))}
        </ol>
      )}
      <div ref={endRef} />

      {canFollowUp && (
        <div className={s.composer} data-testid="follow-up">
          <p className={s.muted}>That was a hint. Try the next step yourself, or see the full solution.</p>
          <label htmlFor={attemptId} className={s.muted}>
            Your working (optional)
          </label>
          <textarea id={attemptId} className={s.textarea} value={attemptText} onChange={(e) => setAttemptText(e.target.value.slice(0, 2000))} rows={3} />
          <div className={s.composerRow}>
            <Button
              variant="secondary"
              disabled={!attemptText.trim()}
              loading={quoteBusy}
              onClick={() => void ask({ action: lastAction, body: revealBody({ message: 'Here is my working. Please check it.', attempt: attemptText.trim() }), userText: attemptText.trim(), what: 'checking your working' })}
            >
              Check my working
            </Button>
            <Button
              loading={quoteBusy}
              onClick={() => void ask({ action: lastAction, body: revealBody({ message: 'Please show me the full solution.', reveal: true }), userText: 'Show me the full solution', what: 'the full solution' })}
              data-testid="reveal"
            >
              Show full solution
            </Button>
          </div>
        </div>
      )}

      {block && block.kind !== 'paywall' && block.kind !== 'plan' && <AiNotice block={block} />}

      <form
        className={s.composer}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        aria-label="Ask a question"
      >
        <fieldset className={s.modes}>
          <legend className="p-visually-hidden">What kind of help?</legend>
          {MODES.map((m) => (
            <label key={m.id} className={cx(s.mode, mode === m.id && s.modeOn)}>
              <input type="radio" name="ask-mode" value={m.id} checked={mode === m.id} onChange={() => setMode(m.id)} />
              {m.label} <Badge>{creditsText(price(m.id))}</Badge>
            </label>
          ))}
        </fieldset>
        <label htmlFor={textId} className={s.muted}>
          {mode === 'photo-doubt' ? 'Anything to add? (optional)' : 'Your question'}
        </label>
        <textarea
          id={textId}
          className={s.textarea}
          value={text}
          maxLength={2000}
          onChange={(e) => setText(e.target.value)}
          placeholder={mode === 'photo-doubt' ? 'e.g. I am stuck on part (b)' : 'e.g. Why does iron rust faster near the sea?'}
          data-testid="ask-input"
        />
        {mode === 'photo-doubt' && (
          <div className={s.photo}>
            <label className={s.fileLabel}>
              <Icon name="camera" size={18} /> {photo ? 'Change photo' : 'Add a photo'}
              <input
                className={s.fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                capture="environment"
                data-testid="photo-input"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) setPhoto({ file: f, preview: URL.createObjectURL(f) });
                  e.target.value = '';
                }}
              />
            </label>
            {photo && (
              // eslint-disable-next-line @next/next/no-img-element -- local preview (blob: URL), never a remote image
              <img src={photo.preview} alt="Your photo of the question" />
            )}
            {uploadStage !== 'idle' && <span role="status">{uploadStage === 'checking' ? 'Checking the photo…' : 'Uploading…'}</span>}
          </div>
        )}
        <div className={s.composerRow}>
          <span className={s.muted}>{credits ? `${creditsText(credits.balance)} left today` : ''}</span>
          {chat.busy ? (
            <Button variant="secondary" icon="stop" onClick={chat.stop} data-testid="stop">
              Stop
            </Button>
          ) : (
            <Button type="submit" icon="send" loading={quoteBusy || uploadStage !== 'idle'} data-testid="ask-send">
              Ask ({creditsText(price(mode))})
            </Button>
          )}
        </div>
      </form>

      <details className={s.history}>
        <summary>
          <Icon name="chat" size={18} /> Your recent chats
        </summary>
        {history === null ? (
          <p className={s.muted}>Loading…</p>
        ) : history.length === 0 ? (
          <p className={s.muted}>No chats yet. Chats are kept for 30 days.</p>
        ) : (
          <ul className={s.historyList}>
            {history.map((c) => (
              <li key={c.id}>
                <button type="button" className={s.historyItem} onClick={() => void openConversation(c)}>
                  <span>{c.title || 'Untitled chat'}</span>
                  <span>{new Date(c.lastMessageAt ?? c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {chat.messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={chat.reset}>
            Start a new chat
          </Button>
        )}
      </details>

      <QuoteDialog
        open={pending !== null}
        quote={quote}
        what={pending?.what ?? 'this'}
        onClose={() => {
          setPending(null);
          setQuote(null);
        }}
        onConfirm={() => void confirm()}
      />
      <PaywallDialog
        block={block && (block.kind === 'paywall' || block.kind === 'plan') ? block : null}
        onClose={() => {
          setProblem(null);
          chat.setBlock(null);
        }}
      />
    </div>
  );
}
