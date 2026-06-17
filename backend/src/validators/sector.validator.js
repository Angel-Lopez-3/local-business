import { z } from "zod";

export const createSectorSchema =
    z.object({

        name: z
            .string()
            .min(2)
            .max(100),

        city: z
            .string()
            .min(2)
            .max(100),

    });