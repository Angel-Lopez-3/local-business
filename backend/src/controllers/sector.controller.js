import { asyncHandler }
from "../utils/asyncHandler.js";

import {
    getSectorsService,
    getSectorByIdService,
    createSectorService,
} from "../services/sector.service.js";

import {
    sectorMapper,
    sectorsMapper,
} from "../mappers/sector.mapper.js";

import {
    successResponse,
} from "../utils/response.js";

export const getSectors =
asyncHandler(
    async (
        req,
        res
    ) => {

        const sectors =
            await getSectorsService();

        return successResponse(
            res,
            "Sectors retrieved successfully",
            sectorsMapper(
                sectors
            )
        );

    }
    );



export const getSector =
asyncHandler(
    async (
        req,
        res
    ) => {

        const sector =
            await getSectorByIdService(
                req.params.id
            );

        return successResponse(
            res,
            "Sector retrieved successfully",
            sectorMapper(
                sector
            )
        );

    }
    );

export const createSector =
asyncHandler(
    async (
        req,
        res
    ) => {

        const sector =
            await createSectorService(
                req.validatedData
            );

        return successResponse(
            res,
            "Sector created successfully",
            sectorMapper(
                sector
            )
        );

    }
);