'use client';

/**
 * The report form: reason (required), optional comment (≤ 1,000 characters, plain text; staff see it as
 * text), POST /v1/content-reports. Friendly confirmation; daily limits (20 per user, 50 per network) get
 * their own message.
 */
import { useId, useState } from 'react';
import { isApiError, type ContentReportRequest } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { api } from '../lib/api-browser';
import type { ReportTarget } from './ReportMistake';
import s from './report.module.css';

export const REPORT_REASONS: { value: ContentReportRequest['reason']; label: string }[] = [
  { value: 'wrong_answer', label: 'The answer is wrong' },
  { value: 'wrong_content', label: 'Something is factually wrong' },
  { value: 'typo', label: 'Spelling or grammar mistake' },
  { value: 'rendering', label: 'Maths, diagram or text does not show properly' },
  { value: 'audio', label: 'Problem with the narration audio' },
  { value: 'inappropriate', label: 'Inappropriate content' },
  { value: 'other', label: 'Something else' },
];

export const MAX_COMMENT = 1000;

export function reportErrorMessage(err: unknown): string {
  if (isApiError(err, 'rate_limited')) return 'You have sent a lot of reports today. Thank you! Please try again tomorrow.';
  if (isApiError(err, 'validation_failed')) return 'Please choose a reason and keep the comment under 1,000 characters.';
  if (isApiError(err, 'not_found')) return 'This content has changed since you opened it. Reload the page and try again.';
  if (isApiError(err) && (err.code === 'network_error' || err.status >= 500)) return 'We could not reach SOYL Academy. Check your connection and try again.';
  return 'Could not send the report. Please try again.';
}

export function ReportDialog({ open, onClose, target, what }: { open: boolean; onClose: () => void; target: ReportTarget; what: string }) {
  const id = useId();
  const [reason, setReason] = useState<ContentReportRequest['reason'] | ''>('');
  const [comment, setComment] = useState('');
  const [state, setState] = useState<{ status: 'idle' | 'sending' | 'sent' | 'error'; message?: string }>({ status: 'idle' });

  const close = () => {
    onClose();
    if (state.status === 'sent') {
      setReason('');
      setComment('');
      setState({ status: 'idle' });
    }
  };

  const send = async () => {
    if (!reason) {
      setState({ status: 'error', message: 'Choose what is wrong.' });
      return;
    }
    setState({ status: 'sending' });
    try {
      const body: ContentReportRequest = { ...target, reason };
      const text = comment.trim();
      if (text) body.comment = text.slice(0, MAX_COMMENT);
      await api.post('/v1/content-reports', { body });
      setState({ status: 'sent' });
    } catch (err) {
      setState({ status: 'error', message: reportErrorMessage(err) });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      title={state.status === 'sent' ? 'Thank you!' : 'Report a mistake'}
      description={state.status === 'sent' ? undefined : `Tell us what is wrong with ${what}. Our team checks every report.`}
      footer={
        state.status === 'sent' ? (
          <Button onClick={close}>Done</Button>
        ) : (
          <>
            <Button variant="ghost" onClick={close}>
              Cancel
            </Button>
            <Button onClick={() => void send()} loading={state.status === 'sending'}>
              Send report
            </Button>
          </>
        )
      }
    >
      {state.status === 'sent' ? (
        <p className={s.sent} role="status" data-testid="report-sent">
          <Icon name="check" size={20} /> We have your report. Our team checks reports within a day and fixes mistakes for every student.
        </p>
      ) : (
        <form
          className={s.form}
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <fieldset className={s.reasons}>
            <legend className={s.legend}>What is wrong?</legend>
            {REPORT_REASONS.map((r) => (
              <label key={r.value} className={s.reason}>
                <input type="radio" name={`${id}-reason`} value={r.value} checked={reason === r.value} onChange={() => setReason(r.value)} />
                {r.label}
              </label>
            ))}
          </fieldset>
          <label htmlFor={`${id}-comment`} className={s.legend}>
            Details <span className={s.optional}>(optional)</span>
          </label>
          <textarea
            id={`${id}-comment`}
            className={s.comment}
            rows={4}
            maxLength={MAX_COMMENT}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            aria-describedby={`${id}-comment-hint`}
          />
          <p id={`${id}-comment-hint`} className={s.hint}>
            {comment.length}/{MAX_COMMENT}. Please do not include your name, phone number or email.
          </p>
          {state.status === 'error' && (
            <p className={s.error} role="alert" data-testid="report-error">
              <Icon name="alert" size={16} /> {state.message}
            </p>
          )}
        </form>
      )}
    </Dialog>
  );
}
