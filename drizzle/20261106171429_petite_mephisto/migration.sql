CREATE TYPE "sparePart_type" AS ENUM('Brake', 'Chain', 'Tire');--> statement-breakpoint
CREATE TABLE "sparePart" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"type" "sparePart_type" NOT NULL,
	"mountedAt" date DEFAULT now(),
	"km" integer DEFAULT 0 NOT NULL,
	"brandId" uuid NOT NULL,
	"bicycleId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_brandId_brand_id_fkey" FOREIGN KEY ("brandId") REFERENCES "brand"("id");--> statement-breakpoint
ALTER TABLE "sparePart" ADD CONSTRAINT "sparePart_bicycleId_bicycle_id_fkey" FOREIGN KEY ("bicycleId") REFERENCES "bicycle"("id");