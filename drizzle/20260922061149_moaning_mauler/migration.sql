CREATE TABLE IF NOT EXISTS "hello_pg_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL
);
