-- Down for 0000_foundations. Roles are cluster-wide and may be used by other databases on the same
-- server (test databases, other environments), so they are left in place; drop them by hand if needed.
DROP FUNCTION IF EXISTS soyl_apply_conventions();
DROP FUNCTION IF EXISTS soyl_set_updated_at();
DROP FUNCTION IF EXISTS soyl_normalize_phone(text);
DROP FUNCTION IF EXISTS soyl_normalize_email(text);
DROP FUNCTION IF EXISTS uuid_generate_v7();
