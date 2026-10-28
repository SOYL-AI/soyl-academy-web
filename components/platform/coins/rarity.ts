/**
 * Collectible rarity of a store item (ADR-023, FUT-style frames). Deterministic from the item's own facts
 * (achievement-only, stock, limited window, price): nothing random, nothing hidden. D-037/D-038: items are only
 * ever earned with coins; redemption stays behind its switch.
 */
import type { CoinStoreItem } from '@/platform/shared/api-client';

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export const RARITY_LABELS: Record<Rarity, string> = { common: 'Common', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' };

export function itemRarity(item: Pick<CoinStoreItem, 'priceCoins' | 'stock' | 'eligibilityLabel' | 'availableFrom' | 'availableUntil'>): Rarity {
  if (item.eligibilityLabel || (item.stock !== null && item.stock <= 100)) return 'legendary';
  if (item.priceCoins >= 2000 || item.availableFrom || item.availableUntil || item.stock !== null) return 'epic';
  if (item.priceCoins >= 500) return 'rare';
  return 'common';
}
