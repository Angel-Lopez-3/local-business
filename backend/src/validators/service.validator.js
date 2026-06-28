import { z } from "zod";

export const createServiceSchema =
    z.object({

        business_id:
            z.coerce.number()
                .int()
                .positive(),

        name:
            z.string()
                .trim()
                .min(3)
                .max(150),

        description:
            z.string()
                .trim()
                .max(1000)
                .optional(),

        price:
            z.coerce.number()
                .positive()
                .optional(),

        is_active:
            z.boolean()
                .optional()

    });

export const updateServiceSchema =
    z.object({

        name:
            z.string()
                .trim()
                .min(3)
                .max(150)
                .optional(),

        description:
            z.string()
                .trim()
                .max(1000)
                .optional(),

        price:
            z.coerce.number()
                .positive()
                .optional(),

        is_active:
            z.boolean()
                .optional()

    });