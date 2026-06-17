import {asyncHandler} from '../utils/asyncHandler.js';

import { getAllRoles, getRole } from '../services/role.service.js';

import { roleMapper, rolesMapper } from '../mappers/role.mapper.js';

import { successResponse } from "../utils/response.js";

export const getRoles = asyncHandler(async (req, res) => {

    const roles = await getAllRoles();

    return successResponse(res,"Roles retrieved successfully", rolesMapper(roles));
});

export const getRoleById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const role = await getRole(id);

    return successResponse(res,"Role retrieved successfully", roleMapper(role));
});