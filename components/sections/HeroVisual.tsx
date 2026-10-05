'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AssignmentCard, type AssignmentMode } from '@/components/visuals/AssignmentCard';
import { useMotionOk } from '@/components/motion/useMotionOk';

/**
 * Hero visual: a real classroom photograph with the assignment card sitting on
 * top of it, quietly turning from worksheet into SOYL challenge and back.
 *
 * Reduced motion: no loop; the card rests on the SOYL state.
 */
export function HeroVisual() {
  const ok = useMotionOk();
  const [mode, setMode] = useState<AssignmentMode>('old');

  useEffect(() => {
    if (!ok) return;
    let t: ReturnType<typeof setTimeout>;
    const schedule = (next: AssignmentMode, wait: number) => {
      t = setTimeout(() => {
        setMode(next);
        // Hold the SOYL state longer than the worksheet: it is the point.
        schedule(next === 'soyl' ? 'old' : 'soyl', next === 'soyl' ? 6200 : 3000);
      }, wait);
    };
    schedule('soyl', 1900);
    return () => clearTimeout(t);
  }, [ok]);

  const shown: AssignmentMode = ok ? mode : 'soyl';

  return (
    <div className="relative pb-12 md:pb-24 sm:pb-28 lg:pb-16">
      <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl bg-paper lg:ml-auto lg:w-[88%]">
        <Image
          src="/images/hero_students_collaborating.jpg"
          alt="Secondary-school students working through a problem together at a classroom table"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="object-cover"
        />
      </div>

      <div className="absolute -bottom-0 left-3 right-3 sm:left-6 sm:right-auto sm:w-[80%] lg:-left-10 lg:bottom-0 lg:w-[66%]">
        <AssignmentCard mode={shown} compact />
      </div>

      {/* Idle sticker: the one playful, always-moving detail in the hero. */}
      <p
        aria-hidden="true"
        style={{ '--r': '-6deg' } as React.CSSProperties}
        className="float-slow absolute right-2 top-3 hidden rotate-[-6deg] rounded-full bg-highlighter px-4 py-2 font-editorial text-[1.15rem] italic text-ink sm:block lg:right-0 lg:top-6"
      >
        Thinking is the work.
      </p>
    </div>
  );
}
