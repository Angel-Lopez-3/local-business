import { z } from "zod";

export const createReviewSchema =
    z.object({

        

            business_id:
                z.coerce.number()
                    .int()
                    .positive(),

            rating:
                z.coerce.number()
                    .int()
                    .min(1)
                    .max(5),

            comment:
                z.string()
                    .trim()
                    .min(10)
                    .max(1000)
                    .optional()

        

    });

export const updateReviewSchema =
    z.object({

        

            rating:
                z.coerce.number()
                    .int()
                    .min(1)
                    .max(5)
                    .optional(),

            comment:
                z.string()
                    .trim()
                    .min(10)
                    .max(1000)
                    .optional()

        

    });

export const createReplySchema =
    z.object({

        

            message:
                z.string()
                    .trim()
                    .min(3)
                    .max(1000)

        

    });

export const updateReplySchema =
    z.object({

        

            message:
                z.string()
                    .trim()
                    .min(3)
                    .max(1000)

        

    });