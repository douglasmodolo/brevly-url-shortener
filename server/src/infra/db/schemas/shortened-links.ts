
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from 'uuidv7'

export const shortenedLinks = pgTable("shortened_links", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => uuidv7()),
    shortenedLink: text("shortened_link").unique().notNull(),
    originalLink: text("original_link").notNull(),
    accessCount: integer("access_count").default(0).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})