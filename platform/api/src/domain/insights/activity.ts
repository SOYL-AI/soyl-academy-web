import { istDay, type Database } from '@soyl/db';
import { ACTIVITY } from '@soyl/shared/config/learning';
import type { Clock } from '../../clock';

/** Contract stub (implementation follows). */
export async function activitySummary(_db: Database, clock: Clock, _userId: string, days: number) {
  const to = istDay(new Date(clock.now()));
  return {
    timezone: ACTIVITY.timezone,
    from: to,
    to,
    days,
    calendar: [],
    totals: { answered: 0, solved: 0, lessonsCompleted: 0, testsSubmitted: 0, activeDays: 0 },
    streak: { current: 0, longest: 0, lastActiveDay: null, atRisk: false, freezeAvailableThisWeek: true },
    activeDaysAllTime: 0,
  };
}
