import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { act, fireEvent, render, screen } from '@testing-library/react';
import createDOMPurify from 'dompurify';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { Deck } from '@/platform/shared/content/deck';
import { Button, IconButton } from '../kit/Button';
import { formatCountdown, nextIstMidnight } from '../kit/CreditChip';
import { Dialog } from '../kit/Dialog';
import { Avatar, initialsOf, ProgressBar } from '../kit/Display';
import { normaliseOtp, OTPInput, TextInput } from '../kit/Field';
import { Tabs } from '../kit/Tabs';
import { ToastProvider, useToast } from '../kit/Toast';
import { createSvgSanitizer } from '../render/sanitize-svg';

describe('Button', () => {
  it('loading: aria-busy, cannot submit or fire', () => {
    const onClick = vi.fn();
    render(
      <form onSubmit={(e) => (e.preventDefault(), onClick('submit'))}>
        <Button type="submit" loading onClick={onClick}>
          Save
        </Button>
      </form>,
    );
    const btn = screen.getByRole('button', { name: 'Save' });
    expect(btn.getAttribute('aria-busy')).toBe('true');
    expect(btn.getAttribute('type')).toBe('button');
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('IconButton has an accessible name', () => {
    render(<IconButton icon="close" label="Close lesson" />);
    expect(screen.getByRole('button', { name: 'Close lesson' })).toBeTruthy();
  });
});

function DialogHarness() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Log in to continue" description="Tests need an account.">
        <button>First action</button>
      </Dialog>
    </>
  );
}

describe('Dialog', () => {
  it('labels itself, focuses inside, closes on Esc and returns focus', () => {
    render(<DialogHarness />);
    const opener = screen.getByRole('button', { name: 'Open' });
    opener.focus();
    fireEvent.click(opener);
    const dialog = document.querySelector('dialog')!;
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(document.getElementById(dialog.getAttribute('aria-labelledby')!)?.textContent).toBe('Log in to continue');
    expect(document.activeElement?.textContent).toBe('First action');
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(document.activeElement).toBe(opener);
  });

  it('wraps Tab focus inside the dialog', () => {
    render(<DialogHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = document.querySelector('dialog')!;
    const close = screen.getByRole('button', { name: 'Close' });
    const last = screen.getByRole('button', { name: 'First action' });
    last.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(document.activeElement).toBe(close);
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });
});

describe('Tabs', () => {
  it('arrow keys move selection with roving tabindex', () => {
    render(
      <Tabs
        label="Chapter"
        tabs={[
          { id: 'lesson', label: 'Lesson', content: 'L' },
          { id: 'notes', label: 'Notes', content: 'N' },
          { id: 'practice', label: 'Practice', content: 'P' },
        ]}
      />,
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.getAttribute('tabindex'))).toEqual(['0', '-1', '-1']);
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1].getAttribute('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(tabs[1]);
    fireEvent.keyDown(tabs[1], { key: 'End' });
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    fireEvent.keyDown(tabs[2], { key: 'ArrowRight' });
    expect(tabs[0].getAttribute('aria-selected')).toBe('true');
    const panels = screen.getAllByRole('tabpanel', { hidden: true });
    expect(panels.filter((p) => !p.hidden)).toHaveLength(1);
  });
});

describe('Fields', () => {
  it('TextInput wires label, hint and error', () => {
    render(<TextInput label="Email" hint="We send a code" error="Enter a valid email" />);
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    const described = input.getAttribute('aria-describedby')!.split(' ').map((id) => document.getElementById(id)?.textContent);
    expect(described).toEqual(['We send a code', 'Enter a valid email']);
  });

  it('normaliseOtp keeps digits (incl. Devanagari digits)', () => {
    expect(normaliseOtp('Your code is 123 456.', 6)).toBe('123456');
    expect(normaliseOtp('१२३४५६', 6)).toBe('123456');
    expect(normaliseOtp('12-34-56-78', 6)).toBe('123456');
  });

  it('OTPInput: one-time-code autocomplete, numeric keyboard, paste fills and completes', () => {
    const onComplete = vi.fn();
    function Harness() {
      const [v, setV] = useState('');
      return <OTPInput label="Code" value={v} onChange={setV} onComplete={onComplete} />;
    }
    render(<Harness />);
    const input = screen.getByLabelText('Code') as HTMLInputElement;
    expect(input.getAttribute('autocomplete')).toBe('one-time-code');
    expect(input.getAttribute('inputmode')).toBe('numeric');
    expect(input.getAttribute('maxlength')).toBe('6');
    fireEvent.paste(input, { clipboardData: { getData: () => 'Code: 987 654' } });
    expect(input.value).toBe('987654');
    expect(onComplete).toHaveBeenCalledWith('987654');
    fireEvent.change(input, { target: { value: '98a' } });
    expect(input.value).toBe('98');
  });
});

describe('Feedback and display', () => {
  it('ProgressBar exposes value and text', () => {
    render(<ProgressBar label="Lesson progress" value={7} max={18} valueText="7 of 18 slides" />);
    const bar = screen.getByRole('progressbar', { name: 'Lesson progress' });
    expect(bar.getAttribute('aria-valuenow')).toBe('7');
    expect(bar.getAttribute('aria-valuetext')).toBe('7 of 18 slides');
  });

  it('Toast announces in a live region and dismisses', async () => {
    vi.useFakeTimers();
    function Fire() {
      const { show } = useToast();
      return <button onClick={() => show({ title: 'Saved', tone: 'success', duration: 1000 })}>Fire</button>;
    }
    render(
      <ToastProvider>
        <Fire />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('Fire'));
    expect(screen.getByRole('status').textContent).toContain('Saved');
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(screen.getByRole('status').textContent).not.toContain('Saved');
    vi.useRealTimers();
  });

  it('Avatar shows initials only (no remote images)', () => {
    expect(initialsOf('Aarav Sharma')).toBe('AS');
    expect(initialsOf('  priya ')).toBe('P');
    expect(initialsOf('')).toBe('?');
    const { container } = render(<Avatar name="Aarav Sharma" />);
    expect(container.querySelector('[role="img"]')?.getAttribute('aria-label')).toBe('Aarav Sharma');
    expect(container.querySelector('img')).toBeNull();
  });

  it('credit reset is the next IST midnight', () => {
    // 2026-10-26 20:00 IST = 14:30 UTC → next reset 2026-10-26 18:30 UTC.
    expect(nextIstMidnight(new Date('2026-10-26T14:30:00Z')).toISOString()).toBe('2026-10-26T18:30:00.000Z');
    // 00:10 IST = 18:40 UTC previous day → next reset is ~23h50m later.
    expect(nextIstMidnight(new Date('2026-10-26T18:40:00Z')).toISOString()).toBe('2026-10-27T18:30:00.000Z');
    expect(formatCountdown(5 * 3600_000 + 12 * 60_000)).toBe('5h 12m');
    expect(formatCountdown(30_000)).toBe('<1m');
  });
});

describe('design tokens', () => {
  const css = readFileSync(resolve(process.cwd(), 'components/platform/ui/styles/tokens.css'), 'utf8');
  const block = (re: RegExp) => {
    const m = re.exec(css);
    if (!m) throw new Error('token block not found');
    return Object.fromEntries([...m[1].matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6})\b/gi)].map((t) => [t[1], t[2]]));
  };
  const light = block(/^\.soyl-platform \{([\s\S]*?)\n\}/m);
  const dark = { ...light, ...block(/^\.soyl-platform\[data-theme="dark"\] \{([\s\S]*?)\n\}/m) };

  const lum = (hex: string) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a: string, b: string) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };

  const TEXT_PAIRS: Array<[string, string]> = [
    ['--p-ink', '--p-bg'],
    ['--p-ink', '--p-surface'],
    ['--p-ink-muted', '--p-surface'],
    ['--p-ink-subtle', '--p-surface'],
    ['--p-ink-subtle', '--p-bg'],
    ['--p-ink-subtle', '--p-surface-2'],
    ['--p-accent', '--p-surface'],
    ['--p-on-accent', '--p-accent'],
    ['--p-on-highlight', '--p-highlight'],
    ['--p-danger', '--p-surface'],
    ['--p-danger', '--p-danger-soft'],
    ['--p-success', '--p-success-soft'],
    ['--p-warning', '--p-warning-soft'],
    ['--p-info', '--p-accent-soft'],
    ['--p-surface', '--p-ink'],
    // ADR-023: accent text on the page background, info on its own soft fill, difficulty tags.
    ['--p-accent', '--p-bg'],
    ['--p-info', '--p-info-soft'],
    ['--p-ink-muted', '--p-surface-2'],
    ...(['easy', 'medium', 'hard'] as const).flatMap((d) => [
      [`--p-${d}`, '--p-surface'] as [string, string],
      [`--p-${d}`, `--p-${d}-soft`] as [string, string],
    ]),
  ];
  const GRAPHIC_PAIRS: Array<[string, string]> = [
    ['--p-border-strong', '--p-surface'],
    ['--p-focus', '--p-surface'],
    ['--p-focus', '--p-bg'],
    // ADR-023: mastery levels, streak flame and tier colours carry meaning (always written as text too).
    ...(['m-attempted', 'm-familiar', 'm-proficient', 'm-mastered', 'flame', 'tier-bronze', 'tier-silver', 'tier-gold', 'tier-elite', 'heat-4'] as const).flatMap((c) => [
      [`--p-${c}`, '--p-surface'] as [string, string],
      [`--p-${c}`, '--p-bg'] as [string, string],
    ]),
    ...(['accent', 'muted', 'blue', 'green', 'yellow', 'brown', 'red'] as const).flatMap((c) => [
      [`--diagram-${c}`, '--p-surface'] as [string, string],
      [`--diagram-${c}`, '--p-bg'] as [string, string],
    ]),
  ];

  for (const [name, theme] of [
    ['light', light],
    ['dark', dark],
  ] as const) {
    it.each(TEXT_PAIRS)(`${name}: text %s on %s is AA (4.5:1)`, (fg, bg) => {
      expect(ratio(theme[fg], theme[bg])).toBeGreaterThanOrEqual(4.5);
    });
    it.each(GRAPHIC_PAIRS)(`${name}: graphic %s on %s is >= 3:1`, (fg, bg) => {
      expect(ratio(theme[fg], theme[bg])).toBeGreaterThanOrEqual(3);
    });
  }

  it('dark media-query block matches the forced dark block', () => {
    const media = block(/@media \(prefers-color-scheme: dark\) \{\s*\.soyl-platform:not\(\[data-theme="light"\]\) \{([\s\S]*?)\n  \}/m);
    const forced = block(/^\.soyl-platform\[data-theme="dark"\] \{([\s\S]*?)\n\}/m);
    expect(media).toEqual(forced);
  });

  it('every rule is scoped under .soyl-platform', () => {
    const selectors = css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('}')
      .map((chunk) => chunk.split('{')[0]?.trim())
      .filter((sel) => sel && !sel.startsWith('@') && !/^(from|to|\d+%)$/.test(sel));
    for (const sel of selectors) {
      // Split on top-level commas only (not inside :is(...)).
      const parts: string[] = [];
      let depth = 0;
      let current = '';
      for (const ch of sel) {
        if (ch === '(') depth++;
        if (ch === ')') depth--;
        if (ch === ',' && depth === 0) {
          parts.push(current);
          current = '';
        } else current += ch;
      }
      parts.push(current);
      for (const part of parts) expect(part.trim()).toMatch(/^\.soyl-platform/);
    }
  });
});

describe('science exemplar SVGs pass the sanitiser untouched', () => {
  const release = JSON.parse(
    readFileSync(resolve(process.cwd(), 'platform/content-templates/exemplars/science/cbse-10-science-ch01/release.json'), 'utf8'),
  ) as { decks: unknown[] };
  const svgs = release.decks
    .map((d) => Deck.parse(d))
    .flatMap((d) => d.slides.flatMap((s) => (s.visual?.kind === 'svg' ? [[`part ${d.part} ${s.id}`, s.visual.spec] as const] : [])));
  const sanitize = createSvgSanitizer(createDOMPurify(window));
  it.each(svgs)('%s', (_id, spec) => {
    const result = sanitize(spec);
    expect(result.error).toBeUndefined();
    expect(result.removed).toEqual([]);
  });
});
