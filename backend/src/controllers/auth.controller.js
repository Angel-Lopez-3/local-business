import {
    registerUser,
    loginUser,
    refreshUserToken,
    logoutUser,
    logoutAllSessions,
    forgotPasswordService,
    resetPasswordService,

} from "../services/auth.service.js";

import {userPublicMapper, userAdminMapper} from "../mappers/user.mapper.js"

import {mapUserToDTO} from "../mappers/user.mapper.js";

import { asyncHandler } from "../utils/asyncHandler.js";

import {
    successResponse,
    errorResponse,
} from "../utils/response.js";

export const register = asyncHandler(async (req, res) => {
    

    const user =
    await registerUser(
    req.validatedData
    );

    return successResponse(
    res,
    "User registered successfully",
    userPublicMapper(user) ,
    201
    );


        

    
});

export const login = asyncHandler(async (
    req,
    res
) => {


        const {
        email,
        password,
        } = req.validatedData;

        const result =
        await loginUser(
            email,
            password,
            req.ip,
            req.headers["user-agent"]
        );

        res.cookie(
        "accessToken",
        result.accessToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge:
            15 * 60 * 1000,
        }
        );

        res.cookie(
        "refreshToken",
        result.refreshToken,
        {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge:
            7 *
            24 *
            60 *
            60 *
            1000,
        }
        );

        return successResponse(
        res,
        "Login successful"
        );

    

});

export const logout =
asyncHandler(
async (req, res) => {

    const refreshToken =
    req.cookies.refreshToken;

    await logoutUser(
    refreshToken
    );

    res.clearCookie(
    "accessToken"
    );

    res.clearCookie(
    "refreshToken"
    );

    return successResponse(
    res,
    "Logout successful"
    );
}
);

export const logoutAll =
asyncHandler(
async (req, res) => {

    await logoutAllSessions(
    req.user.id
    );

    res.clearCookie(
    "accessToken"
    );

    res.clearCookie(
    "refreshToken"
    );

    return successResponse(
    res,
    "All sessions closed"
    );
}
);

export const refreshToken =
asyncHandler(
async (req, res) => {

    const refreshToken =
    req.cookies.refreshToken;

    const result =
    await refreshUserToken(
        refreshToken
    );

    res.cookie(
    "accessToken",
    result.accessToken,
    {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:
        15 *
        60 *
        1000,
    }
    );

    return successResponse(
    res,
    "Token refreshed"
    );
}
    );

export const me = asyncHandler(
async (
    req,
    res
    ) => {
        

    

    return successResponse(
    res,
    "Authenticated user",
    mapUserToDTO(req.user)
    );

}
);

export const forgotPassword =
    asyncHandler(
        async (
            req,
            res
        ) => {

            await forgotPasswordService(
                req.validatedData.email
            );

            return successResponse(
                res,
                "If the email exists, a recovery link has been sent."
            );

        }
    );

export const resetPassword =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const {
                token,
                newPassword,
            } =
                req.validatedData;

            await resetPasswordService(
                token,
                newPassword
            );

            return successResponse(
                res,
                "Password reset successfully"
            );

        }
    );