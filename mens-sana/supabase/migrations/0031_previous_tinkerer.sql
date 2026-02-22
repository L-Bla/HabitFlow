ALTER TABLE "schedule" DROP CONSTRAINT "schedule_user_id_date_time_pk";--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_id_pk" PRIMARY KEY("user_id","id");--> statement-breakpoint
ALTER TABLE "schedule" ADD COLUMN "id" serial NOT NULL;