import { getRoles, getRoleById } from '../repositories/role.repository.js';

import { AppError } from "../utils/AppError.js";

export const getAllRoles = async () => {

    return await getRoles();
};

export const getRole = async (roleId) => {

    const role = await getRoleById(roleId);

    if (!role) {
        throw new AppError('Role not found', 404);
    }

    return role;
};
