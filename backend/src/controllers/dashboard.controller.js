import {

    getDashboardSummaryService,
    getDashboardGrowthService,
    getDashboardBusinessStatusService,
    getDashboardCategoriesService,
    getDashboardSectorsService,
    getDashboardTopRatedService,
    getDashboardMostReviewedService,
    getDashboardModerationService,
    getDashboardRecentActivityService,

} from "../services/dashboard.service.js";

import {

    dashboardSummaryMapper,
    dashboardGrowthMapper,
    dashboardBusinessStatusMapper,
    dashboardCategoriesMapper,
    dashboardSectorsMapper,
    dashboardTopRatedMapper,
    dashboardMostReviewedMapper,
    dashboardModerationMapper,
    dashboardRecentActivityMapper,
    

} from "../mappers/dashboard.mapper.js";


export const getDashboardSummary =
async (
    req,
    res,
    next
) => {

    try {

        const summary =
            await getDashboardSummaryService();

        res.json({

            success: true,

            data:
                dashboardSummaryMapper(
                    summary
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const getDashboardGrowth =
async (
    req,
    res,
    next
) => {

    try {

        const growth =
            await getDashboardGrowthService();

        res.json({

            success: true,

            data:
                dashboardGrowthMapper(
                    growth
                )

        });

    }

    catch (error) {

        next(error);

    }

    };


export const getDashboardBusinessStatus =
async (
    req,
    res,
    next
) => {

    try {

        const status =
            await getDashboardBusinessStatusService();

        res.json({

            success: true,

            data:

                dashboardBusinessStatusMapper(
                    status
                )

        });

    }

    catch (error) {

        next(error);

    }

    };
export const getDashboardCategories =
async (
    req,
    res,
    next
) => {

    try {

        const categories =
            await getDashboardCategoriesService();

        res.json({

            success: true,

            data:

                dashboardCategoriesMapper(
                    categories
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const getDashboardSectors =
async (
    req,
    res,
    next
) => {

    try {

        const sectors =
            await getDashboardSectorsService();

        res.json({

            success: true,

            data:

                dashboardSectorsMapper(
                    sectors
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const getDashboardTopRated =
async (
    req,
    res,
    next
) => {

    try {

        const businesses =
            await getDashboardTopRatedService();

        res.json({

            success: true,

            data:

                dashboardTopRatedMapper(
                    businesses
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const getDashboardMostReviewed =
async (
    req,
    res,
    next
) => {

    try {

        const businesses =
            await getDashboardMostReviewedService();

        res.json({

            success: true,

            data:

                dashboardMostReviewedMapper(
                    businesses
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const getDashboardModeration =
async (
    req,
    res,
    next
) => {

    try {

        const moderation =
            await getDashboardModerationService();

        res.json({

            success: true,

            data:

                dashboardModerationMapper(
                    moderation
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const getDashboardRecentActivity =
async (
    req,
    res,
    next
) => {

    try {

        const activity =
            await getDashboardRecentActivityService();

        res.json({

            success: true,

            data:

                dashboardRecentActivityMapper(
                    activity
                )

        });

    }

    catch (error) {

        next(error);

    }

};