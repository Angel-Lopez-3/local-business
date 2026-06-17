export const sectorMapper =
(
    sector
) => {

    return {

        id:
            sector.id.toString(),

        name:
            sector.name,

        city:
            sector.city,

        created_at:
            sector.created_at,

    };

    };


export const sectorsMapper =
(
    sectors
) => {

    return sectors.map(
        sectorMapper
    );

};