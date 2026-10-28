'use client';

/**
 * Weekly goal setting (D-043): questions to solve for the first time each IST week, 5–300, saved with
 * `PATCH /v1/me { weeklyGoal }` (null = back to the default). Used on the dashboard and on /me → Profile.
 */
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/platform/ui/kit/Button';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { TextInput } from '@/components/platform/ui/kit/Field';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { api } from '../lib/api-browser';
import { problemMessage } from '../lib/problems';
import { GOAL_DEFAULT, GOAL_MAX, GOAL_MIN, parseGoal } from './model';
import s from './dashboard.module.css';

export interface SavedGoal {
  target: number;
  isDefault: boolean;
}

export function WeeklyGoalEditor({
  target,
  isDefault,
  onSaved,
  showSummary = false,
}: {
  target: number;
  isDefault: boolean;
  onSaved: (goal: SavedGoal) => void;
  /** Show "20 questions a week (default)" before the Change button (the /me profile). */
  showSummary?: boolean;
}) {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(String(target));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function save(next: number | null) {
    setBusy(true);
    setError(null);
    try {
      const me = await api.patch('/v1/me', { body: { weeklyGoal: next } });
      onSaved({ target: me.weeklyGoal.target, isDefault: me.weeklyGoal.isDefault });
      setValue(String(me.weeklyGoal.target));
      setOpen(false);
      toast.show({ title: 'Weekly goal saved', tone: 'success' });
    } catch (err) {
      setError(problemMessage(err));
    } finally {
      setBusy(false);
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const parsed = parseGoal(value);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    void save(parsed.value);
  }

  return (
    <div className={s.goalEdit} data-testid="weekly-goal-editor">
      {!open && (
        <div className={s.goalEditRow}>
          {showSummary && (
            <p className={s.muted} data-testid="weekly-goal-value">
              <b className={s.ink}>{target}</b> questions a week{isDefault ? ' (default)' : ''}
            </p>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setValue(String(target));
              setError(null);
              setOpen(true);
            }}
            data-testid="goal-change"
          >
            <Icon name="pencil" size={16} /> Change goal
          </Button>
        </div>
      )}
      {open && (
        <form className={s.goalForm} onSubmit={submit} noValidate>
          <TextInput
            label="Questions to solve each week"
            hint={`${GOAL_MIN} to ${GOAL_MAX}. Counts practice questions you solve for the first time, Monday to Sunday.`}
            type="number"
            inputMode="numeric"
            min={GOAL_MIN}
            max={GOAL_MAX}
            step={1}
            value={value}
            error={error ?? undefined}
            onChange={(e) => setValue(e.target.value)}
            name="weeklyGoal"
          />
          <div className={s.goalActions}>
            <Button type="submit" size="sm" loading={busy} data-testid="goal-save">
              Save goal
            </Button>
            {!isDefault && (
              <Button type="button" size="sm" variant="ghost" disabled={busy} onClick={() => void save(null)}>
                Use the default ({GOAL_DEFAULT})
              </Button>
            )}
            <Button type="button" size="sm" variant="ghost" disabled={busy} onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
