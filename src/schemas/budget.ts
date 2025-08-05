import {z} from "zod";

export const budgetSchema = z.object({
    id: z.number().int().optional(),
    user_id: z.number().int(),
    category_id: z.number().int(),
    month: z.string().regex(/^\d{4}-\d{2}$/),
    amount: z.number().min(1),
    spent: z.number().min(1),
    remaining: z.number(),
    overspent: z.number(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

export type Budget = z.infer<typeof budgetSchema>;