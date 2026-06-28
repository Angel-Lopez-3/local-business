import prisma from "../config/db.js";

export const findFavoritesByUserId =
    async (
        userId
    ) => {

        return await prisma.favorites.findMany({

            where: {

                user_id:
                    BigInt(userId),

            },

            include: {

                businesses: {

                    include: {

                        categories: true,

                        sectors: true,

                    },

                },

            },

            orderBy: {

                created_at: "desc",

            },

        });

    };

export const findFavorite =
    async (
        userId,
        businessId
    ) => {

        return await prisma.favorites.findUnique({

            where: {

                user_id_business_id: {

                    user_id:
                        BigInt(userId),

                    business_id:
                        BigInt(businessId),

                },

            },

        });

    };

export const createFavorite =
    async (
        userId,
        businessId
    ) => {

        return await prisma.favorites.create({

            data: {

                user_id:
                    BigInt(userId),

                business_id:
                    BigInt(businessId),

            },

        });

    };

export const deleteFavorite =
    async (
        userId,
        businessId
    ) => {

        return await prisma.favorites.delete({

            where: {

                user_id_business_id: {

                    user_id:
                        BigInt(userId),

                    business_id:
                        BigInt(businessId),

                },

            },

        });

    };