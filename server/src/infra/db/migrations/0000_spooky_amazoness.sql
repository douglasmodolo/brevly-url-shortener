CREATE TABLE "shortened_links" (
	"id" text PRIMARY KEY NOT NULL,
	"shortened_url" text NOT NULL,
	"original_url" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "shortened_links_shortened_url_unique" UNIQUE("shortened_url")
);
