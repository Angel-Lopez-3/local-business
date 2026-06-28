import { Router } from "express";

import {
    register,
    login,
    logout,
    logoutAll,
    refreshToken,
    me,
    resetPassword,
    forgotPassword,
} from "../controllers/auth.controller.js";

import {
    validate,
} from "../middlewares/validate.middleware.js";

import {
    authenticate
} from "../middlewares/auth.middleware.js";

import {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
} from "../validators/auth.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| POST /register
|--------------------------------------------------------------------------
| Descripción:
|   Registra un nuevo usuario en el sistema.
|
| Body esperado:
| {
|   firstName: string,
|   lastName: string,
|   email: string,
|   password: string
| }
|
| Respuesta:
| {
|   user,
|   accessToken,
|   refreshToken
| }
*/
router.post(
    "/register",
    validate(registerSchema),
    register
);

/*
|--------------------------------------------------------------------------
| POST /login
|--------------------------------------------------------------------------
| Descripción:
|   Inicia sesión con correo y contraseña.
|
| Body esperado:
| {
|   email: string,
|   password: string
| }
|
| Respuesta:
| {
|   user,
|   accessToken,
|   refreshToken
| }
*/
router.post(
    "/login",
    validate(loginSchema),
    login
);

/*
|--------------------------------------------------------------------------
| POST /logout
|--------------------------------------------------------------------------
| Descripción:
|   Cierra la sesión actual invalidando el refresh token.
|
| Body esperado:
| {
|   refreshToken: string
| }
|
| Respuesta:
| {
|   message: string
| }
*/
router.post(
    "/logout",
    logout
);

/*
|--------------------------------------------------------------------------
| POST /refresh-token
|--------------------------------------------------------------------------
| Descripción:
|   Genera un nuevo access token utilizando un refresh token válido.
|
| Body esperado:
| {
|   refreshToken: string
| }
|
| Respuesta:
| {
|   accessToken,
|   refreshToken
| }
*/
router.post(
    "/refresh-token",
    refreshToken
);

/*
|--------------------------------------------------------------------------
| POST /logout-all
|--------------------------------------------------------------------------
| Descripción:
|   Revoca todos los refresh tokens del usuario autenticado.
|
| Requiere:
|   Access Token válido.
|
| Respuesta:
| {
|   message: string
| }
*/
router.post(
    "/logout-all",
    authenticate,
    logoutAll
);

/*
|--------------------------------------------------------------------------
| GET /me
|--------------------------------------------------------------------------
| Descripción:
|   Obtiene la información del usuario autenticado.
|
| Requiere:
|   Access Token válido.
|
| Respuesta:
| {
|   id,
|   first_name,
|   last_name,
|   email,
|   role,
|   ...
| }
*/
router.get(
    "/me",
    authenticate,
    me
);

/*
|--------------------------------------------------------------------------
| POST /forgot-password
|--------------------------------------------------------------------------
| Descripción:
|   Solicita la recuperación de contraseña.
|   Genera un token temporal y envía un correo.
|
| Body esperado:
| {
|   email: string
| }
|
| Respuesta:
| {
|   message: string
| }
*/
router.post(
    "/forgot-password",
    validate(forgotPasswordSchema),
    forgotPassword
);

/*
|--------------------------------------------------------------------------
| POST /reset-password
|--------------------------------------------------------------------------
| Descripción:
|   Restablece la contraseña utilizando un token válido.
|
| Body esperado:
| {
|   token: string,
|   password: string
| }
|
| Respuesta:
| {
|   message: string
| }
*/
router.post(
    "/reset-password",
    validate(resetPasswordSchema),
    resetPassword
);

export default router;