CREATE TYPE "bicycle_usage" AS ENUM('VTT', 'Road');--> statement-breakpoint
CREATE TABLE "bicycle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"km" integer DEFAULT 0 NOT NULL,
	"isMarked" boolean DEFAULT false NOT NULL,
	"modelId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bicycle_model" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"usage" "bicycle_usage" NOT NULL,
	"brandId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brand" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"sparePartOnly" boolean NOT NULL,
	"bicycleOnly" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bicycle" ADD CONSTRAINT "bicycle_modelId_bicycle_model_id_fkey" FOREIGN KEY ("modelId") REFERENCES "bicycle_model"("id");--> statement-breakpoint
ALTER TABLE "bicycle_model" ADD CONSTRAINT "bicycle_model_brandId_brand_id_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id");