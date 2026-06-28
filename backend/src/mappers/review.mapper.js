export const reviewMapper =
(
    review
) => {

    return {

        id:
            review.id.toString(),

        rating:
            review.rating,

        comment:
            review.comment,

        created_at:
            review.created_at,

        updated_at:
            review.updated_at,

        user: {

            id:
                review.users.id.toString(),

            first_name:
                review.users.first_name,

            last_name:
                review.users.last_name,

            profile_photo:
                review.users.profile_photo,

        },

        replies:

            review.review_replies.map(

                reply => ({

                    id:
                        reply.id.toString(),

                    message:
                        reply.message,

                    created_at:
                        reply.created_at,

                    business: {

                        id:
                            reply.businesses.id.toString(),

                        name:
                            reply.businesses.name,

                        logo:
                            reply.businesses.logo,

                    }

                })

            )

    };

};