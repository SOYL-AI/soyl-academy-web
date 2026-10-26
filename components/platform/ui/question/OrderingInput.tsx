'use client';

/**
 * Ordering questions (contract v2): put the items in order. Three equivalent ways to move an item, so
 * nobody depends on dragging:
 * - drag the handle (pointer events: mouse, touch and pen; no HTML5 drag-and-drop, which mobile lacks);
 * - "Move up" / "Move down" buttons on every item;
 * - keyboard: focus an item's handle, press Space/Enter to pick it up, ↑/↓ to move, Space/Enter/Esc to drop.
 * Every move is announced in a polite live region ("Step B moved to position 2 of 4").
 * Items start in the order the API served them (shuffled server-side, ADR-010 §5).
 */
import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { cx } from '../cx';
import { Icon } from '../kit/Icon';
import { moveItem, type Draft } from './model';
import type { InputProps } from './inputs';
import s from './question.module.css';

export function OrderingInput({
  part,
  slots,
  draft,
  onChange,
  disabled,
  label,
  lang,
  positionsCorrect,
  correctOrder,
}: InputProps<Extract<Draft, { kind: 'order' }>> & { positionsCorrect?: number | null; correctOrder?: string[] | null }) {
  const [grabbed, setGrabbed] = useState<string | null>(null);
  const [announce, setAnnounce] = useState('');
  const [dragging, setDragging] = useState<{ id: string; offset: number } | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const dragStart = useRef<{ y: number; index: number } | null>(null);
  const order = draft.ids;
  // Items keep the letter they were served with (A, B, …), shown next to their text, so moves can be named.
  const nameOf = (id: string) => `Item ${String.fromCharCode(65 + Math.max(0, part.options.findIndex((o) => o.id === id)))}`;

  const move = (id: string, to: number) => {
    const from = order.indexOf(id);
    if (from < 0 || to < 0 || to >= order.length || from === to) return;
    onChange({ kind: 'order', ids: moveItem(order, from, to) });
    setAnnounce(`${nameOf(id)} moved to position ${to + 1} of ${order.length}.`);
  };

  const onHandleKey = (e: KeyboardEvent<HTMLButtonElement>, id: string) => {
    if (disabled) return;
    const i = order.indexOf(id);
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (grabbed === id) {
        setGrabbed(null);
        setAnnounce(`${nameOf(id)} dropped at position ${i + 1}.`);
      } else {
        setGrabbed(id);
        setAnnounce(`${nameOf(id)} picked up at position ${i + 1}. Use the up and down arrow keys to move it, then press Space to drop.`);
      }
    } else if (e.key === 'Escape' && grabbed === id) {
      e.preventDefault();
      setGrabbed(null);
      setAnnounce(`${nameOf(id)} dropped at position ${i + 1}.`);
    } else if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && grabbed === id) {
      e.preventDefault();
      move(id, e.key === 'ArrowUp' ? i - 1 : i + 1);
    }
  };

  /* Pointer drag: the dragged row follows the pointer; on release it lands where its centre is. */
  const rowCentres = () => Array.from(listRef.current?.querySelectorAll<HTMLElement>('[data-order-row]') ?? []).map((el) => {
    const r = el.getBoundingClientRect();
    return r.top + r.height / 2;
  });
  const onPointerDown = (e: PointerEvent<HTMLButtonElement>, id: string) => {
    if (disabled || e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStart.current = { y: e.clientY, index: order.indexOf(id) };
    setDragging({ id, offset: 0 });
  };
  const onPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !dragStart.current) return;
    setDragging({ ...dragging, offset: e.clientY - dragStart.current.y });
  };
  const onPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (!dragging || !dragStart.current) return;
    const centres = rowCentres();
    const from = dragStart.current.index;
    const y = (centres[from] ?? 0) + (e.clientY - dragStart.current.y);
    let to = centres.findIndex((c) => y < c);
    if (to === -1) to = centres.length - 1;
    else if (to > from) to -= 1;
    move(dragging.id, to);
    dragStart.current = null;
    setDragging(null);
  };

  return (
    <fieldset className={s.fieldset} disabled={disabled} data-input="ordering">
      <legend className="p-visually-hidden">{label}: put the items in order</legend>
      <p className={s.inputHint}>Drag the handles, or use the arrow buttons, to put the items in order (first at the top).</p>
      <ol ref={listRef} className={s.orderList} lang={lang}>
        {order.map((id, i) => {
          const isDragging = dragging?.id === id;
          const correctHere = correctOrder ? correctOrder[i] === id : null;
          return (
            <li
              key={id}
              data-order-row
              data-option-id={id}
              className={cx(s.orderRow, (grabbed === id || isDragging) && s.orderRowActive, correctHere === true && s.orderGood, correctHere === false && s.orderBad)}
              style={isDragging ? { transform: `translateY(${dragging.offset}px)`, zIndex: 2 } : undefined}
            >
              <button
                type="button"
                className={s.orderHandle}
                aria-label={`${nameOf(id)}, position ${i + 1} of ${order.length}. Press Space to move.`}
                aria-pressed={grabbed === id}
                onKeyDown={(e) => onHandleKey(e, id)}
                onPointerDown={(e) => onPointerDown(e, id)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={() => {
                  dragStart.current = null;
                  setDragging(null);
                }}
                onBlur={() => grabbed === id && setGrabbed(null)}
              >
                <Icon name="grip" size={20} />
              </button>
              <span className={s.orderPosition} aria-hidden="true">
                {i + 1}
              </span>
              <span className={s.orderText}>
                <span className={s.orderLetter}>{nameOf(id).slice(-1)}.</span> {slots.options[id]}
              </span>
              <span className={s.orderButtons}>
                <button type="button" className={s.smallButton} aria-label={`Move ${nameOf(id)} up`} disabled={disabled || i === 0} onClick={() => move(id, i - 1)}>
                  <Icon name="arrowUp" size={18} />
                </button>
                <button
                  type="button"
                  className={s.smallButton}
                  aria-label={`Move ${nameOf(id)} down`}
                  disabled={disabled || i === order.length - 1}
                  onClick={() => move(id, i + 1)}
                >
                  <Icon name="arrowDown" size={18} />
                </button>
              </span>
            </li>
          );
        })}
      </ol>
      {typeof positionsCorrect === 'number' && (
        <p className={s.inputHint}>
          {positionsCorrect} of {order.length} items are in the right place.
        </p>
      )}
      <p className="p-visually-hidden" aria-live="polite">
        {announce}
      </p>
    </fieldset>
  );
}
