import { Router } from "express";

import { getRoles, getRoleById } from "../controllers/role.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la lista completa de roles del sistema.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   Ninguno
|
| Respuesta:
| [
|   {
|     id,
|     name,
|     description
|   }
| ]
*/
router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getRoles
);

/*
|--------------------------------------------------------------------------
| GET /:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene un rol específico por su ID.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del rol
|
| Respuesta:
| {
|   id,
|   name,
|   description
| }
*/
router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    getRoleById
);

export default router;