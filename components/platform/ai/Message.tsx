'use client';

/** One message in an AI thread (/ask, explain-this-slide). AI text: reviewed Markdown, images off (WEB-7). */
import { cx } from '@/components/platform/ui/cx';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { RichText } from '@/components/platform/ui/question/RichText';
import type { ChatMessage } from './useAiStream';
import s from './ai.module.css';

export function Message({ m }: { m: ChatMessage }) {
  const lang = m.language === 'hindi' ? 'hi' : undefined;
  if (m.role === 'user') {
    return (
      <li className={cx(s.msg, s.msgUser)} data-role="user">
        <span className="p-visually-hidden">You: </span>
        {m.text}
      </li>
    );
  }
  const selfHarm = m.refusalKind === 'self_harm';
  return (
    <li
      className={cx(s.msg, s.msgAi, m.status === 'refused' && s.msgRefusal, selfHarm && s.msgSelfHarm)}
      data-role="assistant"
      data-status={m.status}
      data-mode={m.mode}
      role={selfHarm ? 'alert' : undefined}
    >
      <span className={s.msgHead}>
        <Icon name="spark" size={14} /> AI tutor
        {m.mode === 'hint' && <Badge tone="accent">Hint</Badge>}
        {m.mode === 'full' && <Badge tone="success">Full solution</Badge>}
        {m.language === 'hinglish' && <Badge>Hinglish</Badge>}
      </span>
      <div className={s.msgBody} lang={lang}>
        {m.text ? (
          <RichText lang={lang} allowImages={false} headingOffset={3}>
            {m.text}
          </RichText>
        ) : m.status === 'streaming' ? (
          <span className={s.muted}>Thinking…</span>
        ) : null}
        {m.status === 'streaming' && m.text && <span className={s.cursor} aria-hidden="true" />}
      </div>
      {m.note && <p className={s.muted}>{m.note}</p>}
      {m.status === 'done' && m.text && <p className={s.sources}>AI can make mistakes. Check important answers with your teacher or book.</p>}
    </li>
  );
}
