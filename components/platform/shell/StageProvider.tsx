'use client';

/**
 * The age stage for client components (ADR-032): `useStage()` → { stage, classLevel, source, pick }.
 * The AppShell provides it (from the URL's class, else the member's class from GET /v1/session, else middle) and
 * mirrors it as `data-stage` on its root for CSS. Outside the shell (tests, galleries) it is the default.
 */
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { byStage, DEFAULT_STAGE, type Stage } from './stage';

export interface StageApi {
  stage: Stage;
  /** The class the stage came from (URL or profile); null for the default. */
  classLevel: number | null;
  source: 'url' | 'profile' | 'default';
  /** byStage() bound to the current stage. */
  pick: <T>(values: { junior: T; middle: T; senior: T }) => T;
}

const DEFAULT_API: StageApi = { stage: DEFAULT_STAGE, classLevel: null, source: 'default', pick: (v) => byStage(DEFAULT_STAGE, v) };
const StageCtx = createContext<StageApi>(DEFAULT_API);

export function useStage(): StageApi {
  return useContext(StageCtx);
}

export function StageProvider({ stage, classLevel, source, children }: { stage: Stage; classLevel: number | null; source: StageApi['source']; children: ReactNode }) {
  const value = useMemo<StageApi>(() => ({ stage, classLevel, source, pick: (v) => byStage(stage, v) }), [stage, classLevel, source]);
  return <StageCtx.Provider value={value}>{children}</StageCtx.Provider>;
}
