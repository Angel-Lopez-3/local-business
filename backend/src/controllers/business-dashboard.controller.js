import {

    getBusinessSummaryService,
    getBusinessReviewsGrowthService,
    getBusinessRatingDistributionService,
    getBusinessServicesService,
    getBusinessRecentReviewsService,
    getBusinessPendingRepliesService,
    getBusinessReportsService,
    getBusinessFavoritesService,
    getBusinessRecentActivityService,

}
    from "../services/business-dashboard.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import {

    businessSummaryMapper,
    businessServicesMapper,
    businessRatingDistributionMapper,
    businessRecentReviewsMapper,
    businessPendingRepliesMapper,
    businessReportsMapper,
    businessFavoritesMapper,
    businessRecentActivityMapper,
    businessReviewsGrowthMapper

}
from "../mappers/business-dashboard.mapper.js";

export const getBusinessSummary = asyncHandler(async (req, res) => {
    const summary = await getBusinessSummaryService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessSummaryMapper(summary),
    });
});

export const getBusinessReviewsGrowth = asyncHandler(async (req, res) => {
    const growth = await getBusinessReviewsGrowthService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessReviewsGrowthMapper(growth),
    });
});

export const getBusinessRatingDistribution = asyncHandler(async (req, res) => {
    const distribution = await getBusinessRatingDistributionService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessRatingDistributionMapper(distribution),
    });
});

export const getBusinessServices = asyncHandler(async (req, res) => {
    const services = await getBusinessServicesService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessServicesMapper(services),
    });
});

export const getBusinessRecentReviews = asyncHandler(async (req, res) => {
    const reviews = await getBusinessRecentReviewsService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessRecentReviewsMapper(reviews),
    });
});

export const getBusinessPendingReplies = asyncHandler(async (req, res) => {
    const data = await getBusinessPendingRepliesService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessPendingRepliesMapper(data),
    });
});

export const getBusinessReports = asyncHandler(async (req, res) => {
    const data = await getBusinessReportsService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessReportsMapper(data),
    });
});

export const getBusinessFavorites = asyncHandler(async (req, res) => {
    const data = await getBusinessFavoritesService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessFavoritesMapper(data),
    });
});

export const getBusinessRecentActivity = asyncHandler(async (req, res) => {
    const data = await getBusinessRecentActivityService(
        req.user.id,
        req.user.roles.name,
        req.params.businessId
    );

    res.json({
        success: true,
        data: businessRecentActivityMapper(data),
    });
});