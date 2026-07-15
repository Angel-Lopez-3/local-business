import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { getDashboardSummary, getDashboardGrowth,getDashboardBusinessStatus,getDashboardCategories, getDashboardSectors,getDashboardTopRated,getDashboardMostReviewed, getDashboardModeration, getDashboardRecentActivity,} from "../controllers/dashboard.controller.js";

const router = Router();



/*
|--------------------------------------------------------------------------
| GET /summary
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene el resumen general del sistema para el Dashboard.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| {
|   total_users,
|   total_businesses,
|   active_businesses,
|   pending_businesses,
|   total_categories,
|   total_sectors,
|   total_services,
|   total_reviews,
|   average_rating,
|   pending_reports,
|   new_users_month,
|   new_businesses_month
| }
*/
router.get("/summary", authenticate, authorizeRoles("admin"), getDashboardSummary);

/*
|--------------------------------------------------------------------------
| GET /growth
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene el crecimiento mensual de usuarios y negocios
|   registrados en la plataforma.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| {
|   users: [
|     {
|       month,
|       total
|     }
|   ],
|
|   businesses: [
|     {
|       month,
|       total
|     }
|   ]
| }
|Nota: en futuar vercion resumir en un metodo 
|almecnado  en la abse de datos
*/
router.get("/growth", authenticate, authorizeRoles("admin"), getDashboardGrowth);


/*
|--------------------------------------------------------------------------
| GET /business-status
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene el estado general de los negocios registrados.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| {
|   active,
|   inactive,
|   verified,
|   pending
| }
|Nota: en futuar vercion resumir en un metodo 
|almecnado  en la abse de datos
*/
router.get("/business-status", authenticate, authorizeRoles("admin"), getDashboardBusinessStatus);

/*
|--------------------------------------------------------------------------
| GET /categories
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la cantidad de negocios registrados por categoría.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| [
|   {
|     id,
|     category,
|     total
|   }
| ]
*/
router.get("/categories", authenticate, authorizeRoles("admin"), getDashboardCategories);

/*
|--------------------------------------------------------------------------
| GET /sectors
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la cantidad de negocios registrados por sector.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| [
|   {
|      id,
|      sector,
|      total
|   }
| ]
*/
router.get("/sectors", authenticate, authorizeRoles("admin"), getDashboardSectors);

/*
|--------------------------------------------------------------------------
| GET /top-rated
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene los cinco negocios con mejor calificación promedio.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| [
|   {
|      id,
|      name,
|      slug,
|      category,
|      average_rating,
|      total_reviews
|   }
| ]
*/
router.get("/top-rated", authenticate, authorizeRoles("admin"), getDashboardTopRated);

/*
|--------------------------------------------------------------------------
| GET /most-reviewed
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene los cinco negocios con mayor cantidad de reseñas.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| [
|   {
|      id,
|      name,
|      slug,
|      category,
|      total_reviews,
|      average_rating
|   }
| ]
*/
router.get("/most-reviewed", authenticate, authorizeRoles("admin"), getDashboardMostReviewed);
/*
|--------------------------------------------------------------------------
| GET /moderation
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene los indicadores relacionados con la moderación del sistema.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| {
|   pending_reports,
|   pending_businesses,
|   hidden_reviews
| }
*/
router.get("/moderation", authenticate, authorizeRoles("admin"), getDashboardModeration);

/*
|--------------------------------------------------------------------------
| GET /recent-activity
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la actividad más reciente registrada en la plataforma.
|
| Incluye:
|   - Últimos usuarios registrados.
|   - Últimos negocios creados.
|   - Últimas reseñas publicadas.
|   - Últimos reportes enviados.
|
| Requiere:
|   Access Token válido.
|   Rol: Admin.
|
| Respuesta:
| {
|   users: [],
|   businesses: [],
|   reviews: [],
|   reports: []
| }
*/
router.get("/recent-activity", authenticate, authorizeRoles("admin"), getDashboardRecentActivity);

export default router;