CREATE TABLE "charts" (
	"user_id" integer NOT NULL,
	"id" serial NOT NULL,
	"title" text NOT NULL,
	"type1" "tracks_type" NOT NULL,
	"type2" "tracks_type",
	"tracks1" integer[] NOT NULL,
	"tracks2" integer[],
	CONSTRAINT "charts_user_id_id_pk" PRIMARY KEY("user_id","id")
);
--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;