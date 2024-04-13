ALTER TABLE "workout" RENAME COLUMN "duration" TO "completed_at";--> statement-breakpoint
ALTER TABLE "workout" ALTER COLUMN "completed_at" SET DATA TYPE timestamp;