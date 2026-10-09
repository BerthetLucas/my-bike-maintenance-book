CREATE TABLE "bicycle_model" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"brandId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brand" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"sparePartOnly" boolean,
	"bicycleOnly" boolean
);
--> statement-breakpoint
ALTER TABLE "bicycle" ADD COLUMN "modelId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "bicycle" ADD CONSTRAINT "bicycle_modelId_bicycle_model_id_fkey" FOREIGN KEY ("modelId") REFERENCES "bicycle_model"("id");--> statement-breakpoint
ALTER TABLE "bicycle_model" ADD CONSTRAINT "bicycle_model_brandId_brand_id_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id");