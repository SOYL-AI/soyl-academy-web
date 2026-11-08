-- Down for 0017_future_builders. Drops the Future Builders registration and enquiry tables and every row in them:
-- run it only on a database that holds no real registrations (export them first: GET /v1/admin/future-builders/enrollments/export).
DROP TABLE IF EXISTS "fb_leads";
DROP TABLE IF EXISTS "fb_enrollments";
