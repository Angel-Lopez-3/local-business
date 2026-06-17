import { z } from "zod";

export const createCategorySchema =
    z.object({

        name: z
            .string()
            .min(2)
            .max(100),

        icon: z
            .string()
            .max(100),

    });

export const updateCategorySchema =
    z.object({

        name: z
            .string()
            .min(2)
            .max(100)
            .optional(),

        icon: z
            .string()
            .max(100)
            .optional(),

    })
    .refine(
        (data) =>
            Object.keys(data).length > 0,
        {
            message:
                "At least one field is required",
        }
    );