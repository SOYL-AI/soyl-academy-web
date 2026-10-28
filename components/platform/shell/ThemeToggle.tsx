'use client';

/**
 * Theme picker (ADR-023): Light / Dark / System as native radio buttons (arrow keys, labels, screen readers
 * for free). `ThemeOptions` is the bare radio group (used on /me); `ThemeToggle` is the top-bar button that
 * opens it in a small popover (Esc and outside clicks close it, focus returns to the button).
 */
import { useEffect, useId, useRef, useState } from 'react';
import { cx } from '@/components/platform/ui/cx';
import { Icon, type IconName } from '@/components/platform/ui/kit/Icon';
import { THEME_LABELS, THEME_PREFS, type ThemePref } from './theme';
import { useTheme } from './ThemeProvider';
import s from './appshell.module.css';

const ICONS: Record<ThemePref, IconName> = { light: 'sun', dark: 'moon', system: 'monitor' };

export function ThemeOptions({ legend = 'Theme', className, onPicked }: { legend?: string; className?: string; onPicked?: () => void }) {
  const { pref, setPref } = useTheme();
  const name = useId();
  return (
    <fieldset className={cx(s.themeOptions, className)} data-testid="theme-options">
      <legend className={s.themeLegend}>{legend}</legend>
      {THEME_PREFS.map((p) => (
        <label key={p} className={cx(s.themeOption, pref === p && s.themeOptionOn)}>
          <input
            type="radio"
            name={name}
            value={p}
            checked={pref === p}
            onChange={() => {
              setPref(p);
              onPicked?.();
            }}
          />
          <Icon name={ICONS[p]} size={18} />
          <span>{THEME_LABELS[p]}</span>
        </label>
      ))}
    </fieldset>
  );
}

export function ThemeToggle() {
  const { pref, resolved } = useTheme();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !button.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    panel.current?.querySelector<HTMLInputElement>('input:checked')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <div className={s.themeWrap}>
      <button
        ref={button}
        type="button"
        className={s.iconButton}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        data-testid="theme-toggle"
        data-theme-pref={pref}
      >
        <Icon name={pref === 'system' ? 'monitor' : resolved === 'dark' ? 'moon' : 'sun'} size={20} />
        <span className="p-visually-hidden">Theme: {THEME_LABELS[pref]}</span>
      </button>
      <div ref={panel} id={panelId} className={s.themePanel} hidden={!open}>
        <ThemeOptions onPicked={() => undefined} />
      </div>
    </div>
  );
}
