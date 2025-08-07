import {z} from "zod";

// Base category schema
export const categorySchema = z.object({
    id: z.number().int(),
    name: z.string()
        .min(2, "Name must contain at least 2 characters")
        .max(50, "Name cannot contain more than 50 characters"),
    type: z.enum(['income', 'expense']),
    is_default: z.boolean().optional(),
    created_at: z.string().datetime().optional(),
    updated_at: z.string().datetime().optional(),
});

export type Category = z.infer<typeof categorySchema>;

// Category form schema
export const categoryFormSchema = categorySchema.pick({
  name: true,
  type: true,
});

export type CategoryFormInput = z.infer<typeof categoryFormSchema>;

