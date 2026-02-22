ALTER TABLE "schedule" DROP CONSTRAINT "schedule_user_id_id_pk";--> statement-breakpoint
ALTER TABLE "schedule" ADD PRIMARY KEY ("id");