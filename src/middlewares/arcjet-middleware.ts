import { auth } from "@/lib/auth";
import findIp from "@arcjet/ip";
import arcjet, { BotOptions, detectBot, shield, slidingWindow, SlidingWindowRateLimitOptions } from "@arcjet/next";
import { NextRequest } from "next/server";


const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({ mode: 'LIVE' })
    ],
    characteristics: ['userIdOrIp']
});

const botSettings = { mode: 'LIVE', allow: [] } satisfies BotOptions
const rateLimitSettings = { mode: 'LIVE', interval: '10s', max: 1 } satisfies SlidingWindowRateLimitOptions<[]>



export async function arcjetMiddleware(request: NextRequest) {
    const session = await auth.api.getSession({ headers: request.headers });

    const userIdOrIp = (session?.user?.id ?? findIp(request)) || '127.0.0.1';

    return aj.withRule(detectBot(botSettings))
        .withRule(slidingWindow(rateLimitSettings))
        .protect(request, { userIdOrIp })

}