'use client';

/** Interactive demos for the dev gallery (dialogs, sheets, toasts, tabs, forms). */
import { useState, type ReactNode } from 'react';
import { BottomSheet, Dialog } from '@/components/platform/ui/kit/Dialog';
import { Button } from '@/components/platform/ui/kit/Button';
import { Chip } from '@/components/platform/ui/kit/Display';
import { OTPInput, TextInput } from '@/components/platform/ui/kit/Field';
import { Tabs } from '@/components/platform/ui/kit/Tabs';
import { ToastProvider, useToast } from '@/components/platform/ui/kit/Toast';
import s from './gallery.module.css';

function ToastButtons() {
  const { show } = useToast();
  return (
    <div className={s.row}>
      <Button variant="secondary" onClick={() => show({ title: 'Progress saved', tone: 'success' })}>
        Success toast
      </Button>
      <Button variant="secondary" onClick={() => show({ title: 'Copied link' })}>
        Info toast
      </Button>
      <Button variant="secondary" onClick={() => show({ title: 'Could not save', description: 'Check your connection and try again.', tone: 'danger' })}>
        Error toast
      </Button>
    </div>
  );
}

export function OverlayDemo() {
  const [dialog, setDialog] = useState(false);
  const [sheet, setSheet] = useState(false);
  return (
    <ToastProvider>
      <div className={s.row}>
        <Button onClick={() => setDialog(true)} data-testid="open-dialog">
          Open dialog
        </Button>
        <Button variant="secondary" onClick={() => setSheet(true)} data-testid="open-sheet">
          Open bottom sheet
        </Button>
      </div>
      <ToastButtons />
      <Dialog
        open={dialog}
        onClose={() => setDialog(false)}
        title="Log in to start this test"
        description="Tests save your answers, so they need an account. Lessons stay free without one."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialog(false)}>
              Not now
            </Button>
            <Button onClick={() => setDialog(false)}>Log in</Button>
          </>
        }
      >
        <p style={{ margin: 0 }}>You will come back to this page after logging in.</p>
      </Dialog>
      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Jump to slide">
        <div className={s.row}>
          {Array.from({ length: 12 }, (_, i) => (
            <Chip key={i} selected={i === 2} onClick={() => setSheet(false)}>
              {i + 1}
            </Chip>
          ))}
        </div>
      </BottomSheet>
    </ToastProvider>
  );
}

export function FormDemo() {
  const [otp, setOtp] = useState('');
  const [done, setDone] = useState<string | null>(null);
  const [email, setEmail] = useState('student@example.com');
  return (
    <form className={s.stack} onSubmit={(e) => e.preventDefault()} method="post">
      <TextInput label="Email address" type="email" autoComplete="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} hint="We send a 6-digit code to this address." />
      <TextInput label="School name" hint="Optional" error="School name must be 60 characters or fewer." defaultValue="" />
      <OTPInput label="Verification code" value={otp} onChange={setOtp} onComplete={setDone} />
      <p className={s.note} aria-live="polite">
        {done ? `Code complete: ${done}` : 'Paste "Your code is 123 456" to try paste handling.'}
      </p>
    </form>
  );
}

export function TabsDemo({ lesson, notes, practice }: { lesson: ReactNode; notes: ReactNode; practice: ReactNode }) {
  return (
    <Tabs
      label="Chapter sections"
      tabs={[
        { id: 'lesson', label: 'Lesson', content: lesson },
        { id: 'notes', label: 'Notes', content: notes },
        { id: 'practice', label: 'Practice', content: practice },
        { id: 'tests', label: 'Tests', content: <p>Two chapter tests.</p> },
        { id: 'flashcards', label: 'Flashcards', content: <p>32 cards.</p> },
      ]}
    />
  );
}

export function ChipDemo() {
  const [selected, setSelected] = useState<string[]>(['Class 10']);
  const toggle = (c: string) => setSelected((list) => (list.includes(c) ? list.filter((x) => x !== c) : [...list, c]));
  return (
    <div className={s.row} role="group" aria-label="Filter by class">
      {['Class 9', 'Class 10', 'Class 11', 'Class 12'].map((c) => (
        <Chip key={c} selected={selected.includes(c)} onClick={() => toggle(c)}>
          {c}
        </Chip>
      ))}
    </div>
  );
}
