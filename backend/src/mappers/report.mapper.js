export const reportMapper =
(
    report
) => ({

    id:
        report.id,

    business_id:
        report.business_id,

    review_id:
        report.review_id,

    reason:
        report.reason,

    status:
        report.status,

    created_at:
        report.created_at,

    });

export const adminReportMapper =
(
    report
) => ({

    id:
        report.id,

    reason:
        report.reason,

    status:
        report.status,

    created_at:
        report.created_at,

    reporter: {

        id:
            report.users.id,

        first_name:
            report.users.first_name,

        last_name:
            report.users.last_name,

        email:
            report.users.email,

    },

    business:

        report.businesses
            ? {

                id:
                    report.businesses.id,

                name:
                    report.businesses.name,

                slug:
                    report.businesses.slug,

            }

            : null,

    review:

        report.reviews

            ? {

                id:
                    report.reviews.id,

                rating:
                    report.reviews.rating,

                comment:
                    report.reviews.comment,

            }

            : null,

});