ALTER TABLE "workout" ALTER COLUMN "completed" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "workout" ALTER COLUMN "completed" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workout" ADD COLUMN "duration" integer;