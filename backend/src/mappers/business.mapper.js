export const businessMapper =
(
    business
) => {

    return {

        id:
            business.id.toString(),

        user_id:
            business.user_id.toString(),

        category_id:
            business.category_id.toString(),

        sector_id:
            business.sector_id.toString(),

        name:
            business.name,

        slug:
            business.slug,

        description:
            business.description,

        phone:
            business.phone,

        whatsapp:
            business.whatsapp,

        email:
            business.email,

        address:
            business.address,

        logo:
            business.logo
                ? `${process.env.APP_URL}/uploads/${business.logo}`
                : null,

        cover_image:
            business.cover_image
                ? `${process.env.APP_URL}/uploads/${business.cover_image}`
                : null,

        website:
            business.website,

        facebook:
            business.facebook,

        instagram:
            business.instagram,

        working_hours:
            business.working_hours,

        latitude:
            business.latitude,

        longitude:
            business.longitude,

        is_verified:
            business.is_verified,

        is_active:
            business.is_active,

        approved_by:
            business.approved_by
                ? business.approved_by.toString()
                : null,

        approved_at:
            business.approved_at,

        created_at:
            business.created_at,

        updated_at:
            business.updated_at,

        category:
            business.categories
                ? {

                    id:
                        business.categories.id.toString(),

                    name:
                        business.categories.name,

                    slug:
                        business.categories.slug,

                }
                : null,

        sector:
            business.sectors
                ? {

                    id:
                        business.sectors.id.toString(),

                    name:
                        business.sectors.name,

                }
                : null,

    };

    };

export const businessesMapper =
(
    businesses
) => {

    return businesses.map(
        businessMapper
    );

    };

export const businessPublicMapper =
(
    business
) => {

    return {

        id:
            business.id.toString(),

        category_id:
            business.category_id.toString(),

        sector_id:
            business.sector_id.toString(),

        name:
            business.name,

        slug:
            business.slug,

        description:
            business.description,

        phone:
            business.phone,

        whatsapp:
            business.whatsapp,

        email:
            business.email,

        address:
            business.address,

        logo:
            business.logo
                ? `${process.env.APP_URL}/uploads/${business.logo}`
                : null,

        cover_image:
            business.cover_image
                ? `${process.env.APP_URL}/uploads/${business.cover_image}`
                : null,

        website:
            business.website,

        facebook:
            business.facebook,

        instagram:
            business.instagram,

        working_hours:
            business.working_hours,

        latitude:
            business.latitude,

        longitude:
            business.longitude,

        created_at:
            business.created_at,

        category:
            business.categories
                ? {

                    id:
                        business.categories.id.toString(),

                    name:
                        business.categories.name,

                    slug:
                        business.categories.slug,

                }
                : null,

        sector:
            business.sectors
                ? {

                    id:
                        business.sectors.id.toString(),

                    name:
                        business.sectors.name,

                }
                : null,

    };

    };

export const businessesPublicMapper =
(
    businesses
) => {

    return businesses.map(
        businessPublicMapper
    );

};