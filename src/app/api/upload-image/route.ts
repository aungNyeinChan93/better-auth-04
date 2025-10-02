import { NextRequest, NextResponse } from "next/server";
import fs from 'node:fs'
import path from "node:path";



export async function POST(request: NextRequest) {

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
        const fielPath = path.join(uploadDir, fileName)

        const bufferFile = file && Buffer.from(await file.arrayBuffer());
        bufferFile && await fs.promises.writeFile(fielPath, bufferFile);

        image_url = `/${name}/${fileName}`
    }

    return NextResponse.json({
        image_url
    })
}