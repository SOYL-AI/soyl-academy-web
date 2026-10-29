/**
 * /me badges with their medal art (lazy chunk): earned medals in colour, the rest grey with a lock and what earns
 * them. With nothing earned yet, the "no badges" illustration leads.
 */
import type { Schemas } from '@/platform/shared/api-client';
import { BadgeMedal } from '@/components/platform/ui/art/Art';
import { EmptyIllustration } from '@/components/platform/ui/art/EmptyIllustration';
import s from './me.module.css';

type Badge = Schemas['MyBadges']['badges'][number];

export function BadgeGrid({ badges }: { badges: readonly Badge[] }) {
  const earned = badges.filter((b) => b.awarded).length;
  return (
    <>
      {earned === 0 && (
        <div className={s.badgeEmpty} data-testid="badges-empty">
          <EmptyIllustration kind="no-badges" width={120} />
          <p className={s.muted}>No badges yet. Finish a lesson or get a practice question right to earn your first one.</p>
        </div>
      )}
      <ul className={s.badgeGrid}>
        {badges.map((b) => (
          <li key={b.key} className={s.badge} data-awarded={b.awarded}>
            <span className={s.badgeArt}>
              <BadgeMedal badge={b.key} locked={!b.awarded} size={52} decorative />
            </span>
            <span className={s.badgeName}>{b.name}</span>
            <span className={s.badgeDesc}>{b.description}</span>
            <span className="p-visually-hidden">{b.awarded ? 'Earned' : 'Not earned yet'}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
