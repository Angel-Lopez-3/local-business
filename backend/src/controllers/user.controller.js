import { asyncHandler } from "../utils/asyncHandler.js";

import { successResponse } from "../utils/response.js";

import {
    getAllUsers,
    getUserById,
    searchUsersService,
    updateMyProfileService,
    updateUserByAdminService,
    activateUserService,
    deactivateUserService, changePasswordService
} from "../services/user.service.js";

import {sanitizeUsers,  userAdminMapper, userPublicMapper, usersAdminMapper} from "../mappers/user.mapper.js";

export const getUsers = asyncHandler(async (req, res) => { 

    const users = await getAllUsers();

    return successResponse(
        res,
        "Users retrieved successfully",
        usersAdminMapper(users)
    );

});

export const getUser = asyncHandler(async (req, res) => {

    const user = await getUserById(req.params.id);

    return successResponse(
        res,
        "User retrieved successfully",
        userAdminMapper(user)
    );
});

export const searchUsers = asyncHandler(async (req, res) => {

    console.log("capa controller:", req.query.q);
    const users = await searchUsersService(req.query.q);

    return successResponse(res,"Search completed successfully", sanitizeUsers(users));
});

export const updateMyProfile = asyncHandler(async (req, res) => {

    const payload = {

        ...req.validatedData,
    };
    
    if (
        req.file
    ) {

        payload.profile_photo =
            `users/profiles/${req.file.filename}`;

    }

    const updatedUser = await updateMyProfileService(req.user, payload);

    return successResponse(
        res,
        "Profile updated successfully",
        userPublicMapper(updatedUser)
    );
});

export const updateUserByAdmin = asyncHandler(async (req, res) => {

    const payload = {

        ...req.validatedData,
    };
    
    if (
        req.file
    ) {

        payload.profile_photo =
            `users/profiles/${req.file.filename}`;

    }
    
    const updatedUser = await updateUserByAdminService(req.params.id, payload);

    return successResponse(
        res,
        "User updated successfully",
        userAdminMapper(updatedUser)
    );
});

export const activateUser = asyncHandler(async (req, res) => {

    const user = await activateUserService(req.params.id);

    return successResponse(res, "User activated successfully", userAdminMapper(user));
});

export const deactivateUser = asyncHandler(async (req, res) => {
    const user = await deactivateUserService(req.params.id);

    return successResponse(res, "User deactivated successfully", userAdminMapper(user));
});

export const changePassword =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const {
                currentPassword,
                newPassword,
            } =
                req.validatedData;
            
            console.log("capa controller - changePassword:", {
                currentPassword,
                newPassword,
            });

            await changePasswordService(
                req.user,
                currentPassword,
                newPassword
            );

            

            return successResponse(
                res,
                "Password changed successfully"
            );

        }
    );