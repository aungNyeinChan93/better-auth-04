import z from "zod";



export type UserSchemaType = z.infer<typeof UserSchema>
export const UserSchema = z.object({
    name: z.string().min(1, 'username field is required!'),
    email: z.string().email().min(1, 'email field is required!'),
    password: z.string().min(1, 'password field is required!')
});

export type LoginSchemaType = z.infer<typeof LoginSchema>
export const LoginSchema = z.object({
    email: z.string().email().min(1, 'email field is required!'),
    password: z.string().min(1, 'password field is required!')
});
