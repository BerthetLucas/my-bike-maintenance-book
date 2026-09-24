CREATE TABLE IF NOT EXISTS "bicycle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"isMarked" boolean DEFAULT false NOT NULL
);
