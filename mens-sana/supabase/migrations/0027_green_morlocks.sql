ALTER TABLE "tomorrowsSchedule" RENAME TO "tomorrowSchedule";--> statement-breakpoint
ALTER TABLE "tomorrowSchedule" DROP CONSTRAINT "tomorrowsSchedule_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tomorrowSchedule" DROP CONSTRAINT "tomorrowsSchedule_habit_id_habits_id_fk";
--> statement-breakpoint
ALTER TABLE "tomorrowSchedule" DROP CONSTRAINT "tomorrowsSchedule_user_id_time_pk";--> statement-breakpoint
ALTER TABLE "tomorrowSchedule" ADD CONSTRAINT "tomorrowSchedule_user_id_time_pk" PRIMARY KEY("user_id","time");--> statement-breakpoint
ALTER TABLE "tomorrowSchedule" ADD CONSTRAINT "tomorrowSchedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tomorrowSchedule" ADD CONSTRAINT "tomorrowSchedule_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;