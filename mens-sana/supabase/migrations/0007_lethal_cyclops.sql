ALTER TABLE "charts" DROP CONSTRAINT "charts_user_id_id_pk";--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_user_id_position_pk" PRIMARY KEY("user_id","position");--> statement-breakpoint
ALTER TABLE "charts" ADD COLUMN "position" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "charts" DROP COLUMN "id";