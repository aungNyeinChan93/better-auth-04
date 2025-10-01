import "dotenv/config";
import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@/drizzle/schema'


const pg = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: pg, schema: { ...schema } });



export async function articleSeeder() {
    const [{ title }] = await db.insert(schema.articlesTable).values({
        body: 'test article body',
        title: 'test article title',
        user_id: "1",
    }).returning({ title: schema.articlesTable.title })
    console.log({ title });
};

articleSeeder()