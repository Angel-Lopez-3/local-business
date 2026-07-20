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

import { asyncHandler } from "../utils/asyncHandler.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
    const summary = await getDashboardSummaryService();

    res.json({
        success: true,
        data: dashboardSummaryMapper(summary),
    });
});

export const getDashboardGrowth = asyncHandler(async (req, res) => {
    const growth = await getDashboardGrowthService();

    res.json({
        success: true,
        data: dashboardGrowthMapper(growth),
    });
});

export const getDashboardBusinessStatus = asyncHandler(async (req, res) => {
    const status = await getDashboardBusinessStatusService();

    res.json({
        success: true,
        data: dashboardBusinessStatusMapper(status),
    });
});

export const getDashboardCategories = asyncHandler(async (req, res) => {
    const categories = await getDashboardCategoriesService();

    res.json({
        success: true,
        data: dashboardCategoriesMapper(categories),
    });
});

export const getDashboardSectors = asyncHandler(async (req, res) => {
    const sectors = await getDashboardSectorsService();

    res.json({
        success: true,
        data: dashboardSectorsMapper(sectors),
    });
});

export const getDashboardTopRated = asyncHandler(async (req, res) => {
    const businesses = await getDashboardTopRatedService();

    res.json({
        success: true,
        data: dashboardTopRatedMapper(businesses),
    });
});

export const getDashboardMostReviewed = asyncHandler(async (req, res) => {
    const businesses = await getDashboardMostReviewedService();

    res.json({
        success: true,
        data: dashboardMostReviewedMapper(businesses),
    });
});

export const getDashboardModeration = asyncHandler(async (req, res) => {
    const moderation = await getDashboardModerationService();

    res.json({
        success: true,
        data: dashboardModerationMapper(moderation),
    });
});

export const getDashboardRecentActivity = asyncHandler(async (req, res) => {
    const activity = await getDashboardRecentActivityService();

    res.json({
        success: true,
        data: dashboardRecentActivityMapper(activity),
    });
});