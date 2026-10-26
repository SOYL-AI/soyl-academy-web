/**
 * Release membership (backend-api M2, migration 0006; ADR-006 §"Rollback"): exactly which item
 * version rows a content release contains. A release re-uses unchanged rows from earlier releases,
 * so `releaseId` on an item only says which release first inserted it. The API resolves a unit's
 * content through its `active` release and these rows, so a rollback (activateRelease on an older
 * release) serves the older release's versions — including items that a newer release removed.
 * Written by ingestChapterRelease.
 */
import { index, pgTable, text, uniqueIndex, uuid } from 'drizzle-orm/pg-core';
import { id, oneOf, timestamps } from './_shared';
import { contentReleases } from './content';

export const RELEASE_ITEM_TYPES = ['deck', 'notes', 'flashcard_set', 'question'] as const;
export type ReleaseItemType = (typeof RELEASE_ITEM_TYPES)[number];

export const contentReleaseItems = pgTable(
  'content_release_items',
  {
    id: id(),
    releaseId: uuid('release_id')
      .notNull()
      .references(() => contentReleases.id, { onDelete: 'cascade' }),
    itemType: text('item_type').notNull(),
    /** decks.id / notes.id / flashcard_sets.id / questions.id (the exact version row). */
    itemId: uuid('item_id').notNull(),
    ...timestamps(),
  },
  (t) => [
    uniqueIndex('content_release_items_unique').on(t.releaseId, t.itemType, t.itemId),
    index('content_release_items_item_idx').on(t.itemId),
    oneOf('content_release_items_type_check', t.itemType, RELEASE_ITEM_TYPES),
  ],
);
