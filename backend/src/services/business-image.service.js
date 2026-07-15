import { AppError } from "../utils/AppError.js";

import {
    findAllBusinessImages,
    findBusinessImageById,
    createBusinessImage,
    deleteBusinessImage,
} from "../repositories/business-image.repository.js";

import {
    findBusinessById,
} from "../repositories/business.repository.js";

export const getBusinessImagesService =
    async (bussinesId) => {


        const image = await findAllBusinessImages(bussinesId

        )
        
        if (!image) {

            throw new AppError(
                "Image not found",
                404
            );

        }
        return image;

    };

export const getBusinessImageService =
    async (
        imageId
    ) => {

        const image =
            await findBusinessImageById(
                imageId
            );

        if (!image) {

            throw new AppError(
                "Image not found",
                404
            );

        }

        return image;

    };


export const createBusinessImageService =
    async (
        currentUser,
        payload,
        file
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
            currentUser.roles.name === "business"
            &&
            business.user_id.toString() !== currentUser.id.toString()
        ) {

            throw new AppError(
                "Forbidden",
                403
            );

        }

        if (!file) {

            throw new AppError(
                "Image is required",
                400
            );

        }

        const imageUrl =
            file.path.replace(
                /\\/g,
                "/"
            );

        return await createBusinessImage({

            business_id:
                BigInt(
                    payload.business_id
                ),

            image_url:
                imageUrl,

        });

    };

export const deleteBusinessImageService =
    async (
        imageId,
        currentUser
    ) => {

        const image =
            await findBusinessImageById(
                imageId
            );

        if (!image) {

            throw new AppError(
                "Image not found",
                404
            );

        }

        if (
            currentUser.roles.name === "business"
            &&
            image.businesses.user_id.toString()
            !==
            currentUser.id.toString()
        ) {

            throw new AppError(
                "Forbidden",
                403
            );

        }

        await deleteBusinessImage(
            imageId
        );

    };