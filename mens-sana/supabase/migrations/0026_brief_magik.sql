CREATE TABLE "todaySchedule" (
	"user_id" integer NOT NULL,
	"habit_id" integer,
	"time" time NOT NULL,
	"name" text NOT NULL,
	"type" "activity_type" NOT NULL,
	"progress" integer,
	"goal" integer,
	"unit" text,
	CONSTRAINT "todaySchedule_user_id_time_pk" PRIMARY KEY("user_id","time")
);
--> statement-breakpoint
CREATE TABLE "tomorrowsSchedule" (
	"user_id" integer NOT NULL,
	"habit_id" integer,
	"time" time NOT NULL,
	"name" text NOT NULL,
	"type" "activity_type" NOT NULL,
	"progress" integer,
	"goal" integer,
	"unit" text,
	CONSTRAINT "tomorrowsSchedule_user_id_time_pk" PRIMARY KEY("user_id","time")
);
--> statement-breakpoint
ALTER TABLE "todaySchedule" ADD CONSTRAINT "todaySchedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "todaySchedule" ADD CONSTRAINT "todaySchedule_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tomorrowsSchedule" ADD CONSTRAINT "tomorrowsSchedule_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tomorrowsSchedule" ADD CONSTRAINT "tomorrowsSchedule_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;