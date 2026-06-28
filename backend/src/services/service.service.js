import { AppError } from "../utils/AppError.js";

import {
    findBusinessById,
} from "../repositories/business.repository.js";

import {
    findServiceById,
    findServicesByBusiness,
    createService,
    updateService,
    deleteService,
} from "../repositories/service.repository.js";


export const getServicesService =
async (
    businessId
) => {

    const business =
        await findBusinessById(
            businessId
        );

    if (!business) {

        throw new AppError(
            "Business not found",
            404
        );

    }

    
    

    return await findServicesByBusiness(
        businessId
    );

    };

export const createServiceService =
async (
    currentUser,
    payload
) => {

    const business =
        await findBusinessById(
            payload.business_id
        );

    if (!business) {

        throw new AppError(
            "Business not found",
            404
        );

    }

    if (

        currentUser.roles.name ===
        "business"

        &&

        business.user_id.toString()
        !==
        currentUser.id.toString()

    ) {

        throw new AppError(
            "Forbidden",
            403
        );

    }

    return await createService(
        payload
    );

    };

export const updateServiceService =
async (
    serviceId,
    currentUser,
    payload
) => {

    const service =
        await findServiceById(
            serviceId
        );

    if (!service) {

        throw new AppError(
            "Service not found",
            404
        );

    }

    if (

        currentUser.roles.name ===
        "business"

        &&

        service.businesses.user_id.toString()
        !==
        currentUser.id.toString()

    ) {

        throw new AppError(
            "Forbidden",
            403
        );

    }

    return await updateService(

        serviceId,

        payload

    );

    };

export const deleteServiceService =
async (
    serviceId,
    currentUser
) => {

    const service =
        await findServiceById(
            serviceId
        );

    if (!service) {

        throw new AppError(
            "Service not found",
            404
        );

    }

    if (

        currentUser.roles.name ===
        "business"

        &&

        service.businesses.user_id.toString()
        !==
        currentUser.id.toString()

    ) {

        throw new AppError(
            "Forbidden",
            403
        );

    }

    await deleteService(
        serviceId
    );
    return service;

};