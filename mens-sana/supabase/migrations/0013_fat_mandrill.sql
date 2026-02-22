ALTER TABLE "charts" DROP CONSTRAINT "charts_user_id_position_pk";--> statement-breakpoint
ALTER TABLE "charts" ALTER COLUMN "position" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_user_id_id_pk" PRIMARY KEY("user_id","id");--> statement-breakpoint
ALTER TABLE "charts" ADD COLUMN "id" serial NOT NULL;