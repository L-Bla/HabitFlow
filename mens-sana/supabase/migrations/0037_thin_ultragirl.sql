ALTER TABLE "moodTracker" DROP CONSTRAINT "moodTracker_user_id_id_pk";--> statement-breakpoint
ALTER TABLE "moodTracker" ADD PRIMARY KEY ("id");