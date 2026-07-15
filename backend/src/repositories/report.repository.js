import  prisma  from "../config/db.js";

export const findReportById =
async (
    reportId
) => {

    return await prisma.reports.findUnique({

        where: {

            id:
                BigInt(
                    reportId
                )

        },

        include: {

            users: true,

            businesses: true,

            reviews: {

                include: {

                    users: true

                }

            }

        }

    });

    };


export const findReports =
async (
    status
) => {

    return await prisma.reports.findMany({

        where: {

            ...(status && {

                status

            })

        },

        include: {

            users: true,

            businesses: true,

            reviews: {

                include: {

                    users: true

                }

            }

        },

        orderBy: {

            created_at:
                "desc"

        }

    });

    };

export const findReportsByUser =
async (
    userId
) => {

    return await prisma.reports.findMany({

        where: {

            reporter_user_id:
                BigInt(
                    userId
                )

        },

        orderBy: {

            created_at:
                "desc"

        }

    });

    };

export const findBusinessReport =
async (

    userId,

    businessId

) => {

    return await prisma.reports.findFirst({

        where: {

            reporter_user_id:
                BigInt(userId),

            business_id:
                BigInt(businessId)

        }

    });

    };

export const findReviewReport =
async (

    userId,

    reviewId

) => {

    return await prisma.reports.findFirst({

        where: {

            reporter_user_id:
                BigInt(userId),

            review_id:
                BigInt(reviewId)

        }

    });

    };

export const createReport =
async (
    data
) => {

    return await prisma.reports.create({

        data

    });

    };

export const updateReport =
async (

    reportId,

    data

) => {

    return await prisma.reports.update({

        where: {

            id:
                BigInt(
                    reportId
                )

        },

        data

    });

    };

export const updateReportStatus =
async (

    reportId,

    status

) => {

    return await prisma.reports.update({

        where: {

            id:
                BigInt(
                    reportId
                )

        },

        data: {

            status

        }

    });

};