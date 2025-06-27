ALTER TABLE "shortened_links" RENAME COLUMN "shortened_url" TO "shortened_link";--> statement-breakpoint
ALTER TABLE "shortened_links" RENAME COLUMN "original_url" TO "original_link";--> statement-breakpoint
ALTER TABLE "shortened_links" DROP CONSTRAINT "shortened_links_shortened_url_unique";--> statement-breakpoint
ALTER TABLE "shortened_links" ADD CONSTRAINT "shortened_links_shortened_link_unique" UNIQUE("shortened_link");