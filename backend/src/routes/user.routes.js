import { Router } from "express";

import { getUsers, getUser, searchUsers, updateMyProfile, updateUserByAdmin, activateUser, deactivateUser, changePassword } from "../controllers/user.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

import { authorizeRoles } from "../middlewares/role.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { updateProfileSchema, updateUserAdminSchema, changePasswordSchema } from "../validators/user.validator.js";

import { uploadProfilePhoto } from "../middlewares/upload.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| PATCH /profile
|--------------------------------------------------------------------------
| Descripción:
|   Actualiza el perfil del usuario autenticado.
|
| Acceso:
|   User, Business, Admin
|
| Body esperado:
| {
|   first_name?: string,
|   last_name?: string,
|   phone?: string,
|   profile_photo?: File
| }
|
| Respuesta:
| {
|   user
| }
*/
router.patch(
    "/profile",
    authenticate,
    uploadProfilePhoto.single("profile_photo"),
    validate(updateProfileSchema),
    updateMyProfile
);

/*
|--------------------------------------------------------------------------
| PATCH /change-password
|--------------------------------------------------------------------------
| Descripción:
|   Permite al usuario autenticado cambiar su contraseña.
|
| Acceso:
|   User, Business, Admin
|
| Body esperado:
| {
|   currentPassword: string,
|   newPassword: string
| }
|
| Respuesta:
| {
|   message: string
| }
*/
router.patch(
    "/change-password",
    authenticate,
    validate(changePasswordSchema),
    changePassword
);

/*
|--------------------------------------------------------------------------
| GET /
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la lista completa de usuarios.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   Ninguno
|
| Respuesta:
| [
|   users
| ]
*/
router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getUsers
);

/*
|--------------------------------------------------------------------------
| GET /search
|--------------------------------------------------------------------------
| Descripción:
|   Busca usuarios por email, nombre o apellido.
|
| Acceso:
|   Solo Admin
|
| Query Params:
|   ?search=texto
|
| Respuesta:
| [
|   users
| ]
*/
router.get(
    "/search",
    authenticate,
    authorizeRoles("admin"),
    searchUsers
);

/*
|--------------------------------------------------------------------------
| GET /:id
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene un usuario específico por su ID.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del usuario
|
| Respuesta:
| {
|   user
| }
*/
router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    getUser
);

/*
|--------------------------------------------------------------------------
| PATCH /:id
|--------------------------------------------------------------------------
| Descripción:
|   Actualiza cualquier usuario del sistema.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del usuario
|
| Body esperado:
| {
|   first_name?: string,
|   last_name?: string,
|   phone?: string,
|   profile_photo?: File,
|   role_id?: number,
|   is_active?: boolean,
|   email_verified?: boolean
| }
|
| Respuesta:
| {
|   user
| }
*/
router.patch(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    uploadProfilePhoto.single("profile_photo"),
    validate(updateUserAdminSchema),
    updateUserByAdmin
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/activate
|--------------------------------------------------------------------------
| Descripción:
|   Activa un usuario del sistema.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del usuario
|
| Respuesta:
| {
|   user
| }
*/
router.patch(
    "/:id/activate",
    authenticate,
    authorizeRoles("admin"),
    activateUser
);

/*
|--------------------------------------------------------------------------
| PATCH /:id/deactivate
|--------------------------------------------------------------------------
| Descripción:
|   Desactiva un usuario del sistema.
|
| Acceso:
|   Solo Admin
|
| Parámetros:
|   id -> ID del usuario
|
| Respuesta:
| {
|   user
| }
*/
router.patch(
    "/:id/deactivate",
    authenticate,
    authorizeRoles("admin"),
    deactivateUser
);

export default router;