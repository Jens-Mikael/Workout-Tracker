ALTER TABLE "workout" RENAME COLUMN "completed_at" TO "duration";--> statement-breakpoint
ALTER TABLE "workout" ALTER COLUMN "duration" SET DATA TYPE integer;