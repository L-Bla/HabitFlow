ALTER TABLE "charts" RENAME COLUMN "position" TO "id";--> statement-breakpoint
ALTER TABLE "charts" DROP CONSTRAINT "charts_user_id_position_pk";--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_user_id_id_pk" PRIMARY KEY("user_id","id");