CREATE TABLE IF NOT EXISTS "exercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_id" integer NOT NULL,
	"movement" text NOT NULL,
	"created" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "set" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"exercise_id" integer NOT NULL,
	"weight" integer NOT NULL,
	"movement" text NOT NULL,
	"created" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workout" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" text NOT NULL,
	"created" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise" ADD CONSTRAINT "exercise_workout_id_workout_id_fk" FOREIGN KEY ("workout_id") REFERENCES "workout"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "set" ADD CONSTRAINT "set_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "set" ADD CONSTRAINT "set_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workout" ADD CONSTRAINT "workout_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
