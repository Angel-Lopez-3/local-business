import prisma from "../config/db.js";

export const findAllBusinessImages =
    async (businessId) => {

        return await prisma.business_images.findMany({
            where: {
                business_id: BigInt(
                    businessId
                ),

            },

            include: {

                businesses: {

                    select: {

                        id: true,
                        name: true,
                        slug: true,

                    },

                },

            },

            orderBy: {

                created_at: "desc",

            },

        });

    };

export const findBusinessImageById =
    async (
        imageId
    ) => {

        return await prisma.business_images.findUnique({

            where: {

                id: BigInt(
                    imageId
                ),

            },

            include: {

                businesses: {

                    select: {

                        id: true,
                        user_id: true,
                        name: true,
                        slug: true,

                    },

                },

            },

        });

    };

export const createBusinessImage =
    async (
        data
    ) => {

        return await prisma.business_images.create({

            data,

        });

    };

export const deleteBusinessImage =
    async (
        imageId
    ) => {

        return await prisma.business_images.delete({

            where: {

                id: BigInt(
                    imageId
                ),

            },

        });

    };
