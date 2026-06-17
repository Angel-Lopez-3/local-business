import { z } from "zod";

export const registerSchema = z.object({
    firstName: z.string().min(2).max(100),

    lastName: z.string().min(2).max(100),

    email: z.string().email(),

    password: z
        .string()
        .min(8)
        .max(100),
});

export const loginSchema = z.object({
    email: z.string().email(),

    password: z
        .string()
        .min(8),
});

export const forgotPasswordSchema = z.object({
    email: z.email().max(150),
})

export const resetPasswordSchema = z.object({

    token: z.string(),
    newPassword: z.string().min(8).max(100),
    confirmPassword: z.string().min(8).max(100),

}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});