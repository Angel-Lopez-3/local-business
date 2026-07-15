import prisma from "../config/db.js";

export const countUsers = async () => {

    return await prisma.users.count();

};

export const countBusinesses = async () => {

    return await prisma.businesses.count();

};

export const countActiveBusinesses = async () => {

    return await prisma.businesses.count({

        where: {

            is_active: true

        }

    });

};

export const countPendingBusinesses = async () => {

    return await prisma.businesses.count({

        where: {

            is_verified: false

        }

    });

};

export const countCategories = async () => {

    return await prisma.categories.count();

};

export const countSectors = async () => {

    return await prisma.sectors.count();

};

export const countServices = async () => {

    return await prisma.services.count();

};

export const countReviews = async () => {

    return await prisma.reviews.count();

};

export const averageRating = async () => {

    return await prisma.reviews.aggregate({

        _avg: {

            rating: true

        }

    });

};

export const countPendingReports = async () => {

    return await prisma.reports.count({

        where: {

            status: "pending"

        }

    });

};

export const countNewUsersThisMonth = async () => {

    const today = new Date();

    const firstDay = new Date(

        today.getFullYear(),
        today.getMonth(),
        1
    );

    return await prisma.users.count({

        where: {

            created_at: {

                gte: firstDay

            }

        }

    });

};

export const countNewBusinessesThisMonth = async () => {

    const today = new Date();

    const firstDay = new Date(

        today.getFullYear(),
        today.getMonth(),
        1
    );

    return await prisma.businesses.count({

        where: {

            created_at: {

                gte: firstDay

            }

        }

    });

};

export const getUsersGrowth =
async () => {

    return await prisma.users.findMany({

        select: {

            created_at: true,

        },

        orderBy: {

            created_at: "asc"

        }

    });

    };

export const getBusinessesGrowth =
async () => {

    return await prisma.businesses.findMany({

        select: {

            created_at: true,

        },

        orderBy: {

            created_at: "asc"

        }

    });

    };

export const getBusinessStatus = async () => {

    const [

        active,

        inactive,

        verified,

        pending,

    ] = await Promise.all([

        prisma.businesses.count({

            where: {

                is_active: true,

            }

        }),

        prisma.businesses.count({

            where: {

                is_active: false,

            }

        }),

        prisma.businesses.count({

            where: {

                is_verified: true,

            }

        }),

        prisma.businesses.count({

            where: {

                is_verified: false,

            }

        }),

    ]);

    return {

        active,

        inactive,

        verified,

        pending,

    };

};


export const getBusinessesPerCategory =
async () => {

    return await prisma.categories.findMany({

        select: {

            id: true,

            name: true,

            businesses: {

                select: {

                    id: true,

                }

            }

        },

        orderBy: {

            name: "asc"

        }

    });

    };

export const getBusinessesPerSector =
async () => {

    return await prisma.sectors.findMany({

        select: {

            id: true,

            name: true,

            businesses: {

                select: {

                    id: true,

                }

            }

        },

        orderBy: {

            name: "asc"

        }

    });

    };

export const getTopRatedBusinesses =
async () => {

    return await prisma.businesses.findMany({

        where: {

            is_active: true,

            is_verified: true,

        },

        include: {

            reviews: {

                select: {

                    rating: true,

                }

            },

            categories: {

                select: {

                    name: true,

                }

            }

        }

    });

    };

    export const getMostReviewedBusinesses =
async () => {

    return await prisma.businesses.findMany({

        where: {

            is_active: true,

            is_verified: true,

        },

        include: {

            reviews: {

                select: {

                    id: true,

                    rating: true,

                }

            },

            categories: {

                select: {

                    name: true,

                }

            }

        }

    });

    };

export const getModerationData =
async () => {

    const [

        pendingReports,

        pendingBusinesses,

        hiddenReviews,

    ] = await Promise.all([

        prisma.reports.count({

            where: {

                status: "pending"

            }

        }),

        prisma.businesses.count({

            where: {

                is_verified: false

            }

        }),

        prisma.reviews.count({

            where: {

                is_visible: false

            }

        })

    ]);

    return {

        pendingReports,

        pendingBusinesses,

        hiddenReviews,

    };

    };

export const getRecentActivity =
async () => {

    const [

        users,

        businesses,

        reviews,

        reports,

    ] = await Promise.all([

        prisma.users.findMany({

            take: 5,

            orderBy: {

                created_at: "desc"

            },

            select: {

                id: true,

                first_name: true,

                last_name: true,

                email: true,

                created_at: true,

            }

        }),

        prisma.businesses.findMany({

            take: 5,

            orderBy: {

                created_at: "desc"

            },

            select: {

                id: true,

                name: true,

                slug: true,

                created_at: true,

            }

        }),

        prisma.reviews.findMany({

            take: 5,

            orderBy: {

                created_at: "desc"

            },

            select: {

                id: true,

                rating: true,

                comment: true,

                created_at: true,

                users: {

                    select: {

                        first_name: true,

                        last_name: true,

                    }

                },

                businesses: {

                    select: {

                        id: true,

                        name: true,

                    }

                }

            }

        }),

        prisma.reports.findMany({

            take: 5,

            orderBy: {

                created_at: "desc"

            },

            select: {

                id: true,

                reason: true,

                status: true,

                created_at: true,

                users: {

                    select: {

                        first_name: true,

                        last_name: true,

                    }

                }

            }

        })

    ]);

    return {

        users,

        businesses,

        reviews,

        reports,

    };

};