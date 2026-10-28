/**
 * Staff capabilities (D-045, migration 0014). `superadmin` = role `admin` + a `staff_capabilities` row.
 * Checked by the route policy (`policy.capability`) after the role and before MFA; read on every call
 * (one indexed lookup) so a revoked capability takes effect at once.
 */
import { and, eq } from 'drizzle-orm';
import { staffCapabilities, type Database } from '@soyl/db';
import type { StaffCapability } from '@soyl/shared/config/analytics';

export class StaffService {
  constructor(private readonly db: Database) {}

  async capabilities(userId: string): Promise<StaffCapability[]> {
    const rows = await this.db.select({ c: staffCapabilities.capability }).from(staffCapabilities).where(eq(staffCapabilities.userId, userId));
    return rows.map((r) => r.c as StaffCapability).sort();
  }

  async has(userId: string, capability: StaffCapability): Promise<boolean> {
    const rows = await this.db
      .select({ id: staffCapabilities.id })
      .from(staffCapabilities)
      .where(and(eq(staffCapabilities.userId, userId), eq(staffCapabilities.capability, capability)))
      .limit(1);
    return rows.length > 0;
  }
}
