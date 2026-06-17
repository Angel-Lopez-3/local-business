import {
    findUserByEmail, findUserById,
    getUsers,
    updateUser,
    searchUser,
    activaUser,
    desactivaUser,
} from '../repositories/user.repository.js';

import {
    revokeAllUserTokens
} from "../repositories/auth.repository.js";
import {
    comparePassword,
    hashPassword,
} from "../utils/bcrypt.js";

import {AppError} from "../utils/AppError.js";

export const getAllUsers = async () => {
    return await getUsers();
};

export const getUserById = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }
    return user;
}

export const searchUsersService = async (searchTerm) => {
    console.log("capa service:", searchTerm);
    return await searchUser(searchTerm);
};

export const activateUserService = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }
    return await activaUser(userId);
}

export const deactivateUserService = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new AppError('User not found', 404);
    }   
    return await desactivaUser(userId);
}

export const updateMyProfileService = async (
    currentUser,
    payload
) => {

    const targetUser =
        await findUserById(
            currentUser.id
        );

    if (!targetUser) {

        throw new AppError(
            "User not found",
            404
        );

    }

    const allowedFields = [
        "first_name",
        "last_name",
        "phone",
        "profile_photo",
    ];

    const updateData = {};

    Object.keys(payload)
        .forEach((key) => {

            if (
                allowedFields.includes(key)
            ) {

                updateData[key] =
                    payload[key];

            }

        });

    
    
    return await updateUser(
        currentUser.id,
        updateData
    );

};

export const updateUserByAdminService =async (
    targetUserId,
    payload
) => {

    const targetUser =
        await findUserById(
            targetUserId
        );

    if (!targetUser) {

        throw new AppError(
            "User not found",
            404
        );

    }

    const allowedFields = [
        "first_name",
        "last_name",
        "phone",
        "profile_photo",
        "role_id",
        "is_active",
        "email_verified",
    ];

    const updateData = {};

    Object.keys(payload)
        .forEach((key) => {

            if (
                allowedFields.includes(key)
            ) {

                updateData[key] =
                    payload[key];

            }

        });

    return await updateUser(
        targetUserId,
        updateData
    );

};


export const changePasswordService =
    async (
        currentUser,
        currentPassword,
        newPassword
    ) => {

        const user =
            await findUserById(
                currentUser.id
            );

        if (!user) {

            throw new AppError(
                "User not found",
                404
            );

        }

        const passwordMatch =
            await comparePassword(
                currentPassword,
                user.password
            );

        if (!passwordMatch) {

            throw new AppError(
                "Current password is incorrect",
                400
            );

        }

        const hashedPassword =
            await hashPassword(
                newPassword
            );

        await updateUser(
            currentUser.id,
            {
                password:
                    hashedPassword,
            }
        );

        await revokeAllUserTokens(
            currentUser.id
        );

        return true;
    };

