import { AppError } from "../utils/AppError.js";

import {

    findReviewsByBusinessId,
    findReviewById,
    findReviewByUser,

    createReview,
    updateReview,
    deleteReview,

    findReplyById,
    createReply,
    updateReply,
    deleteReply,
    findReviewCompleteById

}
from "../repositories/review.repository.js";

import {

    findBusinessById,

}
    from "../repositories/business.repository.js";

export const getBusinessReviewsService =
async (
    businessId
) => {

    const business =
        await findBusinessById(
            businessId
        );

    if (!business)

        throw new AppError(
            "Business not found",
            404
        );

    return await findReviewsByBusinessId(
        businessId
    );

    };

export const getReviewService =
async (
    reviewId
) => {

    const review =
        await findReviewById(
            reviewId
        );

    if (!review)

        throw new AppError(
            "Review not found",
            404
        );

    return review;

    };

export const createReviewService =
async (

    currentUser,

    payload

) => {

    const business =
        await findBusinessById(
            payload.business_id
        );

    if (!business)

        throw new AppError(
            "Business not found",
            404
        );

    if (!business.is_active)

        throw new AppError(
            "Business inactive",
            400
        );

    if (!business.is_verified)

        throw new AppError(
            "Business not verified",
            400
        );



    if (

        business.user_id.toString()
        ===
        currentUser.id.toString()

    )

        throw new AppError(

            "You cannot review your own business",

            400

        );



    const existingReview =
        await findReviewByUser(

            currentUser.id,

            payload.business_id

        );

    if (existingReview)

        throw new AppError(

            "Review already exists",

            409

        );



    const review = await createReview({

        user_id:
            BigInt(currentUser.id),

        business_id:
            BigInt(payload.business_id),

        rating:
            payload.rating,

        comment:
            payload.comment,

    });

    return await findReviewById(
        review.id
    )

    };

export const updateReviewService =
async (

    reviewId,

    currentUser,

    payload

) => {

    const review =
        await findReviewById(
            reviewId
        );

    if (!review)

        throw new AppError(
            "Review not found",
            404
        );



    if (

        currentUser.roles.name
        !==
        "admin"

    ) {

        if (

            review.user_id.toString()
            !==
            currentUser.id.toString()

        )

            throw new AppError(
                "Forbidden",
                403
            );



        const hours =

            (

                Date.now()

                -

                new Date(
                    review.created_at
                ).getTime()

            )/1000/60/60;



        if (

            hours > 24

        )

            throw new AppError(

                "Review can only be edited within 24 hours",

                403

            );

    }



    await updateReview(

        reviewId,

        payload

    );

    return await findReviewById(
        reviewId
    )

    };

export const deleteReviewService =
async (
    reviewId
) => {

    const review =
        await findReviewById(
            reviewId
        );

    if (!review)

        throw new AppError(
            "Review not found",
            404
        );

    await deleteReview(
        reviewId
    );

    };

export const createReplyService =
async (

    reviewId,

    currentUser,

    payload

) => {

    const review =
        await findReviewById(
            reviewId
        );

    if (!review)

        throw new AppError(
            "Review not found",
            404
        );



    if (

        currentUser.roles.name
        !==
        "admin"

    ) {

        if (

            review.businesses.user_id.toString()

            !==

            currentUser.id.toString()

        )

            throw new AppError(

                "Forbidden",

                403

            );

    }



    await createReply({

        review_id:
            BigInt(reviewId),

        business_id:
            review.business_id,

        message:
            payload.message,

    });

    return await findReviewById(
        reviewId
    )

    };

export const updateReplyService =
async (

    replyId,

    currentUser,

    payload

) => {

    const reply =
        await findReplyById(
            replyId
        );

    if (!reply)

        throw new AppError(
            "Reply not found",
            404
        );



    if (

        currentUser.roles.name
        !==
        "admin"

    ) {

        if (

            reply.businesses.user_id.toString()

            !==

            currentUser.id.toString()

        )

            throw new AppError(
                "Forbidden",
                403
            );

    }



    await updateReply(

        replyId,

        payload

    );
    return await findReviewCompleteById(
    reply.reviews.id
);

    };

export const deleteReplyService =
async (

    replyId,

    currentUser

) => {

    const reply =
        await findReplyById(
            replyId
        );

    if (!reply)

        throw new AppError(
            "Reply not found",
            404
        );



    if (

        currentUser.roles.name
        !==
        "admin"

    ) {

        if (

            reply.businesses.user_id.toString()

            !==

            currentUser.id.toString()

        )

            throw new AppError(
                "Forbidden",
                403
            );

    }



    await deleteReply(
        replyId
    );

};