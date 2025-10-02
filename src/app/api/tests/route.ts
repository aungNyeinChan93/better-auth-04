import { arcjetMiddleware } from "@/middlewares/arcjet-middleware";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const decision = await arcjetMiddleware(request)
        if (decision.isDenied()) {
            if (decision.reason.isBot()) {
                throw new Error('Bot Detect')
            }
            if (decision.reason.isRateLimit()) {
                throw new Error('TooMany Request')
            }
        };
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error?.message : 'arcjet error!' })
    }
}