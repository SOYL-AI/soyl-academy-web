/**
 * SOYL Coins store and redemptions (D-037, ADR-020).
 *
 * Digital items (frames, themes) are granted at once: a `fulfilled` redemption plus its `redeem` row.
 * Physical merch needs, in this order (each refusal is a problem code):
 *   (a) a verified account (verified email or phone)                     → verification_required
 *   (b) consent `granted` from the consent provider (strict, fail closed) → consent_required / consent_unavailable
 *       (production runs CONSENT_PROVIDER=unavailable, so physical redemption is refused there)
 *   (c) COINS_PHYSICAL_REDEMPTION_ENABLED (default off until OA-19)       → redemption_disabled
 * and only then may the shipping address be sent (PUT …/address re-checks (a)–(c)).
 *
 *   requested ──address──▶ parent_approval_pending ──staff approve──▶ approved ──staff fulfil──▶ fulfilled
 *       │                        │                                     │
 *       └── student cancel ──────┴──── staff reject ──────────────────┴──▶ cancelled / refunded (coins back)
 *
 * Coins are taken (`redeem`) when the redemption is requested and returned exactly (`refund`) if it is
 * cancelled or rejected. Locks: the student's wallet row, then the item's advisory lock (stock), always
 * in that order. The address is AES-256-GCM encrypted with a key derived from MFA_ENCRYPTION_KEY
 * (HKDF, purpose-bound) and the redemption id as associated data; it is erased on cancel/refund/account
 * deletion and COIN_STORE.addressRetentionDaysAfterFulfilment after shipping (worker job).
 */
import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from 'node:crypto';
import { and, asc, desc, eq, inArray, isNotNull, lt, sql } from 'drizzle-orm';
import { auditLog, coinLedger, coinRedemptions, coinWallets, istDay, type Database } from '@soyl/db';
import {
  COIN_STORE,
  OPEN_OR_DONE_REDEMPTION,
  STORE_ITEMS,
  inDropWindow,
  storeItem,
  type RedemptionStatus,
  type StoreEligibility,
  type StoreItem,
} from '@soyl/shared/config/coins';
import type { ConsentState } from '@soyl/shared/config/security';
import { ApiProblem } from '../../errors';
import type { ConsentService } from '../../consent/service';
import { eligibilityStats } from './awards';
import { balanceOf, lockWallet, type Db, type Tx } from './ledger';

export interface ShippingAddress {
  recipientName: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  pincode: string;
  /** Indian mobile for the courier (+91XXXXXXXXXX). */
  phone: string;
}

export interface StoreDeps {
  db: Database;
  consent: ConsentService;
  /** COINS_PHYSICAL_REDEMPTION_ENABLED. */
  physicalEnabled: boolean;
  /** 32-byte key from config (MFA_ENCRYPTION_KEY); the address key is derived from it. */
  masterKey: Buffer;
  items?: readonly StoreItem[];
}

/* Address encryption ------------------------------------------------------------------------------ */

export function addressKey(masterKey: Buffer): Buffer {
  return Buffer.from(hkdfSync('sha256', masterKey, Buffer.alloc(0), Buffer.from('soyl/coins-address/v1'), 32));
}

export function encryptAddress(key: Buffer, redemptionId: string, address: ShippingAddress): string {
  const iv = randomBytes(12);
  const c = createCipheriv('aes-256-gcm', key, iv);
  c.setAAD(Buffer.from(`coin_redemption:${redemptionId}`));
  const ct = Buffer.concat([c.update(Buffer.from(JSON.stringify(address), 'utf8')), c.final()]);
  return ['a1', iv.toString('base64url'), ct.toString('base64url'), c.getAuthTag().toString('base64url')].join(':');
}

export function decryptAddress(key: Buffer, redemptionId: string, enc: string): ShippingAddress {
  const [v, iv, ct, tag] = enc.split(':');
  if (v !== 'a1' || !iv || !ct || !tag) throw new Error('unknown address format');
  const d = createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'base64url'));
  d.setAAD(Buffer.from(`coin_redemption:${redemptionId}`));
  d.setAuthTag(Buffer.from(tag, 'base64url'));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(ct, 'base64url')), d.final()]).toString('utf8')) as ShippingAddress;
}

/* Eligibility and the store view ----------------------------------------------------------------- */

type Stats = Awaited<ReturnType<typeof eligibilityStats>>;

export function eligible(rule: StoreEligibility | null, s: Stats): boolean {
  if (!rule) return true;
  switch (rule.kind) {
    case 'live_rank':
      return s.bestLiveRank !== null && s.bestLiveRank <= rule.maxRank;
    case 'solved':
      return s.solved >= rule.count;
    case 'checkin_streak':
      return s.checkinLongest >= rule.days;
    case 'chapters_mastered':
      return s.chaptersMastered >= rule.count;
  }
}

/** Units of an item held by open or fulfilled redemptions. */
async function unitsTaken(db: Db, itemKeys: string[]): Promise<Map<string, number>> {
  if (!itemKeys.length) return new Map();
  const rows = await db
    .select({ key: coinRedemptions.itemKey, n: sql<number>`count(*)::int` })
    .from(coinRedemptions)
    .where(and(inArray(coinRedemptions.itemKey, itemKeys), inArray(coinRedemptions.status, [...OPEN_OR_DONE_REDEMPTION])))
    .groupBy(coinRedemptions.itemKey);
  return new Map(rows.map((r) => [r.key, Number(r.n)]));
}

async function heldBy(db: Db, userId: string): Promise<Map<string, number>> {
  const rows = await db
    .select({ key: coinRedemptions.itemKey, n: sql<number>`count(*)::int` })
    .from(coinRedemptions)
    .where(and(eq(coinRedemptions.userId, userId), inArray(coinRedemptions.status, [...OPEN_OR_DONE_REDEMPTION])))
    .groupBy(coinRedemptions.itemKey);
  return new Map(rows.map((r) => [r.key, Number(r.n)]));
}

export type ItemState =
  | 'available'
  | 'sign_in'
  | 'insufficient_coins'
  | 'locked'
  | 'owned'
  | 'limit_reached'
  | 'sold_out'
  | 'upcoming'
  | 'ended'
  | 'coming_soon'
  | 'verification_needed'
  | 'consent_needed';

export interface StoreViewer {
  id: string;
  emailVerified: boolean;
  phoneNumberVerified: boolean;
}

export const isVerified = (u: StoreViewer) => u.emailVerified || u.phoneNumberVerified;

export async function storeView(deps: StoreDeps, now: Date, viewer: StoreViewer | null) {
  const items = (deps.items ?? STORE_ITEMS).filter((i) => i.active);
  const taken = await unitsTaken(deps.db, items.filter((i) => i.stock !== null).map((i) => i.key));
  let balance: number | null = null;
  let stats: Stats | null = null;
  let held = new Map<string, number>();
  let consent: ConsentState | null = null;
  if (viewer) {
    [balance, stats, held] = await Promise.all([balanceOf(deps.db, viewer.id), eligibilityStats(deps.db, viewer.id), heldBy(deps.db, viewer.id)]);
    if (items.some((i) => i.type === 'physical')) consent = await deps.consent.getStatus(viewer.id).catch(() => null);
  }
  const ms = now.getTime();
  return {
    balance,
    physicalRedemptionEnabled: deps.physicalEnabled,
    consentStatus: consent,
    verified: viewer ? isVerified(viewer) : null,
    items: items.map((i) => {
      const drop = inDropWindow(i, ms);
      const remaining = i.stock === null ? null : Math.max(0, i.stock - (taken.get(i.key) ?? 0));
      const isEligible = stats ? eligible(i.eligibility, stats) : null;
      const mine = held.get(i.key) ?? 0;
      let state: ItemState;
      if (i.type === 'physical' && !deps.physicalEnabled) state = 'coming_soon';
      else if (drop !== 'open') state = drop;
      else if (remaining === 0) state = 'sold_out';
      else if (!viewer) state = 'sign_in';
      else if (mine >= i.maxPerUser) state = i.type === 'digital' ? 'owned' : 'limit_reached';
      else if (!isEligible) state = 'locked';
      else if (i.type === 'physical' && !isVerified(viewer)) state = 'verification_needed';
      else if (i.type === 'physical' && consent !== 'granted') state = 'consent_needed';
      else if ((balance ?? 0) < i.priceCoins) state = 'insufficient_coins';
      else state = 'available';
      if (i.type === 'digital' && mine > 0) state = 'owned';
      return {
        key: i.key,
        name: i.name,
        description: i.description,
        image: i.image,
        type: i.type,
        slot: i.slot ?? null,
        priceCoins: i.priceCoins,
        stock: i.stock,
        remaining,
        availableFrom: i.availableFrom,
        availableUntil: i.availableUntil,
        eligibilityLabel: i.eligibilityLabel,
        eligible: isEligible,
        owned: viewer ? mine : null,
        maxPerUser: i.maxPerUser,
        state,
      };
    }),
  };
}

/* Redeem ----------------------------------------------------------------------------------------- */

/** (a)–(c) for physical items, in the order the brief fixes. Throws the matching problem. */
export async function assertPhysicalAllowed(deps: StoreDeps, user: StoreViewer): Promise<void> {
  if (!isVerified(user)) throw new ApiProblem('verification_required');
  await deps.consent.assertAllowed(user.id, 'physical_rewards');
  if (!deps.physicalEnabled) throw new ApiProblem('redemption_disabled');
}

export interface RedemptionDto {
  id: string;
  itemKey: string;
  itemName: string;
  itemType: 'digital' | 'physical';
  priceCoins: number;
  status: RedemptionStatus;
  statusReason: string | null;
  addressOnFile: boolean;
  trackingRef: string | null;
  createdAt: string;
  updatedAt: string;
}

export function redemptionDto(r: typeof coinRedemptions.$inferSelect, items: readonly StoreItem[] = STORE_ITEMS): RedemptionDto {
  return {
    id: r.id,
    itemKey: r.itemKey,
    itemName: storeItem(r.itemKey, items)?.name ?? r.itemKey,
    itemType: r.itemType as 'digital' | 'physical',
    priceCoins: r.priceCoins,
    status: r.status as RedemptionStatus,
    statusReason: r.statusReason,
    addressOnFile: !!r.addressEnc,
    trackingRef: r.trackingRef,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  };
}

export async function redeem(deps: StoreDeps, now: Date, user: StoreViewer, itemKey: string): Promise<{ redemption: RedemptionDto; balance: number }> {
  const items = deps.items ?? STORE_ITEMS;
  const item = storeItem(itemKey, items);
  if (!item || !item.active) throw new ApiProblem('not_found');
  if (item.type === 'physical') await assertPhysicalAllowed(deps, user);
  const drop = inDropWindow(item, now.getTime());
  if (drop !== 'open') throw new ApiProblem('item_unavailable', { detail: drop === 'upcoming' ? 'This drop has not opened yet.' : 'This drop has ended.' });
  // Pool reads happen before the transaction (a transaction never waits for a second connection).
  const stats = item.eligibility ? await eligibilityStats(deps.db, user.id) : null;
  if (stats && !eligible(item.eligibility, stats)) throw new ApiProblem('not_eligible', { detail: item.eligibilityLabel ?? undefined });

  const result = await deps.db.transaction(async (tx) => {
    await lockWallet(tx, user.id);
    await tx.execute(sql`SELECT pg_advisory_xact_lock(hashtext(${`coin_item:${item.key}`}))`);
    const mine = (await heldBy(tx, user.id)).get(item.key) ?? 0;
    if (mine >= item.maxPerUser) throw new ApiProblem('redemption_limit', { detail: item.type === 'digital' ? 'You already own this.' : `At most ${item.maxPerUser} per student.` });
    if (item.stock !== null) {
      const taken = (await unitsTaken(tx, [item.key])).get(item.key) ?? 0;
      if (taken >= item.stock) throw new ApiProblem('out_of_stock');
    }
    const balance = await balanceOf(tx, user.id);
    if (balance < item.priceCoins) throw new ApiProblem('coins_insufficient', { fields: { balance, price: item.priceCoins } });
    const [r] = await tx
      .insert(coinRedemptions)
      .values({
        userId: user.id,
        itemKey: item.key,
        itemType: item.type,
        priceCoins: item.priceCoins,
        status: item.type === 'digital' ? 'fulfilled' : 'requested',
        fulfilledAt: item.type === 'digital' ? now : null,
        createdAt: now,
        updatedAt: now,
      })
      .returning();
    await tx.insert(coinLedger).values({
      userId: user.id,
      kind: 'redeem',
      source: 'redemption',
      amount: -item.priceCoins,
      idempotencyKey: `redeem:${r!.id}`,
      istDay: istDay(now),
      redemptionId: r!.id,
      metadata: { itemKey: item.key },
      createdAt: now,
    });
    // Equip a digital item into an empty slot straight away.
    if (item.type === 'digital' && item.slot) {
      const col = item.slot === 'frame' ? coinWallets.equippedFrame : coinWallets.equippedTheme;
      await tx
        .update(coinWallets)
        .set(item.slot === 'frame' ? { equippedFrame: item.key } : { equippedTheme: item.key })
        .where(and(eq(coinWallets.userId, user.id), sql`${col} IS NULL`));
    }
    return { redemption: redemptionDto(r!, items), balance: balance - item.priceCoins };
  });
  return result;
}

/** Locks one of the student's own redemptions (404 for anyone else's). */
async function ownRedemption(tx: Tx, userId: string, id: string) {
  const [r] = await tx.select().from(coinRedemptions).where(and(eq(coinRedemptions.id, id), eq(coinRedemptions.userId, userId))).for('update');
  if (!r) throw new ApiProblem('not_found');
  return r;
}

export async function submitAddress(deps: StoreDeps, now: Date, user: StoreViewer, redemptionId: string, address: ShippingAddress): Promise<RedemptionDto> {
  await assertPhysicalAllowed(deps, user);
  return deps.db.transaction(async (tx) => {
    const r = await ownRedemption(tx, user.id, redemptionId);
    if (r.itemType !== 'physical' || r.status !== 'requested') throw new ApiProblem('conflict', { detail: 'This redemption is not waiting for an address.' });
    const enc = encryptAddress(addressKey(deps.masterKey), r.id, address);
    const [u] = await tx
      .update(coinRedemptions)
      .set({ addressEnc: enc, addressSubmittedAt: now, status: 'parent_approval_pending', updatedAt: now })
      .where(eq(coinRedemptions.id, r.id))
      .returning();
    return redemptionDto(u!, deps.items);
  });
}

/** Ends a redemption with its coins returned and the address erased (cancel, reject, timeout, deletion). */
async function closeWithRefund(tx: Tx, r: typeof coinRedemptions.$inferSelect, now: Date, status: 'cancelled' | 'refunded', reason: string, reviewedBy: string | null) {
  const [u] = await tx
    .update(coinRedemptions)
    .set({
      status,
      statusReason: reason,
      addressEnc: null,
      addressErasedAt: r.addressEnc ? now : r.addressErasedAt,
      closedAt: now,
      ...(reviewedBy ? { reviewedBy } : {}),
      updatedAt: now,
    })
    .where(eq(coinRedemptions.id, r.id))
    .returning();
  if (r.userId)
    await tx
      .insert(coinLedger)
      .values({
        userId: r.userId,
        kind: 'refund',
        source: 'redemption',
        amount: r.priceCoins,
        idempotencyKey: `refund:${r.id}`,
        istDay: istDay(now),
        redemptionId: r.id,
        metadata: { itemKey: r.itemKey },
        createdAt: now,
      })
      .onConflictDoNothing();
  return u!;
}

export async function cancelRedemption(deps: StoreDeps, now: Date, userId: string, redemptionId: string): Promise<RedemptionDto> {
  return deps.db.transaction(async (tx) => {
    await lockWallet(tx, userId);
    const r = await ownRedemption(tx, userId, redemptionId);
    if (r.status !== 'requested' && r.status !== 'parent_approval_pending') throw new ApiProblem('conflict', { detail: 'This redemption can no longer be cancelled.' });
    return redemptionDto(await closeWithRefund(tx, r, now, 'cancelled', 'student_cancelled', null), deps.items);
  });
}

export async function myRedemptions(db: Database, userId: string, items: readonly StoreItem[] = STORE_ITEMS): Promise<RedemptionDto[]> {
  const rows = await db.select().from(coinRedemptions).where(eq(coinRedemptions.userId, userId)).orderBy(desc(coinRedemptions.createdAt)).limit(100);
  return rows.map((r) => redemptionDto(r, items));
}

/* Equip ------------------------------------------------------------------------------------------ */

export async function equip(deps: StoreDeps, now: Date, userId: string, want: { frame?: string | null; theme?: string | null }) {
  const items = deps.items ?? STORE_ITEMS;
  return deps.db.transaction(async (tx) => {
    await lockWallet(tx, userId);
    const owned = new Set(
      (
        await tx
          .select({ key: coinRedemptions.itemKey })
          .from(coinRedemptions)
          .where(and(eq(coinRedemptions.userId, userId), eq(coinRedemptions.itemType, 'digital'), eq(coinRedemptions.status, 'fulfilled')))
      ).map((r) => r.key),
    );
    const set: Partial<typeof coinWallets.$inferInsert> = { updatedAt: now };
    for (const slot of ['frame', 'theme'] as const) {
      const v = want[slot];
      if (v === undefined) continue;
      if (v !== null && (!owned.has(v) || storeItem(v, items)?.slot !== slot)) throw new ApiProblem('validation_failed', { errors: [{ path: `body.${slot}`, message: 'You do not own this item.' }] });
      if (slot === 'frame') set.equippedFrame = v;
      else set.equippedTheme = v;
    }
    const [w] = await tx.update(coinWallets).set(set).where(eq(coinWallets.userId, userId)).returning();
    return { frame: w!.equippedFrame, theme: w!.equippedTheme };
  });
}

/* Staff ------------------------------------------------------------------------------------------ */

export interface StaffActor {
  id: string;
  role: string;
}

export interface AdminRedemptionDto extends RedemptionDto {
  /** Decrypted only for redemptions under review or approved (to ship); null otherwise. */
  address: ShippingAddress | null;
  student: string | null;
}

export async function adminListRedemptions(deps: StoreDeps, actor: StaffActor, q: { status: RedemptionStatus; limit: number; requestId: string }): Promise<AdminRedemptionDto[]> {
  const rows = await deps.db.select().from(coinRedemptions).where(and(eq(coinRedemptions.status, q.status), eq(coinRedemptions.itemType, 'physical'))).orderBy(asc(coinRedemptions.createdAt)).limit(q.limit);
  const key = addressKey(deps.masterKey);
  const showAddress = q.status === 'parent_approval_pending' || q.status === 'approved';
  const out = rows.map((r) => ({
    ...redemptionDto(r, deps.items),
    student: r.userId,
    address: showAddress && r.addressEnc ? decryptAddress(key, r.id, r.addressEnc) : null,
  }));
  if (showAddress && out.some((o) => o.address))
    await deps.db.insert(auditLog).values({
      actorUserId: actor.id,
      actorRole: actor.role,
      action: 'coins.redemptions.addresses_viewed',
      targetType: 'coin_redemption',
      targetId: null,
      after: { ids: out.filter((o) => o.address).map((o) => o.id) },
      requestId: q.requestId,
    });
  return out;
}

async function staffTransition(
  deps: StoreDeps,
  now: Date,
  actor: StaffActor,
  id: string,
  requestId: string,
  from: RedemptionStatus[],
  apply: (tx: Tx, r: typeof coinRedemptions.$inferSelect) => Promise<typeof coinRedemptions.$inferSelect>,
  action: string,
): Promise<RedemptionDto> {
  // The student's wallet is locked first (lock order: wallet → redemption), so read the owner before the transaction.
  const [peek] = await deps.db.select({ userId: coinRedemptions.userId }).from(coinRedemptions).where(eq(coinRedemptions.id, id));
  if (!peek) throw new ApiProblem('not_found');
  return deps.db.transaction(async (tx) => {
    if (peek.userId) await lockWallet(tx, peek.userId);
    const [r] = await tx.select().from(coinRedemptions).where(eq(coinRedemptions.id, id)).for('update');
    if (!r || r.itemType !== 'physical') throw new ApiProblem('not_found');
    if (!from.includes(r.status as RedemptionStatus)) throw new ApiProblem('conflict', { detail: `This redemption is ${r.status}.` });
    const u = await apply(tx, r);
    await tx.insert(auditLog).values({
      actorUserId: actor.id,
      actorRole: actor.role,
      action,
      targetType: 'coin_redemption',
      targetId: r.id,
      before: { status: r.status },
      after: { status: u.status, ...(u.statusReason ? { reason: u.statusReason } : {}) },
      requestId,
      createdAt: now,
    });
    return redemptionDto(u, deps.items);
  });
}

/** Staff review: the parent's approval stands (consent re-checked as `granted`, strict) and the order is fine to ship. */
export async function adminApprove(deps: StoreDeps, now: Date, actor: StaffActor, id: string, requestId: string) {
  const [peek] = await deps.db.select({ userId: coinRedemptions.userId }).from(coinRedemptions).where(eq(coinRedemptions.id, id));
  if (!peek) throw new ApiProblem('not_found');
  if (!peek.userId) throw new ApiProblem('conflict', { detail: 'The student account no longer exists.' });
  let consent: ConsentState;
  try {
    consent = await deps.consent.getStatus(peek.userId, { strict: true });
  } catch {
    throw new ApiProblem('consent_unavailable');
  }
  if (consent !== 'granted') throw new ApiProblem('consent_required', { detail: `The student's consent status is ${consent}.` });
  return staffTransition(deps, now, actor, id, requestId, ['parent_approval_pending'], async (tx, r) => {
    const [u] = await tx.update(coinRedemptions).set({ status: 'approved', approvedAt: now, reviewedBy: actor.id, updatedAt: now }).where(eq(coinRedemptions.id, r.id)).returning();
    return u!;
  }, 'coins.redemption.approve');
}

export async function adminFulfil(deps: StoreDeps, now: Date, actor: StaffActor, id: string, trackingRef: string, requestId: string) {
  return staffTransition(deps, now, actor, id, requestId, ['approved'], async (tx, r) => {
    const [u] = await tx.update(coinRedemptions).set({ status: 'fulfilled', fulfilledAt: now, trackingRef, reviewedBy: actor.id, closedAt: now, updatedAt: now }).where(eq(coinRedemptions.id, r.id)).returning();
    return u!;
  }, 'coins.redemption.fulfil');
}

export async function adminReject(deps: StoreDeps, now: Date, actor: StaffActor, id: string, reason: 'staff_rejected' | 'out_of_stock', requestId: string) {
  return staffTransition(deps, now, actor, id, requestId, ['requested', 'parent_approval_pending', 'approved'], (tx, r) => closeWithRefund(tx, r, now, 'refunded', reason, actor.id), 'coins.redemption.reject');
}

/* Housekeeping (worker) and account deletion ----------------------------------------------------- */

/** Erases addresses of shipped items after the retention period, and cancels (refunds) requests left without an address. */
export async function coinsHousekeeping(db: Database, now: Date, opts: { retentionDays?: number; addressDeadlineDays?: number } = {}) {
  const retention = new Date(now.getTime() - (opts.retentionDays ?? COIN_STORE.addressRetentionDaysAfterFulfilment) * 86_400_000);
  const erased = await db
    .update(coinRedemptions)
    .set({ addressEnc: null, addressErasedAt: now, updatedAt: now })
    .where(and(eq(coinRedemptions.status, 'fulfilled'), isNotNull(coinRedemptions.addressEnc), lt(coinRedemptions.fulfilledAt, retention)))
    .returning({ id: coinRedemptions.id });
  const deadline = new Date(now.getTime() - (opts.addressDeadlineDays ?? COIN_STORE.addressDeadlineDays) * 86_400_000);
  const stale = await db.select({ id: coinRedemptions.id, userId: coinRedemptions.userId }).from(coinRedemptions).where(and(eq(coinRedemptions.status, 'requested'), lt(coinRedemptions.createdAt, deadline))).limit(500);
  let cancelled = 0;
  for (const s of stale) {
    await db.transaction(async (tx) => {
      if (s.userId) await lockWallet(tx, s.userId);
      const [r] = await tx.select().from(coinRedemptions).where(eq(coinRedemptions.id, s.id)).for('update');
      if (!r || r.status !== 'requested') return;
      await closeWithRefund(tx, r, now, 'cancelled', 'address_timeout', null);
      cancelled++;
    });
  }
  return { addressesErased: erased.length, cancelled };
}

/**
 * DELETE /v1/me step 1 (PII.md): erase every address and tracking reference and cancel open physical
 * redemptions (coins refunded; the ledger is removed with the account at the purge). Runs in the
 * deletion transaction.
 */
export async function eraseCoinPersonalData(tx: Tx, userId: string, now: Date): Promise<void> {
  await lockWallet(tx, userId);
  const open = await tx
    .select()
    .from(coinRedemptions)
    .where(and(eq(coinRedemptions.userId, userId), inArray(coinRedemptions.status, ['requested', 'parent_approval_pending', 'approved'])))
    .for('update');
  for (const r of open) await closeWithRefund(tx, r, now, 'cancelled', 'account_deleted', null);
  await tx
    .update(coinRedemptions)
    .set({ addressEnc: null, trackingRef: null, addressErasedAt: now, updatedAt: now })
    .where(and(eq(coinRedemptions.userId, userId), sql`(${coinRedemptions.addressEnc} IS NOT NULL OR ${coinRedemptions.trackingRef} IS NOT NULL)`));
  await tx.update(coinWallets).set({ equippedFrame: null, equippedTheme: null, updatedAt: now }).where(eq(coinWallets.userId, userId));
}
