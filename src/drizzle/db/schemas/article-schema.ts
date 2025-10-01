import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./auth-schema";
import { relations } from "drizzle-orm";


export type article = typeof articlesTable.$inferSelect

export const articlesTable = pgTable('articles', {
    id: uuid().primaryKey().defaultRandom().notNull(),
    title: text().notNull(),
    body: text().notNull(),
    image: text(),
    user_id: text().notNull().references(() => usersTable.id, { onDelete: "no action" }),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().$onUpdate(() => new Date()).notNull()
}, (table) => ({
    titleIndex: index('titleIndex').on(table.title)
}));

export const articleRelations = relations(articlesTable, ({ many, one }) => ({
    user: one(usersTable, {
        fields: [articlesTable.user_id],
        references: [usersTable?.id]
    })
}))