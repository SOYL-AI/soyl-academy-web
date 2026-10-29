'use client';

/**
 * The avatar picker (lazy chunk; /me → "Your avatar"). GET /v1/me/avatars for the catalogue with unlock rules and
 * progress; PATCH /v1/me { avatar } to save (403 avatar_locked handled), { avatar: null } for the default.
 *
 * Accessibility: two native radio groups (animals, backgrounds), so arrow keys move between options and the
 * screen reader says "Giraffe, radio button, 5 of 64". Locked animals can be chosen to preview them and hear what
 * unlocks them (aria-describedby), but Save stays off and says why. Works at 360 px (wrapping grid).
 */
import { useEffect, useId, useState } from 'react';
import type { AvatarCatalog, Me } from '@/platform/shared/api-client';
import { Button } from '@/components/platform/ui/kit/Button';
import { Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { InlineAvatar } from '@/components/platform/ui/art/AvatarArt';
import { api } from '../lib/api-browser';
import { avatarGroups, avatarSaveError, saveState, unlockText } from './avatar-picker-model';
import s from './avatar-picker.module.css';

export function AvatarPicker({ publicName, onSaved }: { publicName: string; onSaved: (me: Me) => void }) {
  const [catalog, setCatalog] = useState<AvatarCatalog | null | 'error'>(null);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let alive = true;
    api
      .get('/v1/me/avatars')
      .then((c) => alive && setCatalog(c))
      .catch(() => alive && setCatalog('error'));
    return () => {
      alive = false;
    };
  }, [reload]);

  if (catalog === null) {
    return (
      <div aria-busy="true" className={s.loading}>
        <Skeleton variant="circle" width={112} height={112} />
        <Skeleton lines={3} />
      </div>
    );
  }
  if (catalog === 'error') {
    return (
      <p className={s.error} role="alert">
        The avatars could not load.{' '}
        <Button variant="ghost" size="sm" onClick={() => setReload((n) => n + 1)}>
          Try again
        </Button>
      </p>
    );
  }
  return <PickerView key={`${catalog.current.id}:${catalog.current.bg}:${catalog.current.isDefault}`} catalog={catalog} publicName={publicName} onSaved={(me, next) => (setCatalog(next), onSaved(me))} />;
}

export function PickerView({ catalog, publicName, onSaved }: { catalog: AvatarCatalog; publicName: string; onSaved: (me: Me, next: AvatarCatalog) => void }) {
  const toast = useToast();
  const [pick, setPick] = useState({ id: catalog.current.id as string, bg: catalog.current.bg as string });
  const [busy, setBusy] = useState<'save' | 'reset' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const uid = useId();
  const groups = avatarGroups(catalog);
  const chosen = catalog.avatars.find((a) => a.id === pick.id);
  const state = saveState(catalog, pick);

  async function save(body: { avatar: { id: string; bg: string } | null }) {
    setBusy(body.avatar ? 'save' : 'reset');
    setError(null);
    try {
      const me = await api.patch('/v1/me', { body: body as never });
      toast.show({ title: body.avatar ? 'Avatar saved' : 'Back to your default avatar', tone: 'success' });
      onSaved(me, { ...catalog, current: me.avatar });
    } catch (err) {
      setError(avatarSaveError(err));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className={s.picker} data-testid="avatar-picker">
      <div className={s.preview} aria-live="polite">
        <InlineAvatar id={pick.id} bg={pick.bg} size={112} decorative={false} />
        <div className={s.previewText}>
          <p className={s.previewName} data-testid="avatar-preview-name">
            {publicName}
          </p>
          <p className={s.muted}>
            {chosen?.animal ?? ''} on {catalog.backgrounds.find((b) => b.id === pick.bg)?.label ?? pick.bg}
            {chosen && !chosen.unlocked ? ' · locked' : ''}
          </p>
          <p className={s.muted}>
            {catalog.unlockedCount} of {catalog.total} unlocked. Others see your avatar next to your public name only.
          </p>
        </div>
      </div>

      <fieldset className={s.bgSet}>
        <legend className={s.legend}>Background</legend>
        <div className={s.swatches}>
          {catalog.backgrounds.map((b) => (
            <label key={b.id} className={s.swatch} style={{ background: `var(--p-avatar-${b.id})` }} title={b.label}>
              <input type="radio" name={`${uid}-bg`} value={b.id} checked={pick.bg === b.id} onChange={() => setPick((p) => ({ ...p, bg: b.id }))} className={s.radio} />
              <span className="p-visually-hidden">{b.label}</span>
              {pick.bg === b.id && <Icon name="check" size={18} className={s.swatchCheck} />}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={s.groups}>
        {groups.map((g) => (
          <fieldset key={g.key} className={s.group} data-group={g.key}>
            <legend className={s.legend}>
              {g.title} <span className={s.count}>{g.unlocked} of {g.avatars.length}</span>
            </legend>
            <ul className={s.grid}>
              {g.avatars.map((a) => {
                const descId = `${uid}-${a.id}-d`;
                return (
                  <li key={a.id}>
                    <label className={s.option} data-locked={!a.unlocked || undefined} data-selected={pick.id === a.id || undefined} data-avatar-option={a.id}>
                      <input
                        type="radio"
                        name={`${uid}-avatar`}
                        value={a.id}
                        checked={pick.id === a.id}
                        onChange={() => setPick((p) => ({ ...p, id: a.id }))}
                        aria-describedby={descId}
                        className={s.radio}
                      />
                      <span className={s.optionArt}>
                        <InlineAvatar id={a.id} bg={pick.bg} size={56} />
                        {!a.unlocked && (
                          <span className={s.lock} aria-hidden="true">
                            <Icon name="lock" size={14} />
                          </span>
                        )}
                      </span>
                      <span className={s.optionName}>{a.animal}</span>
                    </label>
                    {/* Outside the label: the radio's name stays the animal; this is its description. */}
                    <span id={descId} className={a.unlocked && !a.isPublicNameAnimal ? 'p-visually-hidden' : s.optionHint}>
                      {unlockText(a)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>

      <div className={s.footer}>
        {state.kind === 'locked' && (
          <p className={s.lockNote} data-testid="avatar-locked-note">
            <Icon name="lock" size={16} /> {state.reason}
          </p>
        )}
        {error && (
          <p className={s.error} role="alert" data-testid="avatar-error">
            {error}
          </p>
        )}
        <div className={s.actions}>
          <Button onClick={() => state.kind === 'save' && void save(state.body)} disabled={state.kind !== 'save'} loading={busy === 'save'} data-testid="avatar-save">
            Save avatar
          </Button>
          {!catalog.current.isDefault && (
            <Button variant="ghost" onClick={() => void save({ avatar: null })} loading={busy === 'reset'} data-testid="avatar-reset">
              Use my default avatar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
