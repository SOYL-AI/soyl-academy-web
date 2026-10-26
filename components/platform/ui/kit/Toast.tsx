'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { cx } from '../cx';
import { IconButton } from './Button';
import { Icon } from './Icon';
import s from './Interactive.module.css';

export type ToastTone = 'neutral' | 'success' | 'danger';

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  /** ms before auto-dismiss; 0 keeps it until dismissed. Default 5000. */
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastOptions, 'description'>> {
  id: number;
  description?: string;
}

interface ToastApi {
  show: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

/**
 * Toasts for transient, non-critical feedback ("Saved", "Copied"). The live regions are always
 * mounted so screen readers announce new messages; danger toasts use role="alert".
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setItems((list) => list.filter((t) => t.id !== id)), []);
  const show = useCallback((o: ToastOptions) => {
    const id = nextId.current++;
    setItems((list) => [...list.slice(-2), { id, title: o.title, description: o.description, tone: o.tone ?? 'neutral', duration: o.duration ?? 5000 }]);
    return id;
  }, []);
  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  const polite = items.filter((t) => t.tone !== 'danger');
  const assertive = items.filter((t) => t.tone === 'danger');

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className={s.toastRegion} role="region" aria-label="Notifications">
        <div role="status" aria-live="polite" style={{ display: 'contents' }}>
          {polite.map((t) => (
            <ToastView key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </div>
        <div role="alert" aria-live="assertive" style={{ display: 'contents' }}>
          {assertive.map((t) => (
            <ToastView key={t.id} item={t} onDismiss={dismiss} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

function ToastView({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (item.duration <= 0 || paused) return;
    const t = window.setTimeout(() => onDismiss(item.id), item.duration);
    return () => window.clearTimeout(t);
  }, [item.duration, item.id, onDismiss, paused]);

  return (
    <div
      className={cx(s.toast, s[`toast-${item.tone}`])}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <Icon name={item.tone === 'success' ? 'check' : item.tone === 'danger' ? 'alert' : 'info'} size={18} className={s.toastIcon} />
      <p className={s.toastText} style={{ margin: 0 }}>
        <span className={s.toastTitle}>{item.title}</span>
        {item.description && <span>{item.description}</span>}
      </p>
      <IconButton icon="close" label="Dismiss notification" size="sm" className={s.toastClose} onClick={() => onDismiss(item.id)} />
    </div>
  );
}
