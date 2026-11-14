'use client';

/**
 * /me/progress: the private player card with its attribute radar (anchor `#card`), and the "Your subjects" radar of
 * mastery by subject (progress radar, 2026-11-14; ADR-023 card rules: private, deterministic, earned only, no packs,
 * no randomness, no comparison with anyone).
 *
 * - Rated card: the full card beside a radar in the card's tier colour, then every attribute with how it is worked
 *   out (so the student knows how to raise it).
 * - Provisional card (fewer than 10 checked answers or 3 active days): the blank card, a dashed hexagon with the six
 *   attribute names and no numbers, what it takes to get rated, and where each part stands in words.
 * - Subjects: 3–8 axes (the most active subjects; "+N more" jumps to the Mastery list), a ranked bar list for 1–2.
 */
import type { MyPlayerCard, MyMastery } from '@/platform/shared/api-client';
import { Card, ProgressBar, Skeleton } from '@/components/platform/ui/kit/Display';
import { PageSection } from '@/components/platform/ui/kit/Page';
import { RadarChart } from '@/components/platform/ui/kit/RadarChart';
import type { Loadable } from '../learn/useInsights';
import { BlankPlayerCard, CardAttributes, PlayerCard } from '../me/PlayerCard';
import { CARD_RADAR, cardRadarAxes, cardRadarCaption, isRatedCard, subjectRadar, UNRATED_TITLE, unratedText } from './progress-model';
import s from './progress.module.css';

export function CardSection({ card }: { card: Loadable<MyPlayerCard> }) {
  const data = card.status === 'ready' ? card.data : null;
  const rated = isRatedCard(data);
  return (
    <PageSection id="card" title="Your player card" description="Only you can see it. It is worked out from your own learning and changes as you learn." data-testid="card-section">
      <Card className={s.cardHero} data-rated={card.status === 'ready' ? rated : undefined}>
        {card.status === 'loading' ? (
          <Skeleton variant="block" height={300} />
        ) : !data ? (
          <div className={s.cardHeroGrid}>
            <div className={s.cardHeroCard}>
              <BlankPlayerCard title="Your card could not load" />
            </div>
            <p className={s.muted}>Your card is safe. Check your connection and try again later.</p>
          </div>
        ) : rated ? (
          <>
            <div className={s.cardHeroGrid}>
              <div className={s.cardHeroCard}>
                <PlayerCard card={data} />
              </div>
              <RadarChart
                axes={cardRadarAxes(data)}
                label="Your card attributes"
                min={CARD_RADAR.min}
                rings={CARD_RADAR.rings}
                tone={data.tier}
                columns={{ axis: 'Attribute', value: 'Rating' }}
                caption={cardRadarCaption(data)}
                className={s.cardRadar}
                data-testid="card-radar"
              />
            </div>
            <CardAttributes card={data} className={s.cardAttrs} />
          </>
        ) : (
          <>
            <div className={s.cardHeroGrid}>
              <div className={s.cardHeroCard}>
                <BlankPlayerCard title={UNRATED_TITLE} />
              </div>
              <RadarChart axes={cardRadarAxes(null)} label="Your card attributes" min={CARD_RADAR.min} rings={CARD_RADAR.rings} blank className={s.cardRadar} data-testid="card-radar" />
            </div>
            <p className={s.muted}>{unratedText()}</p>
            <CardAttributes card={data} rated={false} className={s.cardAttrs} />
          </>
        )}
      </Card>
    </PageSection>
  );
}

export function SubjectsSection({ mastery }: { mastery: Loadable<MyMastery> }) {
  if (mastery.status === 'loading') {
    return (
      <PageSection id="subjects-title" title="Your subjects" data-testid="subjects-section">
        <Card>
          <Skeleton variant="block" height={240} />
        </Card>
      </PageSection>
    );
  }
  if (mastery.status !== 'ready') return null;
  const view = subjectRadar(mastery.data.subjects);
  if (view.kind === 'none') return null;
  return (
    <PageSection
      id="subjects-title"
      title="Your subjects"
      description="Mastery out of 100 in each subject you have started. Every chapter counts, so it grows as you cover more."
      action={view.kind === 'radar' && view.more > 0 ? { href: '#mastery-title', label: `+${view.more} more ${view.more === 1 ? 'subject' : 'subjects'}` } : undefined}
      data-testid="subjects-section"
    >
      <Card className={s.subjectsCard}>
        {view.kind === 'radar' ? (
          <RadarChart
            axes={view.axes}
            label="Subject mastery"
            min={0}
            rings={[25, 50, 75, 100]}
            unit="%"
            columns={{ axis: 'Subject', value: 'Mastery' }}
            caption="The centre is 0 and the outer ring 100."
            data-testid="subjects-radar"
          />
        ) : (
          <ol className={s.subjectBars} aria-label="Your subjects by mastery" data-testid="subjects-bars">
            {view.bars.map((b) => (
              <li key={b.subjectId}>
                <ProgressBar value={b.score} label={b.name} valueText={`${b.score}% mastery`} />
              </li>
            ))}
          </ol>
        )}
      </Card>
    </PageSection>
  );
}
