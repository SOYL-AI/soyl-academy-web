-- Release membership (backend-api M2, ADR-006 rollback read path): which item version rows each content release contains.
CREATE TABLE "content_release_items" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v7() NOT NULL,
	"release_id" uuid NOT NULL,
	"item_type" text NOT NULL,
	"item_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "content_release_items_type_check" CHECK ("content_release_items"."item_type" IN ('deck', 'notes', 'flashcard_set', 'question'))
);
--> statement-breakpoint
ALTER TABLE "content_release_items" ADD CONSTRAINT "content_release_items_release_id_content_releases_id_fk" FOREIGN KEY ("release_id") REFERENCES "public"."content_releases"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "content_release_items_unique" ON "content_release_items" USING btree ("release_id","item_type","item_id");--> statement-breakpoint
CREATE INDEX "content_release_items_item_idx" ON "content_release_items" USING btree ("item_id");--> statement-breakpoint
-- Backfill for releases ingested before this table existed: a release contains, per item, the highest
-- version first ingested by that release or an earlier one of the same unit. (Items a later release
-- dropped cannot be told apart here; re-ingesting the release records its exact membership.)
INSERT INTO "content_release_items" ("release_id", "item_type", "item_id")
SELECT DISTINCT ON (r.id, q.key) r.id, 'question', q.id
FROM "content_releases" r
JOIN "questions" q ON q.unit = r.unit AND q.academic_year = r.academic_year
JOIN "content_releases" qr ON qr.id = q.release_id AND qr.version <= r.version
ORDER BY r.id, q.key, q.version DESC;--> statement-breakpoint
INSERT INTO "content_release_items" ("release_id", "item_type", "item_id")
SELECT DISTINCT ON (r.id, coalesce(d.part, 0)) r.id, 'deck', d.id
FROM "content_releases" r
JOIN "decks" d ON d.unit = r.unit AND d.academic_year = r.academic_year
JOIN "content_releases" dr ON dr.id = d.release_id AND dr.version <= r.version
ORDER BY r.id, coalesce(d.part, 0), d.version DESC;--> statement-breakpoint
INSERT INTO "content_release_items" ("release_id", "item_type", "item_id")
SELECT DISTINCT ON (r.id) r.id, 'notes', n.id
FROM "content_releases" r
JOIN "notes" n ON n.unit = r.unit AND n.academic_year = r.academic_year
JOIN "content_releases" nr ON nr.id = n.release_id AND nr.version <= r.version
ORDER BY r.id, n.version DESC;--> statement-breakpoint
INSERT INTO "content_release_items" ("release_id", "item_type", "item_id")
SELECT DISTINCT ON (r.id) r.id, 'flashcard_set', f.id
FROM "content_releases" r
JOIN "flashcard_sets" f ON f.unit = r.unit AND f.academic_year = r.academic_year
JOIN "content_releases" fr ON fr.id = f.release_id AND fr.version <= r.version
ORDER BY r.id, f.version DESC;
