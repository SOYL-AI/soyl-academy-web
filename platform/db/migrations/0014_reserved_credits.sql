-- 0014 RESERVED (billing-razorpay invoices branch, 2026-10-28). Placeholder so 0016_invoices runs in sequence on
-- this branch: migrations 0014 (AI credits, D-044) and 0015 (admin analytics) are being written on other
-- branches. The Lead DELETES this file (and its .down.sql) when integrating; the real 0014 takes its place.
SELECT 1;
