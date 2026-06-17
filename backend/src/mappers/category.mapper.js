export const categoryMapper =
(
    category
) => {

    return {

        id:
            category.id.toString(),

        name:
            category.name,

        slug:
            category.slug,

        icon:
            category.icon,

        is_active:
            Boolean(
                category.is_active
            ),

        created_at:
            category.created_at,

    };

    };

export const categoriesMapper =
(
    categories
) => {

    return categories.map(
        categoryMapper
    );

};