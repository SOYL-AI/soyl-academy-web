'use client';

/**
 * /store (ADR-021 §5, D-038): the SOYL Store. Earned, never sold. At launch there are no redemptions:
 * while GET /v1/coins/store says `redemptionEnabled: false` (items []), the page is an "Exclusive rewards —
 * coming soon" page that points to how to earn. When redemption is switched on, items come with the
 * viewer's state (guests may look): digital items are granted at once and can be equipped; merch needs a
 * verified account, parent consent and physical redemption switched on, and only then asks for a delivery
 * address. Every refusal is explained in plain words.
 */
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { CoinRedemption, CoinStore, CoinStoreItem } from '@/platform/shared/api-client';
import { howToEarn } from '@/platform/shared/config/coins';
import { Button } from '@/components/platform/ui/kit/Button';
import { Dialog } from '@/components/platform/ui/kit/Dialog';
import { Badge, EmptyState, Skeleton } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { useToast } from '@/components/platform/ui/kit/Toast';
import { cx } from '@/components/platform/ui/cx';
import { useSession } from '../auth/SessionProvider';
import { api } from '../lib/api-browser';
import { AddressForm } from './AddressForm';
import { canCancel, coinsProblemMessage, coinsText, dropLine, istDate, needsAddress, REDEMPTION_STATUS_LABELS, stateCopy } from './coins-logic';
import { useCoins } from './CoinsProvider';
import { StoreArt } from './StoreArt';
import { useNow } from './useNow';
import { itemRarity, RARITY_LABELS, type Rarity } from './rarity';
import s from './store.module.css';

type Pending = { kind: 'redeem'; item: CoinStoreItem } | { kind: 'address'; redemption: Pick<CoinRedemption, 'id' | 'itemName'> } | { kind: 'cancel'; redemption: CoinRedemption } | null;

function Price({ coins }: { coins: number }) {
  return (
    <span className={s.price}>
      <Icon name="coin" size={18} className={s.priceCoin} />
      <span>{coins.toLocaleString('en-IN')}</span>
      <span className="p-visually-hidden">{coins === 1 ? 'coin' : 'coins'}</span>
    </span>
  );
}

interface ItemCardProps {
  item: CoinStoreItem;
  balance: number | null;
  now: number | null;
  equipped: string | null;
  busy: boolean;
  onRedeem: () => void;
  onSignIn: () => void;
  onEquip: (on: boolean) => void;
}

function ItemCard({ item, balance, now, equipped, busy, onRedeem, onSignIn, onEquip }: ItemCardProps) {
  const copy = stateCopy(item, balance);
  const drop = now !== null ? dropLine(item, now) : null;
  const locked = item.state === 'locked';
  const isEquipped = equipped === item.key;
  const titleId = `item-${item.key}`;
  const rarity = itemRarity(item);
  return (
    <li className={cx(s.item, locked && s.itemLocked, item.state === 'available' && s.itemReady)} data-testid="store-item" data-item={item.key} data-state={item.state} data-rarity={rarity} aria-labelledby={titleId}>
      <div className={cx(s.art, item.type === 'digital' ? s.artDigital : s.artPhysical)}>
        <StoreArt image={item.image} className={s.artSvg} />
        {locked && (
          <span className={s.lockBadge}>
            <Icon name="lock" size={16} /> Locked
          </span>
        )}
        {item.stock !== null && (
          <span className={s.stockBadge} data-testid="stock">
            {item.remaining === 0 ? 'Sold out' : `${(item.remaining ?? item.stock).toLocaleString('en-IN')} of ${item.stock.toLocaleString('en-IN')} left`}
          </span>
        )}
      </div>
      <div className={s.itemBody}>
        <p className={s.itemKind}>
          <span className={s.rarity}>{RARITY_LABELS[rarity]}</span>
          {item.type === 'digital' ? (item.slot === 'frame' ? 'Profile frame' : 'Theme') : 'Merch'}
          {(item.availableFrom || item.availableUntil) && <span className={s.dropTag}>Limited drop</span>}
        </p>
        <h3 id={titleId} className={s.itemName}>
          {item.name}
        </h3>
        <p className={s.itemDesc}>{item.description}</p>
        {item.eligibilityLabel && (
          <p className={cx(s.eligibility, item.eligible && s.eligibilityMet)}>
            <Icon name={item.eligible ? 'check' : 'lock'} size={16} /> {item.eligibilityLabel}
            {item.eligible ? <span className="p-visually-hidden"> (done)</span> : null}
          </p>
        )}
        {drop && (
          <p className={s.drop} data-testid="drop-countdown">
            <Icon name="clock" size={16} /> {drop}
          </p>
        )}
        <div className={s.itemFoot}>
          <Price coins={item.priceCoins} />
          {copy.action === 'redeem' && (
            <Button size="sm" onClick={onRedeem} data-testid="redeem">
              Redeem
            </Button>
          )}
          {copy.action === 'sign_in' && (
            <Button size="sm" variant="secondary" onClick={onSignIn}>
              {copy.label}
            </Button>
          )}
          {copy.action === 'equip' && (
            <Button size="sm" variant={isEquipped ? 'secondary' : 'primary'} loading={busy} onClick={() => onEquip(!isEquipped)} data-testid="equip" aria-pressed={isEquipped}>
              {isEquipped ? 'Equipped' : 'Equip'}
            </Button>
          )}
          {(copy.action === 'consent' || copy.action === 'verify') && (
            <Link href={copy.action === 'consent' ? '/me/consent?next=%2Fstore' : '/me'} className={s.footLink}>
              {copy.label}
            </Link>
          )}
          {copy.action === 'none' && (
            <Badge tone={item.state === 'coming_soon' || item.state === 'upcoming' ? 'highlight' : item.state === 'owned' || item.state === 'limit_reached' ? 'success' : 'neutral'} data-testid="item-state">
              {copy.label}
            </Badge>
          )}
        </div>
        {copy.note && (
          <p className={s.itemNote} data-testid="item-note">
            {copy.note}
            {copy.action === 'consent' ? ' Ask a parent to approve from your profile.' : ''}
            {copy.action === 'verify' ? ' Add or verify one on your profile.' : ''}
          </p>
        )}
      </div>
    </li>
  );
}

function Redemptions({ list, onAddress, onCancel }: { list: CoinRedemption[]; onAddress: (r: CoinRedemption) => void; onCancel: (r: CoinRedemption) => void }) {
  if (list.length === 0) return <p className={s.muted}>Nothing redeemed yet.</p>;
  return (
    <ul className={s.orders}>
      {list.map((r) => (
        <li key={r.id} className={s.order} data-testid="redemption" data-status={r.status} data-item={r.itemKey}>
          <span className={s.orderMain}>
            <span className={s.orderName}>{r.itemName}</span>
            <span className={s.small}>
              {istDate(r.createdAt)} · {coinsText(r.priceCoins)} · {r.itemType === 'digital' ? 'Unlocked' : REDEMPTION_STATUS_LABELS[r.status]}
              {r.trackingRef ? ` · tracking ${r.trackingRef}` : ''}
            </span>
          </span>
          <span className={s.orderActions}>
            {needsAddress(r) && (
              <Button size="sm" onClick={() => onAddress(r)} data-testid="add-address">
                Add address
              </Button>
            )}
            {canCancel(r) && (
              <Button size="sm" variant="ghost" onClick={() => onCancel(r)} data-testid="cancel-redemption">
                Cancel
              </Button>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

const TEASERS: { image: string; title: string; text: string; rarity: Rarity }[] = [
  { image: 'hoodie', title: 'Exclusive SOYL merch', text: 'Being designed now. Never sold: only earned with coins.', rarity: 'epic' },
  { image: 'frame-constellation', title: 'Profile rewards', text: 'Frames and themes that show what you have achieved.', rarity: 'rare' },
  { image: 'topper-jacket', title: 'Limited drops', text: 'Rare rewards for top performers in live All-India mocks.', rarity: 'legendary' },
];
const EARN_NOW = ['checkin', 'daily_challenge', 'solved_milestone', 'test_submitted'];

/** D-038: the store before redemption opens. Teasers, no items, prices or buttons that spend coins. */
function ComingSoon({ member }: { member: boolean }) {
  const ways = howToEarn().filter((r) => EARN_NOW.includes(r.key));
  return (
    <>
      <section aria-labelledby="soon-title" className={s.section} data-testid="store-coming-soon">
        <h2 id="soon-title" className={s.sectionTitle}>
          What is coming <span className={s.sectionSub}>Opening soon</span>
        </h2>
        <ul className={s.grid}>
          {TEASERS.map((t) => (
            <li key={t.image} className={cx(s.item, s.teaser)} data-testid="store-teaser" data-rarity={t.rarity}>
              <div className={cx(s.art, s.artDigital)}>
                <StoreArt image={t.image} className={s.artSvg} />
                <span className={s.soonBadge}>Coming soon</span>
              </div>
              <div className={s.itemBody}>
                <p className={s.itemKind}>
                  <span className={s.rarity}>{RARITY_LABELS[t.rarity]}</span>
                </p>
                <h3 className={s.itemName}>{t.title}</h3>
                <p className={s.itemDesc}>{t.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="earn-now-title" className={cx(s.section, s.earnNow)}>
        <h2 id="earn-now-title" className={s.sectionTitle}>
          Start earning now
        </h2>
        <p className={s.muted}>Coins you earn today stay in your balance for the launch.</p>
        <ul className={s.earnNowList}>
          {ways.map((w) => (
            <li key={w.key}>
              <span>{w.label}</span>
              <span className={s.earnNowCoins}>
                <Icon name="coin" size={16} className={s.priceCoin} /> {w.coins}
              </span>
            </li>
          ))}
        </ul>
        <Link href="/coins" className={s.footLink} data-testid="store-how-to-earn">
          {member ? 'Your coins and every way to earn' : 'Every way to earn SOYL Coins'} <Icon name="chevronRight" size={18} />
        </Link>
      </section>
    </>
  );
}

export function StoreClient() {
  const { state, openLogin } = useSession();
  const coins = useCoins();
  const toast = useToast();
  const now = useNow(30_000);
  const [store, setStore] = useState<CoinStore | null>(null);
  const [orders, setOrders] = useState<CoinRedemption[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pending, setPending] = useState<Pending>(null);
  const [busy, setBusy] = useState(false);
  const [dialogError, setDialogError] = useState<string | null>(null);
  const [equipping, setEquipping] = useState<string | null>(null);
  const member = state.status === 'member';

  const load = useCallback(async () => {
    setLoadError(null);
    try {
      setStore(await api.get('/v1/coins/store'));
    } catch (err) {
      setLoadError(coinsProblemMessage(err));
    }
  }, []);
  const loadOrders = useCallback(async () => {
    try {
      setOrders((await api.get('/v1/coins/redemptions')).redemptions);
    } catch {
      setOrders([]);
    }
  }, []);

  useEffect(() => {
    if (state.status === 'loading') return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- refetch when the viewer changes
    void load();
    if (state.status === 'member') void loadOrders();
    else setOrders(null);
  }, [state.status, load, loadOrders]);

  const close = () => {
    setPending(null);
    setDialogError(null);
  };

  const redeem = async (item: CoinStoreItem) => {
    setBusy(true);
    setDialogError(null);
    try {
      const res = await api.post('/v1/coins/redeem', { body: { itemKey: item.key } });
      coins.setBalance(res.balance);
      void coins.refresh();
      void load();
      void loadOrders();
      if (res.redemption.itemType === 'digital') {
        toast.show({ title: `Unlocked: ${item.name}`, description: 'Equip it from its card.', tone: 'success' });
        setPending(null);
      } else if (res.redemption.status === 'requested') {
        setPending({ kind: 'address', redemption: res.redemption });
      } else {
        setPending(null);
      }
    } catch (err) {
      setDialogError(coinsProblemMessage(err));
      void load();
    } finally {
      setBusy(false);
    }
  };

  const cancel = async (r: CoinRedemption) => {
    setBusy(true);
    setDialogError(null);
    try {
      await api.post('/v1/coins/redemptions/{id}/cancel', { params: { id: r.id }, body: {} });
      toast.show({ title: 'Order cancelled', description: `${coinsText(r.priceCoins)} returned to your balance.`, tone: 'success' });
      setPending(null);
      void coins.refresh();
      void load();
      void loadOrders();
    } catch (err) {
      setDialogError(coinsProblemMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const equip = async (item: CoinStoreItem, on: boolean) => {
    if (!item.slot) return;
    setEquipping(item.key);
    try {
      await api.put('/v1/coins/equipped', { body: { [item.slot]: on ? item.key : null } });
      await coins.refresh();
      toast.show({ title: on ? `Equipped: ${item.name}` : `Took off: ${item.name}`, tone: 'success' });
    } catch (err) {
      toast.show({ title: 'Could not change it', description: coinsProblemMessage(err), tone: 'danger' });
    } finally {
      setEquipping(null);
    }
  };

  const signIn = () => openLogin({ reason: 'Log in to redeem. Coins are earned by learning: check in, solve the daily challenge and practise.' });
  const balance = member ? (coins.balance ?? store?.balance ?? null) : null;
  const digital = store?.items.filter((i) => i.type === 'digital') ?? [];
  const merch = store?.items.filter((i) => i.type === 'physical') ?? [];
  const equipped = coins.summary?.equipped ?? { frame: null, theme: null };
  const card = (item: CoinStoreItem) => (
    <ItemCard
      key={item.key}
      item={item}
      balance={balance}
      now={now}
      equipped={item.slot ? equipped[item.slot] : null}
      busy={equipping === item.key}
      onRedeem={() => setPending({ kind: 'redeem', item })}
      onSignIn={signIn}
      onEquip={(on) => void equip(item, on)}
    />
  );
  const redeemItem = pending?.kind === 'redeem' ? pending.item : null;
  // D-038: no redemptions at launch. Until the API switches redemption on, the store is a coming-soon page
  // with no items, prices, redeem or equip buttons; the redemption UI below stays behind the same flag.
  const open = store?.redemptionEnabled === true;
  const closed = store !== null && !open;

  return (
    <div className={s.store} data-testid="store" data-redemption={store ? (open ? 'on' : 'off') : 'loading'}>
      <section className={s.hero} aria-labelledby="store-title">
        <p className={s.eyebrow}>The SOYL Store · Earned, never sold</p>
        <h1 id="store-title" className={s.heroTitle}>
          {closed ? 'Exclusive rewards — coming soon' : 'The SOYL Store'}
        </h1>
        <p className={s.heroLead}>
          {closed
            ? 'Your SOYL Coins will redeem exclusive rewards that cannot be bought, only earned. Our merch is being designed now. Every coin you earn today counts.'
            : 'Rewards you cannot buy. Every item here is paid for with SOYL Coins, and coins only come from learning.'}
        </p>
        <div className={s.heroBar}>
          {member ? (
            <p className={s.heroBalance} data-testid="store-balance">
              <Icon name="coin" size={24} className={s.heroCoin} />
              <span className={s.heroNumber}>{balance === null ? '…' : balance.toLocaleString('en-IN')}</span>
              <span>{balance === 1 ? 'coin' : 'coins'}</span>
            </p>
          ) : state.status === 'guest' ? (
            <Button onClick={signIn}>Log in to start earning</Button>
          ) : null}
          <Link href="/coins" className={s.heroLink}>
            How to earn <Icon name="chevronRight" size={18} />
          </Link>
        </div>
      </section>

      {loadError && (
        <EmptyState title="Could not load the store" headingLevel="h2" icon="alert" action={<Button onClick={() => void load()}>Try again</Button>}>
          {loadError}
        </EmptyState>
      )}
      {!store && !loadError && (
        <div aria-busy="true" aria-label="Loading the store" className={s.loadingGrid}>
          <Skeleton variant="block" height={260} />
          <Skeleton variant="block" height={260} />
        </div>
      )}

      {closed && <ComingSoon member={member} />}

      {store && open && (
        <>
          <section aria-labelledby="digital-title" className={s.section}>
            <h2 id="digital-title" className={s.sectionTitle}>
              Profile rewards <span className={s.sectionSub}>Unlocked at once</span>
            </h2>
            <ul className={s.grid}>{digital.map(card)}</ul>
          </section>
          <section aria-labelledby="merch-title" className={s.section}>
            <h2 id="merch-title" className={s.sectionTitle}>
              SOYL merch <span className={s.sectionSub}>Shipped in India</span>
            </h2>
            {!store.physicalRedemptionEnabled ? (
              <p className={s.notice} data-testid="merch-coming-soon">
                <Icon name="info" size={18} /> Merch redemption opens soon. Keep earning: your coins are safe, and prices will not change for coins you already have.
              </p>
            ) : (
              member &&
              store.consentStatus !== 'granted' && (
                <p className={s.notice} data-testid="merch-consent">
                  <Icon name="info" size={18} /> Merch is sent to your home, so a parent or guardian must approve first. <Link href="/me/consent?next=%2Fstore">Ask a parent to approve</Link>.
                </p>
              )
            )}
            <ul className={s.grid}>{merch.map(card)}</ul>
          </section>
        </>
      )}

      {member && (open || (orders !== null && orders.length > 0)) && (
        <section aria-labelledby="orders-title" className={s.section} data-testid="my-redemptions">
          <h2 id="orders-title" className={s.sectionTitle}>
            Your redemptions
          </h2>
          {orders === null ? (
            <Skeleton lines={2} />
          ) : (
            <Redemptions list={orders} onAddress={(r) => setPending({ kind: 'address', redemption: r })} onCancel={(r) => setPending({ kind: 'cancel', redemption: r })} />
          )}
        </section>
      )}

      <p className={s.small}>SOYL Coins have no cash value and cannot be bought, sold or transferred.{open ? ' Merch is free; delivery is within India only.' : ''}</p>

      <Dialog
        open={redeemItem !== null}
        onClose={close}
        title={redeemItem ? `Redeem ${redeemItem.name}?` : 'Redeem'}
        description={redeemItem ? `${coinsText(redeemItem.priceCoins)} will be taken from your balance.` : undefined}
        dismissOnBackdrop={!busy}
        footer={
          redeemItem && (
            <>
              <Button onClick={() => void redeem(redeemItem)} loading={busy} data-testid="confirm-redeem">
                Redeem for {coinsText(redeemItem.priceCoins)}
              </Button>
              <Button variant="ghost" onClick={close}>
                Not now
              </Button>
            </>
          )
        }
      >
        {redeemItem && (
          <div className={s.confirm}>
            <StoreArt image={redeemItem.image} className={s.confirmArt} />
            <p>
              {balance !== null && `Balance after: ${coinsText(Math.max(0, balance - redeemItem.priceCoins))}. `}
              {redeemItem.type === 'digital'
                ? 'It is yours at once, and you can equip it straight away.'
                : 'Next, you add a delivery address. A parent or guardian approves the order before we ship it. You can cancel until it is approved and get your coins back.'}
            </p>
            {dialogError && (
              <p className={s.errorText} role="alert" data-testid="redeem-error">
                {dialogError}
              </p>
            )}
          </div>
        )}
      </Dialog>

      <Dialog open={pending?.kind === 'address'} onClose={close} title="Where should we send it?" dismissOnBackdrop={false}>
        {pending?.kind === 'address' && (
          <AddressForm
            redemption={pending.redemption}
            onCancel={close}
            onSaved={() => {
              toast.show({ title: 'Address saved', description: 'Next: a parent or guardian approves the order. Its status is under Your redemptions.', tone: 'success' });
              close();
              void loadOrders();
            }}
          />
        )}
      </Dialog>

      <Dialog
        open={pending?.kind === 'cancel'}
        onClose={close}
        title="Cancel this order?"
        description={pending?.kind === 'cancel' ? `${pending.redemption.itemName}: ${coinsText(pending.redemption.priceCoins)} come back to your balance.` : undefined}
        footer={
          pending?.kind === 'cancel' && (
            <>
              <Button variant="danger" onClick={() => void cancel(pending.redemption)} loading={busy} data-testid="confirm-cancel">
                Cancel order
              </Button>
              <Button variant="ghost" onClick={close}>
                Keep it
              </Button>
            </>
          )
        }
      >
        {dialogError && (
          <p className={s.errorText} role="alert">
            {dialogError}
          </p>
        )}
      </Dialog>
    </div>
  );
}
