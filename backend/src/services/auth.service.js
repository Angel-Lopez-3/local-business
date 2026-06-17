import {
    createUser,
    findUserByEmail,
    getUserRole,
    saveRefreshToken, findRefreshToken, revokeRefreshToken, updateLastLogin,
    revokeAllUserTokens,
    createPasswordReset,
    findPasswordResetToken,
    deletePasswordReset,
} from "../repositories/auth.repository.js";

import {updateUser} from "../repositories/user.repository.js";

import { sendPasswordResetEmail } from "./email.service.js";



import {generateResetToken} from "../utils/token.js";

import { AppError } from "../utils/AppError.js";


import { hashPassword, comparePassword } from "../utils/bcrypt.js";

import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";




export const registerUser = async (userData) => { 

    const existingUser = await findUserByEmail(userData.email);

    if (existingUser) {
        throw new AppError("User already registered with this email", 400);
    }

    const role = await getUserRole();

    const hashedPassword = await hashPassword(userData.password);

    const user =
    await createUser({
    role_id: role.id,

    first_name:
        userData.firstName,

    last_name:
        userData.lastName,

    email:
        userData.email,

    password:
        hashedPassword,
    });

    return user;

}


export const loginUser = async (email, password, ipAddress, userAgent) => {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    
    const expiresAt =
        new Date();

    expiresAt.setDate(
        expiresAt.getDate() + 7
    );
    
    await saveRefreshToken(
        user.id,
        refreshToken, expiresAt,
        ipAddress,
        userAgent
    );

    return { user, accessToken, refreshToken };

};


export const refreshUserToken = async (
refreshToken
) => {

    if (!refreshToken) {

        throw new AppError(
        "Refresh token required",
        401
        );

    }

    const storedToken =
        await findRefreshToken(
        refreshToken
        );

    if (!storedToken) {

        throw new AppError(
        "Invalid refresh token",
        401
        );

    }

    verifyRefreshToken(
        refreshToken
    );

    const user =
        storedToken.users;

    const newAccessToken =
        generateAccessToken(user);

    return {
        accessToken:
        newAccessToken,
    };
};

export const logoutUser = async (
refreshToken
) => {

    if (!refreshToken) return;

    await revokeRefreshToken(
        refreshToken
    );

};

export const logoutAllSessions =
async (userId) => {

await revokeAllUserTokens(
    userId
);

    };


export const forgotPasswordService = async (email) => {

    const user = await findUserByEmail(email);

    if (!user) {

        return true;

    }
    

    await deletePasswordReset(
        user.id
    );


    const token = generateResetToken();

    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await createPasswordReset(
        user.id,
        token,
        expiresAt
    );

    sendPasswordResetEmail(token);

    return true;
}

export const resetPasswordService = async (token, newPassword) => {

    const resetToken =
        await findPasswordResetToken(
            token
        );
    
    if (!resetToken) {

        throw new AppError(
            "Invalid or expired password reset token",
            400
        );

    }

        if (
            resetToken.expires_at <
            new Date()
        ) {

            throw new AppError(
                "Token expired",
                400
            );

        }

        const hashedPassword = await hashPassword(
            newPassword
        );
        
        await updateUser(
            resetToken.user_id,
            {
                password:
                    hashedPassword,
            }
        );
        
        await revokeAllUserTokens(
            resetToken.user_id
        );

        return true;
    
    
};