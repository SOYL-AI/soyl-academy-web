/**
 * The board and class picker of /learn (design language v3, ADR-032). Server-safe (no hooks), so the static
 * /learn page renders it into its HTML and hands it to the client landing as a node.
 *
 * - `full` (guests): one Card per board with its classes as tinted tiles ("7 Class", "10 ICSE").
 * - `compact` (members' "Browse another class" card): one row of class pills per board.
 * Every class link is named in full ("CISCE Class 10 (ICSE)"), so colour and layout are never the only cue.
 */
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { IconTile } from '@/components/platform/ui/kit/Tiles';
import type { Tint } from '@/components/platform/ui/kit/tints';
import { BOARDS, BOARD_NAMES, CLASS_LEVELS, examLabel, learnPath, type BoardSlug } from '../lib/catalog';
import v from './v3.module.css';

export const BOARD_BLURBS: Record<BoardSlug, string> = {
  cbse: 'Central Board of Secondary Education, Classes 7–12.',
  cisce: 'ICSE for Classes 7–10 and ISC for Classes 11–12.',
};

/** One tint per board, the same on every picker (the board is always written too). */
export const BOARD_TINTS: Record<BoardSlug, Tint> = { cbse: 'blue', cisce: 'violet' };

/** "CBSE Class 7", "CISCE Class 10 (ICSE)": the accessible name of a class link. */
export function classLinkName(board: BoardSlug, classLevel: number): string {
  return `${BOARD_NAMES[board]} Class ${classLevel}${board === 'cisce' ? ` (${examLabel(board, classLevel)})` : ''}`;
}

const tileVars = (tint: Tint) => ({ '--tile': `var(--p-tint-${tint})`, '--tile-ink': `var(--p-tint-${tint}-ink)` }) as CSSProperties;

export function BoardPicker({ variant = 'full', current }: { variant?: 'full' | 'compact'; current?: { board: BoardSlug; classLevel: number } | null }) {
  if (variant === 'compact') {
    return (
      <div className={v.compact} data-testid="class-picker-compact">
        {BOARDS.map((board) => (
          <div key={board} className={v.compactBoard}>
            <h3 className={v.compactName} id={`browse-${board}`}>
              {BOARD_NAMES[board]}
            </h3>
            <ul className={v.pills} aria-labelledby={`browse-${board}`}>
              {CLASS_LEVELS.map((c) => {
                const here = current?.board === board && current.classLevel === c;
                return (
                  <li key={c}>
                    <Link href={learnPath(board, c)} className={v.classPill} aria-label={classLinkName(board, c)} aria-current={here ? 'true' : undefined}>
                      {c}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={v.boards} data-testid="class-picker">
      {BOARDS.map((board) => (
        <section key={board} aria-labelledby={`board-${board}`} className={v.board}>
          <div className={v.boardHead}>
            <IconTile icon="book" tint={BOARD_TINTS[board]} size="md" />
            <div>
              <h2 id={`board-${board}`} className={v.boardName}>
                {BOARD_NAMES[board]}
              </h2>
              <p className={v.boardBlurb}>{BOARD_BLURBS[board]}</p>
            </div>
          </div>
          <ul className={v.classGrid}>
            {CLASS_LEVELS.map((c) => (
              <li key={c}>
                <Link href={learnPath(board, c)} className={v.classTile} style={tileVars(BOARD_TINTS[board])} aria-label={classLinkName(board, c)}>
                  <span className={v.classNumber}>{c}</span>
                  <span className={v.classExam}>{board === 'cisce' ? examLabel(board, c) : 'Class'}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
