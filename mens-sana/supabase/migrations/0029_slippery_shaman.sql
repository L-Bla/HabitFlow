CREATE TABLE "schedule" (
	"user_id" integer NOT NULL,
	"habit_id" integer,
	"date" date NOT NULL,
	"time" time NOT NULL,
	"name" text NOT NULL,
	"type" "activity_type" NOT NULL,
	"progress" integer,
	"goal" integer,
	"unit" text,
	CONSTRAINT "schedule_user_id_date_time_pk" PRIMARY KEY("user_id","date","time")
);
--> statement-breakpoint
DROP TABLE "activities" CASCADE;--> statement-breakpoint
DROP TABLE "todaySchedule" CASCADE;--> statement-breakpoint
DROP TABLE "tomorrowSchedule" CASCADE;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;