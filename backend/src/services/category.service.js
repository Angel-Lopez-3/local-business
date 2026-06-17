import slugify from "slugify";

import {
    findAllCategories,
    findCategoryById,
    findCategoryByName,
    findCategoryBySlug,
    createCategory,
    updateCategory,
    findCategoryBySlugAndNotId,
} from "../repositories/category.repository.js";

import { AppError }
    from "../utils/AppError.js";

export const getCategoriesService =
async () => {

    return await findAllCategories();

    };

export const getCategoryByIdService =
async (
    categoryId
) => {

    const category =
        await findCategoryById(
            categoryId
        );

    if (!category) {

        throw new AppError(
            "Category not found",
            404
        );

    }

    return category;

    };

export const createCategoryService =
async (
    payload
) => {

    const existingName =
        await findCategoryByName(
            payload.name
        );

    if (existingName) {

        throw new AppError(
            "Category name already exists",
            409
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
        await findCategoryBySlug(
            slug
        );

    if (existingSlug) {

        throw new AppError(
            "Category slug already exists",
            409
        );

    }

    return await createCategory({

        ...payload,

        slug,

        is_active: true,

    });

    };
export const updateCategoryService =
async (
    categoryId,
    payload
) => {

    const category =
        await findCategoryById(
            categoryId
        );

    if (!category) {

        throw new AppError(
            "Category not found",
            404
        );

    }

    const updateData = {
        ...payload,
    };

    if (payload.name) {

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
        await findCategoryBySlugAndNotId(
            slug,
            categoryId
        );

    if (existingSlug) {

        throw new AppError(
            "Category slug already exists",
            409
        );

    }

    updateData.slug = slug;

    }

    return await updateCategory(
        categoryId,
        updateData
    );

    };

export const activateCategoryService =
async (
    categoryId
) => {

    await getCategoryByIdService(
        categoryId
    );

    return await updateCategory(
        categoryId,
        {
            is_active: true,
        }
    );

    };

export const deactivateCategoryService =
async (
    categoryId
) => {

    await getCategoryByIdService(
        categoryId
    );

    return await updateCategory(
        categoryId,
        {
            is_active: false,
        }
    );

};
