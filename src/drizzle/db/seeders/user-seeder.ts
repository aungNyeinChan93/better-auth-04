import { neon } from '@neondatabase/serverless';
import { usersTable } from "../schemas/auth-schema"
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/drizzle/schema'

const db = drizzle({ client: neon(process.env.DATABASE_URL!), schema })

export async function userSeeder() {

    const [{ email }] = await db.insert(usersTable).values({
        email: 'test@gmail.com',
        id: '1',
        name: 'testOne',
    }).returning({
        email: usersTable.email
    })

    console.log(email);

};

userSeeder()