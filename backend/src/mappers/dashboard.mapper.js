export const dashboardSummaryMapper = (summary) => ({

    total_users:
        summary.total_users,

    total_businesses:
        summary.total_businesses,

    active_businesses:
        summary.active_businesses,

    pending_businesses:
        summary.pending_businesses,

    total_categories:
        summary.total_categories,

    total_sectors:
        summary.total_sectors,

    total_services:
        summary.total_services,

    total_reviews:
        summary.total_reviews,

    average_rating:
        summary.average_rating,

    pending_reports:
        summary.pending_reports,

    new_users_month:
        summary.new_users_month,

    new_businesses_month:
        summary.new_businesses_month,

});

export const dashboardGrowthMapper =
(
    growth
) => ({

    users:
        growth.users,

    businesses:
        growth.businesses,

    });


export const dashboardBusinessStatusMapper =
(status) => ({

    active:
        status.active,

    inactive:
        status.inactive,

    verified:
        status.verified,

    pending:
        status.pending,

    });

export const dashboardCategoriesMapper =
(categories
) =>categories;
    
export const dashboardSectorsMapper =
(
    sectors
    ) => sectors;

export const dashboardTopRatedMapper =
(
    businesses
) =>businesses;


export const dashboardMostReviewedMapper =
(
    businesses
) =>businesses;

export const dashboardModerationMapper =
(
    moderation
) => ({

    pending_reports:
        moderation.pendingReports,

    pending_businesses:
        moderation.pendingBusinesses,

    hidden_reviews:
        moderation.hiddenReviews,

    });


export const dashboardRecentActivityMapper =
(
    activity
) => ({

    users:
        activity.users,

    businesses:
        activity.businesses,

    reviews:
        activity.reviews,

    reports:
        activity.reports,

});