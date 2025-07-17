import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string()
        .min(3, { message: 'Username must be at least 3 characters long' })
        .max(30, { message: 'Username must be less than 30 characters long' })
        .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can contain numbers, letters, and underscores only.' })
        .refine((username) => !username.startsWith('_'), { message: 'Username cannot start with an underscore' })
        .refine((username) => !username.endsWith('_'), { message: 'Username cannot end with an underscore' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }),
    confirm_password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
}).refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
})

export type RegisterSchema = z.infer<typeof registerSchema>