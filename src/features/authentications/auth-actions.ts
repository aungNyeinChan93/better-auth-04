'use server'

import { auth } from "@/lib/auth"
import { LoginSchema, UserSchema } from "@/lib/Zod_Schem/user-schema"
import { ServerStreamResponseOptions } from "http2"
import { headers } from "next/headers"


export type ServerSessionType = Awaited<ReturnType<typeof getServerSession>>

export async function getServerSession() {
    const session = await auth.api.getSession({ headers: await headers() })
    return session
}


export async function registerAction(initialState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const { success, data: fields, error } = await UserSchema.safeParseAsync({ ...data })

    if (!success) {
        return {
            success, errors: {
                name: error?.format().name?._errors[0],
                email: error?.format().email?._errors[0],
                password: error?.format().password?._errors[0],
            }
        }
    };

    try {
        const newUser = await auth.api.signUpEmail({ body: { ...fields, callbackURL: '/' } });
        if (!newUser) {
            return {
                success: false, errors: {
                    other: 'Register fail'
                }
            }
        };

    } catch (error) {
        console.error(error instanceof Error ? error?.message : 'unknown error')
        return {
            success: false, errors: {
                other: error instanceof Error ? error?.message : 'unknown error'
            }
        }
    }

    return { success }
};


// Login

export async function LoginAction(init: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries())

    const { success, data: fields, error } = await LoginSchema.safeParseAsync({ ...data })

    if (!success) {
        return {
            success, errors: {
                email: error?.format().email?._errors[0],
                password: error?.format().password?._errors[0],
            }
        }
    };
    try {
        const newUser = await auth.api.signInEmail({ body: { ...fields, callbackURL: '/' } });
        if (!newUser) {
            return {
                success: false, errors: {
                    other: 'Register fail'
                }
            }
        };

    } catch (error) {
        console.error(error instanceof Error ? error?.message : 'unknown error')
        return {
            success: false, errors: {
                other: error instanceof Error ? error?.message : 'unknown error'
            }
        }
    }
    return { success }

}