
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'

export const shortenedLinks = pgTable("shortened_links", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv7()),
    shortenedUrl: text("shortened_url").unique().notNull(),
    originalUrl: text("original_url").notNull(),
    accessCount: integer("access_count").default(0).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})