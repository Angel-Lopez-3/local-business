import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    uploadBusinessGallery,
} from "../middlewares/upload.middleware.js";

import {
    createBusinessImageSchema,
} from "../validators/business-image.validator.js";

import {
    getBusinessImages,
    getBusinessImage,
    createBusinessImage,
    deleteBusinessImage,
} from "../controllers/business-image.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /all/:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene todas las imágenes pertenecientes a un negocio.
|
| Parámetros:
|   id: ID del negocio.
|
| Respuesta:
| [
|   {
|     id,
|     business_id,
|     image_url,
|     created_at
|   }
| ]
*/
router.get(
    "/all/:id",
    getBusinessImages
);

/*
|--------------------------------------------------------------------------
| GET /:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la información de una imagen específica del negocio.
|
| Parámetros:
|   id: ID de la imagen.
|
| Respuesta:
| {
|   id,
|   business_id,
|   image_url,
|   created_at
| }
*/
router.get(
    "/:id",
    getBusinessImage
);

/*
|--------------------------------------------------------------------------
| POST /
|--------------------------------------------------------------------------
| Descripción:
|   Agrega una nueva imagen a la galería de un negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Body esperado (multipart/form-data):
| {
|   business_id: number,
|   image: File
| }
|
| Respuesta:
| {
|   id,
|   business_id,
|   image_url,
|   created_at
| }
*/
router.post(
    "/",
    authenticate,
    authorizeRoles(
        "business",
        "admin"
    ),
    uploadBusinessGallery.single(
        "image"
    ),
    validate(
        createBusinessImageSchema
    ),
    createBusinessImage
);

/*
|--------------------------------------------------------------------------
| DELETE /:id
|--------------------------------------------------------------------------
| Descripción:
|   Elimina una imagen de la galería de un negocio.
|
| Parámetros:
|   id: ID de la imagen.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Respuesta:
| {
|   id,
|   business_id,
|   image_url,
|   created_at
| }
*/
router.delete(
    "/:id",
    authenticate,
    authorizeRoles(
        "business",
        "admin"
    ),
    deleteBusinessImage
);

export default router;