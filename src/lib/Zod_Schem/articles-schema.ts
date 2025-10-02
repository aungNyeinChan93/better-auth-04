import z from "zod";


export type Article = z.infer<typeof ArticleSchema>
export const ArticleSchema = z.object({
    title: z.string().min(1),
    body: z.string().min(1),
    image: z.instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "File size must be less than 5MB",
        })
        .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
            message: "Only JPEG or PNG files are allowed",
        }).optional(),
    user_id: z.string().optional()
});
