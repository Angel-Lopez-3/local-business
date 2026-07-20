export const businessSummaryMapper =
(
    summary
) => ({

    total_services:
        summary.totalServices,

    active_services:
        summary.activeServices,

    inactive_services:
        summary.inactiveServices,

    total_reviews:
        summary.totalReviews,

    average_rating:
        summary.averageRating,

    total_favorites:
        summary.totalFavorites,

    total_replies:
        summary.totalReplies,

    pending_reports:
        summary.pendingReports,

    });

export const businessReviewsGrowthMapper =
(
    growth
) =>

        growth;
    
export const businessRatingDistributionMapper =
(
    distribution
    ) => distribution;

export const businessServicesMapper =
(
    services
) => ({

    total:
        services.total,

    active:
        services.active,

    inactive:
        services.inactive,

    });

export const businessRecentReviewsMapper =
(
    reviews
) =>

    reviews.map(

        review => ({

            id:
                review.id,

            rating:
                review.rating,

            comment:
                review.comment,

            created_at:
                review.created_at,

            replied:

                review.review_replies.length > 0,

            user: {

                id:
                    review.users.id,

                first_name:
                    review.users.first_name,

                last_name:
                    review.users.last_name,

            }

        })

        );
    
export const businessPendingRepliesMapper =
(
    reviews
) =>

    reviews.map(

        review => ({

            id:
                review.id,

            rating:
                review.rating,

            comment:
                review.comment,

            created_at:
                review.created_at,

            user: {

                id:
                    review.users.id,

                first_name:
                    review.users.first_name,

                last_name:
                    review.users.last_name,

            }

        })

        );
    
export const businessReportsMapper =
(
    reports
) =>

        reports; 

export const businessFavoritesMapper =
(
    favorites
) =>

    favorites;
    


export const businessRecentActivityMapper =
(
    activity
) =>

    activity;