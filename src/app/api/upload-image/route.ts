import { session } from './../../../drizzle/db/schemas/auth-schema';
import { NextRequest, NextResponse } from "next/server";
import fs from 'node:fs'
import path from "node:path";
import { checkArcject } from "../auth/[...all]/route";
import { error } from "node:console";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';



export async function POST(request: NextRequest) {

    const decison = await checkArcject(request);

    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !('user' in session)) {
        return NextResponse.json({
            error: 'User is not authenticated!'
        }, { status: 403 })
    }

    if (decison.isDenied()) {
        if (decison.reason.isBot()) {
            return NextResponse.json({ error: "Bot Detected" }, { status: 403 })
        };

        if (decison.reason.isRateLimit()) {
            return NextResponse.json({ error: 'Request limit full' }, { status: 429 })
        }
    }

    const formData = await request.formData();

    const name = formData.get('name') as string;
    const file = formData.get('file') as File | null

    let image_url;

    if (!file) {
        return NextResponse.json({ error: 'file not found' }, { status: 400 })
    };

    if (file instanceof File) {
        const uploadDir = name && path.join(process.cwd(), 'public', name)
        uploadDir && await fs.promises.mkdir(uploadDir, { recursive: true });

        const fileName = file && `${crypto.randomUUID()}-${file.name}`
        const filePath = path.join(uploadDir, fileName)

        const bufferFile = file && Buffer.from(await file.arrayBuffer());
        bufferFile && await fs.promises.writeFile(filePath, bufferFile);

        image_url = `/${name}/${fileName}`
    }

    return NextResponse.json({
        image_url
    })
}