-- Down for 0006_release_items: the API falls back to is_current rows without release membership.
DROP TABLE IF EXISTS "content_release_items";
