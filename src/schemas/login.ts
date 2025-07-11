import {z} from 'zod'

export const loginSchema = z.object({
    email: z.string().email("Invalid email address format."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
})

export type LoginSchema = z.infer<typeof loginSchema>