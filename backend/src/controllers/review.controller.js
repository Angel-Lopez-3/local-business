import { asyncHandler } from "../utils/asyncHandler.js";

import {
    getBusinessReviewsService,
    getReviewService,
    createReviewService,
    updateReviewService,
    deleteReviewService,
    createReplyService,
    updateReplyService,
    deleteReplyService,
} from "../services/review.service.js";

import {
    reviewMapper,
} from "../mappers/review.mapper.js";



/**
 * ==========================================
 * Obtener todas las reseñas de un negocio
 * GET /api/reviews/business/:businessId
 * Acceso: Público
 * ==========================================
 */
export const getBusinessReviews =
asyncHandler(async (req, res) => {

    const reviews =
        await getBusinessReviewsService(
            req.params.businessId
        );

    res.status(200).json({

        success: true,

        data:
            reviews.map(
                reviewMapper
            )

    });

});



/**
 * ==========================================
 * Obtener una reseña
 * GET /api/reviews/:id
 * Acceso: Público
 * ==========================================
 */
export const getReview =
asyncHandler(async (req, res) => {

    const review =
        await getReviewService(
            req.params.id
        );

    res.status(200).json({

        success:true,

        data:
            reviewMapper(
                review
            )

    });

});



/**
 * ==========================================
 * Crear reseña
 * POST /api/reviews
 * Acceso: Usuario autenticado
 * ==========================================
 */
export const createReview =
asyncHandler(async (req,res)=>{

    const review =
        await createReviewService(

            req.user,

            req.validatedData

        );

    res.status(201).json({

        success:true,

        message:
            "Review created successfully",

        data:reviewMapper(
        review
    )

    });

});



/**
 * ==========================================
 * Editar reseña
 * PATCH /api/reviews/:id
 * Acceso: Autor o Admin
 * ==========================================
 */
export const updateReview =
asyncHandler(async(req,res)=>{

    const review =
        await updateReviewService(

            req.params.id,

            req.user,

            req.validatedData

        );

    res.status(200).json({

        success:true,

        message:
            "Review updated successfully",

        data: reviewMapper(
        review
    )

    });

});



/**
 * ==========================================
 * Eliminar reseña
 * DELETE /api/reviews/:id
 * Acceso: Admin
 * ==========================================
 */
export const deleteReview =
asyncHandler(async(req,res)=>{

    await deleteReviewService(

        req.params.id

    );

    res.status(200).json({

        success:true,

        message:
            "Review deleted successfully"

    });

});



/**
 * ==========================================
 * Crear respuesta
 * POST /api/reviews/:reviewId/reply
 * Acceso: Dueño del negocio o Admin
 * ==========================================
 */
export const createReply =
asyncHandler(async(req,res)=>{

    const reply =
        await createReplyService(

            req.params.reviewId,

            req.user,

            req.validatedData

        );

    res.status(201).json({

        success:true,

        message:
            "Reply created successfully",

        data:reviewMapper(
        reply
    )

    });

});



/**
 * ==========================================
 * Editar respuesta
 * PATCH /api/reviews/reply/:replyId
 * Acceso: Dueño del negocio o Admin
 * ==========================================
 */
export const updateReply =
asyncHandler(async(req,res)=>{

    const reply =
        await updateReplyService(

            req.params.replyId,

            req.user,

            req.validatedData

        );

    res.status(200).json({

        success:true,

        message:
            "Reply updated successfully",

        data:reviewMapper(
        reply
    )

    });

});



/**
 * ==========================================
 * Eliminar respuesta
 * DELETE /api/reviews/reply/:replyId
 * Acceso: Dueño del negocio o Admin
 * ==========================================
 */
export const deleteReply =
asyncHandler(async(req,res)=>{

    await deleteReplyService(

        req.params.replyId,

        req.user

    );

    res.status(200).json({

        success:true,

        message:
            "Reply deleted successfully"

    });

});