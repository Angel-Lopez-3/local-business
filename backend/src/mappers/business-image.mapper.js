

export const businessImageMapper =
    (
        image
    ) => ({

        id:
            image.id,

        business_id:
            image.business_id,

        image_url:
            image.image_url,

        created_at:
            image.created_at,

    });

export const businessImagesMapper =  (
        images
) => {
    return images.map(
            businessImageMapper
        );
    }

