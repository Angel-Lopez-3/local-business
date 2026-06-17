import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { successResponse, errorResponse } from "../utils/response.js";
import { findUserById } from "../repositories/auth.repository.js";

import prisma
from "../config/db.js";

export const authenticate =
    async (
        req,
        res,
        next
    ) => {

        try {

        const token =
            req.cookies.accessToken;

        if (!token) {

            return res.status(401)
            .json({
                success: false,
                message:
                "Unauthorized: No token provided",
            });


            }
            
            

        const decoded =
            jwt.verify(
            token,
            env.jwtAccessTokenSecret
            );

        const user =
            await findUserById(decoded.id);

        if (!user) {

            return res.status(401)
            .json({
                success: false,
                message:
                "User not found",
            });

        }

            req.user = user;
            
            console.log("Usuario autenticado:", user.email);

        next();

        } catch (error) {
            console.error(error);

    return errorResponse(
        res,
        error.message,
        null,
        401
    );
    
        // return errorResponse(res, "Token inválido", null, 401);
        }
    };
