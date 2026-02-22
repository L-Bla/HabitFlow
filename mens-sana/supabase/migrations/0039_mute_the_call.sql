DROP INDEX "habit_tracker_unique";--> statement-breakpoint
ALTER TABLE "habitsTracker" DROP CONSTRAINT "habitsTracker_user_id_id_pk";--> statement-breakpoint
ALTER TABLE "habitsTracker" ADD CONSTRAINT "habitsTracker_user_id_date_id_pk" PRIMARY KEY("user_id","date","id");