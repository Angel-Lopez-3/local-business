import { AppError }
from "../utils/AppError.js";

import {

    findFavoritesByUserId,
    findFavorite,
    createFavorite,
    deleteFavorite,

}
from "../repositories/favorite.repository.js";

import {

    findBusinessById,

}
from "../repositories/business.repository.js";



export const getFavoritesService =
    async (
        userId
    ) => {

        return await findFavoritesByUserId(
            userId
        );

    };



export const createFavoriteService =
    async (
        userId,
        businessId
    ) => {

        const business =
            await findBusinessById(
                businessId
            );

        if (!business) {

            throw new AppError(
                "Business not found",
                404
            );

        }

        if (
            !business.is_active
        ) {

            throw new AppError(
                "Business is inactive",
                400
            );

        }

        if (
            !business.is_verified
        ) {

            throw new AppError(
                "Business is not verified",
                400
            );

        }

        const existingFavorite =
            await findFavorite(

                userId,

                businessId

            );

        if (
            existingFavorite
        ) {

            throw new AppError(
                "Business already in favorites",
                409
            );

        }

        return await createFavorite(

            userId,

            businessId

        );

    };



export const deleteFavoriteService =
    async (
        userId,
        businessId
    ) => {

        const favorite =
            await findFavorite(

                userId,

                businessId

            );

        if (!favorite) {

            throw new AppError(

                "Favorite not found",

                404

            );

        }

        await deleteFavorite(

            userId,

            businessId

        );

    };