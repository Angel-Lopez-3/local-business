import {
    getPublicBusinessesService,
    getPublicBusinessByIdService,
    getPublicBusinessBySlugService,
    getMyBusinessService,
    createBusinessService,
    updateBusinessService,
    verifyBusinessService,
    unverifyBusinessService,
    activateBusinessService,
    deactivateBusinessService,
    getAllBusinessesService,
}
from "../services/business.service.js";

import {
    businessMapper,
    businessesMapper,
    businessPublicMapper,
    businessesPublicMapper,
}
from "../mappers/business.mapper.js";

import { asyncHandler }
from "../utils/asyncHandler.js";

import {
    successResponse,
}
    from "../utils/response.js";




export const getPublicBusinesses =
asyncHandler(
async (
    req,
    res
) => {

    const businesses =
        await getPublicBusinessesService();

    return successResponse(

        res,

        "Businesses retrieved successfully",

        businessesPublicMapper(
            businesses
        )

    );

    });


export const getPublicBusinessById =
asyncHandler(
async (
    req,
    res
) => {

    const business =
        await getPublicBusinessByIdService(
            req.params.id
        );

    return successResponse(

        res,

        "Business retrieved successfully",

        businessPublicMapper(
            business
        )

    );

    });



export const getPublicBusinessBySlug =
asyncHandler(
async (
    req,
    res
) => {

    const business =
        await getPublicBusinessBySlugService(
            req.params.slug
        );

    return successResponse(

        res,

        "Business retrieved successfully",

        businessPublicMapper(
            business
        )

    );

    });


export const getMyBusiness =
asyncHandler(
async (
    req,
    res
) => {

    const business =
        await getMyBusinessService(
            req.user
        );

    return successResponse(

        res,

        "Business retrieved successfully",

        businessPublicMapper(
            business
        )

    );

    });


export const createBusiness =
asyncHandler(
async (
    req,
    res
) => {

    const payload = {

        ...req.validatedData,

    };

    if (
        req.files?.logo?.[0]
    ) {

        payload.logo =
            `businesses/logos/${req.files.logo[0].filename}`;

    }

    if (
        req.files?.cover_image?.[0]
    ) {

        payload.cover_image =
            `businesses/covers/${req.files.cover_image[0].filename}`;

    }

    const business =
        await createBusinessService(

            req.user,

            payload

        );

    return successResponse(

        res,

        "Business created successfully",

        businessPublicMapper(
            business
        ),

        201

    );

    });


export const updateBusiness =
asyncHandler(
async (
    req,
    res
) => {

    const payload = {

        ...req.validatedData,

    };

    if (
        req.files?.logo?.[0]
    ) {

        payload.logo =
            `businesses/logos/${req.files.logo[0].filename}`;

    }

    if (
        req.files?.cover_image?.[0]
    ) {

        payload.cover_image =
            `businesses/covers/${req.files.cover_image[0].filename}`;

    }

    const business =
        await updateBusinessService(

            req.params.id,

            req.user,

            payload

        );

    return successResponse(

        res,

        "Business updated successfully",

        businessPublicMapper(
            business
        )

    );

    });


export const verifyBusiness =
asyncHandler(
async (
    req,
    res
) => {

    const business =
        await verifyBusinessService(

            req.params.id,

            req.user.id

        );

    return successResponse(

        res,

        "Business verified successfully",

        businessMapper(
            business
        )

    );

    });


export const unverifyBusiness =
asyncHandler(
async (
    req,
    res
) => {

    const business =
        await unverifyBusinessService(
            req.params.id
        );

    return successResponse(

        res,

        "Business unverified successfully",

        businessMapper(
            business
        )

    );

    });

export const activateBusiness =
asyncHandler(
async (
    req,
    res
) => {

    const business =
        await activateBusinessService(
            req.params.id
        );

    return successResponse(

        res,

        "Business activated successfully",

        businessMapper(
            business
        )

    );

    });

export const deactivateBusiness =
asyncHandler(
async (
    req,
    res
) => {

    const business =
        await deactivateBusinessService(
            req.params.id
        );

    return successResponse(

        res,

        "Business deactivated successfully",

        businessMapper(
            business
        )

    );

    });


export const getAllBusinesses =
asyncHandler(
async (
    req,
    res
) => {

    const businesses =
        await getAllBusinessesService();

    return successResponse(

        res,

        "Businesses retrieved successfully",

        businessesMapper(
            businesses
        )

    );

});