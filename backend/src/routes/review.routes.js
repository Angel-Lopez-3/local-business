import { Router } from "express";

import {
    authenticate,
} from "../middlewares/auth.middleware.js";

import {
    authorizeRoles,
} from "../middlewares/role.middleware.js";

import {
    validate,
} from "../middlewares/validate.middleware.js";

import {

    createReviewSchema,
    updateReviewSchema,

    createReplySchema,
    updateReplySchema,

} from "../validators/review.validator.js";

import {

    getBusinessReviews,
    getReview,

    createReview,
    updateReview,
    deleteReview,

    createReply,
    updateReply,
    deleteReply,

} from "../controllers/review.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /business/:businessId
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene todas las reseñas públicas de un negocio junto con sus
|   respuestas.
|
| Parámetros:
|   businessId: ID del negocio.
|
| Respuesta:
| [
|   {
|     id,
|     rating,
|     comment,
|     created_at,
|     user,
|     replies
|   }
| ]
*/
router.get(

    "/business/:businessId",

    getBusinessReviews

);

/*
|--------------------------------------------------------------------------
| GET /:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene una reseña específica junto con todas sus respuestas.
|
| Parámetros:
|   id: ID de la reseña.
|
| Respuesta:
| {
|   id,
|   rating,
|   comment,
|   created_at,
|   user,
|   replies
| }
*/
router.get(

    "/:id",

    getReview

);

/*
|--------------------------------------------------------------------------
| POST /
|--------------------------------------------------------------------------
| Descripción:
|   Crea una nueva reseña para un negocio.
|
| Requiere:
|   Access Token válido.
|
| Body esperado:
| {
|   business_id: number,
|   rating: number,
|   comment: string
| }
|
| Respuesta:
| {
|   id,
|   business_id,
|   user,
|   rating,
|   comment,
|   created_at
| }
*/
router.post(

    "/",

    authenticate,

    validate(
        createReviewSchema
    ),

    createReview

);

/*
|--------------------------------------------------------------------------
| PATCH /:id
|--------------------------------------------------------------------------
| Descripción:
|   Permite editar una reseña propia durante las primeras 24 horas
|   después de haber sido creada. El administrador puede modificar
|   cualquier reseña.
|
| Parámetros:
|   id: ID de la reseña.
|
| Requiere:
|   Access Token válido.
|
| Body esperado:
| {
|   rating?: number,
|   comment?: string
| }
|
| Respuesta:
| {
|   id,
|   business_id,
|   user,
|   rating,
|   comment,
|   updated_at
| }
*/
router.patch(

    "/:id",

    authenticate,

    validate(
        updateReviewSchema
    ),

    updateReview

);

/*
|--------------------------------------------------------------------------
| DELETE /:id
|--------------------------------------------------------------------------
| Descripción:
|   Elimina una reseña y todas sus respuestas asociadas.
|
| Parámetros:
|   id: ID de la reseña.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| {
|   id,
|   business_id,
|   user,
|   rating,
|   comment
| }
*/
router.delete(

    "/:id",

    authenticate,

    authorizeRoles(
        "admin"
    ),

    deleteReview

);

/*
|--------------------------------------------------------------------------
| POST /:reviewId/reply
|--------------------------------------------------------------------------
| Descripción:
|   Crea una respuesta para una reseña.
|
| Parámetros:
|   reviewId: ID de la reseña.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Body esperado:
| {
|   message: string
| }
|
| Respuesta:
| {
|   id,
|   review_id,
|   business_id,
|   message,
|   created_at
| }
*/
router.post(

    "/:reviewId/reply",

    authenticate,

    authorizeRoles(
        "business",
        "admin"
    ),

    validate(
        createReplySchema
    ),

    createReply

);

/*
|--------------------------------------------------------------------------
| PATCH /reply/:replyId
|--------------------------------------------------------------------------
| Descripción:
|   Edita una respuesta de una reseña.
|
| Parámetros:
|   replyId: ID de la respuesta.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Body esperado:
| {
|   message: string
| }
|
| Respuesta:
| {
|   id,
|   review_id,
|   business_id,
|   message,
|   created_at
| }
*/
router.patch(

    "/reply/:replyId",

    authenticate,

    authorizeRoles(
        "business",
        "admin"
    ),

    validate(
        updateReplySchema
    ),

    updateReply

);

/*
|--------------------------------------------------------------------------
| DELETE /reply/:replyId
|--------------------------------------------------------------------------
| Descripción:
|   Elimina una respuesta de una reseña.
|
| Parámetros:
|   replyId: ID de la respuesta.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Respuesta:
| {
|   id,
|   review_id,
|   business_id,
|   message
| }
*/
router.delete(

    "/reply/:replyId",

    authenticate,

    authorizeRoles(
        "business",
        "admin"
    ),

    deleteReply

);

export default router;