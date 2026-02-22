CREATE TABLE "schedule" (
	"user_id" integer NOT NULL,
	"habit_id" integer,
	"id" serial NOT NULL,
	"date" date NOT NULL,
	"time" time,
	"name" text NOT NULL,
	"type" "activity_type" NOT NULL,
	"progress" integer,
	"goal" integer,
	"unit" text,
	CONSTRAINT "schedule_user_id_id_pk" PRIMARY KEY("user_id","id")
);
--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;