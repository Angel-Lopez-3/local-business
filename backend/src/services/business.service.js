import slugify from "slugify";

import { AppError }
from "../utils/AppError.js";

import {
    findBusinessById,
    findBusinessBySlug,
    findBusinessByUserId,
    findAllPublicBusinesses,
    createBusiness,
    updateBusiness,
    verifyBusiness,
    unverifyBusiness,
    activateBusiness,
    deactivateBusiness,
    findAllBusinesses,
}
    from "../repositories/business.repository.js";




import {findRoleByName} from "../repositories/role.repository.js"

import {
    findCategoryById,
}
from "../repositories/category.repository.js";

import {
    findSectorById,
}
from "../repositories/sector.repository.js";

import {
    findUserById,
    updateUser,
}
    from "../repositories/user.repository.js";


export const getMyBusinessService =
async (
    currentUser
) => {

    const business =
        await findBusinessByUserId(
            currentUser.id
        );

    if (!business) {

        throw new AppError(
            "Business not found",
            404
        );

    }

    return business;

};

export const getPublicBusinessesService =
async () => {

    return await findAllPublicBusinesses();

    };

export const getPublicBusinessByIdService =
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

    if (
        !business.is_verified
        ||
        !business.is_active
    ) {

        throw new AppError(
            "Business not found",
            404
        );

    }

    return business;

    };


export const getPublicBusinessBySlugService =
async (
    slug
) => {

    const business =
        await findBusinessBySlug(
            slug
        );

    if (!business) {

        throw new AppError(
            "Business not found",
            404
        );

    }

    if (
        !business.is_verified
        ||
        !business.is_active
    ) {

        throw new AppError(
            "Business not found",
            404
        );

    }

    return business;

    };

export const createBusinessService =
    async (
        currentUser,
        payload
    ) => {
        const user =
            await findUserById(
                currentUser.id
            );

        if (!user) {

            throw new AppError(
                "User not found",
                404
            );

        }
        const existingBusiness =
            await findBusinessByUserId(
                currentUser.id
            );

        if (existingBusiness) {

            throw new AppError(
                "User already has a business",
                409
            );

        }
        const category =
            await findCategoryById(
                payload.category_id
            );

        if (!category) {

            throw new AppError(
                "Category not found",
                404
            );

        }

        const sector =
            await findSectorById(
                payload.sector_id
            );

        if (!sector) {

            throw new AppError(
                "Sector not found",
                404
            );

        }

        const slug =
            slugify(
                payload.name,
                {
                    lower: true,
                    strict: true,
                    trim: true,
                }
            );

        const existingSlug =
            await findBusinessBySlug(
                slug
            );

        if (existingSlug) {

            throw new AppError(
                "Business slug already exists",
                409
            );

        }

        const business =
            await createBusiness({

                ...payload,

                user_id:
                    BigInt(
                        currentUser.id
                    ),

                slug,

            });
        
        if (
    currentUser.roles.name ===
    "user"
) {

    const businessRole =
        await findRoleByName(
            "business"
        );

    await updateUser(
        currentUser.id,
        {
            role_id:
                businessRole.id,
        }
    );

}
        
        return business;
    }

export const updateBusinessService =
    async (
        businessId,
        currentUser,
        payload
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
        
    if (
    payload.category_id
) {

    const category =
        await findCategoryById(
            payload.category_id
        );

    if (!category) {

        throw new AppError(
            "Category not found",
            404
        );

    }

        }
        
    if (
    payload.sector_id
) {

    const sector =
        await findSectorById(
            payload.sector_id
        );

    if (!sector) {

        throw new AppError(
            "Sector not found",
            404
        );

    }

        }
        
    if (
    payload.name
) {

    const slug =
        slugify(
            payload.name,
            {
                lower: true,
                strict: true,
                trim: true,
            }
        );

    const existingSlug =
        await findBusinessBySlug(
            slug
        );

    if (
        existingSlug
        &&
        existingSlug.id.toString()
        !==
        businessId.toString()
    ) {

        throw new AppError(
            "Business slug already exists",
            409
        );

    }

    payload.slug =
        slug;

        }
        
            
                return await updateBusiness(
            businessId,
            payload
        );

    }

export const verifyBusinessService =
async (
    businessId,
    adminId
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

    return await verifyBusiness(
        businessId,
        adminId
    );

    };

export const unverifyBusinessService =
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

    return await unverifyBusiness(
        businessId
    );

    };

export const activateBusinessService =
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

    return await activateBusiness(
        businessId
    );

    };

export const deactivateBusinessService =
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

    return await deactivateBusiness(
        businessId
    );

    };


export const getAllBusinessesService =
async () => {

    return await findAllBusinesses();

};