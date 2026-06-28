import { z } from "zod";

const reportStatus = [

    "pending",

    "reviewed",

    "resolved",

];

export const createReportSchema =
    z.object({

        business_id:
            z.coerce.number()
                .int()
                .positive()
                .optional(),

        review_id:
            z.coerce.number()
                .int()
                .positive()
                .optional(),

        reason:
            z.string()
                .trim()
                .min(10)
                .max(1000),

    });

export const updateReportSchema =
    z.object({

        reason:
            z.string()
                .trim()
                .min(10)
                .max(1000)

    });

export const updateReportStatusSchema =
    z.object({

        status:
            z.enum(
                reportStatus
            )

    });