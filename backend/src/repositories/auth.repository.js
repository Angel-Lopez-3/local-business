import prisma from "../config/db.js";

export const findUserByEmail = async (email) => {

    return prisma.users.findUnique({
        where: {
        email,
        },
        include: {
        roles: true,
        }
    });

};

export const createUser = async (data) => {

    return prisma.users.create({
        data,
    });

};

export const updateLastLogin = async (
userId
) => {

    return prisma.users.update({
        where: {
        id: BigInt(userId),
        },

        data: {
        last_login: new Date(),
        },
    });

};



export const findUserById = async (id) => {

    return prisma.users.findUnique(
        {
            where: {
                id: BigInt(id),
            }, 
            include: {
                roles: true,
            }
        });

};

export const saveRefreshToken = async (
    userId,
    token,
    expiresAt,
    ipAddress,
    userAgent
    ) => {

    return prisma.refresh_tokens.create({
        data: {
        user_id: BigInt(userId),
        token,
        expires_at: expiresAt,
        ip_address: ipAddress,
        user_agent: userAgent,
        },
    });

};




export const getUserRole = async () => {

    return prisma.roles.findUnique({
        where: {
        name: "user",
        },
    });

};

export const revokeRefreshToken = async (
token
) => {

    return prisma.refresh_tokens.updateMany({
        where: {
        token,
        },

        data: {
        revoked: true,
        },
    });

};



export const findRefreshToken = async (
token
) => {

    return prisma.refresh_tokens.findFirst({
        where: {
        token,
        revoked: false,
        },

        include: {
        users: {
            include: {
            roles: true,
            },
        },
        },
    });

};

export const revokeAllUserTokens = async (
userId
) => {

    return prisma.refresh_tokens.updateMany({
        where: {
        user_id: BigInt(userId),
        revoked: false,
        },

        data: {
        revoked: true,
        },
    });

};

export const deletePasswordResetByUser = async (userId) => {
    return prisma.password_resets.deleteMany({
        where: {
            user_id: BigInt(userId),
        },
    });
};

export const createPasswordReset =
    async (
        userId,
        token,
        expiresAt
    ) => {

        return prisma.password_resets.create({

            data: {

                user_id:
                    BigInt(userId),

                token,

                expires_at:
                    expiresAt,

            },

        });

    };

export const findPasswordResetToken =
    async (
        token
    ) => {

        return prisma.password_resets.findFirst({

            where: {
                token,
            },

            include: {
                users: true,
            },

        });

    };

export const deletePasswordReset =
    async (
        id
    ) => {

        return prisma.password_resets.deleteMany({

            where: {
                id: BigInt(id),
            },

        });

    };