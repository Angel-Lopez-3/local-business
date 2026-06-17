export const mapUserToDTO = (user) => ({
    id: user.id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    profile_photo: user.profile_photo,
    email_verified: user.email_verified,
    role: {
        id: user.roles.id.toString(),
        name: user.roles.name,
    },
});


export const sanitizeUser =
    (user) => {

        const {
            password,
            ...safeUser
        } = user;

        return safeUser;
    };

export const sanitizeUsers =
    (users) => {

        return users.map(
            userPublicMapper
        );

    };

export const userPublicMapper = (
    user
) => {

    return {
        id: user.id.toString(),

        first_name:
            user.first_name,

        last_name:
            user.last_name,

        email:
            user.email,

        phone:
            user.phone,

        profile_photo:
            user.profile_photo,

        email_verified:
            user.email_verified,

        role: user.roles
            ? {
                id:
                    user.roles.id.toString(),

                name:
                    user.roles.name,
            }
            : null,
    };

};

export const userAdminMapper = (
    user
) => {

    return {
        ...userPublicMapper(user),

        is_active:
            user.is_active,

        last_login:
            user.last_login,

        created_at:
            user.created_at,

        updated_at:
            user.updated_at,
    };

};

export const usersAdminMapper = (
    users
) => {

    return users.map(
        userAdminMapper
    );

};