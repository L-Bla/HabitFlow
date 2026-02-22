ALTER TABLE "userMoods" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "userMoods" CASCADE;--> statement-breakpoint
ALTER TABLE "charts" ALTER COLUMN "position" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "charts" ALTER COLUMN "position" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "charts" DROP COLUMN "type1";--> statement-breakpoint
ALTER TABLE "charts" DROP COLUMN "type2";--> statement-breakpoint
ALTER TABLE "habits" DROP COLUMN "color";