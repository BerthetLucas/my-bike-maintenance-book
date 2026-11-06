ALTER TABLE "bicycle" ADD COLUMN "km" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "brand" ALTER COLUMN "sparePartOnly" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "brand" ALTER COLUMN "bicycleOnly" SET NOT NULL;