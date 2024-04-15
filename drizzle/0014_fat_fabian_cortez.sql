ALTER TABLE "workout" RENAME COLUMN "completed" TO "isCompleted";--> statement-breakpoint
ALTER TABLE "workout" ADD COLUMN "isReviewed" boolean NOT NULL;