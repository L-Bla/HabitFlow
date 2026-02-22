ALTER TABLE "activities" RENAME COLUMN "today" TO "date";--> statement-breakpoint
ALTER TABLE "activities" DROP CONSTRAINT "activities_user_id_today_time_pk";--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_date_time_pk" PRIMARY KEY("user_id","date","time");