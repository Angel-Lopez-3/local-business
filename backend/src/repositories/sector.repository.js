import prisma from '../config/db.js';

export const findAllSectors =
    async () => {
    
        return prisma.sectors.findMany({

            orderBy: {
                name: "asc",
            },
        });

    };


export const findSectorById =
async (
    sectorId
) => {

    return prisma.sectors.findUnique({

        where: {
            id: BigInt(sectorId),
        },

    });

    };

export const findSectorByNameAndCity =
async (
    name,
    city
) => {

    return prisma.sectors.findFirst({

        where: {

            name,

            city,

        },

    });

    };

export const createSector =
async (
    data
) => {

    return prisma.sectors.create({

        data,

    });

};