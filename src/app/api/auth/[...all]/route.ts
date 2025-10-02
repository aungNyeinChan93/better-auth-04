import { auth } from "@/lib/auth"; // path to your auth file
import arcjet, { BotOptions, detectBot, EmailOptions, protectSignup, shield, slidingWindow, SlidingWindowRateLimitOptions } from "@arcjet/next";
import { toNextJsHandler } from "better-auth/next-js";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { findIp } from '@arcjet/ip'

const authHandler = toNextJsHandler(auth);

const aj = arcjet({
    key: process.env.ARCJET_KEY!,
    rules: [
        shield({ mode: 'LIVE' }),
    ],
    characteristics: ['userIdOrIp']
});

const botSettings = { mode: 'LIVE', allow: [] } satisfies BotOptions;

const restrictiveRateLimiteSettings = {
    mode: 'LIVE',
    max: 5,
    interval: '10m'
} satisfies SlidingWindowRateLimitOptions<[]>

const luxRateLimiteSettings = {
    mode: 'LIVE',
    max: 10,
    interval: '1m'
} satisfies SlidingWindowRateLimitOptions<[]>

const emailsettings = {
    mode: 'LIVE',
    deny: ['DISPOSABLE', "NO_GRAVATAR", "NO_MX_RECORDS", 'INVALID'],

} satisfies EmailOptions


export async function checkArcject(request: NextRequest) {
    const session = await auth.api.getSession({ headers: await headers() });
    const userIdOrIp = (session?.user?.id ?? findIp(request)) || '127.0.0.1'

    if (request.nextUrl.pathname.endsWith("/api/auth/sign-up/email")) {
        const body = (await request.json()) as unknown | undefined;
        if (body && typeof body === 'object' && 'email' in body && typeof body.email === 'string') {
            return aj
                .withRule(protectSignup({
                    bots: botSettings,
                    email: emailsettings,
                    rateLimit: restrictiveRateLimiteSettings
                }))
                .protect(request, { email: body.email, userIdOrIp })
        } else {
            return aj.withRule(detectBot(botSettings))
                .withRule(slidingWindow(restrictiveRateLimiteSettings))
                .protect(request, { userIdOrIp })
        }
    };

    return aj.withRule(detectBot(botSettings))
        .withRule(slidingWindow(luxRateLimiteSettings))
        .protect(request, { userIdOrIp })

}


export const { GET } = authHandler;

export async function POST(request: NextRequest) {
    const cloneRequest = request.clone()

    const decision = await checkArcject(request)

    if (decision.isDenied()) {
        console.warn("Arcjet blocked request:", { reason: decision.reason, });

        if (decision.reason.isRateLimit()) {
            return new NextResponse("Too Many Requests", { status: 429 });
        }
        if (decision.reason.isBot()) {
            return new NextResponse("Bot Detected", { status: 403 });
        }
        if (decision.reason.isEmail()) {
            if (decision.reason.emailTypes.includes('INVALID')) {
                return new NextResponse("Email field is invalid ", { status: 400 });
            }
            if (decision.reason.emailTypes.includes('DISPOSABLE')) {
                return new NextResponse(" DISPOSABLE email are not allowed ", { status: 400 });
            }
            if (decision.reason.emailTypes.includes('NO_MX_RECORDS')) {
                return new NextResponse(" NO_MX_RECORDS email are not allowed ", { status: 400 });
            }
            if (decision.reason.emailTypes.includes('NO_GRAVATAR')) {
                return new NextResponse("NO_GRAVATAR  email are not allowed ", { status: 400 });
            }
        }
        return new NextResponse("Forbidden", { status: 403 });
    }

    return authHandler.POST(cloneRequest)
}
