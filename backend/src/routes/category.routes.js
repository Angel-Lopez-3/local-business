import { Router } from "express";

import { getCategories, getCategory, createCategory, updateCategory, activateCategory, deactivateCategory } from "../controllers/category.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { createCategorySchema, updateCategorySchema } from "../validators/category.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la lista de categorías activas del sistema.
|
| Acceso:
|   Público
|
| Parámetros:
|   Ninguno
|
| Respuesta:
| [
|   {
|     id,
|     name,
|     slug,
|     description,
|     is_active
|   }
| ]
*/
router.get("/", getCategories);

/*
|--------------------------------------------------------------------------
| GET /:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene una categoría específica por su ID.
|
| Acceso:
|   Público
|
| Parámetros:
|   id -> ID de la categoría
|
| Respuesta:
| {
|   id,
|   name,
|   slug,
|   description,
|   is_active
| }
*/
router.get("/:id", getCategory);

/*
|--------------------------------------------------------------------------
| POST /
|--------------------------------------------------------------------------
| Descripción:
|   Crea una nueva categoría.
|
| Acceso:
|   Solo Admin
|
| Body esperado:
| {
|   name: string,
|   description?: string
| }
|
| Nota:
|   El slug es generado automáticamente por el backend.
|
| Respuesta:
| {
|   category
| }
*/
router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    validate(createCategorySchema),
    createCategory
);

/*
|--------------------------------------------------------------------------
| PATCH /:id
|--------------------------------------------------------------------------
| Descripción:
|   Actualiza una categoría existente.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID de la categoría
|
| Body esperado:
| {
|   name?: string,
|   description?: string
| }
|
| Nota:
|   Si cambia el nombre, el slug será regenerado automáticamente.
|
| Respuesta:
| {
|   category
| }
*/
router.patch(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    validate(updateCategorySchema),
    updateCategory
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/activate
|--------------------------------------------------------------------------
| Descripción:
|   Activa una categoría.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID de la categoría
|
| Respuesta:
| {
|   category
| }
*/
router.patch(
    "/:id/activate",
    authenticate,
    authorizeRoles("admin"),
    activateCategory
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/deactivate
|--------------------------------------------------------------------------
| Descripción:
|   Desactiva una categoría.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID de la categoría
|
| Respuesta:
| {
|   category
| }
*/
router.patch(
    "/:id/deactivate",
    authenticate,
    authorizeRoles("admin"),
    deactivateCategory
);

export default router;