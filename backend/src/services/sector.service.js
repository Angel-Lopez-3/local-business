import {
    findAllSectors,
    findSectorById,
    findSectorByNameAndCity,
    createSector,
} from "../repositories/sector.repository.js";

import { AppError }
    from "../utils/AppError.js";


export const getSectorsService =
async () => {

    return await findAllSectors();

    };

export const getSectorByIdService =
async (
    sectorId
) => {

    const sector =
        await findSectorById(
            sectorId
        );

    if (!sector) {

        throw new AppError(
            "Sector not found",
            404
        );

    }

    return sector;

    };

export const createSectorService =
async (
    payload
) => {

    const existingSector =
        await findSectorByNameAndCity(
            payload.name,
            payload.city
        );

    if (existingSector) {

        throw new AppError(
            "Sector already exists in this city",
            409
        );

    }

    return await createSector(
        payload
    );

};