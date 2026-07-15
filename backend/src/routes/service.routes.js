import { Router } from "express";

import {
    getServices,
    createServiceController,
    updateServiceController,
    deleteServiceController,
} from "../controllers/service.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createServiceSchema,
    updateServiceSchema,
} from "../validators/service.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /:businessId
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene todos los servicios públicos registrados para un negocio.
|
| Parámetros:
|   businessId: ID del negocio.
|
| Respuesta:
| [
|   {
|     id,
|     business_id,
|     name,
|     description,
|     price,
|     is_active,
|     created_at
|   }
| ]
*/
router.get(
    "/:businessId",
    getServices
);

/*
|--------------------------------------------------------------------------
| POST /
|--------------------------------------------------------------------------
| Descripción:
|   Crea un nuevo servicio para un negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Body esperado:
| {
|   business_id: number,
|   name: string,
|   description?: string,
|   price?: number
| }
|
| Respuesta:
| {
|   id,
|   business_id,
|   name,
|   description,
|   price,
|   is_active,
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
    validate(
        createServiceSchema
    ),
    createServiceController
);

/*
|--------------------------------------------------------------------------
| PATCH /:id
|--------------------------------------------------------------------------
| Descripción:
|   Actualiza la información de un servicio existente.
|
| Parámetros:
|   id: ID del servicio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Body esperado:
| {
|   name?: string,
|   description?: string,
|   price?: number,
|   is_active?: boolean
| }
|
| Respuesta:
| {
|   id,
|   business_id,
|   name,
|   description,
|   price,
|   is_active,
|   created_at
| }
*/
router.patch(
    "/:id",
    authenticate,
    authorizeRoles(
        "business",
        "admin"
    ),
    validate(
        updateServiceSchema
    ),
    updateServiceController
);

/*
|--------------------------------------------------------------------------
| DELETE /:id
|--------------------------------------------------------------------------
| Descripción:
|   Elimina un servicio registrado de un negocio.
|
| Parámetros:
|   id: ID del servicio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business (propietario) o Admin.
|
| Respuesta:
| {
|   id,
|   business_id,
|   name,
|   description,
|   price,
|   is_active,
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
    deleteServiceController
);

export default router;