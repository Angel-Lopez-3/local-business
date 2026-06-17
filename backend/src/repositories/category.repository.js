import prisma from "../config/db.js";

export const findAllCategories =
async () => {

    return prisma.categories.findMany({

        orderBy: {
            name: "asc",
        },

    });

};

export const findCategoryById =
async (
    categoryId
) => {

    return prisma.categories.findUnique({

        where: {
            id: BigInt(categoryId),
        },

    });

    };

export const findCategoryByName =
async (
    name
) => {

    return prisma.categories.findFirst({

        where: {
            name,
        },

    });

    };

export const findCategoryBySlug =
async (
    slug
) => {

    return prisma.categories.findFirst({

        where: {
            slug,
        },

    });

    };

export const createCategory =
async (
    data
) => {

    return prisma.categories.create({

        data,

    });

    };

export const updateCategory =
async (
    categoryId,
    data
) => {

    return prisma.categories.update({

        where: {
            id: BigInt(categoryId),
        },

        data,

    });

    };

export const findCategoryBySlugAndNotId =
async (
    slug,
    categoryId
) => {

    return prisma.categories.findFirst({

        where: {

            slug,

            NOT: {
                id: BigInt(categoryId),
            },

        },

    });

};