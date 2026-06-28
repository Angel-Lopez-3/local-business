export const serviceMapper =
(
    service
) => ({

    id:
        service.id,

    business_id:
        service.business_id,

    name:
        service.name,

    description:
        service.description,

    price:
        service.price,

    is_active:
        service.is_active,

    created_at:
        service.created_at,

});