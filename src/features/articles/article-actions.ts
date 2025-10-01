import { db } from "@/drizzle/drizzle"


export async function getAllArticles() {
    const articles = await db.query.articlesTable.findMany({
        columns: { body: true, title: true, user_id: true },
        with: { user: { columns: { name: true, email: true } } },
        orderBy: (table, { desc }) => desc(table.created_at)
    })
    return articles;
}