CREATE TYPE "public"."activity_type" AS ENUM('amount', 'checkbox');--> statement-breakpoint
CREATE TYPE "public"."tracks_type" AS ENUM('habit', 'energy', 'pleasantness');--> statement-breakpoint
CREATE TABLE "activities" (
	"user_id" integer NOT NULL,
	"habit_id" integer,
	"today" boolean NOT NULL,
	"time" time NOT NULL,
	"name" text NOT NULL,
	"type" "activity_type" NOT NULL,
	"progress" integer,
	"goal" integer,
	"unit" text,
	CONSTRAINT "activities_user_id_today_time_pk" PRIMARY KEY("user_id","today","time")
);
--> statement-breakpoint
CREATE TABLE "charts" (
	"user_id" integer NOT NULL,
	"position" serial NOT NULL,
	"type1" "tracks_type" NOT NULL,
	"type2" "tracks_type",
	"tracks1" integer[] NOT NULL,
	"tracks2" integer[],
	CONSTRAINT "charts_user_id_position_pk" PRIMARY KEY("user_id","position")
);
--> statement-breakpoint
CREATE TABLE "defaultMoods" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"emoji" text NOT NULL,
	"energy" integer NOT NULL,
	"pleasantess" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "habits" (
	"user_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"color" text NOT NULL,
	"type" "activity_type",
	"goal" integer,
	"unit" text
);
--> statement-breakpoint
CREATE TABLE "habitsTracker" (
	"user_id" integer NOT NULL,
	"habit_id" integer NOT NULL,
	"date" date NOT NULL,
	"value" integer NOT NULL,
	"id" serial NOT NULL,
	CONSTRAINT "habitsTracker_user_id_id_pk" PRIMARY KEY("user_id","id")
);
--> statement-breakpoint
CREATE TABLE "moodTracker" (
	"user_id" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"energy" integer[],
	"pleasantness" integer[],
	"id" serial NOT NULL,
	CONSTRAINT "moodTracker_user_id_id_pk" PRIMARY KEY("user_id","id")
);
--> statement-breakpoint
CREATE TABLE "userMoods" (
	"user_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"emoji" text NOT NULL,
	"energy" integer NOT NULL,
	"pleasantess" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "charts" ADD CONSTRAINT "charts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitsTracker" ADD CONSTRAINT "habitsTracker_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "habitsTracker" ADD CONSTRAINT "habitsTracker_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moodTracker" ADD CONSTRAINT "moodTracker_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userMoods" ADD CONSTRAINT "userMoods_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;