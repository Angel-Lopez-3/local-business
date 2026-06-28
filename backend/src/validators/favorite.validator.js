import { z } from "zod";

export const businessIdSchema =
    z.object({

        businessId:
            z.coerce.number()
                .int()
                .positive(),

    });