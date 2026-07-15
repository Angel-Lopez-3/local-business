import prisma
from "../config/db.js";



export const findReviewsByBusinessId =
    async (
        businessId
    ) => {

        return await prisma.reviews.findMany({

            where: {

                business_id:
                    BigInt(
                        businessId
                    ),

                is_visible: true,

            },

            include: {

                users: true,

                review_replies: {

                    include: {

                        businesses: true,

                    },

                    orderBy: {

                        created_at:
                            "asc",

                    }

                }

            },

            orderBy: {

                created_at:
                    "desc",

            }

        });

    };


export const findReviewById =
    async (
        reviewId
    ) => {

        return await prisma.reviews.findUnique({

            where: {

                id:
                    BigInt(
                        reviewId
                    )

            },

            include: {

                users: true,

                businesses: true,

                review_replies: {

                    include: {

                        businesses: true,

                    },

                    orderBy: {

                        created_at:
                            "asc",

                    }

                }

            }

        });

    };



export const findReviewByUser =
    async (

        userId,

        businessId

    ) => {

        return await prisma.reviews.findUnique({

            where: {

                user_id_business_id: {

                    user_id:
                        BigInt(
                            userId
                        ),

                    business_id:
                        BigInt(
                            businessId
                        )

                }

            }

        });

    };



export const createReview =
    async (
        data
    ) => {

        return await prisma.reviews.create({

            data

        });

    };



export const updateReview =
    async (

        reviewId,

        data

    ) => {

        return await prisma.reviews.update({

            where: {

                id:
                    BigInt(
                        reviewId
                    )

            },

            data

        });

    };



export const deleteReview =
    async (
        reviewId
    ) => {

        return await prisma.reviews.delete({

            where: {

                id:
                    BigInt(
                        reviewId
                    )

            }

        });

    };





//==============================
// REPLIES
//==============================


export const findReplyById =
    async (
        replyId
    ) => {

        return await prisma.review_replies.findUnique({

            where: {

                id:
                    BigInt(
                        replyId
                    )

            },

            include: {

                businesses: true,

                reviews: {

                    include: {

                        users: true,

                    }

                }

            }

        });

    };


export const createReply =
    async (
        data
    ) => {

        return await prisma.review_replies.create({

            data

        });

    };



export const updateReply =
    async (

        replyId,

        data

    ) => {

        return await prisma.review_replies.update({

            where: {

                id:
                    BigInt(
                        replyId
                    )

            },

            data

        });

    };



export const deleteReply =
    async (
        replyId
    ) => {

        return await prisma.review_replies.delete({

            where: {

                id:
                    BigInt(
                        replyId
                    )

            }

        });

    };

export const findReviewCompleteById =
async (
    reviewId
) => {

    return await prisma.reviews.findUnique({

        where: {

            id:
                BigInt(reviewId)

        },

        include: {

            users: true,

            businesses: true,

            review_replies: {

                include: {

                    businesses: true

                },

                orderBy: {

                    created_at: "asc"

                }

            }

        }

    });

};