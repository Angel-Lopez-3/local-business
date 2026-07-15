import {

    countUsers,
    countBusinesses,
    countActiveBusinesses,
    countPendingBusinesses,

    countCategories,
    countSectors,

    countServices,
    countReviews,

    averageRating,

    countPendingReports,

    countNewUsersThisMonth,
    countNewBusinessesThisMonth,
    getUsersGrowth,
    getBusinessesGrowth,
    getBusinessStatus,
    getBusinessesPerCategory,
    getBusinessesPerSector,
    getTopRatedBusinesses,
    getMostReviewedBusinesses,
    getModerationData,
    getRecentActivity,

} from "../repositories/dashboard.repository.js";


export const getDashboardSummaryService =
async () => {

    const [

        totalUsers,
        totalBusinesses,
        activeBusinesses,
        pendingBusinesses,

        totalCategories,
        totalSectors,

        totalServices,
        totalReviews,

        rating,

        pendingReports,

        newUsersMonth,
        newBusinessesMonth,

    ] = await Promise.all([

        countUsers(),

        countBusinesses(),

        countActiveBusinesses(),

        countPendingBusinesses(),

        countCategories(),

        countSectors(),

        countServices(),

        countReviews(),

        averageRating(),

        countPendingReports(),

        countNewUsersThisMonth(),

        countNewBusinessesThisMonth(),

    ]);


    return {

        total_users:
            totalUsers,

        total_businesses:
            totalBusinesses,

        active_businesses:
            activeBusinesses,

        pending_businesses:
            pendingBusinesses,

        total_categories:
            totalCategories,

        total_sectors:
            totalSectors,

        total_services:
            totalServices,

        total_reviews:
            totalReviews,

        average_rating:
            rating._avg.rating
                ? Number(rating._avg.rating).toFixed(1)
                : 0,

        pending_reports:
            pendingReports,

        new_users_month:
            newUsersMonth,

        new_businesses_month:
            newBusinessesMonth,

    };

    };

const groupByMonth =
(
items
) => {

const result = {};

items.forEach(item => {

    const date =
        new Date(
            item.created_at
        );

    const key =
        `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}`;

    result[key] =
        (result[key] || 0) + 1;

});

return Object.entries(result).map(

    ([month, total]) => ({

        month,

        total,

    })

);

};

    export const getDashboardGrowthService =
async () => {

    const [

        users,

        businesses,

    ] = await Promise.all([

        getUsersGrowth(),

        getBusinessesGrowth(),

    ]);

    return {

        users:
            groupByMonth(
                users
            ),

        businesses:
            groupByMonth(
                businesses
            ),

    };

    };


export const getDashboardBusinessStatusService =
async () => {

    return await getBusinessStatus();

    };

export const getDashboardCategoriesService =
async () => {

    const categories =
        await getBusinessesPerCategory();

    return categories.map(

        category => ({

            id:
                category.id,

            category:
                category.name,

            total:
                category.businesses.length,

        })

    );

    };

export const getDashboardSectorsService =
async () => {

    const sectors =
        await getBusinessesPerSector();

    return sectors.map(

        sector => ({

            id:
                sector.id,

            sector:
                sector.name,

            total:
                sector.businesses.length,

        })

    );

    };
export const getDashboardTopRatedService = async () => {
    const businesses = await getTopRatedBusinesses();

    return businesses
        .map(business => {
            const totalReviews = business.reviews.length;

            const average = totalReviews
                ? business.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                : 0;

            return {
                id: business.id,
                name: business.name,
                slug: business.slug,
                category: business.categories.name,
                average_rating: Number(average.toFixed(1)),
                total_reviews: totalReviews,
            };
        })
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, 5);
};

export const getDashboardMostReviewedService = async () => {
    const businesses = await getMostReviewedBusinesses();

    return businesses
        .map(business => {
            const totalReviews = business.reviews.length;

            const average = totalReviews
                ? business.reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
                : 0;

            return {
                id: business.id,
                name: business.name,
                slug: business.slug,
                category: business.categories.name,
                total_reviews: totalReviews,
                average_rating: Number(average.toFixed(1)),
            };
        })
        .sort((a, b) => b.total_reviews - a.total_reviews)
        .slice(0, 5);
};

export const getDashboardModerationService =
async () => {

    return await getModerationData();

    };

export const getDashboardRecentActivityService =
async () => {

    return await getRecentActivity();

};