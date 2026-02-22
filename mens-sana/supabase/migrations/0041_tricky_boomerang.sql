DROP INDEX "habit_tracker_user_habit_date_unique";--> statement-breakpoint
ALTER TABLE "habitsTracker" DROP CONSTRAINT "habitsTracker_user_id_id_pk";--> statement-breakpoint
ALTER TABLE "habitsTracker" ADD CONSTRAINT "habitsTracker_user_id_habit_id_date_pk" PRIMARY KEY("user_id","habit_id","date");--> statement-breakpoint
ALTER TABLE "habitsTracker" DROP COLUMN "id";