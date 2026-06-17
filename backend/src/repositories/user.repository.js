import prisma from '../config/db.js';

export const findUserById = async (userId) => {

    return prisma.users.findUnique(
        {
            where: {
                id: BigInt(userId)

            },
            include: {
                roles: true,
            }
        }
    )
};

export const findUserByEmail = async (email) => {

    return prisma.users.findUnique(
        {
            where: {
                email

            },
            include: {
                roles: true,
            }
        }
    )
};


export const getUsers = async () => { 
    return prisma.users.findMany(
        {
            include: {
                roles: true,
            },

            orderBy: {
                created_at: 'desc'
            }
        }
    )
}

export const updateUser = async (userId, data) => {


    return prisma.users.update(
        {
            where: {
                id: BigInt(userId)
            },
            data,
            
        }
    )
};

export const desactivaUser = async (userId) => {

    return prisma.users.update(
        {
            where: {
                id: BigInt(userId)
            },
            data: {
                is_active: false
            },
        }
    )
};

export const activaUser = async (userId) => {  
    return prisma.users.update(
        {
            where: {
                id: BigInt(userId)
            },
            data: {
                is_active: true
            },
        }
    )
};


export const searchUser = async (searchTerm) => { 

    console.log("capa repository:", searchTerm);

    return prisma.users.findMany(
        {
            where: {
                OR: [
                    {
                        email: {
                            contains: searchTerm,
                        },
                    },
                    {
                        first_name: {
                            contains: searchTerm,
                        },

                    },
                    {
                        last_name: {
                            contains: searchTerm,
                        },
                    },
                
                ]
            },
            include: {
                roles: true,
            },

                        
        }
    )
}