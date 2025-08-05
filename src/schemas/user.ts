import {z} from "zod";

export const userSchema = z.object({
    id: z.number().int().optional(),
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters long." })
        .max(30, { message: "Username must be less than 30 characters long." })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Username can contain numbers, letters, and underscores only."
        }),
    email: z.string().email({ message: "Invalid email address format." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        }),
});

export type User = z.infer<typeof userSchema>;