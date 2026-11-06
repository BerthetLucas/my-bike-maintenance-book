CREATE TYPE "sparePart_season" AS ENUM('summer', 'winter');--> statement-breakpoint
ALTER TABLE "sparePart" ADD COLUMN "season" "sparePart_season";--> statement-breakpoint
ALTER TABLE "sparePart" ADD COLUMN "recommendedPressure" integer;--> statement-breakpoint
ALTER TABLE "sparePart" ALTER COLUMN "mountedAt" SET NOT NULL;