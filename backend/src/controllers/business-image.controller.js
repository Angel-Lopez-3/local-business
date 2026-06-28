import { asyncHandler } from "../utils/asyncHandler.js";

import {
    getBusinessImagesService,
    getBusinessImageService,
    createBusinessImageService,
    deleteBusinessImageService,
} from "../services/business-image.service.js";

import {
    businessImageMapper,businessImagesMapper
} from "../mappers/business-image.mapper.js";

export const getBusinessImages =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const images =
                await getBusinessImagesService(
                    req.params.id
                );

            res.status(200).json({

                success: true,

                data:
                businessImagesMapper(
                images
                )

            });

        }
    );

export const getBusinessImage =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const image =
                await getBusinessImageService(
                    req.params.id
                );

            res.status(200).json({

                success: true,

                data:
                    businessImageMapper(
                        image
                    ),

            });

        }
    );

export const createBusinessImage =
    asyncHandler(
        async (
            req,
            res
        ) => {

            const image =
                await createBusinessImageService(
                    req.user,
                    req.body,

                    req.file

                );

            res.status(201).json({

                success: true,

                data:
                    businessImageMapper(
                        image
                    ),

            });

        }
    );

export const deleteBusinessImage =
    asyncHandler(
        async (
            req,
            res
        ) => {

            await deleteBusinessImageService(
                req.params.id,
                req.user
            );

            res.status(200).json({

                success: true,

                message:
                    "Image deleted successfully",

            });

        }
    );