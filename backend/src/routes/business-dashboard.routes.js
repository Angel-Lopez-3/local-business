import { Router } from "express";

import {

    authenticate,

} from "../middlewares/auth.middleware.js";

import {

    authorizeRoles,

} from "../middlewares/role.middleware.js";

import {

    getBusinessSummary,
    getBusinessReviewsGrowth,
    getBusinessRatingDistribution,
    getBusinessServices,
    getBusinessRecentReviews,
    getBusinessPendingReplies,
    getBusinessReports,
    getBusinessFavorites,
    getBusinessRecentActivity,

} from "../controllers/business-dashboard.controller.js";

const router = Router();

const withOptionalBusinessId = (handler) => (req, res, next) => {
    req.params.businessId = req.params.businessId ?? null;
    return handler(req, res, next);
};

/*
|--------------------------------------------------------------------------
| GET /summary
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene el resumen general del negocio del usuario autenticado.
|
| Incluye:
|   - Servicios.
|   - Favoritos.
|   - Reseñas.
|   - Promedio.
|   - Reportes pendientes.
|
| Requiere:
|   Access Token válido.
|   Rol: Business.
|
| Respuesta:
| {
|   total_services,
|   active_services,
|   inactive_services,
|   total_reviews,
|   average_rating,
|   total_favorites,
|   total_replies,
|   pending_reports
| }
*/

router.get("/summary", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessSummary));
router.get("/summary/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessSummary);



/*
|--------------------------------------------------------------------------
| GET /reviews-growth/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene el crecimiento mensual de reseñas del negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/reviews-growth", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessReviewsGrowth));

router.get("/reviews-growth/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessReviewsGrowth);

/*
|--------------------------------------------------------------------------
| GET /rating-distribution/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la distribución de reseñas por cantidad de estrellas.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/rating-distribution", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessRatingDistribution));
router.get("/rating-distribution/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessRatingDistribution);

/*
|--------------------------------------------------------------------------
| GET /services/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene un resumen del estado de los servicios del negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/services", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessServices));
router.get("/services/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessServices);

/*
|--------------------------------------------------------------------------
| GET /recent-reviews/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene las reseñas recientes del negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/recent-reviews", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessRecentReviews));
router.get("/recent-reviews/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessRecentReviews);


/*
|--------------------------------------------------------------------------
| GET /pending-replies/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene las respuestas pendientes del negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/pending-replies", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessPendingReplies));
router.get("/pending-replies/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessPendingReplies);

/*
|--------------------------------------------------------------------------
| GET /reports/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene los reportes asociados al negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/reports", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessReports));
router.get("/reports/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessReports);

/*
|--------------------------------------------------------------------------
| GET /favorites/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene los favoritos del negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/favorites", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessFavorites));
router.get("/favorites/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessFavorites);

/*
|--------------------------------------------------------------------------
| GET /recent-activity/:businessId?
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la actividad reciente del negocio.
|
| Requiere:
|   Access Token válido.
|   Rol: Business o Admin.
|--------------------------------------------------------------------------
*/
router.get("/recent-activity", authenticate, authorizeRoles("business", "admin"), withOptionalBusinessId(getBusinessRecentActivity));

router.get("/recent-activity/:businessId", authenticate, authorizeRoles("business", "admin"), getBusinessRecentActivity);

export default router;