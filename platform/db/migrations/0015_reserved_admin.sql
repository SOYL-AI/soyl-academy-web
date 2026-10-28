-- 0015 RESERVED (billing-razorpay invoices branch, 2026-10-28). Placeholder so 0016_invoices runs in sequence on
-- this branch: migration 0015 (admin analytics) is being written on another branch. The Lead DELETES this
-- file (and its .down.sql) when integrating; the real 0015 takes its place.
SELECT 1;
