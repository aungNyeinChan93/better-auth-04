import { db } from "@/drizzle/drizzle"
import { articlesTable, usersTable } from "@/drizzle/schema"
import { auth } from "@/lib/auth";
import arcjet, { BotOptions, detectBot, shield, slidingWindow, SlidingWindowRateLimitOptions } from "@arcjet/next";
import { desc } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"
import { checkArcject } from "../auth/[...all]/route";


export type User = typeof usersTable.$inferSelect;
export type Article = typeof articlesTable.$inferSelect

export type UsersAndArticles = Array<User & { articles: Article[] }>


// const aj = arcjet({
//     key: process.env.ARCJET_KEY!,
//     rules: [
//         shield({ mode: 'LIVE' })
//     ],
//     characteristics: ['userId']
// });

// const botSettings = { mode: 'LIVE', allow: [] } satisfies BotOptions

// const rateLimit = { mode: "LIVE", interval: '1m', max: 10 } satisfies SlidingWindowRateLimitOptions<[]>


// export async function checkArcjet(request: Request) {
//     try {
//         const session = await auth.api.getSession({ headers: request.headers })
//         if (!session) {
//             throw new Error('session id not found')
//         }
//         const userId = session?.user?.id as string
//         return aj
//             .withRule(detectBot(botSettings))
//             .withRule(slidingWindow(rateLimit))
//             .protect(request, { userId })
//     } catch (error) {
//         console.error(error instanceof Error ? error?.message : 'unknown error')
//     }
// }


export async function GET(request: NextRequest) {

    try {
        const decision = await checkArcject(request);
        if (decision.isDenied()) {
            console.warn("Arcjet blocked request:", { reason: decision.reason, });
            if (decision.reason.isRateLimit()) {
                return new NextResponse("Too Many Requests", { status: 429 });
            }
            if (decision.reason.isBot()) {
                return new NextResponse("Bot Detected", { status: 403 });
            }
            return new NextResponse("Forbidden", { status: 403 });
        };
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