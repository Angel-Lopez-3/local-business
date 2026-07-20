import { AppError } from "../utils/AppError.js";

import {

    findBusinessByUserId,

    getBusinessDashboardSummary,
    getBusinessReviewsGrowth,
    getBusinessRatingDistribution,
    getBusinessServicesStats,
    getBusinessRecentReviews,
    getBusinessPendingReplies,
    getBusinessReports,
    getBusinessFavorites,
    getBusinessRecentActivity,



}
    from "../repositories/business-dashboard.repository.js";

import {
    findBusinessById,
} from "../repositories/business.repository.js";


export const getBusinessSummaryService =
async (
    userId,
    role,
    businessId =  null
) => {

const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    return await getBusinessDashboardSummary(

        business.id

    );

    };


const resolveBusiness =
async (

    userId,

    role,

    businessId = null

) => {

    let business;

    if (

        role === "admin"

    ) {

        if (!businessId) {

            throw new AppError(

                "Business id is required",

                400

            );

        }

        business =

            await findBusinessById(

                businessId

            );

    }

    else {

        business =

            await findBusinessByUserId(

                userId

            );

    }

    if (!business) {

        throw new AppError(

            "Business not found",

            404

        );

    }

    return business;

    };


export const getBusinessReviewsGrowthService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    const reviews =

        await getBusinessReviewsGrowth(

            business.id

        );

    return reviews.map(

        review => ({

            month:

                review.created_at

                    .toISOString()

                    .slice(

                        0,

                        7

                    ),

            total:

                review._count.id

        })

    );

    };

export const getBusinessRatingDistributionService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    const ratings =

        await getBusinessRatingDistribution(

            business.id

        );

    const distribution = {

        1: 0,

        2: 0,

        3: 0,

        4: 0,

        5: 0,

    };

    ratings.forEach(

        rating => {

            distribution[

                rating.rating

            ] =

                rating._count.rating;

        }

    );

    return distribution;

    };

export const getBusinessServicesService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    return await getBusinessServicesStats(

        business.id

    );

    };

export const getBusinessRecentReviewsService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    return await getBusinessRecentReviews(

        business.id

    );

    };

export const getBusinessPendingRepliesService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    return await getBusinessPendingReplies(

        business.id

    );

    };

export const getBusinessReportsService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    return await getBusinessReports(

        business.id

    );

    };

export const getBusinessFavoritesService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    return await getBusinessFavorites(

        business.id

    );

    };

export const getBusinessRecentActivityService =
async (

    userId,

    role,

    businessId = null

) => {

    const business =

        await resolveBusiness(

            userId,

            role,

            businessId

        );

    return await getBusinessRecentActivity(

        business.id

    );

};