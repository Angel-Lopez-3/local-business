import { Router } from "express";

import { authenticate } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { createBusinessSchema, updateBusinessSchema } from "../validators/business.validator.js";

import { uploadBusinessImages } from "../middlewares/upload.middleware.js";

import {
    getPublicBusinesses,
    getPublicBusinessById,
    getPublicBusinessBySlug,
    getMyBusiness,
    createBusiness,
    updateBusiness,
    verifyBusiness,
    unverifyBusiness,
    activateBusiness,
    deactivateBusiness,
    getAllBusinesses
} from "../controllers/business.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /admin/all
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la lista completa de negocios del sistema.
|   Incluye negocios verificados y no verificados.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   Ninguno
|
| Respuesta:
| [
|   businesses
| ]
*/
router.get(
    "/admin/all",
    authenticate,
    authorizeRoles("admin"),
    getAllBusinesses
);

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene todos los negocios públicos.
|   Solo devuelve negocios activos y verificados.
|
| Acceso:
|   Público
|
| Parámetros:
|   Ninguno
|
| Respuesta:
| [
|   businesses
| ]
*/
router.get("/", getPublicBusinesses);

/*
|--------------------------------------------------------------------------
| GET /slug/:slug
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene un negocio público utilizando su slug.
|
| Acceso:
|   Público
|
| Parámetros:
|   slug -> Slug del negocio
|
| Respuesta:
| {
|   business
| }
*/
router.get("/slug/:slug", getPublicBusinessBySlug);

/*
|--------------------------------------------------------------------------
| GET /my-business
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene el negocio asociado al usuario autenticado.
|
| Acceso:
|   Business, Admin
|
| Parámetros:
|   Ninguno
|
| Respuesta:
| {
|   business
| }
*/
router.get(
    "/my-business",
    authenticate,
    authorizeRoles("business", "admin"),
    getMyBusiness
);

/*
|--------------------------------------------------------------------------
| GET /:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene un negocio público por ID.
|   Solo devuelve negocios activos y verificados.
|
| Acceso:
|   Público
|
| Parámetros:
|   id -> ID del negocio
|
| Respuesta:
| {
|   business
| }
*/
router.get("/:id", getPublicBusinessById);

/*
|--------------------------------------------------------------------------
| POST /
|--------------------------------------------------------------------------
| Descripción:
|   Crea un nuevo negocio.
|
| Acceso:
|   User, Admin
|
| Body esperado:
| {
|   category_id: number,
|   sector_id: number,
|   name: string,
|   description: string,
|   phone?: string,
|   whatsapp?: string,
|   email?: string,
|   address?: string,
|   website?: string,
|   facebook?: string,
|   instagram?: string,
|   working_hours?: string,
|   latitude?: number,
|   longitude?: number,
|   logo?: File,
|   cover_image?: File
| }
|
| Nota:
|   El slug es generado automáticamente.
|
| Nota:
|   Si el usuario tiene rol "user",
|   será promovido automáticamente a "business".
|
| Respuesta:
| {
|   business
| }
*/
router.post(
    "/",
    authenticate,
    authorizeRoles("user", "admin"),
    uploadBusinessImages,
    validate(createBusinessSchema),
    createBusiness
);

/*
|--------------------------------------------------------------------------
| PATCH /:id
|--------------------------------------------------------------------------
| Descripción:
|   Actualiza un negocio existente.
|
| Acceso:
|   Business propietario o Admin
|
| Parámetros:
|   id -> ID del negocio
|
| Body esperado:
| {
|   category_id?: number,
|   sector_id?: number,
|   name?: string,
|   description?: string,
|   phone?: string,
|   whatsapp?: string,
|   email?: string,
|   address?: string,
|   website?: string,
|   facebook?: string,
|   instagram?: string,
|   working_hours?: string,
|   latitude?: number,
|   longitude?: number,
|   logo?: File,
|   cover_image?: File
| }
|
| Respuesta:
| {
|   business
| }
*/
router.patch(
    "/:id",
    authenticate,
    authorizeRoles("business", "admin"),
    uploadBusinessImages,
    validate(updateBusinessSchema),
    updateBusiness
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/verify
|--------------------------------------------------------------------------
| Descripción:
|   Marca un negocio como verificado.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del negocio
|
| Respuesta:
| {
|   business
| }
*/
router.patch(
    "/:id/verify",
    authenticate,
    authorizeRoles("admin"),
    verifyBusiness
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/unverify
|--------------------------------------------------------------------------
| Descripción:
|   Revierte la verificación de un negocio.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del negocio
|
| Respuesta:
| {
|   business
| }
*/
router.patch(
    "/:id/unverify",
    authenticate,
    authorizeRoles("admin"),
    unverifyBusiness
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/activate
|--------------------------------------------------------------------------
| Descripción:
|   Activa un negocio.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del negocio
|
| Respuesta:
| {
|   business
| }
*/
router.patch(
    "/:id/activate",
    authenticate,
    authorizeRoles("admin"),
    activateBusiness
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/deactivate
|--------------------------------------------------------------------------
| Descripción:
|   Desactiva un negocio.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del negocio
|
| Respuesta:
| {
|   business
| }
*/
router.patch(
    "/:id/deactivate",
    authenticate,
    authorizeRoles("admin"),
    deactivateBusiness
);

export default router;