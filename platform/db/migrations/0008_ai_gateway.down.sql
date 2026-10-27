-- Down for 0008_ai_gateway (ai-gateway M4). Drops the AI gateway tables (wallets hold no balance: the
-- ledger is the source of truth; spend counters and jobs are operational state), the new ai_requests
-- and uploads columns, and the full-text-search column on content_chunks.
DROP INDEX IF EXISTS "content_chunks_search_idx";
ALTER TABLE "content_chunks" DROP COLUMN IF EXISTS "search_vector";
ALTER TABLE "uploads" DROP COLUMN IF EXISTS "processed_content_type";
ALTER TABLE "uploads" DROP COLUMN IF EXISTS "processed_key";
ALTER TABLE "ai_requests" DROP COLUMN IF EXISTS "simulated";
ALTER TABLE "ai_requests" DROP COLUMN IF EXISTS "degraded";
ALTER TABLE "ai_requests" DROP COLUMN IF EXISTS "plan_id";
DROP TABLE IF EXISTS "credit_wallets";
DROP TABLE IF EXISTS "ai_spend_daily";
DROP TABLE IF EXISTS "ai_jobs";
