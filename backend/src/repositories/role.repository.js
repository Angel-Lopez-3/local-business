import prisma from '../config/db.js';

export const getRoles = async () => {

    return prisma.roles.findMany({
        
        orderBy: {
            id: 'asc',
        },
    }
    )
};

export const findRoleByName = async(
name) => {

    return prisma.roles.findUnique({
        where: {
            name,
        },
    })
};


export const getRoleById = async (roleId) => {

    return prisma.roles.findUnique({
        where: {
            id: BigInt(roleId),
        },
    })
};