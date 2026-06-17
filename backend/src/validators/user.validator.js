import { z } from 'zod';

export const updateProfileSchema = z.object({
    
        first_name: z
            .string()
            .min(2)
            .max(100)
            .optional(),

        last_name: z
            .string()
            .min(2)
            .max(100)
            .optional(),

        phone: z
            .string()
            .max(20)
            .optional(),

}).strict().refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update "
});

export const updateUserAdminSchema =
    z.object({

        first_name: z
            .string()
            .min(2)
            .max(100)
            .optional(),

        last_name: z
            .string()
            .min(2)
            .max(100)
            .optional(),

        phone: z
            .string()
            .max(20)
            .optional(),

        role_id: z
            .coerce
            .number()
            .int()
            .positive()
            .optional(),

        is_active: z
            .boolean()
            .optional(),

        email_verified: z
            .boolean()
            .optional(),

    })
    .strict().refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided for update"
    });


export const changePasswordSchema =
    z.object({

        currentPassword: z.string().min(8),

        newPassword: z.string().min(8).max(100),

        confirmPassword: z.string().min(8),

    })
    .refine(
        (data) =>
            data.newPassword ===
            data.confirmPassword,
        {
            path: [
                "confirmPassword",
            ],
            message:
                "Passwords do not match",
        }
    );