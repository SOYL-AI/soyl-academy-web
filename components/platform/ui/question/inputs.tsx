'use client';

/**
 * Answer inputs, one per response kind. Presentational and controlled: the card owns the draft. Every
 * input is a native form control with a visible label (no custom widgets where a native one works), 44 px
 * targets, and works at 360 px. After the answer is checked (`reveal`), the inputs lock and mark what was
 * right; the correct answer itself comes from the server's response, never from the page (F-006).
 */
import { useId, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from '../kit/Icon';
import { blankCount, letter, wordCount, type Draft, type QuestionPart } from './model';
import type { PartSlots } from './slots';
import { MAP_PLACE_SUGGESTIONS, mapLabelsFromStem } from './map-places';
import s from './question.module.css';

export interface InputProps<D extends Draft> {
  part: QuestionPart;
  slots: PartSlots;
  draft: D;
  onChange: (draft: D) => void;
  disabled?: boolean;
  /** Group label for screen readers ("Answer for question 3"). */
  label: string;
  lang?: string;
}

/* ── Choices: mcq, assertion-reason, true-false (radio) and multi-select (checkbox) ──────────────── */

export interface ChoiceReveal {
  correctIds: string[];
}

export function ChoiceInput({ part, slots, draft, onChange, disabled, label, lang, reveal }: InputProps<Extract<Draft, { kind: 'choice' }>> & { reveal?: ChoiceReveal | null }) {
  const name = useId();
  const multi = part.type === 'multi-select';
  const toggle = (id: string) => {
    if (multi) onChange({ kind: 'choice', ids: draft.ids.includes(id) ? draft.ids.filter((x) => x !== id) : [...draft.ids, id] });
    else onChange({ kind: 'choice', ids: [id] });
  };
  return (
    <fieldset className={s.fieldset} disabled={disabled} data-input="choice">
      <legend className="p-visually-hidden">
        {label}
        {multi ? ': select all that apply' : ''}
      </legend>
      {multi && <p className={s.inputHint}>Select all that apply.</p>}
      <ul className={s.options} lang={lang}>
        {part.options.map((o, i) => {
          const chosen = draft.ids.includes(o.id);
          const correct = reveal?.correctIds.includes(o.id) ?? false;
          const state = reveal ? (correct ? 'correct' : chosen ? 'wrong' : 'idle') : chosen ? 'chosen' : 'idle';
          return (
            <li key={o.id}>
              <label className={cx(s.option, s[`option-${state}`])} data-option-id={o.id} data-state={state}>
                <input type={multi ? 'checkbox' : 'radio'} name={name} value={o.id} checked={chosen} onChange={() => toggle(o.id)} className={s.optionControl} />
                <span className={s.optionLetter} aria-hidden="true">
                  {letter(i)}
                </span>
                <span className={s.optionText}>{slots.options[o.id]}</span>
                {reveal && (correct || chosen) && (
                  <span className={s.optionVerdict}>
                    <Icon name={correct ? 'check' : 'close'} size={18} />
                    <span>{correct ? (chosen ? 'Your answer · correct' : 'Correct answer') : 'Your answer'}</span>
                  </span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

/* ── Numerical ───────────────────────────────────────────────────────────────────────────────────── */

export function NumericalInput({ draft, onChange, disabled, error }: InputProps<Extract<Draft, { kind: 'value' }>> & { error?: string | null }) {
  const id = useId();
  return (
    <div className={s.field} data-input="numerical">
      <label htmlFor={id} className={s.fieldLabel}>
        Your answer <span className={s.fieldNote}>(number only)</span>
      </label>
      <input
        id={id}
        className={cx(s.textInput, s.numberInput)}
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={draft.text}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange({ kind: 'value', text: e.target.value.slice(0, 40) })}
      />
    </div>
  );
}

/* ── Fill in the blanks ──────────────────────────────────────────────────────────────────────────── */

export function BlanksInput({ part, draft, onChange, disabled, label, lang, blanksCorrect }: InputProps<Extract<Draft, { kind: 'blanks' }>> & { blanksCorrect?: boolean[] | null }) {
  const base = useId();
  const n = Math.max(1, blankCount(part.stem_md), draft.values.length);
  const values = Array.from({ length: n }, (_, i) => draft.values[i] ?? '');
  return (
    <fieldset className={s.fieldset} disabled={disabled} data-input="fill-blank">
      <legend className="p-visually-hidden">{label}</legend>
      <ol className={s.blanks}>
        {values.map((v, i) => {
          const ok = blanksCorrect?.[i];
          return (
            <li key={i} className={s.field}>
              <label htmlFor={`${base}-${i}`} className={s.fieldLabel}>
                Blank ({i + 1})
              </label>
              <span className={s.inputRow}>
                <input
                  id={`${base}-${i}`}
                  className={s.textInput}
                  value={v}
                  lang={lang}
                  autoComplete="off"
                  autoCapitalize="off"
                  onChange={(e) => {
                    const next = [...values];
                    next[i] = e.target.value.slice(0, 200);
                    onChange({ kind: 'blanks', values: next });
                  }}
                />
                {ok !== undefined && ok !== null && (
                  <span className={cx(s.verdictInline, ok ? s.good : s.bad)}>
                    <Icon name={ok ? 'check' : 'close'} size={18} />
                    {ok ? 'Correct' : 'Not correct'}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </fieldset>
  );
}

/* ── Match the columns ───────────────────────────────────────────────────────────────────────────── */

export function MatchInput({ part, slots, draft, onChange, disabled, label, lang, correctPairs }: InputProps<Extract<Draft, { kind: 'pairs' }>> & { correctPairs?: Record<string, string> | null }) {
  const base = useId();
  const rightLabel = new Map(part.match_right.map((r, i) => [r.id, letter(i)]));
  return (
    <fieldset className={s.fieldset} disabled={disabled} data-input="match">
      <legend className="p-visually-hidden">{label}</legend>
      <div className={s.matchColumns} lang={lang}>
        <div>
          <p className={s.columnTitle}>Column B</p>
          <ul className={s.rightList}>
            {part.match_right.map((r, i) => (
              <li key={r.id}>
                <span className={s.optionLetter} aria-hidden="true">
                  {letter(i)}
                </span>
                <span className="p-visually-hidden">{letter(i)}: </span>
                <span>{slots.right[r.id]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className={s.columnTitle}>Column A — choose the matching letter</p>
          <ol className={s.matchList}>
            {part.options.map((o, i) => {
              const chosen = draft.pairs[o.id] ?? '';
              const want = correctPairs?.[o.id];
              const verdict = correctPairs ? (want === chosen ? 'good' : 'bad') : null;
              return (
                <li key={o.id} className={s.matchRow}>
                  <label htmlFor={`${base}-${o.id}`} className={s.matchLeft}>
                    <span className={s.optionNumber}>{i + 1}.</span> {slots.options[o.id]}
                  </label>
                  <span className={s.inputRow}>
                    <select
                      id={`${base}-${o.id}`}
                      className={s.select}
                      value={chosen}
                      onChange={(e) => onChange({ kind: 'pairs', pairs: { ...draft.pairs, [o.id]: e.target.value } })}
                    >
                      <option value="">Choose…</option>
                      {part.match_right.map((r) => (
                        <option key={r.id} value={r.id}>
                          {rightLabel.get(r.id)}
                        </option>
                      ))}
                    </select>
                    {verdict && (
                      <span className={cx(s.verdictInline, verdict === 'good' ? s.good : s.bad)}>
                        <Icon name={verdict === 'good' ? 'check' : 'close'} size={18} />
                        {verdict === 'good' ? 'Correct' : `Answer: ${want ? rightLabel.get(want) : '—'}`}
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </fieldset>
  );
}

/* ── Written answers: short, long, writing, code-output ──────────────────────────────────────────── */

export function WordCounter({ text, limit, id }: { text: string; limit?: { min: number; max: number } | null; id?: string }) {
  const n = wordCount(text);
  let status: 'under' | 'ok' | 'over' | null = null;
  if (limit) status = n < limit.min ? 'under' : n > limit.max ? 'over' : 'ok';
  return (
    <p id={id} className={cx(s.wordCounter, status === 'over' && s.bad, status === 'ok' && s.good)} data-words={n} data-status={status ?? undefined}>
      {n} {n === 1 ? 'word' : 'words'}
      {limit ? ` · aim for ${limit.min}–${limit.max}` : ''}
      {status === 'over' ? ' (over the limit)' : status === 'under' && n > 0 ? ' (a little short)' : ''}
    </p>
  );
}

export function TextAnswerInput({
  part,
  draft,
  onChange,
  disabled,
  lang,
  mono,
}: InputProps<Extract<Draft, { kind: 'text' | 'output' }>> & { mono?: boolean }) {
  const id = useId();
  const limit = part.word_limit ?? null;
  const long = part.type === 'long' || part.type === 'writing';
  return (
    <div className={s.field} data-input={mono ? 'code-output' : 'text'}>
      <label htmlFor={id} className={s.fieldLabel}>
        {mono ? 'Your answer: the exact output' : 'Your answer'}
        {limit && !mono && <span className={s.fieldNote}> · answer in {limit.min}–{limit.max} words</span>}
      </label>
      <textarea
        id={id}
        className={cx(s.textarea, mono && s.mono, long && s.textareaTall)}
        value={draft.text}
        lang={mono ? 'en' : lang}
        disabled={disabled}
        spellCheck={!mono}
        autoCapitalize={mono ? 'off' : 'sentences'}
        autoCorrect={mono ? 'off' : undefined}
        wrap={mono ? 'off' : 'soft'}
        rows={mono ? 4 : long ? 10 : 5}
        aria-describedby={mono ? undefined : `${id}-count`}
        onChange={(e) => onChange({ kind: draft.kind, text: e.target.value.slice(0, 20_000) } as typeof draft)}
      />
      {!mono && <WordCounter id={`${id}-count`} text={draft.text} limit={limit} />}
      {mono && <p className={s.inputHint}>Type the output exactly, line by line. Spaces inside a line count.</p>}
    </div>
  );
}

/* ── Map work (until outline map assets exist) ───────────────────────────────────────────────────── */

/**
 * Map questions name places (labelled A, B, …) to locate or identify. Until outline maps ship, students
 * work on their printed map and type the names here; suggestions come from a small gazetteer per
 * `map_id`. `renderMap` is the slot for an SVG outline map later (same values, same callbacks).
 */
export interface MapSurfaceProps {
  mapId?: string;
  labels: string[];
  values: Record<string, string>;
  onPick: (label: string, place: string) => void;
}

export function MapInput({
  part,
  draft,
  onChange,
  disabled,
  label,
  lang,
  renderMap,
}: InputProps<Extract<Draft, { kind: 'text' }>> & { renderMap?: (props: MapSurfaceProps) => ReactNode }) {
  const base = useId();
  const labels = mapLabelsFromStem(part.stem_md);
  const values = parseMapText(draft.text, labels);
  const suggestions = MAP_PLACE_SUGGESTIONS[part.map_id ?? ''] ?? [];
  const set = (l: string, v: string) => onChange({ kind: 'text', text: formatMapText(labels, { ...values, [l]: v.slice(0, 120) }) });
  return (
    <fieldset className={s.fieldset} disabled={disabled} data-input="map" data-map-id={part.map_id ?? ''}>
      <legend className="p-visually-hidden">{label}</legend>
      {renderMap ? (
        renderMap({ mapId: part.map_id, labels, values, onPick: set })
      ) : (
        <p className={s.mapNote}>
          <Icon name="info" size={18} />
          <span>Mark these on your printed outline map{part.map_id ? ` (${part.map_id.replace(/-/g, ' ')})` : ''}, then write the names here.</span>
        </p>
      )}
      {suggestions.length > 0 && (
        <datalist id={`${base}-places`}>
          {suggestions.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>
      )}
      <ul className={s.blanks}>
        {labels.map((l) => (
          <li key={l} className={s.field}>
            <label htmlFor={`${base}-${l}`} className={s.fieldLabel}>
              Place {l}
            </label>
            <input
              id={`${base}-${l}`}
              className={s.textInput}
              value={values[l] ?? ''}
              lang={lang}
              list={suggestions.length ? `${base}-places` : undefined}
              autoComplete="off"
              onChange={(e) => set(l, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

/** "A: Kerala\nB: Mumbai" ⇄ { A: 'Kerala', B: 'Mumbai' } (the text response of a map answer). */
export function formatMapText(labels: string[], values: Record<string, string>): string {
  return labels
    .filter((l) => (values[l] ?? '').trim())
    .map((l) => `${l}: ${values[l]!.replace(/\s*\n\s*/g, ' ')}`)
    .join('\n');
}

export function parseMapText(text: string, labels: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const line of text.split('\n')) {
    const m = /^([^:]{1,6}):\s?(.*)$/.exec(line);
    if (m && labels.includes(m[1]!)) out[m[1]!] = m[2]!;
  }
  return out;
}
