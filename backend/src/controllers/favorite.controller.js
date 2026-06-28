import { asyncHandler } from "../utils/asyncHandler.js";

import {
    getFavoritesService,
    createFavoriteService,
    deleteFavoriteService,
} from "../services/favorite.service.js";

import {
    favoriteMapper,
} from "../mappers/favorite.mapper.js";



/**
 * ==========================================
 * Obtener favoritos del usuario autenticado
 * GET /api/favorites
 * Acceso: Usuario autenticado
 * ==========================================
 */

export const getFavorites =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const favorites =
                await getFavoritesService(
                    req.user.id
                );

            res.status(200).json({

                success: true,

                data:
                    favorites.map(
                        favoriteMapper
                    ),

            });

        }
    );



/**
 * ==========================================
 * Agregar negocio a favoritos
 * POST /api/favorites/:businessId
 * Acceso: Usuario autenticado
 * ==========================================
 */

export const createFavorite =
    asyncHandler(
        async (
            req,
            res
        ) => {

            await createFavoriteService(

                req.user.id,

                req.params.businessId

            );

            res.status(201).json({

                success: true,

                message:
                    "Business added to favorites successfully",

            });

        }
    );



/**
 * ==========================================
 * Eliminar favorito
 * DELETE /api/favorites/:businessId
 * Acceso: Usuario autenticado
 * ==========================================
 */

export const deleteFavorite =
    asyncHandler(
        async (
            req,
            res
        ) => {

            await deleteFavoriteService(

                req.user.id,

                req.params.businessId

            );

            res.status(200).json({

                success: true,

                message:
                    "Favorite removed successfully",

            });

        }
    );