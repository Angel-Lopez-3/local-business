import prisma from "../config/db.js";

export const findServiceById =
async (
    id
) => {

    return await prisma.services.findUnique({

        where: {

            id:
                BigInt(id)

        },

        include: {

            businesses: true

        }

    });

    };

export const findServicesByBusiness =
async (
    businessId
) => {

    return await prisma.services.findMany({

        where: {

            business_id:
                BigInt(businessId)

        },

        orderBy: {

            name:
                "asc"

        }

    });

    };

export const createService =
async (
    data
) => {

    return await prisma.services.create({

        data

    });

    };

export const updateService =
async (
    id,
    data
) => {

    return await prisma.services.update({

        where: {

            id:
                BigInt(id)

        },

        data

    });

    };

export const deleteService =
async (
    id
) => {

    return await prisma.services.delete({

        where: {

            id:
                BigInt(id)

        }

    });

};