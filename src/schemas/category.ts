import {z} from "zod";

export const categorySchema = z.object({
    id: z.number().int().optional(),
    name: z.string().min(2).max(50),
    type: z.enum(['income', 'expense']),
    last_updated: z.string().datetime().optional(),
})

export type Category = z.infer<typeof categorySchema>;