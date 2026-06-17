import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id.toString(),
            roleId: user.role_id.toString(),
            email: user.email,
        },
        env.jwtAccessTokenSecret,
        {
            expiresIn: env.accessTokenExpiration,
        }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id.toString(),
        },
        env.jwtRefreshTokenSecret,
        {
            expiresIn: env.refreshTokenExpiration,
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(
        token,
        env.jwtAccessTokenSecret
    );
};

export const verifyRefreshToken = (token) => {
    return jwt.verify(
        token,
        env.jwtRefreshTokenSecret
    );
};

console.log(env);