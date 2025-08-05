import {z} from "zod";

export const transactionSchema = z.object({
    id: z.number().int().optional(),
    user_id: z.number().int(),
    category_id: z.number().int(),
    amount: z.number().min(1),
    description: z.string().min(5).max(255),
    timestamp: z.string().datetime()
})

export type Transaction = z.infer<typeof transactionSchema>;
