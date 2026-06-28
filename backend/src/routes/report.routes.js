import { Router } from "express";

import {
    getReports,
    getMyReports,
    createReport,
    updateReport,
    updateReportStatus,
} from "../controllers/report.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";

import {
    createReportSchema,
    updateReportSchema,
    updateReportStatusSchema,
} from "../validators/report.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| GET /my
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene todos los reportes realizados por el usuario autenticado.
|
| Requiere:
|   Access Token válido.
|
| Respuesta:
| [
|   {
|     id,
|     business_id,
|     review_id,
|     reason,
|     status,
|     created_at
|   }
| ]
*/
router.get(
    "/my",
    authenticate,
    getMyReports
);

/*
|--------------------------------------------------------------------------
| POST /
|--------------------------------------------------------------------------
| Descripción:
|   Crea un nuevo reporte sobre un negocio o una reseña.
|
| Requiere:
|   Access Token válido.
|
| Body esperado:
| {
|   business_id?: number,
|   review_id?: number,
|   reason: string
| }
|
| Respuesta:
| {
|   id,
|   reporter_user_id,
|   business_id,
|   review_id,
|   reason,
|   status,
|   created_at
| }
*/
router.post(
    "/",
    authenticate,
    validate(createReportSchema),
    createReport
);

/*
|--------------------------------------------------------------------------
| PATCH /:id
|--------------------------------------------------------------------------
| Descripción:
|   Permite al usuario modificar un reporte propio durante las primeras
|   24 horas después de haber sido creado.
|
| Parámetros:
|   id: ID del reporte.
|
| Requiere:
|   Access Token válido.
|
| Body esperado:
| {
|   reason: string
| }
|
| Respuesta:
| {
|   id,
|   reporter_user_id,
|   business_id,
|   review_id,
|   reason,
|   status,
|   created_at
| }
*/
router.patch(
    "/:id",
    authenticate,
    validate(updateReportSchema),
    updateReport
);

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene todos los reportes registrados en el sistema. Permite
|   filtrar opcionalmente por estado mediante query string.
|
| Query opcional:
|   ?status=pending|reviewed|resolved
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| [
|   {
|     id,
|     reporter,
|     business,
|     review,
|     reason,
|     status,
|     created_at
|   }
| ]
*/
router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getReports
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/status
|--------------------------------------------------------------------------
| Descripción:
|   Cambia el estado de un reporte.
|
| Parámetros:
|   id: ID del reporte.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Body esperado:
| {
|   status: "pending" | "reviewed" | "resolved"
| }
|
| Respuesta:
| {
|   id,
|   reporter,
|   business,
|   review,
|   reason,
|   status,
|   created_at
| }
*/
router.patch(
    "/:id/status",
    authenticate,
    authorizeRoles("admin"),
    validate(updateReportStatusSchema),
    updateReportStatus
);

export default router;