
import { z } from "zod";

export const createBusinessImageSchema =
    z.object({

        business_id:
            z.coerce.number()
                .int()
                .positive(),

    });