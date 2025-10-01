import { db } from "@/drizzle/drizzle"
import { articlesTable, usersTable } from "@/drizzle/schema"
import { desc } from "drizzle-orm"
import { NextResponse } from "next/server"


export type User = typeof usersTable.$inferSelect;
export type Article = typeof articlesTable.$inferSelect

export type UsersAndArticles = Array<User & { articles: Article[] }>


export async function GET() {
    try {

        const users: UsersAndArticles = await db.query.usersTable.findMany({
            with: { articles: true },
            orderBy: desc(usersTable.createdAt)
        });
        if (!users) {
            throw new Error('Users data not found !')
        }

        return NextResponse.json({ users })
    } catch (error) {
        return NextResponse.json({
            error: error instanceof Error ? error?.message : 'fail user fetching'
        })
    }
}