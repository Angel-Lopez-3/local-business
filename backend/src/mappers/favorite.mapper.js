export const favoriteMapper =
(
    favorite
) => {

    const business =
        favorite.businesses;

    return {

        business_id:
            business.id.toString(),

        name:
            business.name,

        slug:
            business.slug,

        logo:
            business.logo,

        cover_image:
            business.cover_image,

        category: {

            id:
                business.categories.id.toString(),

            name:
                business.categories.name,

        },

        sector: {

            id:
                business.sectors.id.toString(),

            name:
                business.sectors.name,

        },

        created_at:
            favorite.created_at,

    };

};