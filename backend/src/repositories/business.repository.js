import prisma
    from "../config/db.js";


export const findBusinessById =
async (
    businessId
) => {

    return prisma.businesses.findUnique({

        where: {
            id: BigInt(
                businessId
            ),
        },

        include: {

            categories: true,

            sectors: true,

        },

    });

    };

export const findBusinessBySlug =
async (
    slug
) => {

    return prisma.businesses.findUnique({

        where: {
            slug,
        },

        include: {

            categories: true,

            sectors: true,

        },

    });

    };

export const findBusinessByUserId =
async (
    userId
) => {

    return prisma.businesses.findFirst({

        where: {

            user_id:
                BigInt(userId),

        },

        include: {

            categories: true,

            sectors: true,

        },

    });

    };

export const findAllPublicBusinesses =
async () => {

    return prisma.businesses.findMany({

        where: {

            is_verified: true,

            is_active: true,

        },

        include: {

            categories: true,

            sectors: true,

        },

        orderBy: {

            created_at: "desc",

        },

    });

    };

export const createBusiness =
async (
    data
) => {

    return prisma.businesses.create({

        data,

        include: {

            categories: true,

            sectors: true,

        },

    });

    };

export const updateBusiness =
async (
    businessId,
    data
) => {

    return prisma.businesses.update({

        where: {

            id: BigInt(
                businessId
            ),

        },

        data,

        include: {

            categories: true,

            sectors: true,

        },

    });

    };

export const verifyBusiness =
async (
    businessId,
    adminId
) => {

    return prisma.businesses.update({

        where: {

            id: BigInt(
                businessId
            ),

        },

        data: {

            is_verified: true,

            approved_by:
                BigInt(adminId),

            approved_at:
                new Date(),

        },

    });

    };

export const unverifyBusiness =
async (
    businessId
) => {

    return prisma.businesses.update({

        where: {

            id: BigInt(
                businessId
            ),

        },

        data: {

            is_verified: false,

            approved_by: null,

            approved_at: null,

        },

    });

    };

export const activateBusiness =
async (
    businessId
) => {

    return prisma.businesses.update({

        where: {

            id: BigInt(
                businessId
            ),

        },

        data: {

            is_active: true,

        },

    });

    };

export const deactivateBusiness =
async (
    businessId
) => {

    return prisma.businesses.update({

        where: {

            id: BigInt(
                businessId
            ),

        },

        data: {

            is_active: false,

        },

    });

    };

export const findAllBusinesses =
async () => {

    return prisma.businesses.findMany({

        include: {

            categories: true,

            sectors: true,

        },

        orderBy: {

            created_at: "desc",

        },

    });

    };


export const findBusinessByIdWithOwner =
async (
    id
) => {

    return await prisma.businesses.findUnique({

        where: {

            id:
                BigInt(id)

        },

        include: {

            users_businesses_user_idTousers: {

                include: {

                    roles: true

                }

            }

        }

    });

};