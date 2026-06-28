import { AppError } from "../utils/AppError.js";

import {

    findReportById,
    findReports,
    findReportsByUser,

    findBusinessReport,
    findReviewReport,

    createReport,
    updateReport,
    updateReportStatus,

} from "../repositories/report.repository.js";

import {
    findBusinessById,
} from "../repositories/business.repository.js";

import {
    findReviewById,
} from "../repositories/review.repository.js";

export const getReportsService =
async (
    status
) => {

    return await findReports(
        status
    );

    };

export const getMyReportsService =
async (
    currentUser
) => {

    return await findReportsByUser(
        currentUser.id
    );

    };

    export const createReportService =
async (

    currentUser,

    payload

) => {

    const hasBusiness =
        !!payload.business_id;

    const hasReview =
        !!payload.review_id;



    if (

        hasBusiness === hasReview

    ) {

        throw new AppError(

            "You must report either a business or a review",

            400

        );

    }



    if (

        payload.business_id

    ) {

        const business =
            await findBusinessById(

                payload.business_id

            );

        if (!business)

            throw new AppError(

                "Business not found",

                404

            );
        


        const duplicated =
            await findBusinessReport(

                currentUser.id,

                payload.business_id

            );

        if (duplicated)

            throw new AppError(

                "Business already reported",

                409

            );
        
        if (
                business.user_id.toString()
                ===
                currentUser.id.toString()
            ) {

                throw new AppError(
                    "You cannot report your own business",
                    400
                );

                }

    }



    if (

        payload.review_id

    ) {

        const review =
            await findReviewById(

                payload.review_id

            );

        if (!review)

            throw new AppError(

                "Review not found",

                404

            );



        const duplicated =
            await findReviewReport(

                currentUser.id,

                payload.review_id

            );

        if (duplicated)

            throw new AppError(

                "Review already reported",

                409

            );
        if (
            review.user_id.toString()
            ===
            currentUser.id.toString()
        ) {

            throw new AppError(
                "You cannot report your own review",
                400
            );

        }

    }



    return await createReport({

        reporter_user_id:
            BigInt(currentUser.id),

        business_id:
            payload.business_id
                ? BigInt(payload.business_id)
                : null,

        review_id:
            payload.review_id
                ? BigInt(payload.review_id)
                : null,

        reason:
            payload.reason,

    });

    };

export const updateReportService =
async (

    reportId,

    currentUser,

    payload

) => {

    const report =
        await findReportById(
            reportId
        );

    if (!report)

        throw new AppError(

            "Report not found",

            404

        );



    if (

        currentUser.roles.name
        !==
        "admin"

    ) {

        if (

            report.reporter_user_id.toString()

            !==

            currentUser.id.toString()

        )

            throw new AppError(

                "Forbidden",

                403

            );



        const hours =

            (

                Date.now()

                -

                new Date(
                    report.created_at
                ).getTime()

            )/1000/60/60;



        if (

            hours > 24

        )

            throw new AppError(

                "Report can only be edited within 24 hours",

                403

            );

    }



    return await updateReport(

        reportId,

        payload

    );

    };


export const updateReportStatusService =
async (

    reportId,

    status

) => {

    const report =
        await findReportById(
            reportId
        );

    if (!report)

        throw new AppError(

            "Report not found",

            404

        );



    await updateReportStatus(

        reportId,

        status

    );

    return await findReportById(
        reportId
    );

};