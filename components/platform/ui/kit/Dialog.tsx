'use client';

import { useCallback, useEffect, useId, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../cx';
import { IconButton } from './Button';
import s from './Dialog.module.css';

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

export interface DialogProps {
  open: boolean;
  /** Called for Esc, the close button, a backdrop tap, or a native close. */
  onClose: () => void;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  /** Actions; on narrow screens they stack full-width (thumb reach). */
  footer?: ReactNode;
  /** 'sheet' docks to the bottom of the screen (BottomSheet). */
  variant?: 'modal' | 'sheet';
  /** Backdrop tap closes (default true). Set false for flows that must not be lost by a stray tap. */
  dismissOnBackdrop?: boolean;
  /** Element to focus on open; defaults to the first focusable element in the body, else the close button. */
  initialFocus?: () => HTMLElement | null;
  className?: string;
}

/**
 * Modal dialog on the native <dialog> element: showModal() puts it in the top layer and makes the
 * rest of the page inert; Tab is additionally wrapped inside the dialog, Esc closes, focus returns
 * to the element that opened it, page scroll is locked while open.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  variant = 'modal',
  dismissOnBackdrop = true,
  initialFocus,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
      const root = document.documentElement;
      const previousOverflow = root.style.overflow;
      root.style.overflow = 'hidden';
      const target = initialFocus?.() ?? bodyRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? dialog.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
      return () => {
        root.style.overflow = previousOverflow;
      };
    }
    if (!open && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
    return undefined;
  }, [open, initialFocus]);

  // Restore focus whenever the dialog closes (prop change or native close).
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const handleClose = () => {
      const el = returnFocus.current;
      returnFocus.current = null;
      if (el && el.isConnected) el.focus();
    };
    const handleCancel = (e: Event) => {
      e.preventDefault(); // controlled: the parent decides
      onCloseRef.current();
    };
    dialog.addEventListener('close', handleClose);
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      // jsdom and older engines do not fire `cancel`.
      e.preventDefault();
      onCloseRef.current();
      return;
    }
    if (e.key !== 'Tab') return;
    const dialog = ref.current;
    if (!dialog) return;
    const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => !el.hasAttribute('inert'));
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    // A click whose target is the <dialog> itself landed on the backdrop.
    if (dismissOnBackdrop && e.target === ref.current) onCloseRef.current();
  };

  return (
    <dialog
      ref={ref}
      className={cx(s.dialog, variant === 'sheet' && s.sheet, className)}
      aria-labelledby={titleId}
      aria-describedby={description ? descId : undefined}
      aria-modal="true"
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      {open && (
        <>
          {variant === 'sheet' && <div className={s.handle} aria-hidden="true" />}
          <div className={s.header}>
            <div className={s.titles}>
              <h2 id={titleId} className={s.title}>
                {title}
              </h2>
              {description && (
                <p id={descId} className={s.description}>
                  {description}
                </p>
              )}
            </div>
            <IconButton icon="close" label="Close" onClick={() => onCloseRef.current()} />
          </div>
          <div ref={bodyRef} className={s.body}>
            {children}
          </div>
          {footer && <div className={s.footer}>{footer}</div>}
        </>
      )}
    </dialog>
  );
}

export type BottomSheetProps = Omit<DialogProps, 'variant'>;

/** Mobile bottom sheet: the same accessible dialog, docked to the bottom edge. */
export function BottomSheet(props: BottomSheetProps) {
  return <Dialog {...props} variant="sheet" />;
}
