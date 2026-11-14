-- Down for 0018_email_reminders. Drops the reminder settings (including every confirmed parent address) and the
-- reminder log. After a down, students get no reminders until 0018 is applied again (defaults: on, no parent).
DROP TABLE IF EXISTS "reminder_log";
DROP TABLE IF EXISTS "notification_preferences";
