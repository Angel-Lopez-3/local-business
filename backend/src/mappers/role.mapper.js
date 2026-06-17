export const roleMapper = (role) => {

    return {
        id: role.id,
        name: role.name,
        description: role.description,
        created_at: role.created_at,
    };
};

export const rolesMapper = (roles) => {

    return roles.map(roleMapper);
}