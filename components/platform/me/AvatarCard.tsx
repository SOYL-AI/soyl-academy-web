'use client';

/**
 * /me → "Your avatar" (Profile and Appearance settings): the current avatar with the public name, and the picker,
 * which loads only when opened (it carries all 64 drawings). Opens by itself for `/me#avatar` (the dashboard and
 * the top bar link there).
 */
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { Me } from '@/platform/shared/api-client';
import { AnimalAvatar, animalName } from '@/components/platform/ui/kit/AnimalAvatar';
import { Button } from '@/components/platform/ui/kit/Button';
import { Card, CardTitle, Skeleton } from '@/components/platform/ui/kit/Display';
import { useMyAvatar } from './MyAvatarProvider';
import s from './me.module.css';

const AvatarPicker = dynamic(() => import('./AvatarPicker').then((m) => m.AvatarPicker), { ssr: false, loading: () => <Skeleton variant="block" height={240} /> });

export function AvatarCard({ me, onChange }: { me: Me; onChange: (me: Me) => void }) {
  const [open, setOpen] = useState(false);
  const mine = useMyAvatar();
  useEffect(() => {
    const check = () => window.location.hash === '#avatar' && setOpen(true);
    check();
    window.addEventListener('hashchange', check);
    return () => window.removeEventListener('hashchange', check);
  }, []);
  return (
    <Card as="section" aria-labelledby="avatar-title" id="avatar" data-testid="avatar-card">
      <CardTitle as="h2" id="avatar-title">
        Your avatar
      </CardTitle>
      <div className={s.avatarRow}>
        <AnimalAvatar avatar={me.avatar} size={64} label={`Your avatar: ${animalName(me.avatar.id)}`} />
        <p className={s.muted}>
          Shown next to your public name, <strong>{me.publicName}</strong>, in leagues and mock leaderboards. Unlock more animals by learning:
          levels, badges, streaks, leagues and live mocks.
        </p>
      </div>
      {open ? (
        <AvatarPicker
          publicName={me.publicName}
          onSaved={(next) => {
            onChange(next);
            mine?.setAvatar(next.avatar);
          }}
        />
      ) : (
        <div className={s.actions}>
          <Button variant="secondary" onClick={() => setOpen(true)} data-testid="avatar-open">
            Change avatar
          </Button>
        </div>
      )}
    </Card>
  );
}
