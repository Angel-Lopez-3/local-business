import { asyncHandler }
from "../utils/asyncHandler.js";

import {
    getCategoriesService,
    getCategoryByIdService,
    createCategoryService,
    updateCategoryService,
    activateCategoryService,
    deactivateCategoryService,
} from "../services/category.service.js";

import {
    categoryMapper,
    categoriesMapper,
} from "../mappers/category.mapper.js";

import {
    successResponse,
} from "../utils/response.js";


export const getCategories =
asyncHandler(
    async (
        req,
        res
    ) => {

        const categories =
            await getCategoriesService();

        return successResponse(
            res,
            "Categories retrieved successfully",
            categoriesMapper(
                categories
            )
        );

    }
    );

    export const getCategory =
asyncHandler(
    async (
        req,
        res
    ) => {

        const category =
            await getCategoryByIdService(
                req.params.id
            );

        return successResponse(
            res,
            "Category retrieved successfully",
            categoryMapper(
                category
            )
        );

    }
    );

    export const createCategory =
asyncHandler(
    async (
        req,
        res
    ) => {

        const category =
            await createCategoryService(
                req.validatedData
            );

        return successResponse(
            res,
            "Category created successfully",
            categoryMapper(
                category
            )
        );

    }
    );

    export const updateCategory =
asyncHandler(
    async (
        req,
        res
    ) => {

        const category =
            await updateCategoryService(
                req.params.id,
                req.validatedData
            );

        return successResponse(
            res,
            "Category updated successfully",
            categoryMapper(
                category
            )
        );

    }
    );

    export const activateCategory =
asyncHandler(
    async (
        req,
        res
    ) => {

        const category =
            await activateCategoryService(
                req.params.id
            );

        return successResponse(
            res,
            "Category activated successfully",
            categoryMapper(
                category
            )
        );

    }
    );

    export const deactivateCategory =
asyncHandler(
    async (
        req,
        res
    ) => {

        const category =
            await deactivateCategoryService(
                req.params.id
            );

        return successResponse(
            res,
            "Category deactivated successfully",
            categoryMapper(
                category
            )
        );

    }
);