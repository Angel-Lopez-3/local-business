import { z } from "zod";

export const createBusinessSchema =
    z.object({

        name: z
            .string()
            .min(3)
            .max(150),

        description: z
            .string()
            .min(20)
            .max(5000),

        category_id: z
            .coerce
            .number()
            .int()
            .positive(),

        sector_id: z
            .coerce
            .number()
            .int()
            .positive(),

        phone: z
            .string()
            .max(20)
            .optional(),

        whatsapp: z
            .string()
            .max(20)
            .optional(),

        email: z
            .email()
            .max(150)
            .optional(),

        address: z
            .string()
            .max(255)
            .optional(),

        website: z
            .url()
            .max(255)
            .optional(),

        facebook: z
            .url()
            .max(255)
            .optional(),

        instagram: z
            .url()
            .max(255)
            .optional(),

        working_hours: z
            .string()
            .max(500)
            .optional(),

        latitude: z
            .coerce
            .number()
            .optional(),

        longitude: z
            .coerce
            .number()
            .optional(),

    });

export const updateBusinessSchema =
    createBusinessSchema
        .partial();