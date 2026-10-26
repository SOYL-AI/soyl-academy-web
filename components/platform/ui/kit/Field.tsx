'use client';

import { forwardRef, useId, useState, type ClipboardEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { Icon } from './Icon';
import s from './Interactive.module.css';

export interface FieldControlProps {
  id: string;
  'aria-describedby'?: string;
  'aria-invalid'?: true;
  'aria-required'?: true;
}

export interface FieldProps {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  /** Render the control with the ids/aria wiring it needs. */
  children: (control: FieldControlProps) => ReactNode;
  className?: string;
}

/** Label + hint + error, wired to the control with aria-describedby / aria-invalid. */
export function Field({ label, hint, error, required, children, className }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx(s.field, className)}>
      <label htmlFor={id} className={s.label}>
        {label}
        {required && (
          <span className={s.required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className={s.hint}>
          {hint}
        </p>
      )}
      {children({ id, 'aria-describedby': describedBy, 'aria-invalid': error ? true : undefined, 'aria-required': required ? true : undefined })}
      {error && (
        <p id={errorId} className={s.error}>
          <Icon name="alert" size={16} />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, hint, error, required, className, ...rest },
  ref,
) {
  return (
    <Field label={label} hint={hint} error={error} required={required} className={className}>
      {(control) => <input ref={ref} className={s.input} required={required} {...control} {...rest} />}
    </Field>
  );
});

/** Keeps digits only (also converts Devanagari and other Unicode decimal digits to ASCII). */
export function normaliseOtp(raw: string, length: number): string {
  let out = '';
  for (const ch of raw) {
    if (/^[0-9]$/.test(ch)) out += ch;
    else if (/^\p{Nd}$/u.test(ch)) {
      const code = ch.codePointAt(0)!;
      // Unicode decimal digit blocks are contiguous runs of ten starting at a code point ending in 0.
      for (let zero = code; zero > code - 10; zero--) {
        if (!/^\p{Nd}$/u.test(String.fromCodePoint(zero - 1))) {
          out += String(code - zero);
          break;
        }
      }
    }
    if (out.length >= length) break;
  }
  return out.slice(0, length);
}

export interface OTPInputProps {
  label: ReactNode;
  length?: number;
  value: string;
  onChange: (value: string) => void;
  /** Called once when all digits are entered (typed, pasted or autofilled). */
  onComplete?: (value: string) => void;
  hint?: ReactNode;
  error?: ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  name?: string;
  className?: string;
}

/**
 * One-time-code input (WEB-12): a single real <input> (so SMS autofill, paste and screen readers
 * work) with autocomplete="one-time-code", inputMode="numeric", drawn as one box per digit.
 * Paste keeps only the digits ("123 456", "Your code is 123456" → "123456").
 */
export function OTPInput({ label, length = 6, value, onChange, onComplete, hint, error, disabled, autoFocus, name, className }: OTPInputProps) {
  const [focused, setFocused] = useState(false);
  const update = (raw: string) => {
    const next = normaliseOtp(raw, length);
    onChange(next);
    if (next.length === length && next !== value) onComplete?.(next);
  };
  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    update(e.clipboardData.getData('text'));
  };
  const active = Math.min(value.length, length - 1);

  return (
    <Field label={label} hint={hint ?? `Enter the ${length}-digit code`} error={error} className={className}>
      {(control) => (
        <div className={s.otp}>
          {Array.from({ length }, (_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cx(s.otpBox, focused && i === active && s.otpBoxActive, error ? s.otpBoxError : undefined)}
            >
              {value[i] ?? (focused && i === active ? <span className={s.otpCaret} /> : '')}
            </span>
          ))}
          <input
            {...control}
            name={name}
            className={s.otpInput}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]*"
            maxLength={length}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            enterKeyHint="done"
            disabled={disabled}
            autoFocus={autoFocus}
            value={value}
            onChange={(e) => update(e.target.value)}
            onPaste={onPaste}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      )}
    </Field>
  );
}
