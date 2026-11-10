'use client';

import { Chip } from '@/components/ink/Chip';
import { InkLink } from '@/components/ink/Button';
import { CLASS_LEVELS, examLabel, learnPath } from '@/components/platform/lib/catalog';
import { useDoor } from './DoorState';

/**
 * The door's choice (plan §3.2, screen 1): board, then class, then one action into that class on /learn.
 * Only rendered with the platform on. Without JS the server's default (CBSE Class 10) is a working link.
 */
export function DoorPicker() {
  const { board, classLevel, setBoard, setClassLevel } = useDoor();
  return (
    <div className="mt-6 space-y-4">
      <div role="group" aria-label="Board" className="flex flex-wrap gap-2">
        <Chip pressed={board === 'cbse'} onClick={() => setBoard('cbse')}>
          CBSE
        </Chip>
        <Chip pressed={board === 'cisce'} onClick={() => setBoard('cisce')}>
          ICSE / ISC
        </Chip>
      </div>
      <div role="group" aria-label="Class" className="flex flex-wrap gap-2">
        {CLASS_LEVELS.map((c) => (
          <Chip key={c} pressed={classLevel === c} onClick={() => setClassLevel(c)} aria-label={`Class ${c}`}>
            {c}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
        <InkLink href={learnPath(board, classLevel)} size="lg" arrow>
          Open Class {classLevel}
        </InkLink>
        <span className="text-[0.9375rem] text-muted">
          {examLabel(board, classLevel)} Class {classLevel}, every subject
        </span>
      </div>
    </div>
  );
}
