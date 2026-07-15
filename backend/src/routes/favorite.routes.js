import { Router } from "express";

import {
    authenticate,
} from "../middlewares/auth.middleware.js";

import {
    getFavorites,
    createFavorite,
    deleteFavorite,
} from "../controllers/favorite.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la lista de negocios marcados como favoritos por el
|   usuario autenticado.
|
| Requiere:
|   Access Token válido.
|
| Respuesta:
| [
|   {
|     business_id,
|     name,
|     slug,
|     logo_url,
|     category,
|     sector
|   }
| ]
*/
router.get(
    "/",
    authenticate,
    getFavorites
);

/*
|--------------------------------------------------------------------------
| POST /:businessId
|--------------------------------------------------------------------------
| Descripción:
|   Agrega un negocio a la lista de favoritos del usuario autenticado.
|
| Parámetros:
|   businessId: ID del negocio.
|
| Requiere:
|   Access Token válido.
|
| Respuesta:
| {
|   user_id,
|   business_id,
|   created_at
| }
*/
router.post(
    "/:businessId",
    authenticate,
    createFavorite
);

/*
|--------------------------------------------------------------------------
| DELETE /:businessId
|--------------------------------------------------------------------------
| Descripción:
|   Elimina un negocio de la lista de favoritos del usuario autenticado.
|
| Parámetros:
|   businessId: ID del negocio.
|
| Requiere:
|   Access Token válido.
|
| Respuesta:
| {
|   user_id,
|   business_id,
|   created_at
| }
*/
router.delete(
    "/:businessId",
    authenticate,
    deleteFavorite
);

export default router;