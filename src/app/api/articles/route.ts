import { auth } from "@/lib/auth";
import { ArticleSchema } from "@/lib/Zod_Schem/articles-schema";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import fs from 'node:fs'
import path from "node:path";


export async function POST(request: NextRequest) {

    const session = await auth.api.getSession({ headers: await headers() })

    const formData = await request.formData();

    const file = formData.get('image') as File;

    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const uplaodLoaction = path.join(process.cwd(), 'public', 'articles');
    uplaodLoaction && await fs.promises.mkdir(uplaodLoaction, { recursive: true });

    const fileName = `${crypto.randomUUID()}-${file.name}`
    const filePath = path.join(uplaodLoaction, fileName);

    const bufferFile = Buffer.from(await file.arrayBuffer());

    if (bufferFile) {
        await fs.promises.writeFile(filePath, bufferFile)
    };

    const image_url = `/articles/${fileName}`
    return NextResponse.json({ image_url, user_id: session?.user?.id });

}