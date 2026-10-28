'use client';

/**
 * "Explain this slide" in the lesson player (ai-gateway M4 handoff §8): 1 credit, quoted first, streamed
 * into a dialog. The dialog and its renderer are a separate chunk loaded on the first click, so the
 * lesson's first-load JS barely changes.
 */
import { lazy, Suspense, useState } from 'react';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useSession } from '../auth/SessionProvider';
import s from '../lesson/lesson.module.css';

const ExplainSlideDialog = lazy(() => import('./ExplainSlideDialog').then((m) => ({ default: m.ExplainSlideDialog })));

export function ExplainSlideButton({ chapterId, part, slideId, slideNumber }: { chapterId: string; part: number; slideId: string | undefined; slideNumber: number }) {
  const { state, openLogin } = useSession();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!slideId || !/^s\d{2}$/.test(slideId)) return null;
  return (
    <>
      <button
        type="button"
        className={s.explainButton}
        onClick={() => {
          if (state.status !== 'member') {
            openLogin({ reason: 'Log in to ask the AI to explain a slide. You get free AI credits every day.' });
            return;
          }
          setLoaded(true);
          setOpen(true);
        }}
        onPointerEnter={() => void import('./ExplainSlideDialog')}
        aria-haspopup="dialog"
        data-testid="explain-slide"
      >
        <Icon name="spark" size={16} />
        <span>Explain</span>
      </button>
      {loaded && (
        <Suspense fallback={null}>
          <ExplainSlideDialog open={open} onClose={() => setOpen(false)} chapterId={chapterId} part={part} slideId={slideId} slideNumber={slideNumber} />
        </Suspense>
      )}
    </>
  );
}
