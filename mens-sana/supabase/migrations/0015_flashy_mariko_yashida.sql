ALTER TABLE "charts" DROP CONSTRAINT "charts_user_id_id_pk";--> statement-breakpoint
ALTER TABLE "charts" ADD PRIMARY KEY ("id");