import { istDay, type Database } from '@soyl/db';
import { playerCard } from '@soyl/shared/learning/card';
import type { Clock } from '../../clock';

/** Contract stub (implementation follows). */
export async function playerCardFor(_db: Database, clock: Clock, _year: string, _userId: string) {
  const card = playerCard({ firstTryChecked: 0, firstTryCorrect: 0, activeDaysInWindow: 0, speed: null, chaptersTouched: 0, masteryScores: [], testsTaken: 0, testsMeanPct: null });
  return { publicName: '', level: 1, xp: 0, coins: 0, ...card, asOfDay: istDay(new Date(clock.now())) };
}
