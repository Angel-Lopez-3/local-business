import { Router } from "express";

import { getSectors, getSector, createSector } from "../controllers/sector.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { createSectorSchema } from "../validators/sector.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la lista de todos los sectores activos.
|
| Acceso:
|   Público
|
| Parámetros:
|   Ninguno
|
| Respuesta:
| [
|   sectors
| ]
*/
router.get("/", getSectors);

/*
|--------------------------------------------------------------------------
| GET /:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene un sector específico por su ID.
|
| Acceso:
|   Público
|
| Parámetros:
|   id -> ID del sector
|
| Respuesta:
| {
|   sector
| }
*/
router.get("/:id", getSector);

/*
|--------------------------------------------------------------------------
| POST /
|--------------------------------------------------------------------------
| Descripción:
|   Crea un nuevo sector.
|
| Acceso:
|   Solo Admin
|
| Body esperado:
| {
|   name: string
| }
|
| Nota:
|   El slug es generado automáticamente por el backend.
|
| Respuesta:
| {
|   sector
| }
*/
router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    validate(createSectorSchema),
    createSector
);

export default router;