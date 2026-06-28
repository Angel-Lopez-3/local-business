import {
    getServicesService,
    createServiceService,
    updateServiceService,
    deleteServiceService,
} from "../services/service.service.js";

import {
    serviceMapper,
} from "../mappers/service.mapper.js";

export const getServices =
async (
    req,
    res,
    next
) => {

    try {

        const services =
            await getServicesService(

                req.params.businessId,

            );

        res.json({

            success: true,

            data:
                services.map(
                    serviceMapper
                )

        });

    }

    catch (error) {

        next(error);

    }

    };
export const createServiceController =
async (
    req,
    res,
    next
) => {

    try {

        const service =
            await createServiceService(

                req.user,

                req.validatedData

            );

        res.status(201).json({

            success: true,

            message:
                "Service created successfully",

            data:
                serviceMapper(
                    service
                )

        });

    }

    catch (error) {

        next(error);

    }

    };
export const updateServiceController =
async (
    req,
    res,
    next
) => {

    try {

        const service =
            await updateServiceService(

                req.params.id,

                req.user,

                req.validatedData

            );

        res.json({

            success: true,

            message:
                "Service updated successfully",

            data:
                serviceMapper(
                    service
                )

        });

    }

    catch (error) {

        next(error);

    }

    };

export const deleteServiceController =
async (
    req,
    res,
    next
) => {

    try {

        const service =
            await deleteServiceService(

                req.params.id,

                req.user

            );

        res.json({

            success: true,

            message:
                "Service deleted successfully",

            data:
                serviceMapper(
                    service
                )

        });

    }

    catch (error) {

        next(error);

    }

};