import { auth } from "@/lib/auth"
import { ServerStreamResponseOptions } from "http2"
import { headers } from "next/headers"


export type ServerSessionType = Awaited<ReturnType<typeof getServerSession>>

export async function getServerSession() {
    const session = await auth.api.getSession({ headers: await headers() })
    return session
}