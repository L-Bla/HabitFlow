ALTER TABLE "habitsTracker" DROP CONSTRAINT "habitsTracker_user_id_date_id_pk";--> statement-breakpoint
ALTER TABLE "habitsTracker" ADD CONSTRAINT "habitsTracker_user_id_id_pk" PRIMARY KEY("user_id","id");--> statement-breakpoint
CREATE UNIQUE INDEX "habit_tracker_user_habit_date_unique" ON "habitsTracker" USING btree ("user_id","habit_id","date");