'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { BoardSlug } from '@/components/platform/lib/catalog';
import { readGuestProgress, rememberGuestBoardClass } from '@/components/platform/lib/guest-storage';

/**
 * The board and class the visitor picked on the homepage door (plan §3.1). Every later screen (the taste, the
 * exam clock) speaks about it. It is kept where the learning platform keeps a guest's pick (`soyl_guest_v1`,
 * components/platform/lib/guest-storage.ts), so /learn opens on the same class, and it merges into an account
 * like the rest of guest progress. No account is needed.
 *
 * The server renders the default (CBSE Class 10); the stored pick replaces it after hydration.
 */
export interface DoorPick {
  board: BoardSlug;
  classLevel: number;
}

export const DEFAULT_PICK: DoorPick = { board: 'cbse', classLevel: 10 };

interface DoorState extends DoorPick {
  setBoard: (board: BoardSlug) => void;
  setClassLevel: (classLevel: number) => void;
  /** Guest activity on this device, for the saved-place line: slides reached and questions answered. */
  saved: { slides: number; questions: number };
}

const Ctx = createContext<DoorState | null>(null);

export function DoorStateProvider({ remember, children }: { remember: boolean; children: ReactNode }) {
  const [pick, setPick] = useState<DoorPick>(DEFAULT_PICK);
  const [saved, setSaved] = useState({ slides: 0, questions: 0 });

  useEffect(() => {
    const p = readGuestProgress();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- localStorage is only readable after mount
    if (p.board && p.classLevel) setPick({ board: p.board, classLevel: p.classLevel });
    setSaved({ slides: p.lessons.reduce((n, l) => n + l.slide + 1, 0), questions: p.practice.length });
  }, []);

  const choose = useCallback(
    (next: DoorPick) => {
      setPick(next);
      // Only with the platform on: with it off there is nowhere for the pick to go (GEN-4).
      if (remember) rememberGuestBoardClass(next.board, next.classLevel);
    },
    [remember]
  );

  const value = useMemo<DoorState>(
    () => ({
      ...pick,
      saved,
      setBoard: (board) => choose({ board, classLevel: pick.classLevel }),
      setClassLevel: (classLevel) => choose({ board: pick.board, classLevel }),
    }),
    [pick, saved, choose]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDoor(): DoorState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useDoor needs DoorStateProvider');
  return v;
}
