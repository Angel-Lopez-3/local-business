import prisma from "../config/db.js";

export const findBusinessByUserId =
async (
    userId
) => {

    return await prisma.businesses.findFirst({

        where: {

            user_id:
                BigInt(userId)

        },

        select: {

            id: true,

            name: true,

        }

    });

    };

export const getBusinessDashboardSummary =
async (
    businessId
) => {

    const [

        services,

        activeServices,

        inactiveServices,

        favorites,

        replies,

        pendingReports,

        reviews,

    ] = await Promise.all([

        prisma.services.count({

            where: {

                business_id:
                    BigInt(businessId)

            }

        }),

        prisma.services.count({

            where: {

                business_id:
                    BigInt(businessId),

                is_active: true,

            }

        }),

        prisma.services.count({

            where: {

                business_id:
                    BigInt(businessId),

                is_active: false,

            }

        }),

        prisma.favorites.count({

            where: {

                business_id:
                    BigInt(businessId)

            }

        }),

        prisma.review_replies.count({

            where: {

                business_id:
                    BigInt(businessId)

            }

        }),

        prisma.reports.count({

            where: {

                business_id:
                    BigInt(businessId),

                status: "pending"

            }

        }),

        prisma.reviews.findMany({

            where: {

                business_id:
                    BigInt(businessId)

            },

            select: {

                rating: true,

            }

        })

    ]);

    const average =

        reviews.length

            ?

            reviews.reduce(

                (
                    sum,
                    review
                ) =>

                    sum +
                    review.rating,

                0

            )

            / reviews.length

            : 0;

    return {

        totalServices:
            services,

        activeServices,

        inactiveServices,

        totalFavorites:
            favorites,

        totalReplies:
            replies,

        pendingReports,

        totalReviews:
            reviews.length,

        averageRating:
            Number(
                average.toFixed(1)
            ),

    };

    };

export const getBusinessReviewsGrowth =
async (
    businessId
) => {

    return await prisma.reviews.groupBy({

        by: [

            "created_at"

        ],

        where: {

            business_id:
                BigInt(
                    businessId
                )

        },

        _count: {

            id: true

        },

        orderBy: {

            created_at:
                "asc"

        }

    });

    };

export const getBusinessRatingDistribution =
async (
    businessId
) => {

    return await prisma.reviews.groupBy({

        by: [

            "rating"

        ],

        where: {

            business_id:
                BigInt(
                    businessId
                )

        },

        _count: {

            rating: true

        }

    });

    };

export const getBusinessServicesStats =
async (
    businessId
) => {

    const [

        total,

        active,

        inactive,

    ] = await Promise.all([

        prisma.services.count({

            where: {

                business_id:
                    BigInt(
                        businessId
                    )

            }

        }),

        prisma.services.count({

            where: {

                business_id:
                    BigInt(
                        businessId
                    ),

                is_active: true,

            }

        }),

        prisma.services.count({

            where: {

                business_id:
                    BigInt(
                        businessId
                    ),

                is_active: false,

            }

        })

    ]);

    return {

        total,

        active,

        inactive,

    };

    };

export const getBusinessRecentReviews =
async (
    businessId
) => {

    return await prisma.reviews.findMany({

        where: {

            business_id:
                BigInt(
                    businessId
                )

        },

        include: {

            users: {

                select: {

                    id: true,

                    first_name: true,

                    last_name: true,

                }

            },

            review_replies: {

                select: {

                    id: true

                }

            }

        },

        take: 5,

        orderBy: {

            created_at:
                "desc"

        }

    });

    };

export const getBusinessPendingReplies =
async (
    businessId
) => {

    return await prisma.reviews.findMany({

        where: {

            business_id:
                BigInt(
                    businessId
                ),

            review_replies: {

                none: {}

            }

        },

        include: {

            users: {

                select: {

                    id: true,

                    first_name: true,

                    last_name: true,

                }

            }

        },

        orderBy: {

            created_at:
                "desc"

        }

    });

    };

export const getBusinessReports =
async (
    businessId
) => {

    const [

        pending,

        reviewed,

        resolved,

    ] = await Promise.all([

        prisma.reports.count({

            where: {

                business_id:
                    BigInt(
                        businessId
                    ),

                status:
                    "pending"

            }

        }),

        prisma.reports.count({

            where: {

                business_id:
                    BigInt(
                        businessId
                    ),

                status:
                    "reviewed"

            }

        }),

        prisma.reports.count({

            where: {

                business_id:
                    BigInt(
                        businessId
                    ),

                status:
                    "resolved"

            }

        })

    ]);

    return {

        pending,

        reviewed,

        resolved,

    };

    };

export const getBusinessFavorites =
async (
    businessId
) => {

    return {

        total:

            await prisma.favorites.count({

                where: {

                    business_id:
                        BigInt(
                            businessId
                        )

                }

            })

    };

    };

    export const getBusinessRecentActivity =
async (
    businessId
) => {

    const [

        services,

        reviews,

        replies,

        reports,

    ] = await Promise.all([

        prisma.services.findMany({

            where: {

                business_id:
                    BigInt(
                        businessId
                    )

            },

            orderBy: {

                created_at:
                    "desc"

            },

            take: 5

        }),

        prisma.reviews.findMany({

            where: {

                business_id:
                    BigInt(
                        businessId
                    )

            },

            orderBy: {

                created_at:
                    "desc"

            },

            take: 5

        }),

        prisma.review_replies.findMany({

            where: {

                business_id:
                    BigInt(
                        businessId
                    )

            },

            orderBy: {

                created_at:
                    "desc"

            },

            take: 5

        }),

        prisma.reports.findMany({

            where: {

                business_id:
                    BigInt(
                        businessId
                    )

            },

            orderBy: {

                created_at:
                    "desc"

            },

            take: 5

        })

    ]);

    return {

        services,

        reviews,

        replies,

        reports,

    };

};