import { db } from "@/drizzle/drizzle";
import { articlesTable } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { ArticleSchema } from "@/lib/Zod_Schem/articles-schema";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import fs from 'node:fs'
import path from "node:path";


export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    const body = formData.get('body') as string;


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

    const session = await auth.api.getSession({ headers: await headers() })
    const userId = session?.user?.id;
    if (!userId) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const [{ id }] = await db.insert(articlesTable)
            .values({ title, body, user_id: userId, image: image_url, })
            .returning({
                id: articlesTable.id
            });
        return NextResponse.json({ id })
    } catch (error) {
        return NextResponse.json(error instanceof Error ? error?.message : 'create article fail');
    }

}